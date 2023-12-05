import { Typography, Box, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../scenes/theme";
import { IconButton } from '@mui/material';
import { useContext } from "react";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleOnClick = () => {
    console.log('onClick');
    navigate('/Dashboard'); // Redirige vers la page d'inscription (dashboard)
  };

  return (
    <Box mb="30px">
      
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        
        <Box display="flex" alignItems="center">
          
          {title}
        </Box>
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {subtitle}
          
        
        </Typography>
        
          
        
      </Box>
    </Box>
  );
};
export default Header;