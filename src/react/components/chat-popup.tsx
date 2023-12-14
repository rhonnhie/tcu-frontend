import { getRandomFallbackQuestionSuggestions } from '@utils/client';
import { getData } from '@utils/common';
import { useState, type FC, type FormEvent, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const ChatPopUp = function ChatPopUp() {
  const [show, setShow] = useState<boolean>(false);
  const [questionsSuggestions, setQuestionSuggestions] = useState<string[]>([]);
  const [conversation, setConversation] = useState<AiMessage[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am E-TCU, the school helpdesk for Taguig City University (TCU).',
    },
  ]);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const onSubmit = handleSubmit(async (formData) => {
    if (isLoading) {
      toast.info('Still on process');

      return;
    }

    if (!formData.content.trim()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setConversation((conversation) => [
        ...conversation,
        {
          role: 'user',
          content: formData.content,
        },
      ]);

      setValue('content', '');
      setQuestionSuggestions([]);
    }, 100);

    const response = await getData<{ data: AssistantResponse }>(
      fetch('/api/assistant/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      }),
    );

    setIsLoading(false);

    if (response instanceof Error) {
      toast.error(response.message);

      return;
    }

    const { answer, suggestions } = response.data;

    setConversation((conversation) => [
      ...conversation,
      {
        role: 'assistant',
        content: answer,
      },
    ]);
    setQuestionSuggestions(
      suggestions.length > 0
        ? suggestions
        : getRandomFallbackQuestionSuggestions(),
    );
  });
  const handleInput = (formEvent: FormEvent<HTMLTextAreaElement>) => {
    const nativeEvent = formEvent.nativeEvent;

    if (nativeEvent instanceof KeyboardEvent) {
      if (nativeEvent.key === 'Enter' && !nativeEvent.shiftKey) {
        submitButtonRef.current?.click();
      }
    }
  };

  useEffect(() => {
    setQuestionSuggestions(getRandomFallbackQuestionSuggestions());
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <div
      className={`fixed bottom-0 right-0 p-4 z-30 ${
        show ? '' : 'w-[5rem] h-[5rem]'
      }`}
    >
      <div
        className={`bg-white rounded shadow mb-20 w-[calc(100vw-2rem)] max-h-[calc(100vh-10rem)] lg:max-h-none lg:w-[500px] transition-transform ${
          show ? 'scale-100 visible' : 'scale-0 invisible'
        }`}
      >
        <header className='bg-gray-500 rounded-t p-4 text-white flex items-center justify-between'>
          <p className='flex items-center gap-x-2'>
            <span className='w-2 h-2 inline-block rounded-full bg-green-500' />
            Chat Assistant
          </p>
          <button title='close' type='button' onClick={() => setShow(false)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 8.25l-7.5 7.5-7.5-7.5'
              />
            </svg>
          </button>
        </header>
        <section className='p-4 pb-0'>
          <div className='assistant-message-container text-2xl lg:text-base max-h-[400px] lg:max-h-[400px]'>
            {conversation.map((message, index) => {
              if (message.role === 'assistant') {
                return (
                  <div key={index} className='mb-4' ref={lastMessageRef}>
                    <pre
                      key={index}
                      className='font-sans whitespace-pre-wrap p-4 bg-gray-700 text-white max-w-[80%] inline-block rounded-xl rounded-bl-none'
                    >
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </Markdown>
                    </pre>
                  </div>
                );
              }

              if (message.role === 'user') {
                return (
                  <div key={index} className='mb-4' ref={lastMessageRef}>
                    <pre className='font-sans whitespace-pre-wrap p-4 bg-gray-200 ml-auto max-w-[80%] rounded-xl rounded-br-none'>
                      {message.content}
                    </pre>
                  </div>
                );
              }

              return null;
            })}

            {isLoading && (
              <div className='mb-4' ref={lastMessageRef}>
                <p className='font-sans whitespace-pre-wrap p-4 bg-Stone-400 text-white inline-block rounded-xl rounded-bl-none'>
                  Typing..
                </p>
              </div>
            )}
          </div>
        </section>
        <div
          className={
            questionsSuggestions.length < 1
              ? 'hidden'
              : 'p-4 flex flex-col gap-y-4'
          }
        >
          {questionsSuggestions.map((suggestion, index) => (
            <p
              className='text-xl px-2 py-1 rounded-lg ring ring- stone-400 text-Stone-700 md:cursor-pointer'
              key={index}
              onClick={() => {
                setValue('content', suggestion);
                submitButtonRef.current?.click();
              }}
            >
              {suggestion}
            </p>
          ))}
        </div>
        <form
          className='flex justify-between items-center p-4 pt-0'
          onSubmit={onSubmit}
        >
          <textarea
            className='rounded grow max-h-40 resize-none text-xs lg:text-base'
            placeholder='Aa'
            onKeyDown={handleInput}
            disabled={isLoading}
            {...register('content')}
          ></textarea>
          <button
            className='text-blue-500 hover:text-blue-600 self-start ml-4'
            title='Send'
            type='submit'
            ref={submitButtonRef}
            disabled={isLoading}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path d='M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z' />
            </svg>
          </button>
        </form>
      </div>
      <button
        type='button'
        title='Chat assistant'
        className='fixed right-4 bottom-4 rounded-full p-4 bg-yellow-500 hover:bg-yellow-600 text-white shadow block ml-auto'
        onClick={() => setShow((value) => !value)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'
          />
        </svg>
      </button>
    </div>
  );
} satisfies FC<Props>;

export interface Props {}

export interface FormValues {
  content: string;
}
