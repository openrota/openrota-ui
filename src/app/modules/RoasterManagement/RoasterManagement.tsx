import PageTitle from '@app/components/PageTitle/PageTitle';
import moment from 'moment';
import React, { useEffect } from 'react';
import TimelineComponent from './components/TimelineComponent';
import { ResourceData, EventData } from './constants';
import { ResourceRequest, useGetAllSharedResourceQuery, useGetResourceRequestsQuery } from '@app/models'

type Maybe<T> = NonNullable<T> | undefined;

const RoasterManagement: React.FC = () => {
  const { data, loading, error } = useGetAllSharedResourceQuery();
  
  const [resources, setResources] = React.useState<ResourceData[]>([]);
  const [resourceRequest, setResourceRequest] = React.useState <any>([]);
  const [calendarEvents, setCalendarEvents] = React.useState<EventData[]>([]);

  useGetResourceRequestsQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setResourceRequest(data?.sharedResourceRequest);
    }
  });
  
  

  useEffect(() => {
    const tempResource: ResourceData[] = [];
    const tempEvents: EventData[] = [];
    
    resourceRequest?.map((reqData, index) => {
      tempEvents.push({
        title: reqData.project || '',
        start_time: moment(reqData?.startDate).format('x'),
        end_time: moment(reqData?.endDate).format('x'),
        group: (index + 1),
        id: (index + 1),
        description: reqData.businessUnit??'',
      })
    })
    
    setCalendarEvents(tempEvents);
    data?.sharedResource!.map((resource, index) => {
      tempResource.push({
        id: (index + 1).toString(),
        title: resource?.firstName + ' ' + resource?.lastName,
      })
    })
    setResources(tempResource)
  }, [data, resourceRequest])
  
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