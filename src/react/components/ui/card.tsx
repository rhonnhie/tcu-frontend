import moment from 'moment';
import { useState, type FC, useRef } from 'react';
import { Modal } from '@react/components/ui/modal';

export const Card = function Card(props: Props) {
  const { entity } = props;
  const [showAttachments, setShowAttachments] = useState<boolean>(false);
  const attachmentContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className='p-4 rounded bg-white shadow flex flex-col lg:flex-row min-h-[300px] text-slate-800'>
      <div className='lg:w-1/3 max-w-[400px] max-h-[400px] bg-black rounded lg:rounded-l overflow-hidden flex items-center'>
        <img
          className='block w-full mx-auto object-cover'
          src={
            entity.photo
              ? `/api/file/get/${entity.photo.id}/${entity.photo.name}`
              : 'https://placehold.co/800/EFEFEF/EF4444/?font=open-sans&text=image%20not%20available'
          }
          width={200}
          height={200}
        />
      </div>
      <div className='mt-4 lg:mt-0 lg:ml-4 lg:w-2/3'>
        <h1 className='font-bold text-2xl'>{entity.title}</h1>
        {'date_of_event' in entity && (
          <p className='font-bold text-xs mt-4 text-white bg-blue-500 rounded-full py-1 px-3 inline-block'>
            {moment(entity.date_of_event).format('MM-DD-YYYY')}
          </p>
        )}
        <div className='flex mt-4 flex-col justify-between gap-x-4'>
          <pre className='font-sans break-words whitespace-break-spaces'>
            {entity.content.trim()}
          </pre>
          {entity.attachments.length > 0 && (
            <div className='mt-4 flex justify-end'>
              <button
                className='bg-slate-800 hover:bg-slate-900 px-4 py-2 rounded text-white'
                title='View attachments'
                type='button'
                onClick={() => setShowAttachments(true)}
              >
                View attachments
              </button>
            </div>
          )}
        </div>
      </div>
      {showAttachments && (
        <Modal close={() => setShowAttachments(false)}>
          <div
            className='p-4 w-full'
            ref={attachmentContainerRef}
            onClick={(e) => {
              if (e.target === attachmentContainerRef.current) {
                setShowAttachments(false);
              }
            }}
          >
            <div className='max-w-screen-sm bg-white rounded shadow mx-auto p-4'>
              <h1 className='font-bold text-xl'>Attachments</h1>
              <div className='max-h-[400px] overflow-y-auto'>
                {entity.attachments.map((file) => (
                  <div
                    key={file.id}
                    className='mt-4 p-4 bg-gray-100 rounded flex justify-between'
                    id={file.id}
                  >
                    <p className='py-2'>{file.name}</p>
                    <a
                      className='bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 text-white'
                      download={true}
                      target='_blank'
                      href={`/api/file/get/${file.id}/${file.name}`}
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
} satisfies FC<Props>;

export interface Props {
  entity: Announcement | AppEvent;
}
