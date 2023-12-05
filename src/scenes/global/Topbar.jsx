import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Notification from "../../components/notification";



const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  const handleDashboardClick = () => {
    navigate("/dashboard"); // Utilisez navigate pour naviguer vers la page Dashboard
  };
  
    return (
      <Box display="flex" justifyContent="space-between" p={2}  >
        {/* LEFT SECTION */}
        <Box display="flex" alignItems="center">
    <IconButton>
      <HomeOutlinedIcon style={{ verticalAlign: 'middle' }} />
    </IconButton>
    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
      <Typography variant="h4" color={colors.grey[100]} sx={{ fontWeight: 600, ml: 1 }}>
    
        <span >Dashboard</span>
      </Typography>
    </Link>
  </Box>

  
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          {/* Add your search bar code here */}
        </Box>
  
        {/* ICONS */}
        <Box display="flex">
        <IconButton>
    
    
  </IconButton>
  
  <IconButton component={Link} to="/pageprofiladmin">
    <PersonOutlinedIcon />
  </IconButton>
  <IconButton onClick={colorMode.toggleColorMode}>
    {theme.palette.mode === "dark" ? (
      <DarkModeOutlinedIcon />
    ) : (
      <LightModeOutlinedIcon />
    )}
  </IconButton>
</Box>
      </Box>
    );
  };
export default Topbar;