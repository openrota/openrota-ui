import PageTitle from '@app/components/PageTitle/PageTitle';
import moment from 'moment';
import React, { useEffect } from 'react';
import TimelineComponent from './TimelineComponent';
import { ResourceData, EventData } from '../constants';
import { useGetAllSharedResourceQuery, useGetProjectsQuery } from '@app/models'

const RoasterManagement: React.FC = () => {
  const { data, loading, error } = useGetAllSharedResourceQuery();

  const [resources, setResources] = React.useState<ResourceData[]>([]);
  const [resourceSchedule, setResourceSchedule] = React.useState <any>([]);
  const [calendarEvents, setCalendarEvents] = React.useState<EventData[]>([]);

  // useGetResourceRequestsQuery({
  //   fetchPolicy: 'network-only',
  //   onCompleted: (data) => {
  //     console.log('SR', data.sharedResourceRequest)
  //     // setResourceRequest(data?.sharedResourceRequest);

  //   }
  // });
  
  useGetProjectsQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      console.log('projects',data)
      setResourceSchedule(data?.project);
    },
  });
  

  useEffect(() => {
    const tempResource: any[] = [];
    const tempEvents: EventData[] = [];
    
    resourceSchedule?.map((scheduleData, index) => {
      console.log('index', scheduleData)
      tempEvents.push({
        title: scheduleData.projectName + ' - ' + scheduleData.businessUnit || '',
        start_time: moment(scheduleData?.slot.startDate).format('x'),
        end_time: moment(scheduleData?.slot.endDate).format('x'),
        group: scheduleData.resourcerequest.resource.employeeId,
        id: (index + 1),
        description: scheduleData.businessUnit??'',
        className: 'assign',
      })
    })
    
    setCalendarEvents(tempEvents);
    data?.sharedResource!.map((resource, index) => {
      tempResource.push({
        id: resource?.employeeId,
        title: resource?.firstName + ' ' + resource?.lastName,
        rightTitle: resource?.skillSet?.join(', '),
        employeeId: resource?.employeeId
      })
    })
    setResources(tempResource)
  }, [data, resourceSchedule])
  
  return (
    <>
      <PageTitle title={"Calendars"} />
      <TimelineComponent
        calendarEvents={calendarEvents}
        resources={resources}
      />
    </>
  )
};

export default RoasterManagement;


// {
//   className: "item-weekend",
//   title: 'Random summary',
//   start: moment(),
//   end: moment().add(1, 'hour'),
//   group: '1',
//   id: '1',
//   itemProps: props,
//   tip: 'test',
//   selectedBgColor: 'rgb(122, 184, 235)',
//   mail: 'xyz@gmail.com',
//   description: 'Coffee at the cafetarie',
//   bgColor: 'rgb(53, 124, 210)',
//   color: '#FFF'
// }