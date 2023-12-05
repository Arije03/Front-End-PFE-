import React, { useState } from "react";
import { Box, Typography, useTheme, TextField, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarFilterButton } from "@mui/x-data-grid";
import { tokens } from "../scenes/theme";
import { mockDataTeam } from "../data/mockData";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Header from "../components/header";

const Schedule = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 ,     },
  ];

  const [filteredData, setFilteredData] = useState(mockDataTeam);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");

  const handleFilterChange = () => {
    const filteredEmployees = mockDataTeam.filter((employee) => {
      const departmentMatch = departmentFilter ? employee.department.toLowerCase() === departmentFilter.toLowerCase() : true;
      const nameMatch = nameFilter ? (employee.firstName + " " + employee.lastName).toLowerCase().includes(nameFilter.toLowerCase()) : true;
      const idMatch = idFilter ? employee.id.toString().includes(idFilter) : true;
      
      return departmentMatch && nameMatch && idMatch;
    });

    setFilteredData(filteredEmployees);
  };

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box m="20px 0">
        <TextField
          select
          label="Department"
          variant="outlined"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          {/* Ajoutez d'autres options de département ici */}
        </TextField>
        <TextField
          label="Name"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <TextField
          label="ID"
          variant="outlined"
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
        />
        <button onClick={handleFilterChange}>Apply Filters</button>
      </Box>
      <Box height={500} width="100%">
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

          }}>
                        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} components={{ Toolbar: GridToolbar }}/>

      </Box>
      </Box>
    </Box>
  );
};

export default Schedule;