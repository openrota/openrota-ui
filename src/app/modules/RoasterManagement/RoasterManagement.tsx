import PageTitle from '@app/components/PageTitle/PageTitle';
import moment from 'moment';
import React from 'react';
import TimelineComponent from './components/TimelineComponent';
import { ResourceData } from './constants';

const RoasterManagement: React.FC = () => {
    const [resources, setResources] = React.useState<ResourceData[]>([{
      bgColor: "#f4ed8d",
      id: "1",
      rightTitle: "Stamm",
      title: "Saravana Srinivasan",
      mail: 'saravanabalajis94@gmail.com'
    }, {
      bgColor: "#f4ed8d",
      id: "2",
      rightTitle: "Stamm",
      title: "John Snow",
      mail: 'saravanabalajis49@gmail.com'
    }, {
      bgColor: "#f4ed8d",
      id: "3",
      rightTitle: "Stamm",
      title: "Harry Potter",
      mail: 'saravanabalajis04@gmail.com'
    }
    ]);
    const props = {
      style: {
        background: 'red'
      }
    }
    const [calendarEvents, setCalendarEvents] = React.useState([{
      className: "item-weekend",
        title: 'Random summary',
        start: moment(),
        end: moment().add(1, 'hour'),
        group: '1',
        id: '1',
        itemProps: props,
        tip: 'test',
        selectedBgColor: 'rgb(122, 184, 235)',
        mail: 'xyz@gmail.com',
        description: 'Coffee at the cafetarie',
        bgColor: 'rgb(53, 124, 210)',
        color: '#FFF'
    }]);

    
  
    return (
      <>
        <PageTitle title={"Calendars"} />
        <TimelineComponent
            calendarEvents={calendarEvents}
            resources={resources}
            setResources={setResources} />
      </>
    )
};

export default RoasterManagement;
