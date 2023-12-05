import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/header";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import Topbar from "../global/Topbar";
import ProgressCircle from "../../components/ProgressCircle";
import { mockTransactions } from "../../data/mockData";
import axios from "axios";

const Dash_Stat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employees, setEmployees] = useState([]);
  const [seekers, setSeekers] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobss, setJobss] = useState([]);
  const [ jobapplication, setJobapplication] = useState([]);
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Fetch employees data from Laravel API
      axios.get('/api/view_employees') // Replace with your actual API endpoint
        .then((response) => {
          setEmployees(response.data.employees);
          
        })
        .catch((error) => {
          console.error('Error fetching employees:', error);
        });
  
      
      axios.get('/api/view_chefs') // Replace with your actual API endpoint
        .then((response) => {
          setChefs(response.data.chefs);
         

          setLoading(false); // Set loading to false when both requests are complete
        })
        .catch((error) => {
          console.error('Error fetching chefs:', error);
        });
        axios.get('/api/view_jobs_pending') // Replace with your actual API endpoint
        .then((response) => {
          setJobs(response.data.jobs);
         
          setLoading(false); // Set loading to false when both requests are complete
        })
        .catch((error) => {
          console.error('Error fetching chefs:', error);
        });
   
   axios.get('/api/view_jobs_accepted') 
    .then((response) => {
      setJobss(response.data.jobss);
      console.log(response.data.jobss);
     
      setLoading(false); // Set loading to false when both requests are complete
    })
    .catch((error) => {
      console.error('Error fetching chefs:', error);
    });
     axios.get('/api/view_seekers') // Replace with your actual API endpoint
    .then((response) => {
      setSeekers(response.data.seekers);
     
    })
    .catch((error) => {
      console.error('Error fetching employees:', error);
    });
    axios.get('/api/view_job_applications') 
    .then((response) => {
      setJobapplication(response.data.jobapplication);
      
    })
    .catch((error) => {
      console.error('Error fetching employees:', error);
    });
}, []);


    return(
<Box m="20px">
<div>
      <Topbar/>
    </div>
     
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
         {/* ROW 1 */}
         <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        <StatBox
            title={chefs.length.toString()}
            subtitle="Heads of departements"
           
            icon={
              <SupervisorAccountIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={employees.length.toString()}
            subtitle="Employees"
           
            icon={
              <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jobs.length.toString()}
            subtitle="Pending Applications"
            
            icon={
              <ScheduleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jobss.length.toString()}
            subtitle="Accepted Applications "
            
            icon={
              <CheckCircleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
         {/* ROW 2 */}
         <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
              Absence\OFF
              </Typography>
            
            </Box>
            
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
       <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Job seekers
            </Typography>
          </Box>
          {seekers.slice(0,4).map((seeker, i) => (
            <Box
              key={`${seeker.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {seeker.first_name}
                </Typography>
                <Typography color={colors.grey[100]}>
                {seeker.last_name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}> {seeker.created_at}</Box>
          
          </Box>
          ))} 
          </Box>
        {/* ROW 3 */}
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="10px"
        >
          <Typography variant="h5" fontWeight="600">
            Job Applications
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
  <ProgressCircle size="125" >
  
</ProgressCircle>
           <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {jobapplication.length.toString()} job applications
        </Typography> 
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 9"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Employees Number
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        
      </Box>
    </Box>
  );
};

    export default Dash_Stat ;
    