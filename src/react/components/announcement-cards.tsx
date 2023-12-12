import type { FC } from 'react';
import { Card } from '@react/components/ui/card';
import { useAnnouncementList } from '@react/hooks/announcements';

export const AnnouncementCards = function AnnouncementCards() {
  const { data: announcements, isLoading } = useAnnouncementList({ pin: true });

  if (isLoading) {
    return <p className='mt-4 font-bold text-gray-500'>Loading..</p>;
  }

  if (announcements.length < 1) {
    return <p className='mt-4 font-bold text-gray-500'>No announcements</p>;
  }

  return (
    <div className='mt-4 flex flex-col gap-y-4'>
      {announcements.map((announcement) => (
        <Card key={announcement.id} entity={announcement} />
      ))}
    </div>
  );
} satisfies FC<Props>;

export interface Props {}
