import { getData } from '@utils/common';
import type { File as PrismaFile } from '@prisma/client';
import { useRef, type FC, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const QuestionCreateForm = function QuestionCreateForm(props) {
  const { close, mutate } = props;
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
      photo_id: photoId,
      attachments,
      ...formData,
    };

    const data = await getData<Question>(
      fetch('/api/question/create', {
        method: 'POST',
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
    toast.success('Question created!');
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
          <h1 className='font-bold text-2xl'>Create Question</h1>
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
          <label htmlFor='question'>Question</label>
          <input
            className='w-full rounded'
            type='text'
            title='question'
            id='question'
            autoComplete='off'
            placeholder='Question'
            {...register('question')}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='answer'>Answer</label>
          <textarea
            className='w-full rounded min-h-[150px] text-sm'
            title='answer'
            id='answer'
            autoComplete='off'
            placeholder='Aa'
            {...register('answer')}
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
  close: () => void;
  mutate: () => void;
}

export interface FormValues {
  question: string;
  answer: string;
}
