
import { ColorModeContext, useMode } from "./scenes/theme";

import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Home from "./pages/home";
import Timer from "./pages/timer";
import Off from "./pages/off";
import Career from "./pages/career";
import Admincareer from "./pages/admincareer";
import Jobseekertable from "./pages/jobseekertable";
import Pageprofiljobseeker from "./pages/pageprofiljobseeker";
import Departement from "./pages/departement";
import History from "./pages/history";
import Historychefdep from "./pages/historychefdep";
import Managechef from "./pages/managechef";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Schedule from "./pages/schedule";
import Pageprofilchefdep from "./pages/pageprofilchefdep";
import Pageprofiladmin from "./pages/pageprofiladmin";
import PrivateRoutes from "./pages/routes/PrivateRoutes"
import Navbar from "./components/navbar";
import About from "./components/about";
import Navbarjobseeker from "./components/navbarjobseeker";
import Navbaradmin from "./components/navbaradmin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./scenes/Dashboard/Dash";
import Chefdep from "./scenes/chefdep";
import Team from "./scenes/team";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import axios from "axios";


//import FAQ from "./scenes/faq";

//import Geography from "./scenes/geography";
axios.defaults.baseURL="http://localhost:8000/";
axios.defaults.headers.post["Accept"]='application/json';
axios.defaults.headers.post["Content-Type"]='application/json';
axios.interceptors.request.use(function(config){
  const token=localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})

function App() {
  const [theme, colorMode] = useMode();
 
    return (
      
        
        <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        
        <main className="content">
        
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/history" element={<History />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/about" element={<About />} />
        <Route path="/navbarjobseeker" element={<Navbarjobseeker />} />
        <Route path="/navbaradmin" element={<Navbaradmin />} />
        <Route element={<PrivateRoutes/>}>
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/off" element={<Off />} />
        <Route path="/career" element={<Career />} />
        <Route path="/admincareer" element={<Admincareer />} />
        <Route path="/jobseekertable" element={<Jobseekertable />} />
        <Route path="/historychefdep" element={<Historychefdep />} />
        <Route path="/pageprofilchefdep" element={<Pageprofilchefdep />} />
        <Route path="/pageprofiljobseeker" element={<Pageprofiljobseeker />} />
        <Route path="/pageprofiladmin" element={<Pageprofiladmin />} />
        <Route path="/departement" element={<Departement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/chefdep" element={<Chefdep />} />
        <Route path="/form" element={<Form />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/line" element={<Line />} />
        <Route path="/managechef" element={<Managechef />} />
       
            {/* <Route path="/contacts" element={<Contacts />} /> 
             <Route path="/invoices" element={<Invoices />} />
                      <Route path="/geography" element={<Geography />} />  

             
             
             
              <Route path="/faq" element={<FAQ />} />
              
             
      */} 
      </Route> 
      
    </Routes>
   
        </main>
        </div>
        </ThemeProvider>
        </ColorModeContext.Provider>
        
        )
        
        };
        
        





export default App
