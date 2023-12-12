import { getData } from '@utils/common';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

export const useAnnouncementList = function useAnnouncementList(
  payload: AnnouncementListPayload,
) {
  const [cookies] = useCookies(['token']);
  const fetcher = () =>
    getData<{ announcements: Announcement[] }>(
      fetch('/api/announcement/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(payload),
      }),
    );
  let { data, error, isLoading, mutate } = useSWR(
    `Api[Announcement][List][${JSON.stringify(payload)}]`,
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
    data: data?.announcements.reverse() ?? [],
    error,
    isLoading,
    mutate,
  };
};

export interface AnnouncementListPayload {
  created_at_from?: string;
  created_at_to?: string;
  updated_at_from?: string;
  updated_at_to?: string;
  keywords?: string[];
  pin?: boolean;
  user_id?: string;
  skip?: number;
  take?: number;
}
