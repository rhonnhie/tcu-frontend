import type { AnnouncementListPayload } from '@react/hooks/announcements';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';

export const AnnouncementListFilter = function AnnouncmentListFilter(props) {
  const { setAnnouncementListPayload } = props;
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = handleSubmit((formData) => {
    const pinMap: Record<string, undefined | boolean> = {
      null: void 0,
      true: true,
      false: false,
    };
    const keywords = formData.keywords.trim()
      ? formData.keywords.split(' ')
      : void 0;
    const pin = pinMap[formData.pin];

    setAnnouncementListPayload({
      keywords,
      pin,
    });
  });

  return (
    <form className='flex gap-x-2' onSubmit={onSubmit}>
      <input
        className='rounded'
        type='search'
        placeholder='Search'
        title='Search'
        {...register('keywords')}
      />
      <select className='rounded' {...register('pin')} title='Pinned?'>
        <option value='null'>Not specified</option>
        <option value='true'>Pinned</option>
        <option value='false'>Not Pinned</option>
      </select>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white rounded pl-2 pr-4 py-2 flex gap-x-2'
        type='submit'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-6 h-6'
        >
          <path
            fillRule='evenodd'
            d='M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z'
            clipRule='evenodd'
          />
        </svg>
        Filter
      </button>
    </form>
  );
} satisfies FC<Props>;

export interface Props {
  setAnnouncementListPayload: (payload: AnnouncementListPayload) => void;
}

export interface FormValues {
  keywords: string;
  pin: string;
}
