import { getData } from '@utils/common';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

export const useQuestionList = function useQuestionList(
  payload: QuestionListPayload,
) {
  const [cookies] = useCookies(['token']);
  const fetcher = () =>
    getData<{ questions: Question[] }>(
      fetch('/api/question/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(payload),
      }),
    );
  let { data, error, isLoading, mutate } = useSWR(
    `Api[Question][List][${JSON.stringify(payload)}]`,
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
    data: data?.questions.reverse() ?? [],
    error,
    isLoading,
    mutate,
  };
};

export interface QuestionListPayload {
  question?: string;
  answer?: string;
}
