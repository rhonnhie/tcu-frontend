import { getData } from '@utils/common';
import { useRef, type FC, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { File as PrismaFile } from '@prisma/client';

export const AnnouncementUpdateForm = function AnnouncementUpdateForm(props) {
  const { announcement, close, mutate } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photoId, setPhotoId] = useState<string | undefined>();
  const [attachments, setAttachments] = useState<string[] | undefined>();
  const [cookies] = useCookies(['token']);
  const onSubmit = handleSubmit(async (formData) => {
    if (isLoading) {
      toast.info('Still on process..');

      return;
    }

    setIsLoading(true);

    const values = {
      id: announcement?.id,
      photo_id: photoId,
      attachments,
      ...formData,
    };

    const data = await getData<Announcement>(
      fetch('/api/announcement/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(values),
      }),
    );

    setIsLoading(false);

    if (data instanceof Error) {
      toast.error(data.message);

      return;
    }

    close();
    toast.success('Announcement updated!');
    mutate();
  });

  return (
    <div
      className='w-full px-4'
      ref={containerRef}
      onClick={(e) => {
        if (e.target === containerRef.current) close();
      }}
    >
      <form
        className='mx-auto p-4 bg-white shadow rounded max-w-screen-sm'
        onSubmit={onSubmit}
      >
        <div className='flex justify-between'>
          <h1 className='font-bold text-2xl'>Update announcement</h1>
          <button
            className='p-2 bg-red-500 hover:bg-red-600 rounded text-white'
            type='button'
            role='button'
            title='close'
            onClick={close}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            className='w-full rounded'
            type='text'
            title='title'
            id='title'
            autoComplete='off'
            placeholder='Announcement title'
            defaultValue={announcement?.title}
            {...register('title')}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='content'>Content</label>
          <textarea
            className='w-full rounded min-h-[150px] text-sm'
            title='content'
            id='content'
            autoComplete='off'
            placeholder='Aa'
            defaultValue={announcement?.content}
            {...register('content')}
          />
        </div>
        <div className='mt-4 text-sm'>
          <label className='text-base' htmlFor='photo'>
            Update photo
          </label>
          <input
            className='w-full rounded'
            title='content'
            id='photo'
            type='file'
            accept='image/*'
            onChange={async (e) => {
              const files = e.target.files;

              if (!files) {
                setPhotoId(void 0);

                return;
              }

              const formData = new FormData();

              formData.append('files', files[0]);
              toast.info('Uploading photo');

              const data = await getData<{ files: PrismaFile[] }>(
                fetch('/api/file/upload', {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${cookies.token}`,
                  },
                  body: formData,
                }),
              );

              if (data instanceof Error) {
                toast.error(data.message);

                return;
              }

              const { files: uploadedFiles } = data;
              const photoId = uploadedFiles[0].id;

              setPhotoId(photoId);
              toast.success('Photo uploaded');
            }}
          />
        </div>
        <div className='mt-4 text-sm'>
          <label className='text-base' htmlFor='attachments'>
            Update attachments
          </label>
          <input
            className='w-full rounded'
            title='content'
            id='attachments'
            type='file'
            multiple
            onChange={async (e) => {
              const files = e.target.files;

              if (!files) {
                setAttachments(void 0);

                return;
              }

              const formData = new FormData();

              for (const file of files) {
                formData.append('files', file);
              }

              toast.info('Uploading attachments');

              const data = await getData<{ files: PrismaFile[] }>(
                fetch('/api/file/upload', {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${cookies.token}`,
                  },
                  body: formData,
                }),
              );

              if (data instanceof Error) {
                toast.error(data.message);

                return;
              }

              const { files: uploadedFiles } = data;
              const attachments = uploadedFiles.map(
                (attachment) => attachment.id,
              );

              setAttachments(attachments);
              toast.success('Attachments uploaded');
            }}
          />
        </div>
        <div className='flex justify-end gap-x-4 mt-4'>
          <button
            className='bg-gray-500 hover:bg-gray-600 text-white rounded px-4 py-2'
            type='button'
            title='Submit'
            onClick={close}
          >
            Cancel
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2'
            type='submit'
            title='Submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
} satisfies FC<Props>;

export interface Props {
  announcement?: Announcement;
  close: () => void;
  mutate: () => void;
}

export interface FormValues {
  title: string;
  content: string;
}
