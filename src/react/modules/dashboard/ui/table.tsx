import type { FC, PropsWithChildren } from 'react';

export const Table = function Table(props) {
  const { headings, children } = props;

  return (
    <div className='w-[calc(100% - 4rem)] overflow-x-auto p-4 pb-2 bg-white mx-4 shadow rounded'>
      <table className='dashboard-table'>
        <thead>
          <tr>
            {headings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
} satisfies FC<Props>;

export interface Props extends PropsWithChildren {
  headings: string[];
}
