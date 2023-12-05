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
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbarchefdep from "../components/navbarchefdep";


const Historychefdep = () => {
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
  useEffect(() => {
   
    
    axios.get('/api/view_job_applications')
    .then(response => {
      const filteredJob = response.data.jobapplication.filter(jobapplication=> {
        return parseInt(jobapplication.joboffer.department.user.id) === parseInt(localStorage.getItem('id'));
      });
      console.log("Filtered Job Applications:", filteredJob);
      setJobapplication(filteredJob);
     
     
    })
    .catch(error => {
      console.log(error);
    });
      
  }, []);
 
    const getSeekerName = (params) => {
      return params.row.user.first_name;
    };
    const getSeekerLast = (params) => {
      return params.row.user.last_name;
    };
    const getOfferName = (params) => {
      return params.row.joboffer.name_offer;
    };
    
    
  
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 }, 
        {
          field: "seekerName",
          headerName: "Job Seeker First Name",
          flex: 1,
          valueGetter: getSeekerName,
        },
        {
          field: "seekerLast",
          headerName: "Job Seeker Last Name",
          flex: 1,
          valueGetter: getSeekerLast,
        },
        {
          field: "offerName",
          headerName: "Offer",
          flex: 1,
          valueGetter: getOfferName,
        },
         
        
          {
            field: "text",
            headerName: "Text",
            flex: 1,
          },
          {
            field: "salary",
            headerName: "Salary",
            flex: 1,
          },
          {
            field: "status",
            headerName: "Status",
            flex: 1,
          },
         
         
           // Action buttons
   
     
    
         
        
         
        ];
    return(
        <Box m="20px">
            <Navbarchefdep/>
          <Box
          m=" 100px 0 0 0"
          height="80vh"
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
            
          <DataGrid checkboxSelection rows={jobapplication} columns={columns} components={{ Toolbar: GridToolbar }}/>
         
        
        
     
      </Box>
      </Box>

      
      
      )

};

export default Historychefdep;