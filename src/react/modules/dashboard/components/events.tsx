import { useState, type FC } from 'react';
import { EventListFilter } from '@react/modules/dashboard/components/event-list-filter';
import { type EventListPayload, useEventList } from '@react/hooks/events';
import { useCookies } from 'react-cookie';
import { EventCreateForm } from '@react/modules/dashboard/components/event-create-form';
import { Modal } from '@react/components/ui/modal';
import { Table } from '@react/modules/dashboard/ui/table';
import moment from 'moment';
import { getData } from '@utils/common';
import { toast } from 'react-toastify';
import { EventUpdateForm } from '@react/modules/dashboard/components/event-update-form';

export const Events = function Events() {
  const [showEventCreateModal, setShowEventCreateModal] =
    useState<boolean>(false);
  const [eventUpdateTarget, setEventUpdateTarget] = useState<
    undefined | AppEvent
  >();
  const [eventListPayload, setEventListPayload] = useState<EventListPayload>(
    {},
  );
  const { data: eventList, isLoading, mutate } = useEventList(eventListPayload);
  const [cookies] = useCookies(['token']);

  return (
    <div>
      <header className='flex justify-between p-4'>
        <EventListFilter setEventListPayload={setEventListPayload} />
        <div>
          <button
            className='bg-slate-800 hover:bg-slate-900 text-white rounded pl-2 pr-4 py-2 flex gap-x-2'
            type='button'
            title='Create new event'
            role='button'
            onClick={() => setShowEventCreateModal(true)}
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
        <Table headings={['title', 'date created', 'date of event', 'actions']}>
          {eventList.map((event) => {
            return (
              <tr key={event.id}>
                <td className='py-2'>{event.title}</td>
                <td className='py-2'>
                  {moment(event.created_at).format('YYYY-MM-DD')}
                </td>
                <td className='py-2'>
                  {moment(event.date_of_event).format('YYYY-MM-DD')}
                </td>
                <td className='py-2'>
                  <div className='flex gap-x-2'>
                    <button
                      className='bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2'
                      type='button'
                      role='button'
                      title='Edit event'
                      onClick={() => setEventUpdateTarget(event)}
                    >
                      Edit
                    </button>
                    <button
                      className='bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2'
                      type='button'
                      role='button'
                      title='Delete event'
                      onClick={async () => {
                        if (
                          !confirm(
                            'Are you sure you want to delete the selected event?',
                          )
                        ) {
                          return;
                        }

                        const data = await getData<AppEvent>(
                          fetch(`/api/event/delete/${event.id}`, {
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
      {showEventCreateModal && (
        <Modal close={() => setShowEventCreateModal(false)}>
          <EventCreateForm
            close={() => setShowEventCreateModal(false)}
            mutate={mutate}
          />
        </Modal>
      )}
      {eventUpdateTarget && (
        <Modal close={() => setEventUpdateTarget(void 0)}>
          <EventUpdateForm
            event={eventUpdateTarget}
            close={() => setEventUpdateTarget(void 0)}
            mutate={mutate}
          />
        </Modal>
      )}
    </div>
  );
} satisfies FC<Props>;

export interface Props {}
