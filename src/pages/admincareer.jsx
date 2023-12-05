import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Header from "../components/header";
import Topbar from "../scenes/global/Topbar";
import { Container, Typography,IconButton, List, ListItem, ListItemText, Button, Box, Pagination, DialogActions, Dialog, DialogTitle, DialogContent, DialogContentText, TextField,Grid ,Card, CardContent, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';


const CardWrapper = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  background: 'transparent',
  marginBottom: theme.spacing(2),
  color: '#000',
  fontFamily: 'Arial',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  border: '1px solid #fff',
  width: '100%', // Stretch the card across the entire width
}))



const Admincareer = () => {
  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [offerInput, setOfferInput] = useState({
   
  });
  //const [offerInput, setOfferInput] = useState({});
  const { id } = useParams();
  const jobsPerPage = 4; // Define the number of items per page
  const [page, setPage] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
const [editDialogOpen, setEditDialogOpen] = useState(false);
const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    axios.get('/api/view_job_offers').then((response) => {
      const jobOffersFromApi = response.data.joboffers;
      setJobList(jobOffersFromApi);
    });
    axios.get("/api/view_departments")
    .then((response) => {
      setDepartments(response.data.departments);
      
      
    })
    .catch((error) => {
      console.error("Error fetching chefs:", error);
    });
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const startIndex = (page - 1) * jobsPerPage;
  const allJobsDisplayed = jobList.length <= startIndex + jobsPerPage;

  /*const handleOpenDialog = () => {
    setDialogOpen(true);
  };*/
  const handleOpenDialog = (job, mode) => {
    if (mode === 'create') {
      setCreateDialogOpen(true);
    } else if (mode === 'edit') {
      setEditingJob(job);
      setOfferInput({
        name_offer: job.name_offer,
        description: job.description,
        experience: job.experience,
        diploma: job.diploma,
        department_id: job.department_id,
      });
      setEditDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCreateOffer = () => {
    // Send a POST request to create the job offer
    axios.post('/api/create_job_offer', offerInput)
      .then((response) => {
        // Handle the response from the API, e.g., show a success message or update the job list
        const createdJob = response.data.data;
        setJobList([...jobList, createdJob]);
        toast.success('Job offer created successfully');
      })
      .catch((error) => {
        // Handle any errors from the API request
        toast.error('Failed to create job offer');
      });
  
    // Close the create dialog after creating the job offer
    setCreateDialogOpen(false);
  };
  const handleUpdateOffer = async () => {
    if (!editingJob) {
      toast.error('No job offer selected for editing');
      return;
    }
  
    try {
      // Send a PUT request to update the job offer
      const response = await axios.put(`/api/update_job_offer/${editingJob.id}`, offerInput);
  
      // Handle the response from the API, e.g., show a success message or update the job list
      const updatedJob = response.data.data;
      const updatedJobList = jobList.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      );
      setJobList(updatedJobList);
  
      // Show the success toast message after the data is updated
      toast.success('Job offer updated successfully');
  
      // Close the edit dialog after updating the job offer
      setEditDialogOpen(false);
    } catch (error) {
      // Handle any errors from the API request
      console.error('Error updating job offer:', error);
   
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferInput({
      ...offerInput,
      [name]: value,
    });
  };
  
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // State to store the ID of the job offer to be deleted
  const [jobToDeleteId, setJobToDeleteId] = useState(null);

  // Function to open the delete dialog
  const handleOpenDeleteDialog = (jobId) => {
    setJobToDeleteId(jobId);
    setDeleteDialogOpen(true);
  };

  // Function to close the delete dialog
  const handleCloseDeleteDialog = () => {
    setJobToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  // Function to handle job offer deletion
  const handleDeleteOffer = () => {
    // Call your Laravel API to delete the job offer using jobToDeleteId
    axios.delete(`/api/delete_job_offer/${jobToDeleteId}`)
      .then((response) => {
        // Check the response and handle success or error accordingly
        if (response.data.status === 200) {
          // Job offer deleted successfully
          // Remove the job from the jobList state
          const updatedJobList = jobList.filter((job) => job.id !== jobToDeleteId);
          setJobList(updatedJobList);
          toast.success('Job offer deleted successfully');
        } else {
          // Handle error
          toast.error(response.data.message || 'Failed to delete job offer');
        }
      })
      .catch((error) => {
        // Handle any errors from the API request
        console.error('Error deleting job offer:', error);
        toast.error('Failed to delete job offer');
      });

    // Close the delete dialog
    handleCloseDeleteDialog();
  };
  

  

  

  return (
    <Box m="20px">
      <Topbar />
        <Header />
        
        
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          visibility: jobList.length > 0 ? 'visible' : 'hidden',
        }}
      >
        
        <Box
          sx={{
            width: 1000,
            height: 600,
            p: 4,
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'auto',
          }}
        >
          <Typography variant="h3" align="center" gutterBottom sx={{fontSize: '1.9rem'}}>
            Job Offers
          </Typography>
          <Button
          
  type="submit"
  variant="contained"
  color="secondary" // Set the color to secondary
  onClick={() => setCreateDialogOpen(true)} 
  sx={{ marginLeft: 'auto' , display: 'flex',
  justifyContent: 'flex-end',
    }} >

  Create Job Offer
</Button>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
            <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  {jobList.map((job, index) => (
    <Card key={job.id}  sx={{ backgroundColor: '#333', marginBottom: '20px', width: '40%', marginRight: '30px', marginRight: '30px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <WorkIcon sx={{ fontSize: '1.5rem', color: '#fff', marginRight: '10px' }} />
          <Typography variant="h5" component="div" sx={{ fontSize: '1.5rem', color: '#fff' }}>
           Name Offer: {job.name_offer}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.0rem', color: '#fff' }}>
         Description: {job.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.0rem', color: '#fff' }}>
          Experience: {job.experience}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.0rem', color: '#fff' }}>
          Diploma: {job.diploma}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton>
            <EditIcon onClick={() => handleOpenDialog(job, 'edit')}/>
          </IconButton>
          <IconButton>
            <DeleteIcon style={{ color: 'red' }} onClick={() => handleOpenDeleteDialog(job.id)}/>
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  ))}
  
</List>
<Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogContent>
          Are you sure to delete this offer ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteOffer} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
</Box>
              
            

              <Box display="flex" justifyContent="center" mt={4}>
        
        
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
  count={Math.ceil(jobList.length / jobsPerPage)}
  page={page}
  onChange={handlePageChange}
  disabled={allJobsDisplayed} // Désactiver le bouton de la page suivante si toutes les offres d'emploi ont été affichées
/>
    </div>

          
             <ToastContainer
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

        </Box>

        
      </Box>
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <DialogTitle>Create Job Offer</DialogTitle>
        <DialogContent>
          {/* Form for creating a job offer */}
          <TextField
            name="name_offer"
            label="Name Offer"
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
            required
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
            required
          />
          <TextField
            name="experience"
            label="Experience"
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
            required
          />
          <TextField
            name="diploma"
            label="Diploma"
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
            required
          />
            <FormControl fullWidth>
          <InputLabel>Departments</InputLabel>
          <Select
              value={offerInput.department_id}
              onChange={(e) => {
                const selectedDepartmentId = e.target.value;
                setOfferInput({
                  ...offerInput,
                  department_id: selectedDepartmentId,
                });
              }}
              >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name_department}
              </MenuItem>
            ))}
         </Select>
        </FormControl>
          {/* Add more form fields for your job offer data */}
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setCreateDialogOpen(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleCreateOffer} color="primary">
      Add
    </Button>

        </DialogActions>
      </Dialog>
      
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
  <DialogTitle>Edit Job Offer</DialogTitle>
  <DialogContent>
    {/* Form for editing a job offer */}
    <TextField
      name="name_offer"
      label="Offer Name"
      fullWidth
      variant="outlined"
      margin="normal"
      onChange={handleInputChange}
      value={offerInput.name_offer}
      required
    />
    <TextField
      name="description"
      label="Description"
      fullWidth
      variant="outlined"
      margin="normal"
      onChange={handleInputChange}
      value={offerInput.description}
      required
    />
    <TextField
      name="experience"
      label="Experience"
      fullWidth
      variant="outlined"
      margin="normal"
      onChange={handleInputChange}
      value={offerInput.experience}
      required
    />
    <TextField
      name="diploma"
      label="Diploma"
      fullWidth
      variant="outlined"
      margin="normal"
      onChange={handleInputChange}
      value={offerInput.diploma}
      required
    />
    <FormControl fullWidth>
      <InputLabel>Departments</InputLabel>
      <Select
        name="department_id"
        value={offerInput.department_id || (editingJob ? editingJob.department_id : '')}
        onChange={(e) => {
          const selectedDepartmentId = e.target.value;
          setOfferInput({
            ...offerInput,
            department_id: selectedDepartmentId,
          });
        }}
      >
        {departments.map((department) => (
          <MenuItem key={department.id} value={department.id}>
            {department.name_department}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    {/* Add more form fields for your job offer data */}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setEditDialogOpen(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleUpdateOffer} color="primary">
      UpDate
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default Admincareer;