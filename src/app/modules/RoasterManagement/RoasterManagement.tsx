import PageTitle from '@app/components/PageTitle/PageTitle';
import moment from 'moment';
import React, { useEffect } from 'react';
import TimelineComponent from './components/TimelineComponent';
import { ResourceData } from './constants';
import { useGetAllSharedResourceQuery } from '@app/models'

const RoasterManagement: React.FC = () => {
  const { data, loading, error } = useGetAllSharedResourceQuery();
  
  const [resources, setResources] = React.useState<ResourceData[]>([]);
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

  useEffect(() => {
    const tempResource: ResourceData[] = [];
    data?.sharedResource!.map((resource) => {
      tempResource.push({
        bgColor: "#f4ed8d",
        id: resource?.id,
        rightTitle: "Stamm",
        title: resource?.firstName + ' ' + resource?.lastName,
        mail: resource?.emailId || ''
      })
    })
    setResources(tempResource)
  }, [data])

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



// {
//   bgColor: "#f4ed8d",
//   id: "1",
//   rightTitle: "Stamm",
//   title: "Saravana Srinivasan",
//   mail: ''
// }, {
//   bgColor: "#f4ed8d",
//   id: "2",
//   rightTitle: "Stamm",
//   title: "John Snow",
//   mail: ''
// }, {
//   bgColor: "#f4ed8d",
//   id: "3",
//   rightTitle: "Stamm",
//   title: "Harry Potter",
//   mail: ''
// }