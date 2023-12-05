import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid, Avatar, Button } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import swal from "sweetalert";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Navbarjobseeker from '../components/navbarjobseeker';



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
  buttonIcon: {
    marginRight: 5,
  },
  buttonLabel: {
    textTransform: 'none',
  },
  root: {
    minHeight: '100vh',
  },
};

const Pageprofiljobseeker = () => {
 /* const user = {
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
    if (user.status === 'job seeker') {
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
    <div>
      <Navbarjobseeker/>
    </div>
    
      <div className="headerContainer">
        <header className="masthead">
          <div className="container mt-5">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <Card style={{ width: '500px', height: '460px' }}>
                <Card style={styles.card}>
                  <CardContent>
                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                      <Grid item>
                      <Grid item>
              <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="https://img.freepik.com/free-photo/nice-pretty-red-haired-girl-with-red-lips-two-braids-charming-smile-shows-white-healthy-teeth-dressed-stripped-t-shirt-isolated_295783-2164.jpg"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />              </Grid>                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4" style={styles.title}>
                          Profile
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1">Last Name: {user.last_name}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1">First Name: {user.first_name}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1">E-mail: {user.email}</Typography>
                      </Grid>
                      
                      <Grid item xs={12}>
              <Button variant="contained" style={{ backgroundColor: "#BC9E82", color: "#ffffff" }} onClick={handleEditProfile}>
                  Edit Profile
                </Button>
              </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Card>
            </div>
          </div>
        </header>
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

export default Pageprofiljobseeker;