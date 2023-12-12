export const getData = async function getData<T>(
  request: Promise<Response>,
): Promise<T | Error> {
  try {
    const response = await request;
    const data = await response.json();

    if (typeof data === 'object' && data && 'error' in data) {
      throw new Error(data.message);
    }

    return data as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error;
    }

    return new Error('An error occurs');
  }
};
