import { getData } from '@utils/common';
import { useState, type FC } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const Register: FC<Props> = () => {
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const [cookies] = useCookies(['token']);
  const [onProgress, setOnProgress] = useState<boolean>(false);
  const onSubmit = handleSubmit(async (formValues) => {
    if (onProgress) {
      toast.error('Request is still on progress');

      return;
    }

    const data = await getData<{ [key: string]: unknown }>(
      fetch('/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({
          username: formValues.username.trim(),
          password: formValues.password.trim(),
          role: 'ADMIN',
        }),
      }),
    );

    setValue('username', '');
    setValue('password', '');
    setOnProgress(false);

    if (data instanceof Error) {
      toast.error(data.message);

      return;
    }

    toast.success('Registered successfully!');
  });

  return (
    <div className='p-4'>
      <h1 className='font-extrabold text-2xl'>Register new admin account</h1>
      <form
        className='p-4 rounded-lg shadow mt-4 max-w-[400px] bg-white'
        onSubmit={onSubmit}
      >
        <div>
          <label htmlFor='username'>Username</label>
          <input
            className='w-full rounded mt-2'
            type='text'
            title='Username'
            id='username'
            autoComplete='off'
            placeholder='admin2'
            {...register('username')}
          />
        </div>
        <div className='mt-2'>
          <label htmlFor='password'>Password</label>
          <input
            className='w-full rounded mt-2'
            type='password'
            title='Password'
            id='password'
            autoComplete='off'
            {...register('password')}
          />
        </div>
        <div className='flex justify-end gap-x-4 mt-4'>
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
};

export interface Props {}

export interface FormValues {
  username: string;
  password: string;
}
