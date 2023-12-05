import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/header";
import { tokens } from "../theme";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Dash_Sidebar from "./Dash_Sidebar";
import Dash_Stat from "./Dash_Stat";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    
    <Box sx={{ display: 'flex' }}>
     
      <Box sx={{ flex: 0 }}><Dash_Sidebar/></Box>
      <Box sx={{ flex: 1 }}><Dash_Stat/></Box>
    </Box>
  
  
     
       
      
     
     
      
    

);
 };
export default Dashboard ;