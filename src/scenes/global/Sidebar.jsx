import { useState,useEffect } from "react";
import { Sidebar} from "react-pro-sidebar";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";

import axios from "axios";
import swal from "sweetalert";
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';





const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[500],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
    );
  };

const MySidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
  const logoutSubmit=(e)=>{
    e.preventDefault();
    axios.post(`/api/logout`).then(res=>{
      localStorage.removeItem("token");
      swal("Success",res.data.message,"success");
      navigate('/login');
    })
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {

        const id = localStorage.getItem('id'); // Retrieve the 'id' from localStorage
        const response = await fetch(`http://localhost:8000/api/edit-user/${id}`);
                const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);
    return (
        <Box
      sx={{
        "& .pro-sidebar-inner": {
          backgroundColor:`${colors.primary[400]} !important`,
          
        },
        "& .pro-icon-wrapper": {
          backgroundColor: `${colors.primary[400]} !important`,
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
      
    >
        <Sidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
             {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                 <Typography variant="h3" color={colors.blueAccent[800]}>
                  GoWork
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>

              </Box>
             )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`https://t3.ftcdn.net/jpg/02/68/56/00/360_F_268560006_F2fIixDnlVRNGwCyne9EMQJhaAxalKTq.webp`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
               
                  variant="h2"
                  color={colors.blueAccent[700]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                 {user && user.first_name} {user && user.last_name}
                </Typography>
                <Typography  style={{color:"black"}} variant="h5" >
                {user && user.user_type}
                </Typography>
              </Box>
            </Box>
          )}
           <Box paddingLeft={isCollapsed ? undefined : "10%"}>
           
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.blueAccent[800]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
         

            <Item
              title="Manage Team"
             to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Manage Departements"
             to="/departement"
              icon={< MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Accounts"
             to="/managechef"
              icon={<AccountCircleIcon  />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.blueAccent[800]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Career"
              to="/admincareer"
              icon={<AssignmentIcon  />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Absences"
              to="/timer"
              icon={<EventBusyIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Days Off"
              to="/off"
              icon={<LocalFloristIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Typography
              variant="h6"
              color={colors.blueAccent[800]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
             <Typography
              variant="h6"
              color={colors.blueAccent[800]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Logout
            </Typography>
            
            <Tooltip title="Logout" sx={{ mt: 1,ml:2.5 }}>
            <IconButton onClick={logoutSubmit} >
            <LogoutIcon />
            </IconButton>
          </Tooltip>
          </Box>
          </Menu> 
         </Sidebar>
    </Box>
    );
};
export default MySidebar;  