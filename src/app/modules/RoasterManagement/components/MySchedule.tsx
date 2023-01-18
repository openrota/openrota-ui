import PageTitle from '@app/components/PageTitle/PageTitle';
import moment from 'moment';
import React, { useEffect } from 'react';
import TimelineComponent from './TimelineComponent';
import { CalendarType, EventData, ResourceData } from '../constants';
import { useGetAllSharedResourceQuery, useGetEventsbyResourceQuery, useGetSharedResourceByEmailIdLazyQuery, useGetSrByIdQuery, useProjectsByResourceQuery } from '@app/models'
import { useAuth } from '@app/context';

const MySchedule: React.FC = () => {
  const auth = useAuth();
  const [resources, setResources] = React.useState<any[]>([]);
  const [resourceSchedule, setResourceSchedule] = React.useState <any>([]);
  const [calendarEvents, setCalendarEvents] = React.useState<any[]>([]);
  const [resourceCustomEvents, setResourceCustomEvents] = React.useState<any>([]);
  const [srById, setSrById] = React.useState<any>([])

  const [getSRByMail, { loading: SrbyMailLoading, data: srByMail }] = useGetSharedResourceByEmailIdLazyQuery();

  useEffect(() => {
    auth?.getUserInfo().then(obj => {
      getSRByMail({ 
        variables: { emailId: obj['email'] },
      });
    });
  },[]);

  useGetSrByIdQuery({
    fetchPolicy: 'network-only',
    skip: !srByMail,
    variables: { id: srByMail?.sharedResourceByEmailId?.id },
    onCompleted: (data) => {
      setSrById(data.sharedResourceById?? [] as any)
    }
  });
  console.log('srByMail', srByMail)

  useProjectsByResourceQuery({
    fetchPolicy: 'network-only',
    variables: {id: srById.id},
    onCompleted: (data) => {
      setResourceSchedule(data?.projectsByResource);
    },
  });

  useGetEventsbyResourceQuery({
    fetchPolicy: 'network-only',
    skip: !srById,
    variables: {id: srById.id},
    onCompleted: (data) => {
      setResourceCustomEvents(data.eventsByResource);
    }
  })

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
    tempResource.push({
      id: srById?.employeeId,
      title: srById?.firstName + ' ' + srById?.lastName,
      rightTitle: srById?.skillSet?.join(', '),
      employeeId: srById?.employeeId
    })
    setResources(tempResource)
  }, [ srById, resourceSchedule, resourceCustomEvents])

  return (
    <>
      <PageTitle title={"My Schedule"} />
      <TimelineComponent
        calendarEvents={calendarEvents}
        resources={resources}
        calendarType={CalendarType.ResourceView}
      />
    </>
  )
};

export default MySchedule;



function getSRByMail(arg0: { variables: { emailId: any; }; }) {
  throw new Error('Function not implemented.');
}
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