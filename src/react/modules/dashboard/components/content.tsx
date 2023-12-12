import { useState, type FC, Fragment } from 'react';
import {
  Announcements,
  type Props as AnnouncementsProps,
} from './announcements';
import { Events, type Props as EventsProps } from './events';
import { SideNav } from '@react/modules/dashboard/components/side-nav';
import { Register } from './register';

export const Content = function Content(props) {
  const {} = props;
  const [view, setView] = useState<ContentView>(ContentView.announcements);
  const View = getView(view, {});

  return (
    <Fragment>
      <SideNav view={view} setView={setView} />
      <main className='ml-20 md:ml-[200px] bg-gray-100 min-h-screen'>
        {View}
      </main>
    </Fragment>
  );
} satisfies FC<Props>;

function getView(view: ContentView, props: AnnouncementsProps | EventsProps) {
  switch (view) {
    case ContentView.announcements:
      return <Announcements {...props} />;
    case ContentView.events:
      return <Events {...props} />;
    case ContentView.register:
      return <Register {...props} />;
    default:
      return null;
  }
}

export interface Props {
  user: User;
}

export enum ContentView {
  announcements,
  events,
  register,
}
