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


const Departement = () => {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [mockDataTeam, setMockDataTeam] = useState([]); // State to hold the fetched data
    
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [editingOff, setEditingOff] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
 const [openEditDialog, setOpenEditDialog] = useState(false); 
 const [chefs, setChefs] = useState([]);
  const [employeesInSelectedDepartment, setEmployeesInSelectedDepartment] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    
    name_department: "",
    user_id:"",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Handler to open the "Add Off" dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
    setSelectedDepartment(null);
    setNewDepartment({
      
      name_department: "",
      user_id:"",
    });
  };
    useEffect(() => {
     
      
      axios.get('/api/view_departments')
        .then(response => {
          setMockDataTeam(response.data.departments);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
        axios
    .get("/api/view_chefs")
    .then((response) => {
      setChefs(response.data.chefs);
      
      
    })
    .catch((error) => {
      console.error("Error fetching chefs:", error);
    });
       
    }, []);

   
    const handleAddDepartment = () => {
      
      axios.post('/api/create_department', newDepartment)
    .then(response => {
      console.log('Department created:', response.data);
      toast.success('Department record created successfully');
      
      // Fetch the updated list of offs from the server
      axios.get('/api/view_departments')
        .then(response => {
          setMockDataTeam(response.data.departments);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      
      setOpenAddDialog(false);
      setSelectedDepartment(null);
      setNewDepartment({
       
        name_department: "",
        user_id:"",
      });
    })
    .catch(error => {
      console.error('Error creating Department:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Error creating Department');
      }
    });
    };
   
      
    const handleDeleteConfirmation = (department) => {
      setSelectedDepartment(department); // Set the selected off for deletion
      setConfirmDeleteOpen(true);
    };
  
    const handleDelete = (id) => {
      axios
        .delete(`/api/delete_department/${id}`)
        .then((response) => {
          console.log("Delete successful:", response.data.message);
          toast.success('Department record deleted successfully');
  
          // Fetch the updated list of offs from the server
          axios.get('/api/view_departments')
            .then(response => {
              setMockDataTeam(response.data.departments);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
          toast.error('Error deleting off');
        });
  
      setConfirmDeleteOpen(false); // Close the confirmation dialog
    };
   

    const getChefName = (params) => {
      return params.row.user.first_name;
    };
  
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 }, 
       
        {
          field: "name_department",
          headerName: "Department",
          flex: 1,
         
        },
        {
          field: "chefName",
          headerName: "Department Chef",
          flex: 1,
          valueGetter: getChefName,
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
          <Header title="DEPARTEMENT" subtitle="Managing Departements" />
          
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
            Add Department
          </Button>
        </Box>
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Department</DialogTitle>
        <DialogContent>
          <form>
           
            <TextField
              label="Department name"
              fullWidth
              type="text"
              value={newDepartment.name_department}
              onChange={(e) =>
                setNewDepartment({
                  ...newDepartment,
                  name_department: e.target.value,
                })
              }
            />
           <FormControl fullWidth>
          <InputLabel>Department Chefs</InputLabel>
          <Select
            value={newDepartment.user_id}
            onChange={(e) => setNewDepartment({ ...newDepartment, user_id: e.target.value })}
          >
            {chefs.map((chef) => (
              <MenuItem key={chef.id} value={chef.id}>
                {chef.first_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
           
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddDepartment}
            variant="contained"
            color="primary"
          >
            Add Department
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle sx={{ fontSize: '1.3rem' }}>
          Delete Department</DialogTitle>
          <DialogContent sx={{  fontFamily: 'Arial' }}>
          <p>Are you sure you want to delete this department?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} sx={{ backgroundColor: '#ff0000', color: '#ffffff' }}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete(selectedDepartment.id);
            }}
            variant="contained"
            color="primary"
          >
            Delete
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

export default Departement;