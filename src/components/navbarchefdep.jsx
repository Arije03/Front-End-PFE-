import React, { useEffect, useState } from 'react';
import axios from "axios";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Box, Button, IconButton, ListItemIcon,  Menu, MenuItem, Select,  Toolbar,  Typography } from "@mui/material";
import { Link} from "react-router-dom";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";
import Notification from "./notification";
function Navbarchefdep() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const logoutSubmit=(e)=>{
    e.preventDefault();
    axios.post(`/api/logout`).then(res=>{
      localStorage.removeItem("token");
      localStorage.removeItem("id");
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
<AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'Arial, sans-serif', fontSize: '20px', letterSpacing: '1px' }}>
  GoWork
</Typography>
  
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
      <Typography variant="h4" color="inherit" underline="none" sx={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '50px' }}>
    
        Home
      </Typography>
    </Link>
    <Link to="/historychefdep" style={{ textDecoration: 'none' }}>
      <Typography variant="h4" color="inherit" underline="none" sx={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '50px' }}>
    
        Applications
      </Typography>
      
    </Link>
        <div style={{ marginLeft: '50px' }}>
          <Avatar
            style={{ cursor: "pointer" }}
            onClick={handleMenuOpen}
            src="data:image/jpeg;base64,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"
            alt="job seeker"
          />
         
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>{user && user.first_name} {user && user.last_name}</MenuItem>
            <MenuItem component={Link} to="/pageprofilchefdep" >profile</MenuItem>
            <MenuItem onClick={logoutSubmit}>Logout</MenuItem>
          </Menu>
          <Notification/>
        </div>
      </div>
    
  </Toolbar>
</AppBar>

  );
}

export default Navbarchefdep;