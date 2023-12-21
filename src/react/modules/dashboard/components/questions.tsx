import { useState, type FC, useRef } from 'react';
import { Modal } from '@react/components/ui/modal';
import { QuestionCreateForm } from '@react/modules/dashboard/components/question-create-form';
import {
  useQuestionList,
  type QuestionListPayload,
} from '@react/hooks/questions';
import { Table } from '@react/modules/dashboard/ui/table';
import moment from 'moment';
import { getData } from '@utils/common';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { QuestionUpdateForm } from '@react/modules/dashboard/components/question-update-form';

export const Questions = function Questions() {
  const [showQuestionCreateModal, setShowQuestionCreateModal] =
    useState<boolean>(false);
  const [questionUpdateTarget, setQuestionUpdateTarget] = useState<
    undefined | Question
  >();
  const [questionListPayload, setQuestionListPayload] =
    useState<QuestionListPayload>({});
  const {
    data: questionList,
    isLoading,
    mutate,
  } = useQuestionList(questionListPayload);
  const [cookies] = useCookies(['token']);

  return (
    <div>
      <header className='flex justify-between p-4'>
        
        <div>
          <button
            className='bg-slate-800 hover:bg-slate-900 text-white rounded pl-2 pr-4 py-2 flex gap-x-2'
            type='button'
            title='Create new question'
            role='button'
            onClick={() => setShowQuestionCreateModal(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                clipRule='evenodd'
              />
            </svg>
            Create
          </button>
        </div>
      </header>
      {isLoading && <div className='p-4'>Loading..</div>}
      {!isLoading && (
        <Table headings={['question', 'date created', 'answer', 'actions']}>
          {questionList.map((question) => {
            return (
              <tr key={question.id}>
                <td className='py-2'>{question.question}</td>
                <td className='py-2'>
                  {moment(question.created_at).format('YYYY-MM-DD')}
                </td>
                <td className='py-2'>{question.answer}</td>
                <td className='py-2'>
                  <div className='flex gap-x-2'>
                    <button
                      className='bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2'
                      type='button'
                      role='button'
                      title='Edit question'
                      onClick={() => setQuestionUpdateTarget(question)}
                    >
                      Edit
                    </button>
                    <button
                      className='bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2'
                      type='button'
                      role='button'
                      title='Delete question'
                      onClick={async () => {
                        if (
                          !confirm(
                            'Are you sure you want to delete the selected question?',
                          )
                        ) {
                          return;
                        }

                        const data = await getData<Question>(
                          fetch(`/api/question/delete/${question.id}`, {
                            method: 'DELETE',
                            headers: {
                              Authorization: `Bearer ${cookies.token}`,
                            },
                          }),
                        );

                        if (data instanceof Error) {
                          toast.error(data.message);

                          return;
                        }

                        toast.success('Deleted successfully!');
                        mutate();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      )}
      {showQuestionCreateModal && (
        <Modal close={() => setShowQuestionCreateModal(false)}>
          <QuestionCreateForm
            close={() => setShowQuestionCreateModal(false)}
            mutate={mutate}
          />
        </Modal>
      )}
      {questionUpdateTarget && (
        <Modal close={() => setQuestionUpdateTarget(void 0)}>
          <QuestionUpdateForm
            question={questionUpdateTarget}
            close={() => setQuestionUpdateTarget(void 0)}
            mutate={mutate}
          />
        </Modal>
      )}
    </div>
  );
} satisfies FC<Props>;

export interface Props {}
