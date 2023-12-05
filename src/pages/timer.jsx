import { Box, Typography, useTheme, IconButton, Button, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";

import { DataGrid, GridToolbar} from "@mui/x-data-grid";
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
import Topbar from "../scenes/global/Topbar";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Timer = () => {
  
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [mockDataTeam, setMockDataTeam] = useState([]); // State to hold the fetched data
    
    const [selectedAbsence, setSelectedAbsence] = useState(null);
    
  const [departments, setDepartments] = useState([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [employeesInSelectedDepartment, setEmployeesInSelectedDepartment] = useState([]);
  const [employeesForSelectedDepartment, setEmployeesForSelectedDepartment] = useState([]);
  const [newAbsence, setNewAbsence] = useState({
    employee_id: "",
    hours: "",
   
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedAbsence, setEditedAbsence] = useState({
    id: null,
    employee_id: null,
    hours: null,
    department_id: null,
    // Add other fields as needed
  });
  

  // Handler to open the "Add Off" dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
    setSelectedDepartment(null);
    setNewAbsence({
      employee_id: "",
      hours: "",
     
    });
  };
    useEffect(() => {
     
      
      axios.get('/api/view_absences')
        .then(response => {
          setMockDataTeam(response.data.absences);
         
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
    const handleAddAbsence = () => {
      
      axios.post('/api/create_absence', newAbsence)
    .then(response => {
      console.log('Absence created:', response.data);
      toast.success('Absence record created successfully');
      
      // Fetch the updated list of offs from the server
      axios.get('/api/view_absences')
        .then(response => {
          setMockDataTeam(response.data.absences);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      
      setOpenAddDialog(false);
      setSelectedDepartment(null);
      setNewAbsence({
        employee_id: "",
        hours: "",
      
      });
    })
    .catch(error => {
      console.error('Error creating absence:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Error creating absence');
      }
    });
    };
    const handleDeleteConfirmation = (absence) => {
      setSelectedAbsence(absence); // Set the selected absence for deletion
      setConfirmDeleteOpen(true);
    };
    const handleDelete = (id) => {
      axios
        .delete(`/api/delete_absence/${id}`)
        .then((response) => {
          console.log("Delete successful:", response.data.message);
          toast.success('Absence record deleted successfully');
  
          // Fetch the updated list of offs from the server
          axios.get('/api/view_absences')
            .then(response => {
              setMockDataTeam(response.data.absences);
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

    const handleEdit = (absence) => {
      axios.get(`/api/view_absence/${absence.id}`)
        .then((response) => {
          const data = response.data;
          if (data.status === 200 && data.absence) {
            // Data is available and status is 200
            const absenceDetails = data.absence;
            setEditedAbsence({
              id: absenceDetails.id,
              employee_id: absenceDetails.employee.id,
              hours: absenceDetails.hours,
              department_id: absenceDetails.employee.departement.id,
              // Set other fields as needed
            });
            setEmployeesForSelectedDepartment([absenceDetails.employee]); // Initialize the employees list with the selected employee
            setEditDialogOpen(true);
          } else {
            // Handle the case where absence data is not found or response status is not 200
            console.error('Absence data not found or response status is not 200');
            // You can show an error message to the user or handle it as needed
          }
        })
        .catch((error) => {
          console.error('Error fetching absence details:', error);
          // Handle the error, e.g., display an error message to the user
        });
    };
    const handleUpdate = () => {
      // Send the updated data to your Laravel API
      axios.put(`/api/update_absence/${editedAbsence.id}`, editedAbsence)
        .then((response) => {
          console.log('Absence updated successfully:', response.data);
          toast.success('Absence record updated successfully');
          
          // Fetch the updated list of absences from the server
          axios.get('/api/view_absences')
            .then(response => {
              setMockDataTeam(response.data.absences); // Update the state with the updated data
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
            
          setEditDialogOpen(false); // Close the edit dialog
        })
        .catch((error) => {
          console.error('Error updating absence:', error);
          if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
          } else {
            toast.error('Error updating absence');
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
    { field: "hours", headerName: "Hours", flex: 1 },
    {
      field: "departmentName",
      headerName: "Department",
      flex: 1,
      valueGetter: getDepartmentName,
    },
      
     
       // Action buttons
{
  field: "actions",
  headerName: "Actions",
  flex: 1,
  renderCell: (params) => (
    <Box>
      <IconButton
        onClick={() => handleEdit(params.row)}

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
 
  
return (
  <Box mt="10px" mb="5px">

  <div>
    <Topbar/>
  </div>
  <Header title="ABSENCE" subtitle="Managing Absenteeism" />

 
          
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
    <Box textAlign="right" mb={2}>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineOutlinedIcon />}
                onClick={handleOpenAddDialog}
                color="secondary"
              >
                Add Absence
              </Button>
            </Box>
    <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Absence</DialogTitle>
        <DialogContent>
          <form>
            <TextField
            fullWidth
              select
              label="Department"
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                fetchEmployeesByDepartment(e.target.value);
              }}
            >
              <br/>
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name_department}
                </MenuItem>
              ))}
            </TextField>
            <br/>
            {/* Employees in Selected Department */}
            {selectedDepartment && (
              <TextField
              fullWidth
                select
                label="Employee"
                value={newAbsence.employee_id}
                onChange={(e) =>
                  setNewAbsence({
                    ...newAbsence,
                    employee_id: e.target.value,
                  })
                }
              >
                {employeesInSelectedDepartment.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
             <br/>
            <TextField
            fullWidth
              label="Hours"
              type="text"
              value={newAbsence.hours}
              onChange={(e) =>
                setNewAbsence({
                  ...newAbsence,
                  hours: e.target.value,
                })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddAbsence}
            variant="contained"
            color="primary"
          >
            Add Absence
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Delete Absence</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this absence?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete(selectedAbsence.id);
            }}
            variant="contained"
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Absence</DialogTitle>
        <DialogContent>
          <form>
            {/* Department selection */}
            <TextField
              select
              label="Department"
              value={editedAbsence.department_id}
              onChange={(e) => {
                const departmentId = e.target.value;
                setEditedAbsence({
                  ...editedAbsence,
                  department_id: departmentId,
                  employee_id: null, // Reset the selected employee when the department changes
                });
                fetchEmployeesByDepartment(departmentId);
              }}
            >
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name_department}
                </MenuItem>
              ))}
            </TextField>

            {/* Employee selection */}
            <TextField
              select
              label="Employee"
              value={editedAbsence.employee_id}
              onChange={(e) =>
                setEditedAbsence({
                  ...editedAbsence,
                  employee_id: e.target.value,
                })
              }
            >
              {employeesForSelectedDepartment.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Other form fields */}
            <TextField
              label="Hours"
              type="text"
              value={editedAbsence.hours}
              onChange={(e) =>
                setEditedAbsence({
                  ...editedAbsence,
                  hours: e.target.value,
                })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
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


}
export default Timer;