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


const Jobseekertable = () => {
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
  const [status, setStatus] = useState('en attente');

  const [jobapplication, setJobapplication] = useState([]);
  // Handler to open the "Add Off" dialog
 
    useEffect(() => {
     
      
      axios.get('/api/view_job_applications')
      .then(response => {
        const filteredJob = response.data.jobapplication.filter(jobapplication=> {
          return parseInt(jobapplication.user.id) === parseInt(localStorage.getItem('id'));
        });
        
        setJobapplication(filteredJob);
       
       
      })
      .catch(error => {
        console.log(error);
      });
    }, []);
    const getEmployeeName = (params) => {
      return params.row.employee.name;
    };
     const getDepartmentName = (params) => {
      return params.row.employee.departement.name_department;
    };
    
    
    
    
      const handleStatusChange = (event) => {
        setStatus(event.target.value);
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
   
       
    
         
        
         
        ];
    return(
        <Box m="20px">
          <Topbar/>
          <Header title=" JOB Applications" subtitle="Managing Job Applications" />
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
         
        
        
      
      
      </Box>
      </Box>
      
      
      )

};

export default Jobseekertable;