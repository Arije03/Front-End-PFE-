import { Box, Typography, useTheme, IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import Topbar from "../scenes/global/Topbar";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// Import des icônes nécessaires

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { tokens } from "../scenes/theme";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Managechef = () => {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [mockDataTeam, setMockDataTeam] = useState([]); // State to hold the fetched data
    
    const [selectedChef, setSelectedChef] = useState(null);
   
  
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
 
  
 
  const [newChef, setNewChef] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Handler to open the "Add Off" dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
    setSelectedChef(null);
    setNewChef({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
  };
    useEffect(() => {
     
      
      axios.get('/api/view_chefs')
        .then(response => {
          setMockDataTeam(response.data.chefs);
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
       
    }, []);
  
    
    const handleAddChef = () => {
      
      axios.post('/api/create_chef', newChef)
    .then(response => {
      console.log('Chef Department created:', response.data);
      toast.success('Chef Department record created successfully');
      
      // Fetch the updated list of offs from the server
      axios.get('/api/view_chefs')
        .then(response => {
          setMockDataTeam(response.data.chefs);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      
      setOpenAddDialog(false);
      setSelectedChef(null);
      setNewChef({
        first_name: "",
      last_name: "",
      email: "",
      password: "",
      });
    })
    .catch(error => {
      console.error('Error creating Chef:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Error creating Chef');
      }
    });
    };
    const handleDeleteConfirmation = (chef) => {
      setSelectedChef(chef); // Set the selected off for deletion
      setConfirmDeleteOpen(true);
    };
  
  const handleDelete = (id) => {
      axios
        .delete(`/api/delete_chef/${id}`)
        .then((response) => {
          console.log("Delete successful:", response.data.message);
          toast.success('Chef Department record deleted successfully');
  
          
          axios.get('/api/view_chefs')
            .then(response => {
              setMockDataTeam(response.data.chefs);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
          toast.error('Error deleting chef Department account');
        });
  
      setConfirmDeleteOpen(false);
    };
  
   
  
   
  
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 }, 
        
          {
            field: "first_name",
            headerName: "First Name",
            flex: 1,
          },
          {
            field: "last_name",
            headerName: "Last Name",
            flex: 1,
          },
          {
            field: "email",
            headerName: "Email",
            flex: 1,
          },
         
         
           // Action buttons
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
         
          <IconButton
             onClick={() => handleDeleteConfirmation(params.row)}
            aria-label="Delete"
            style={{ color: 'red' }}
          >
            <DeleteOutlinedIcon />
          </IconButton>
          
        </Box>
      ),
    },
         
        
         
        ];
    return(
        <Box m="20px">
                <Topbar/>

          <Header title="HEAD OF DEPARTEMENT" subtitle="Managing heads of departement's accounts" />
          <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
            
          }}>
            
          <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} components={{ Toolbar: GridToolbar }}/>
         
          <Box mt={2} textAlign="right">

          <Button
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            
            onClick={handleOpenAddDialog}
            color="secondary"
          >
            Add account
          </Button>
        </Box>
       
        <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle sx={{ fontSize: '1.3rem' }}>
          Delete Chef Department account</DialogTitle>
          <DialogContent sx={{  fontFamily: 'Arial' }}>
          <p>Are you sure you want to delete this account?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} sx={{ backgroundColor: '#ff0000', color: '#ffffff' }}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete(selectedChef.id);
            }}
            variant="contained"
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="50px" >
  <DialogTitle sx={{ fontSize: '1.3rem' }}>Add Chef</DialogTitle>
  <DialogContent>
    <form style={{ minWidth: '150px' }}>
      <TextField
        label="First Name"
        fullWidth
        type="text"
        value={newChef.first_name}
        onChange={(e) =>
          setNewChef({
            ...newChef,
            first_name: e.target.value,
          })
        }
      />

      <TextField
        label="Last Name"
        fullWidth
        type="text"
        value={newChef.last_name}
        onChange={(e) =>
          setNewChef({
            ...newChef,
            last_name: e.target.value,
          })
        }
      />
      <TextField
        label="Email"
        fullWidth
        type="email"
        value={newChef.email}
        onChange={(e) =>
          setNewChef({
            ...newChef,
            email: e.target.value,
          })
        }
      />
      <TextField
        label="Password"
        fullWidth
        type="password"
        value={newChef.password}
        onChange={(e) =>
          setNewChef({
            ...newChef,
            password: e.target.value,
          })
        }
      />
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenAddDialog(false)} sx={{ backgroundColor: '#ff0000', color: '#ffffff' }}>
      Cancel
    </Button>
    <Button onClick={handleAddChef} variant="contained" color="primary">
      Add
    </Button>
  </DialogActions>
</Dialog>
       
      
      
          </Box>
          <ToastContainer
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      </Box>
      
      
      )

};

export default Managechef;