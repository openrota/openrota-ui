import PageTitle from '@app/components/PageTitle/PageTitle';
import moment from 'moment';
import React, { useEffect } from 'react';
import TimelineComponent from './TimelineComponent';
import { ResourceData } from '../constants';
import { useGetAllSharedResourceQuery, useGetSharedResourceByEmailIdLazyQuery, useGetSrByIdQuery, useProjectsByResourceQuery } from '@app/models'
import { useAuth } from '@app/context';

const MySchedule: React.FC = () => {
  const auth = useAuth();
  const [resources, setResources] = React.useState<any[]>([]);
  const [resourceSchedule, setResourceSchedule] = React.useState <any>([]);
  const [calendarEvents, setCalendarEvents] = React.useState<any[]>([]);
  const [srById, setSrById] = React.useState<any>([])

  const [getSRByMail, { loading: SrbyMailLoading, data: srByMail }] = useGetSharedResourceByEmailIdLazyQuery();
  useGetSrByIdQuery({
    skip: !srByMail,
    variables: { id: srByMail?.sharedResourceByEmailId?.id },
    onCompleted: (data) => {
      setSrById(data.sharedResourceById?? [] as any)
    }
  });
 
  useEffect(() => {
    auth?.getUserInfo().then(obj => {
      getSRByMail({ 
        variables: { emailId: obj['email'] }
      });
    });
  },[]);

  useProjectsByResourceQuery({
    fetchPolicy: 'network-only',
    variables: {id: srById.id},
    onCompleted: (data) => {
      setResourceSchedule(data?.projectsByResource);
    },
  });

  useEffect(() => {
    const tempResource: any[] = [];
    const tempEvents: any[] = [];
    
    resourceSchedule?.map((scheduleData, index) => {
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
    tempResource.push({
      id: srById?.employeeId,
      title: srById?.firstName + ' ' + srById?.lastName,
      rightTitle: srById?.skillSet?.join(', '),
      employeeId: srById?.employeeId
    })
    setResources(tempResource)
  }, [ srById, resourceSchedule])

  return (
    <>
      <PageTitle title={"My Schedule"} />
      <TimelineComponent
        calendarEvents={calendarEvents}
        resources={resources}
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