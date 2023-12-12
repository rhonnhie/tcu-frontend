import type { FC } from 'react';
import { Card } from '@react/components/ui/card';
import { useEventList } from '@react/hooks/events';

export const EventCards = function EventCards() {
  const { data: events, isLoading } = useEventList({ take: 20 });

  if (isLoading) {
    return <p className='mt-4 font-bold text-gray-500'>Loading..</p>;
  }

  if (events.length < 1) {
    return <p className='mt-4 font-bold text-gray-500'>No events</p>;
  }

  return (
    <div className='mt-4 flex flex-col gap-y-4'>
      {events.map((event) => (
        <Card key={event.id} entity={event} />
      ))}
    </div>
  );
} satisfies FC<Props>;

export interface Props {}
