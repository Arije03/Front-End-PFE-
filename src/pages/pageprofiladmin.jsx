import { Typography, Card, CardContent, Grid, Avatar, Button } from '@mui/material';
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import PersonIcon from '@mui/icons-material/Person';
import React, { useEffect, useState } from 'react';
import Topbar from '../scenes/global/Topbar';
import {  Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const styles = {
  card: {
    maxWidth: 600,
    margin: '0 auto',
    marginTop: 40,
    padding: 20,
    textAlign: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
  },
};

const Pageprofiladmin = () => {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = localStorage.getItem('id');
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

  const getStatusIcon = () => {
    if (user.status === 'Admin') {
      return <SupervisorAccountOutlinedIcon />;
    }
    return null;
  };

 

  if (!user) {
    return <div>Loading...</div>;
  }
  const handleEditProfile = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="root">
      <Topbar/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Card style={styles.card}>
          <CardContent>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item>
              <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`https://t3.ftcdn.net/jpg/02/68/56/00/360_F_268560006_F2fIixDnlVRNGwCyne9EMQJhaAxalKTq.webp`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" style={styles.title}>
                  Profile
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">First Name: {user.last_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Last Name: {user.first_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">E-mail: {user.email}</Typography>
              </Grid>
              <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleEditProfile}>
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogContent>
          <TextField label="First Name" fullWidth />
          <TextField label="Last Name" fullWidth />
          <TextField label="E-mail" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}  sx={{color:'red'}}>Cancel</Button>
          <Button onClick={handleCloseDialog} sx={{color:'green'}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
};

export default Pageprofiladmin;