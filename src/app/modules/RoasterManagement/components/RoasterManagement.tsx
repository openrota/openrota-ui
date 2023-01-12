import PageTitle from '@app/components/PageTitle/PageTitle';
import moment from 'moment';
import React, { useEffect } from 'react';
import TimelineComponent from './TimelineComponent';
import { ResourceData, EventData } from '../constants';
import { useGetAllSharedResourceQuery, useGetCustomEventLazyQuery, useGetCustomEventQuery, useGetProjectsQuery } from '@app/models'
import { random } from 'cypress/types/lodash';

const RoasterManagement: React.FC = () => {
  const { data, loading, error } = useGetAllSharedResourceQuery();

  const [resources, setResources] = React.useState<ResourceData[]>([]);
  const [resourceSchedule, setResourceSchedule] = React.useState <any>([]);
  const [resourceCustomEvents, setResourceCustomEvents] = React.useState<any>([]);
  const [calendarEvents, setCalendarEvents] = React.useState<EventData[]>([]);
  
  
  useGetProjectsQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setResourceSchedule(data?.project);
    },
  });
  
  const [getCustomEventQuery] = useGetCustomEventLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setResourceCustomEvents(data?.event);
    }
  })

  useEffect(() => {
    getCustomEventQuery();
  },[])

  useEffect(() => {
    const tempResource: any[] = [];
    const tempEvents: EventData[] = [];
    const tempCustomEvents: EventData[] = [];
    
    resourceSchedule?.map((scheduleData, index) => {
      tempEvents.push({
        title: scheduleData.projectName + ' - ' + scheduleData.businessUnit || '',
        start_time: moment(scheduleData?.slot.startDate).format('x'),
        end_time: moment(scheduleData?.slot.endDate).format('x'),
        group: scheduleData.resourcerequest.resource.employeeId,
        id: (index + 1),
        description: scheduleData.businessUnit??'',
        color: 'white',
        bgColor: '#4897D8',
        type: 'scheduledEvent',
        eventId: scheduleData.id,
        resourceId: 0
      })
    })

    resourceCustomEvents?.map((customEvent, index) => {
      tempCustomEvents.push({
        title: customEvent.eventName + ' - ' + customEvent.customEventType,
        start_time: moment(customEvent.startDate).format('x'),
        end_time: moment(customEvent.endDate).format('x'),
        group: customEvent.employee.employeeId,
        id: Math.random(),
        description: customEvent.description,
        color: 'white',
        bgColor: '#FA6E59',
        type: 'customEvent',
        eventId: customEvent.id,
        resourceId: customEvent.employee.id
      })

    })

    setCalendarEvents([...tempEvents, ...tempCustomEvents]);
    data?.sharedResource!.map((resource, index) => {
      tempResource.push({
        id: resource?.employeeId,
        title: resource?.firstName + ' ' + resource?.lastName,
        employeeId: resource?.employeeId,
        resourceId: resource?.id
      })
    })
    setResources(tempResource)
  }, [data, resourceSchedule,resourceCustomEvents ])
  
  return (
    <>
      <PageTitle title={"Calendars"} />
      <TimelineComponent
        calendarEvents={calendarEvents}
        resources={resources}
        getCustomEventQuery={getCustomEventQuery}
      />
    </>
  )
};

export default RoasterManagement;