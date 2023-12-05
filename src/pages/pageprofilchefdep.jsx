
import { Typography, Card, CardContent, Grid, Avatar } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar";
import {  Dialog, DialogTitle, DialogContent, DialogActions, TextField , Button} from '@mui/material';
import Navbarchefdep from '../components/navbarchefdep';
import axios from 'axios';
import swal from "sweetalert";

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

const Pageprofilchefdep = () => {
 /*  const user = {
    status: 'jobseeker',
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Gestionnaire de ressources humaines',
    phoneNumber: '1234567890',
  }; */

  const [user, setUser] = useState({
   first_name: " ",
    last_name: " ",
   
    email: " ",
 
  });

  const {first_name,  last_name,  email, } = user;
  const [openDialog, setOpenDialog] = useState(false);

  
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
  const updateUser = async (e) => {
    console.log(user);
    e.preventDefault();
    const id = localStorage.getItem('id');
    await axios.put(`http://127.0.0.1:8000/api/update-user/${id}`, user, {
    
    });
    handleCloseDialog ();
    // show success message
    swal("Success","success");
   
  };
  const loadClient = async () => {
    const id = localStorage.getItem('id');
    const res = await axios
      .get(`http://127.0.0.1:8000/api/edit-user/${id}`)
      .then((result) => {
        setUser({
          id: id,
          update: true,
          first_name: result.data.user.first_name,
         last_name: result.data.user.last_name,
        
          email: result.data.user.email,
         
        });
        console.log("result", result);
      });
  };

  
  

  if (!user) {
    return <div>Loading...</div>;
  }

  const getStatusIcon = () => {
    if (user.status === 'Job seeker') {
      return <WorkIcon />;
    }
    return null;
  };
  const handleEditProfile = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div className="root">
    <Navbarchefdep/>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Card style={styles.card}>
          <CardContent>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item>
              <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="data:image/jpeg;base64,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"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />              </Grid>
             
             <Grid item xs={12}>
  <Typography variant="h4" style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '16px', color: '#999' }}>
    My Profile
  </Typography>
</Grid>
<Grid item xs={12}>
  <Typography variant="body1" style={{ fontSize: '16px', marginBottom: '8px' }}>
    <span style={{ fontWeight: 'bold', marginRight: '8px' }}>First Name:</span> {user && user.last_name}
  </Typography>
</Grid>
<Grid item xs={12}>
  <Typography variant="body1" style={{ fontSize: '16px', marginBottom: '8px' }}>
    <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Last Name:</span> {user && user.first_name}
  </Typography>
</Grid>
<Grid item xs={12}>
  <Typography variant="body1" style={{ fontSize: '16px', marginBottom: '8px' }}>
    <span style={{ fontWeight: 'bold', marginRight: '8px' }}>E-mail:</span> {user.email}
  </Typography>
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
  <DialogTitle style={{ fontSize: '24px' }}>Edit Profile</DialogTitle>
  <DialogContent>
    <form>
      <TextField
        name="first_name"
        value={first_name}
        onChange={(e) => onInputChange(e)}
        label="First Name"
        fullWidth
      />
      <TextField
        label="Last Name"
        fullWidth
        name="last_name"
        value={last_name}
        onChange={(e) => onInputChange(e)}
      />
      <TextField
        label="Email"
        fullWidth
        name="email"
        value={email}
        onChange={(e) => onInputChange(e)}
      />
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} style={{ color: 'red' }}>
      Cancel
    </Button>
    <Button onClick={updateUser} color="primary" style={{ color: 'green' }}>
      Save
    </Button>
  </DialogActions>
</Dialog>
      
    </div>
  );
};

export default Pageprofilchefdep;