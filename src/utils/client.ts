import { getData } from '@utils/common';

export const getUserByToken = async function getUserByToken(
  token: string,
): Promise<User | null> {
  try {
    const data = await getData<{ user: User }>(
      fetch(`/api/user/session`, {
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

function getRandomElements<T>(array: T[], length: number) {
  if (array.length < length) {
    return [];
  }

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.slice(0, 3);
}

export const getRandomFallbackQuestionSuggestions = () => {
  // Add more fallback questions if necessary
  const FALLBACK_QUESTION_SUGGESTIONS: string[] = [
   'Requirements for Freshmen Entrance Exam?',
   'Schedule for Entrance Exam?',
   'Deadline for admission application?',
  ];

  return getRandomElements<string>(FALLBACK_QUESTION_SUGGESTIONS, 3);
};
