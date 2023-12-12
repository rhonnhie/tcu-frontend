import { type FC } from 'react';
import { useCookies } from 'react-cookie';

export const SignOutButton = function SignOutButton() {
  const [_cookies, _setCookie, clearCookie] = useCookies(['token']);
  const handleOnClick = () => {
    clearCookie('token');
    location.reload();
  };

  return (
    <button
      className='bg-red-500 hover:bg-red-600 text-white pl-2 pr-4 py-2 rounded flex items-center gap-x-2'
      type='button'
      onClick={handleOnClick}
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
          d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
        />
      </svg>
      Sign Out
    </button>
  );
} satisfies FC<Props>;

export interface Props {}
