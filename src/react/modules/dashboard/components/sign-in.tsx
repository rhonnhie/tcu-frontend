import { getData } from '@utils/common';
import { useState, type FC } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const SignIn = function SignIn() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_cookies, setCookie] = useCookies(['token']);
  const onSubmit = handleSubmit(async (formData) => {
    if (isLoading) return;

    setIsLoading(true);

    const data = await getData<{ token: string }>(
      fetch('/api/user/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }),
    );

    setIsLoading(false);

    if (data instanceof Error) {
      return toast.error(data.message);
    }

    setCookie('token', data.token);
    location.reload();
  });

  return (
    <main className='grid w-screen h-screen place-items-center bg-gray-100'>
      <div className='w-full p-4'>
        <form
          className='mx-auto max-w-[400px] p-4 rounded-lg bg-white shadow'
          onSubmit={onSubmit}
        >
          <h1 className='font-bold text-xl mb-4'>Sign In</h1>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              className='w-full rounded'
              type='text'
              title='username'
              id='username'
              autoComplete='off'
              {...register('username')}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              className='w-full rounded'
              type='password'
              title='password'
              id='password'
              autoComplete='off'
              {...register('password')}
            />
          </div>
          <div className='flex flex-row-reverse mt-4'>
            <button
              className={`text-white bg-blue-500 px-6 py-2 rounded font-bold ${
                isLoading ? 'cursor-not-allowed' : ''
              }`}
              title='Submit'
              type='submit'
              disabled={isLoading}
            >
              {isLoading && (
                <svg
                  className='animate-spin -ml-1 h-6 w-6 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              )}
              {!isLoading && 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} satisfies FC<Props>;

export interface Props {}

interface FormValues {
  username: string;
  password: string;
}
