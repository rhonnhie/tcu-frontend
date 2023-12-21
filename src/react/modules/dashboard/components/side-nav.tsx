import type { FC } from 'react';
import { ContentView } from '@react/modules/dashboard/components/content';

export const SideNav = function SideNav(props) {
  const { view, setView } = props;

  return (
    <nav className='fixed left-0 top-0 w-20 md:w-[200px] bg-white h-full mt-[4.5rem] p-4 flex flex-col gap-y-4 text-xs'>
      <button
        className={`${
          view === ContentView.announcements ? 'bg-blue-600' : 'bg-blue-500'
        } hover:bg-blue-600 text-white rounded w-full px-4 py-2 flex gap-x-2 items-center`}
        type='button'
        title='Announcements'
        onClick={() => setView(ContentView.announcements)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-6 h-6'
        >
          <path d='M16.881 4.346A23.112 23.112 0 018.25 6H7.5a5.25 5.25 0 00-.88 10.427 21.593 21.593 0 001.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.592.772-2.468a17.116 17.116 0 01-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0018 11.25c0-2.413-.393-4.735-1.119-6.904zM18.26 3.74a23.22 23.22 0 011.24 7.51 23.22 23.22 0 01-1.24 7.51c-.055.161-.111.322-.17.482a.75.75 0 101.409.516 24.555 24.555 0 001.415-6.43 2.992 2.992 0 00.836-2.078c0-.806-.319-1.54-.836-2.078a24.65 24.65 0 00-1.415-6.43.75.75 0 10-1.409.516c.059.16.116.321.17.483z' />
        </svg>
        <span className='hidden md:inline'>Announcements</span>
      </button>
      <button
        className={`${
          view === ContentView.events ? 'bg-blue-600' : 'bg-blue-500'
        } hover:bg-blue-600 text-white rounded w-full px-4 py-2 flex gap-x-2 items-center`}
        type='button'
        title='Events'
        onClick={() => setView(ContentView.events)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-6 h-6'
        >
          <path
            fillRule='evenodd'
            d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
            clipRule='evenodd'
          />
        </svg>
        <span className='hidden md:inline'>Events</span>
      </button>
      <button
        className={`${
          view === ContentView.register ? 'bg-blue-600' : 'bg-blue-500'
        } hover:bg-blue-600 text-white rounded w-full px-4 py-2 flex gap-x-2 items-center`}
        type='button'
        title='Register'
        onClick={() => setView(ContentView.register)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-6 h-6'
        >
          <path d='M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z' />
        </svg>

        <span className='hidden md:inline'>Register</span>
      </button>

      <button
        className={`${
          view === ContentView.register ? 'bg-blue-600' : 'bg-blue-500'
        } hover:bg-blue-600 text-white rounded w-full px-4 py-2 flex gap-x-2 items-center`}
        type='button'
        title='Register'
        onClick={() => setView(ContentView.question)}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="24"  className='w-6 h-6' height="24" viewBox="0 0 24 24" fill="currentColor" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>

        <span className='hidden md:inline'>Questions</span>
      </button>
    </nav>
  );
} satisfies FC<Props>;

interface Props {
  view: ContentView;
  setView: (contentView: ContentView) => void;
}
