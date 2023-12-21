import { getData } from '@utils/common';
// https://taguig-backend.onrender.com
export const getUserByToken = async function getUserByToken(
  token: string,
): Promise<User | null> {
  try {
    const data = await getData<{ user: User }>(
      fetch('http://localhost:3001/user/session', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );

    if (data instanceof Error) {
      throw data;
    }

    return data.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    }

    return null;
  }
};
