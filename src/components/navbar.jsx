import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import { Box as LogoBox } from '@mui/material';

import { AccountCircle } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Box, Button, IconButton, ListItemIcon,  Menu, MenuItem, Select,  Toolbar,  Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Link} from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const logoutSubmit=(e)=>{ 
    e.preventDefault();
    axios.post(`/api/logout`).then(res=>{
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      swal("Success",res.data.message,"success");
      navigate('/login');
    })
  }
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
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

  
  var loginButton ='';
    if(!localStorage.getItem("token")){
        loginButton=(
          <Link to="/login" style={{ textDecoration: 'none' }}>
      <Typography variant="h4" color="inherit" underline="none" sx={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '50px' }}>
    
        Login
      </Typography>
    </Link>)
    }else{
      loginButton=(
        <div></div>
      );
    }
    var SignupButton ='';
    if(!localStorage.getItem("token")){
        SignupButton=(
          <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Typography variant="h4" color="inherit" underline="none" sx={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '50px' }}>
        
            Sign Up
          </Typography>
        </Link>)
    }else{
      SignupButton=(
        <div></div>
      );
    }

  

 
   
   
  
      
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
    <Toolbar sx={{ justifyContent: 'space-between' }}>
   
    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'Arial, sans-serif', fontSize: '20px', letterSpacing: '1px' }}>
GoWork
</Typography>

      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
      <Typography variant="h4" color="inherit" underline="none" sx={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '50px' }}>
    
        Home
      </Typography>
    </Link>

    <Link to="/about" style={{ textDecoration: 'none' }}>
      <Typography variant="h4" color="inherit" underline="none" sx={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '50px' }}>
    
        About
      </Typography>
    </Link>

{loginButton}
{SignupButton}
</div>

    </Toolbar>
    
  </AppBar>


  );
}

export default Navbar;