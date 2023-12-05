import React, { useEffect, useState } from 'react';

import axios from "axios";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Box, Button, IconButton, ListItemIcon,  Menu, MenuItem, Select,  Toolbar,  Typography } from "@mui/material";
import { Link} from "react-router-dom";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";

function Navbarjobseeker() {
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
GOWORK
</Typography>
  
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
      <Typography variant="h4" color="inherit" underline="none" sx={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '50px' }}>
    
        Home
      </Typography>
    </Link>
    <Link to="/career" style={{ textDecoration: 'none' }}>
      <Typography variant="h4" color="inherit" underline="none" sx={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '50px' }}>
    
        Career
      </Typography>
    </Link>
    <Link to="/history" style={{ textDecoration: 'none' }}>
      <Typography variant="h4" color="inherit" underline="none" sx={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '50px' }}>
    
        Applications
      </Typography>
    </Link>
        <div style={{ marginLeft: '50px' }}>
          <Avatar
            style={{ cursor: "pointer" }}
            onClick={handleMenuOpen}
            src="https://img.freepik.com/free-photo/nice-pretty-red-haired-girl-with-red-lips-two-braids-charming-smile-shows-white-healthy-teeth-dressed-stripped-t-shirt-isolated_295783-2164.jpg"
            alt="job seeker"
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled >{user && user.first_name} {user && user.last_name}</MenuItem>
            <MenuItem component={Link} to="/pageprofiljobseeker" >profile</MenuItem>
            <MenuItem onClick={logoutSubmit}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    
  </Toolbar>
</AppBar>

  );
}

export default Navbarjobseeker;