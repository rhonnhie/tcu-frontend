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
    'Could you provide information about the mission statement of TCU?',
    'Could you please provide concise instructions for enrollment?',
    'Could you please provide me with the complete address of the school?',
    'Dress code for male students',
    'Dress code for female students',
    'What are the available courses at TCU?',
    'When is the enrollment period for TCU?',
  ];

  return getRandomElements<string>(FALLBACK_QUESTION_SUGGESTIONS, 3);
};
