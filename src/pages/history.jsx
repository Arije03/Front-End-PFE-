import { Box, Typography, useTheme, IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Navbarjobseeker from '../components/navbarjobseeker';


const History = () => {
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
  const [jobapplication, setJobapplication] = useState([]);
    useEffect(() => {
     
      
      axios.get('/api/view_job_applications')
      .then(response => {
        const filteredJob = response.data.jobapplication.filter(jobapplication=> {
          return parseInt(jobapplication.user.id) === parseInt(localStorage.getItem('id'));
        });
        console.log("Filtered Job Applications:", filteredJob);
        setJobapplication(filteredJob);
       
       
      })
      .catch(error => {
        console.log(error);
      });
        
    }, []);
    const getOfferName = (params) => {
      return params.row.joboffer.name_offer;
    };
    
   
   
    
  
   
   
  
  
       
    
  
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 }, 
        {
          field: "offerName",
          headerName: "Offer Name",
          flex: 1,
          valueGetter: getOfferName,
        },
         
       
         
          {
            field: "text",
            headerName: "text",
            flex: 1,
          },
          {
            field: "salary",
            headerName: "salary",
            flex: 1,
          },
          {
            field: "status",
            headerName: "Status",
            flex: 1,
          },
          
         
         
          
         
        
         
        ];
    return(
        <div>
          <Navbarjobseeker/>
      <Box>
      

        <header className="masthead">
          <div className="container mt-5">
            <div className="row">
              <div className="col text-center"></div>
          <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
    "& .MuiDataGrid-root": {
      border: "none",
    },
    
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              color: 'black',
            },
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            "& .name-column--cell": {
               color: 'black',
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            },
            "& .MuiCheckbox-root": {
              color: `${'rgba(255, 255, 255, 0.7)'} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${'rgba(255, 255, 255, 0.7)'} !important`,
            },
            
          }}>
            
            <DataGrid
  checkboxSelection
  rows={jobapplication}
  columns={columns}
  components={{ Toolbar: GridToolbar }}
  sx={{
    backgroundColor: 'transparent',
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: 'transparent',
    },
    "& .MuiDataGrid-cell": {
      borderBottomColor: 'transparent',
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: 'black',
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: 'transparent',
    },
    "& .MuiDataGrid-overlay": {
      backgroundColor: 'transparent',
    },
  }}
/>

         
          
       
       
       
        
        
          

      
              
            

  
  
       
      
      
          
      
      </Box>
      
      
      </div>
      </div>
      
      </header>
      </Box>
      </div>
      
      
      
      
      
      
      
     
      )

};

export default History;