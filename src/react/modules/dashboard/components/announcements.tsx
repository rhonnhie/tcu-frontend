import { useState, type FC, useRef } from 'react';
import { Modal } from '@react/components/ui/modal';
import { AnnouncementCreateForm } from '@react/modules/dashboard/components/announcement-create-form';
import {
  useAnnouncementList,
  type AnnouncementListPayload,
} from '@react/hooks/announcements';
import { AnnouncementListFilter } from '@react/modules/dashboard/components/announcement-list-filter';
import { Table } from '@react/modules/dashboard/ui/table';
import moment from 'moment';
import { getData } from '@utils/common';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { AnnouncementUpdateForm } from '@react/modules/dashboard/components/announcement-update-form';

export const Announcements = function Announcements() {
  const [showAnnouncementCreateModal, setShowAnnouncementCreateModal] =
    useState<boolean>(false);
  const [announcementUpdateTarget, setAnnouncementUpdateTarget] = useState<
    undefined | Announcement
  >();
  const [announcementListPayload, setAnnouncementListPayload] =
    useState<AnnouncementListPayload>({});
  const {
    data: announcementList,
    isLoading,
    mutate,
  } = useAnnouncementList(announcementListPayload);
  const [cookies] = useCookies(['token']);

  return (
    <div>
      <header className='flex justify-between p-4'>
        <AnnouncementListFilter
          setAnnouncementListPayload={setAnnouncementListPayload}
        />
        <div>
          <button
            className='bg-slate-800 hover:bg-slate-900 text-white rounded pl-2 pr-4 py-2 flex gap-x-2'
            type='button'
            title='Create new announcement'
            role='button'
            onClick={() => setShowAnnouncementCreateModal(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                clipRule='evenodd'
              />
            </svg>
            Create
          </button>
        </div>
      </header>
      {isLoading && <div className='p-4'>Loading..</div>}
      {!isLoading && (
        <Table headings={['title', 'date created', 'pin', 'actions']}>
          {announcementList.map((announcement) => {
            return (
              <tr key={announcement.id}>
                <td className='py-2'>{announcement.title}</td>
                <td className='py-2'>
                  {moment(announcement.created_at).format('YYYY-MM-DD')}
                </td>
                <td className='py-2'>
                  <input
                    type='checkbox'
                    defaultChecked={announcement.pin}
                    onChange={async (e) => {
                      const pin = e.target.checked;
                      const data = await getData<Announcement>(
                        fetch('/api/announcement/update', {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${cookies.token}`,
                          },
                          body: JSON.stringify({
                            id: announcement.id,
                            pin,
                          }),
                        }),
                      );

                      if (data instanceof Error) {
                        toast.error(data.message);

                        return;
                      }

                      announcement.pin = data.pin;
                    }}
                  />
                </td>
                <td className='py-2'>
                  <div className='flex gap-x-2'>
                    <button
                      className='bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2'
                      type='button'
                      role='button'
                      title='Edit announcement'
                      onClick={() => setAnnouncementUpdateTarget(announcement)}
                    >
                      Edit
                    </button>
                    <button
                      className='bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2'
                      type='button'
                      role='button'
                      title='Delete announcement'
                      onClick={async () => {
                        if (
                          !confirm(
                            'Are you sure you want to delete the selected announcement?',
                          )
                        ) {
                          return;
                        }

                        const data = await getData<Announcement>(
                          fetch(`/api/announcement/delete/${announcement.id}`, {
                            method: 'DELETE',
                            headers: {
                              Authorization: `Bearer ${cookies.token}`,
                            },
                          }),
                        );

                        if (data instanceof Error) {
                          toast.error(data.message);

                          return;
                        }

                        toast.success('Deleted successfully!');
                        mutate();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      )}
      {showAnnouncementCreateModal && (
        <Modal close={() => setShowAnnouncementCreateModal(false)}>
          <AnnouncementCreateForm
            close={() => setShowAnnouncementCreateModal(false)}
            mutate={mutate}
          />
        </Modal>
      )}
      {announcementUpdateTarget && (
        <Modal close={() => setAnnouncementUpdateTarget(void 0)}>
          <AnnouncementUpdateForm
            announcement={announcementUpdateTarget}
            close={() => setAnnouncementUpdateTarget(void 0)}
            mutate={mutate}
          />
        </Modal>
      )}
    </div>
  );
} satisfies FC<Props>;

export interface Props {}
