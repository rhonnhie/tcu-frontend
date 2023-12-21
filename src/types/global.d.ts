import type { Prisma, User } from '@prisma/client';

declare global {
  export declare type User = Omit<User, 'password'>;

  export declare type Announcement = Prisma.AnnouncementGetPayload<{
    include: {
      photo: true;
      attachments: true;
    };

  }>;

  export declare type Question = Prisma.QuestionGetPayload<{
  }>;

  export declare type AppEvent = Prisma.EventGetPayload<{
    include: {
      photo: true;
      attachments: true;
    };
  }>;

  export declare type BackendError = {
    statusCode: number;
    message: string;
    error: string;
  };

  export declare type AiMessage = {
    role: 'system' | 'user' | 'assistant';
    content: string;
  };

  export declare type AssistantResponse = {
    answer: string;
    suggestions: string[];
  };
}
