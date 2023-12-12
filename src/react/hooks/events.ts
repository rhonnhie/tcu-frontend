import { getData } from '@utils/common';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

export const useEventList = function useEventList(payload: EventListPayload) {
  const [cookies] = useCookies(['token']);
  const fetcher = () =>
    getData<{ events: AppEvent[] }>(
      fetch('/api/event/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(payload),
      }),
    );
  let { data, error, isLoading, mutate } = useSWR(
    `Api[Event][List][${JSON.stringify(payload)}]`,
    fetcher,
  );

  if (data instanceof Error) {
    console.error(data);

    return {
      data: [],
      error,
      isLoading,
      mutate,
    };
  }

  return {
    data: data?.events.reverse() ?? [],
    error,
    isLoading,
    mutate,
  };
};

export interface EventListPayload {
  created_at_from?: string;
  created_at_to?: string;
  updated_at_from?: string;
  updated_at_to?: string;
  date_of_event_from?: string;
  date_of_event_to?: string;
  keywords?: string[];
  user_id?: string;
  skip?: number;
  take?: number;
}
