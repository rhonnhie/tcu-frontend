import { useRef, type FC, type PropsWithChildren, useEffect } from 'react';

export const Modal = function Modal(props) {
  const { children, close } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div
      className='z-50 fixed left-0 top-0 w-screen h-screen bg-black/40 grid place-items-center'
      ref={ref}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
    >
      {children}
    </div>
  );
} satisfies FC<Props>;

export interface Props extends PropsWithChildren {
  close: () => void;
}
