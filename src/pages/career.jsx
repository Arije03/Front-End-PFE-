import React, { useEffect, useState } from 'react';
import { Typography, List, Box, ListItem, ListItemText, Button, TextField, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import WorkIcon from '@mui/icons-material/WorkOutline';
import Navbarjobseeker from '../components/navbarjobseeker';
import { toast } from 'react-toastify';

function Career() {
  const [jobOffers, setJobOffers] = useState([]);
  const [expandedJobIndex, setExpandedJobIndex] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applyFormValues, setApplyFormValues] = useState({ name: '', email: '', message: '' });
  const [selectedDomain, setSelectedDomain] = useState('');
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [domainFilter, setDomainFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  
  const [cvFile, setCvFile] = useState(null);
  const offersPerPage = 2;
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
    user_id: localStorage.getItem('id'),
    job_offer_id: '',
    text: '',
    salary: '',
  });
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios
      .get('/api/view_job_offers')
      .then((response) => {
        setOffers(response.data.joboffers);
        console.log(response.data.joboffers);
      })
      .catch((error) => {
        console.error('Error fetching job offers:', error);
      });
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  useEffect(() => {
    // Récupérer les offres d'emploi depuis l'API
    axios.get('/api/view_job_offers')
      .then((response) => {
        const jobOffersData = response.data.joboffers;
        setJobOffers(jobOffersData);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des offres d\'emploi :', error);
      });
  }, []);

  const handleJobClick = (index) => {
    if (expandedJobIndex === index) {
      setExpandedJobIndex(null);
    } else {
      setExpandedJobIndex(index);
    }
  };

  const handleApplyClick = () => {
    setOpenApplyDialog(true);
  };

  const handleApplyDialogClose = () => {
    setOpenApplyDialog(false);
    // Reset form data when the dialog is closed
    setFormData({
      user_id: localStorage.getItem('id'),
      job_offer_id: '',
      text: '',
      salary: '',
    });
  };

 
  const handleSubmit = () => {
    axios
      .post('/api/create_job_application', formData)
      .then((response) => {
        console.log('Add Job Application successful:', response.data);
        // Optionally, you can handle success here, e.g., show a success message or redirect
        handleApplyDialogClose();
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          // Validation errors
          console.log('Validation Errors:', error.response.data.errors);
          // You can set these validation errors to your state and display them to the user
          setErrors(error.response.data.errors);
        } else {
          console.error('Error adding job application:', error);
          // Optionally, you can handle other errors here
        }
      });
  };

  
  
  
  
  
  
    
  return (
    <div>
      <Navbarjobseeker/>
      <div/>

        <header className="masthead">
          <div className="container mt-5">
            <div className="row">
              <div className="col text-center"></div>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '77vh',
                }}
              >
                  
                  <Box sx={{ width: '90%', height: '85vh', p: 6, border: '1px solid #ccc', borderRadius: '8px' }}> 
                  <Typography variant="h2" align="center" >Available Jobs</Typography>               
                    <Grid container spacing={2}>
                    {jobOffers
  .filter(offer => offer.domain === domainFilter || domainFilter === '')
  .filter(offer => offer.position === positionFilter || positionFilter === '')
  .slice((currentPage - 1) * offersPerPage, currentPage * offersPerPage)
  .map((offer, index) => (
                      <Grid item xs={12} key={index}>
  <Box sx={{ height: '30vh' ,  p: 2, border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' , mt: 2 }} onClick={() => handleJobClick(index)}>
  <Grid container alignItems="center">

  <Grid item>
    <WorkIcon color="white" fontSize="large" />
  </Grid>
  <Grid item>
    <Typography variant="h3" sx={{ mt: 2, ml: 2 }}>{offer.name_offer}</Typography>
  </Grid>
  </Grid>
    


    <Typography variant="body1" sx={{ mt: 2 }}>Details :</Typography>
    <Grid container spacing={2} alignItems="center">
  <Grid item xs={12} sm={8}>
    <Typography variant="body1">
      {offer.description}
    </Typography>
  </Grid>
  <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}> 
    <Button variant="contained" color="primary"  fullWidth sx={{ height: '50px' , width:'120px' }} 
     onClick={handleApplyClick}>
      Apply
    </Button>
  </Grid>
</Grid>
    <Typography variant="body 2" sx={{ mt: 2 }}>Experience needed : {offer.experience}</Typography>
    <Typography variant="body 2" sx={{ mt: 2 }}>Diploma  : {offer.diploma}</Typography>
    
      
      

    
            

  </Box>
  
</Grid>
                    ))}
                   
                   
                  </Grid>
                  
                </Box>
                
              </Box>
            </div>
           
          </div>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                       <Button
  disabled={currentPage === 1}
  onClick={() => setCurrentPage(currentPage - 1)}
>
  <ArrowBackIcon />
</Button>
<Button
  disabled={currentPage === Math.ceil(jobOffers.length / offersPerPage)}
  onClick={() => setCurrentPage(currentPage + 1)}
>
  <ArrowForwardIcon />
</Button>
<Typography>
  Page {currentPage} sur {Math.ceil(jobOffers.length / offersPerPage)}
</Typography>
</Grid>
        </header>
        
      

      {/* Formulaire de candidature */}
      <Dialog open={openApplyDialog} onClose={handleApplyDialogClose} fullWidth>
        <DialogTitle>Apply to Job</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Job Offer</InputLabel>
                  <Select
                    value={formData.job_offer_id}
                    onChange={(e) =>
                      setFormData({ ...formData, job_offer_id: e.target.value })
                    }
                  >
                    {offers.map((offer) => (
                      <MenuItem key={offer.id} value={offer.id}>
                        {offer.name_offer}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="text"
                  label="Application Text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="salary"
                  label="Salary"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApplyDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
   
  </div>
  );
}

export default Career;