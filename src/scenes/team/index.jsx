import { Box, Typography, useTheme, IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem} from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// Import des icônes nécessaires
import Topbar from "../global/Topbar";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { tokens } from "../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import axios from "axios";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [mockDataTeam, setMockDataTeam] = useState([]); // State to hold the fetched data
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filterId, setFilterId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    age: "",
    salary: "",
    function: "",
    sexe: "",
    date_of_employement: "",
    phone_number: "",
    departement_id: "",
  });
   
      
  useEffect(() => {
    axios
    .get("/api/view_departments")
    .then((response) => {
      setDepartments(response.data.departments);
      console.log(response.data.departments);
      
    })
    .catch((error) => {
      console.error("Error fetching departments:", error);
    });
    axios.get('/api/view_employees')
        .then(response => {
          // Assuming the response has an 'employees' property containing the array of data
          setMockDataTeam(response.data.employees);
          console.log(response.data.employees);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }, []);
    
       
  const getDepartmentName = (params) => {
    return params.row.departement.name_department;
  };
    
  const handleEdit = (id) => {
    const employeeToEdit = mockDataTeam.find((employee) => employee.id === id);
    setSelectedEmployee(employeeToEdit);
    setOpenEditDialog(true);
  };

  const handleUpdate = (updatedData) => {
    axios
      .put(`/api/update_employee/${updatedData.id}`, updatedData)
      .then((response) => {
        console.log("Update successful:", response.data.message);
        const updatedMockData = mockDataTeam.map((employee) =>
          employee.id === updatedData.id ? updatedData : employee
        );
        setMockDataTeam(updatedMockData);
        setOpenEditDialog(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  const handleDeleteConfirmation = (employee) => {
    setSelectedEmployee(employee);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/delete_employee/${id}`)
      .then((response) => {
        console.log("Delete successful:", response.data.message);
        const updatedMockData = mockDataTeam.filter(
          (employee) => employee.id !== id
        );
        setMockDataTeam(updatedMockData);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };
  const handleAddEmployee = () => {
    axios
      .post("/api/create_employee", newEmployee)
      .then((response) => {
        console.log("Add Employee successful:", response.data);
        setAddEmployeeDialogOpen(false);
        axios
          .get("/api/view_employees")
          .then((response) => {
            setMockDataTeam(response.data.employees);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };
  const columns = [
      { field: "id", headerName: "ID", flex: 0.5 }, 
      {
          field: "name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "age",
          headerName: "Age",
          type: "number",
          headerAlign: "left",
          align: "left",
        },
        {
          field: "salary",
          headerName: "Salary",
          flex: 1,
        },
        {
          field: "function",
          headerName: "Function",
          flex: 1,
        },
        {
          field: "sexe",
          headerName: "Sexe",
          flex: 1,
        },
        {
          field: "date_of_employement",
          headerName: "Date of employement",
          flex: 1,
        },
        {
          field: "phone_number",
          headerName: "Phone number",
          flex: 1,
        },
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
          onClick={() => handleEdit(params.row.id)}
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
        <Header title="TEAM" subtitle="Managing the Team Members" />
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
          onClick={() => setAddEmployeeDialogOpen(true)}
            
          
          color="secondary"
        >
          Add Employee
        </Button>
      </Box>
     <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        {selectedEmployee && (
          <form>
            
            <TextField
              label="Name"
              value={selectedEmployee.name}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  name: e.target.value,
                })
              }
            />
             <TextField
              label="Age"
              value={selectedEmployee.age}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  age: e.target.value,
                })
              }
            />
             <TextField
              label="salary"
              value={selectedEmployee.salary}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  salary: e.target.value,
                })
              }
            />
             <TextField
              label="function"
              value={selectedEmployee.function}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  function: e.target.value,
                })
              }
            />
              <TextField
              label="sexe"
              value={selectedEmployee.sexe}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  sexe: e.target.value,
                })
              }
            />
            <TextField
              label="date_of_employement"
              value={selectedEmployee.date_of_employement}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  date_of_employement: e.target.value,
                })
              }
            />
              <TextField
              label="phone_number"
              value={selectedEmployee.phone_number}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  phone_number: e.target.value,
                })
              }
            />
             <TextField
              label="Department"
              value={selectedEmployee?.departement?.name_department || ''}
              onChange={(e) =>
  setSelectedEmployee({
    ...selectedEmployee,
    departement: {
      ...selectedEmployee.departement,
      name_department: e.target.value,
    },
  })
}
            />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
        <Button
          onClick={() => handleUpdate(selectedEmployee)}
          variant="contained"
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
</Dialog>
    <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
      <DialogTitle>Delete Employee</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this employee?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            handleDelete(selectedEmployee.id);
            setConfirmDeleteOpen(false);
          }}
          variant="contained"
          color="primary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={addEmployeeDialogOpen} onClose={() => setAddEmployeeDialogOpen(false)}>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        {/* Add Employee Form */}
        <TextField
          label="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <TextField
          label="Age"
          value={newEmployee.age}
          onChange={(e) => setNewEmployee({ ...newEmployee, age: e.target.value })}
        />
         <TextField
          label="Salary"
          value={newEmployee.salary}
          onChange={(e) => setNewEmployee({ ...newEmployee,salary: e.target.value })}
        />
         <TextField
          label="function"
          value={newEmployee.function}
          onChange={(e) => setNewEmployee({ ...newEmployee, function: e.target.value })}
        />
        <TextField
          label="sexe"
          value={newEmployee.sexe}
          onChange={(e) => setNewEmployee({ ...newEmployee, sexe: e.target.value })}
        />
       <TextField
label="Date of Employement"
type="date" // Set the input type to date
value={newEmployee.date_of_employement}
onChange={(e) =>
  setNewEmployee({
    ...newEmployee,
    date_of_employement: e.target.value,
  })
}
InputLabelProps={{
  shrink: true, // To make the label shrink when there's a value
}}
/>
        <TextField
          label="phone_number"
          value={newEmployee.phone_number}
          onChange={(e) => setNewEmployee({ ...newEmployee, phone_number: e.target.value })}
        />
        {/* Add other fields */}
        <br/>
        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select
            value={newEmployee.departement_id}
            onChange={(e) => setNewEmployee({ ...newEmployee, departement_id: e.target.value })}
          >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name_department}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddEmployeeDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleAddEmployee} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
    
        </Box>
    
    </Box>
      )

    
}
export default Team;