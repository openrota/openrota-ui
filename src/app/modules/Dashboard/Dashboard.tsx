import React from 'react';
import Box from '@mui/material/Box';
import CardComponent from './components/CardComponent';
import PageTitle from '@app/components/PageTitle/PageTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DashboardDto, useGetDashboardDataQuery } from '@app/models';

const Dashboard: React.FC = () => {

  const [dashboardData , setDashboardData] = React.useState<any>([]);
  useGetDashboardDataQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setDashboardData(data?.dashboard);
    }
  });

  return (
    <>
      <PageTitle title={"Dashboard"} />
      <div style={{marginLeft: '20px', borderBottom: '5px solid #1976d2', width:'300px'}}>
        <Typography variant="subtitle1" gutterBottom component="div" style={{fontSize: '24px'}}>
          Shared Resources
        </Typography>
      </div>
      <Box sx={{ display: 'flex', marginTop: '20px 0px' }}>
        <Grid container spacing={2}>
          <Grid item xs={3} >
            <CardComponent title={'Total Shared Resources'} count={dashboardData.sharedResourceDashboard?.totalSharedResources} innerStyle={'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))'}/>
          </Grid>
          <Grid item xs={3} >
            <CardComponent title={'Available Shared Resources'} count={dashboardData.sharedResourceDashboard?.availableSharedResources} innerStyle={'linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))'}/>
          </Grid>
          <Grid item xs={3} >
            <CardComponent title={'In-training'} count={dashboardData.sharedResourceDashboard?.unavailableSharedResources} innerStyle={'linear-gradient(195deg, rgb(236, 64, 122), rgb(216, 27, 96))'}/>
          </Grid>
        </Grid>
      </Box>
      <div style={{marginLeft: '20px', borderBottom: '5px solid #1976d2', width:'300px'}}>
        <Typography variant="subtitle1" gutterBottom component="div" style={{fontSize: '24px'}}>
          Resource Requests
        </Typography>
      </div>
      <Box sx={{ display: 'flex', marginTop: '20px 0px' }}>
        <Grid container spacing={2}>
          <Grid item xs={3} >
            <CardComponent title={'Total'} count={dashboardData.requestDashboard?.totalRequests} innerStyle={'linear-gradient(to right, #47808e, #00476e, #000c40)'}/>
          </Grid>
          <Grid item xs={3} >
            <CardComponent title={'Pending'} count={dashboardData.requestDashboard?.pendingRequests} innerStyle={'linear-gradient(to right, #16a085, #4bb176, #7fc060)'}/>
          </Grid>
          <Grid item xs={3} >
            <CardComponent title={'Approved'} count={dashboardData.requestDashboard?.completedRequests} innerStyle={'linear-gradient(to right, #ffa17f, #d17382, #90547c)'}/>
          </Grid>
          <Grid item xs={3} >
            <CardComponent title={'Rejected'} count={dashboardData.requestDashboard?.canceledRequests} innerStyle={'linear-gradient(to right, #873061, #bc124d, #dd1818)'}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export { Dashboard };
export default Dashboard;