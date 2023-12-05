import { Box, Typography, useTheme, IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem} from "@mui/material";

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
import Topbar from "../scenes/global/Topbar";


const Off = () => {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [mockDataTeam, setMockDataTeam] = useState([]); // State to hold the fetched data
    
    const [selectedOff, setSelectedOff] = useState(null);
    const [editingOff, setEditingOff] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
 const [openEditDialog, setOpenEditDialog] = useState(false); 
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [employeesInSelectedDepartment, setEmployeesInSelectedDepartment] = useState([]);
  const [newOff, setNewOff] = useState({
    employee_id: "",
    start_date: "",
    end_date: "",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Handler to open the "Add Off" dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
    setSelectedDepartment(null);
    setNewOff({
      employee_id: "",
      start_date: "",
      end_date: "",
    });
  };
    useEffect(() => {
     
      
      axios.get('/api/view_offs')
        .then(response => {
          setMockDataTeam(response.data.offs);
          console.log(response.data.offs);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
        axios.get('/api/view_departments')
        .then(response => {
          setDepartments(response.data.departments);
        })
        .catch(error => {
          console.error('Error fetching departments:', error);
        });
    }, []);
    const getEmployeeName = (params) => {
      return params.row.employee.name;
    };
     const getDepartmentName = (params) => {
      return params.row.employee.departement.name_department;
    };
    const fetchEmployeesByDepartment = (departmentId) => {
      axios.post('/api/view_employees_by_department', { departement_id: departmentId })
        .then(response => {
          setEmployeesInSelectedDepartment(response.data.employees);
        })
        .catch(error => {
          console.error("Error fetching employees by department:", error);
        });
    };
    
    const handleAddOff = () => {
      
      axios.post('/api/create_off', newOff)
    .then(response => {
      console.log('Off created:', response.data);
      toast.success('Off record created successfully');
      
      // Fetch the updated list of offs from the server
      axios.get('/api/view_offs')
        .then(response => {
          setMockDataTeam(response.data.offs);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      
      setOpenAddDialog(false);
      setSelectedDepartment(null);
      setNewOff({
        employee_id: "",
        start_date: "",
        end_date: "",
      });
    })
    .catch(error => {
      console.error('Error creating off:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Error creating off');
      }
    });
    };
    const handleDeleteConfirmation = (off) => {
      setSelectedOff(off); // Set the selected off for deletion
      setConfirmDeleteOpen(true);
    };
  
    const handleDelete = (id) => {
      axios
        .delete(`/api/delete_off/${id}`)
        .then((response) => {
          console.log("Delete successful:", response.data.message);
          toast.success('Off record deleted successfully');
  
          // Fetch the updated list of offs from the server
          axios.get('/api/view_offs')
            .then(response => {
              setMockDataTeam(response.data.offs);
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
  
    const handleOpenEditDialog = (off) => {
      setEditingOff(off); // Set the off to be edited
      setOpenEditDialog(true); // Open the edit dialog
    };
  
    const handleEditOff = () => {
      axios.put(`/api/update_off/${editingOff.id}`, editingOff)
        .then(response => {
          console.log('Off updated:', response.data);
          toast.success('Off record updated successfully');
  
          // Fetch the updated list of offs from the server
          axios.get('/api/view_offs')
            .then(response => {
              setMockDataTeam(response.data.offs);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
  
          setOpenEditDialog(false); // Close the edit dialog
          setEditingOff(null); // Reset the editing off
        })
        .catch(error => {
          console.error('Error updating off:', error);
          if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
          } else {
            toast.error('Error updating off');
          }
        });
    };
  
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 }, 
        {
          field: "employeeName",
          headerName: "Employee",
          flex: 1,
          valueGetter: getEmployeeName,
        },
         
        {
          field: "departmentName",
          headerName: "Department",
          flex: 1,
          valueGetter: getDepartmentName,
        },
         
          {
            field: "start_date",
            headerName: "start Date",
            flex: 1,
          },
          {
            field: "end_date",
            headerName: "End Date",
            flex: 1,
          },
          {
            field: "days_number",
            headerName: "Days Number",
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
           onClick={() => handleOpenEditDialog(params.row)}
            aria-label="Edit"
          >
            <EditOutlinedIcon />
          </IconButton>
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
          <Header title="OFF" subtitle="Managing Days OFF" />
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
            Add Off
          </Button>
        </Box>
        <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle sx={{ fontSize: '1.3rem' }}>
          Delete Off</DialogTitle>
          <DialogContent sx={{  fontFamily: 'Arial' }}>
          <p>Are you sure you want to delete this off?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} sx={{ backgroundColor: '#ff0000', color: '#ffffff' }}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete(selectedOff.id);
            }}
            variant="contained"
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle sx={{ fontSize: '1.3rem' }}>Edit Off</DialogTitle>
        <DialogContent>
          <form>
           
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} sx={{ backgroundColor: '#ff0000', color: '#ffffff' }}>Cancel</Button>
          <Button
            onClick={handleEditOff}
            variant="contained"
            color="primary"
          >
            Update Off
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="50px" >
  <DialogTitle sx={{ fontSize: '1.3rem' }}>Add Off</DialogTitle>
  <DialogContent>
    <form style={{ minWidth: '150px' }}>
      <FormControl fullWidth>
        <InputLabel>Department</InputLabel>
        <Select
          value={selectedDepartment}
          onChange={(e) => {
            setSelectedDepartment(e.target.value);
            fetchEmployeesByDepartment(e.target.value);
          }}
        >
          {departments.map((department) => (
            <MenuItem key={department.id} value={department.id}>
              {department.name_department}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedDepartment && (
        <FormControl fullWidth>
          <InputLabel>Employee</InputLabel>
          <Select
            value={newOff.employee_id}
            onChange={(e) =>
              setNewOff({
                ...newOff,
                employee_id: e.target.value,
              })
            }
          >
            {employeesInSelectedDepartment.map((employee) => (
              <MenuItem key={employee.id} value={employee.id}>
                {employee.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <TextField
        label="Start Date"
        fullWidth
        type="date"
        value={newOff.start_date}
        onChange={(e) =>
          setNewOff({
            ...newOff,
            start_date: e.target.value,
          })
        }
      />

      <TextField
        label="End Date"
        fullWidth
        type="date"
        value={newOff.end_date}
        onChange={(e) =>
          setNewOff({
            ...newOff,
            end_date: e.target.value,
          })
        }
      />
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenAddDialog(false)} sx={{ backgroundColor: '#ff0000', color: '#ffffff' }}>
      Cancel
    </Button>
    <Button onClick={handleAddOff} variant="contained" color="primary">
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

export default Off;