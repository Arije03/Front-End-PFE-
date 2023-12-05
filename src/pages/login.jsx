import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import imageSrc from "../assets/img/1.jpg";
import { tokens } from "../scenes/theme";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/navbar";
import About from "../components/about";


import {useNavigate} from "react-router-dom"
const Login=()=>{
    const navigate = useNavigate();
    

    const [loginInput,setLoginInput]=useState({
        email:"",
        password:"",
        error_list:[]
    });
    const handleInput=(e)=>{
        e.persist();
        setLoginInput({...loginInput,[e.target.name]:e.target.value});
        

    }
    const loginSubmit=(e)=>{
        e.preventDefault();
        const data={
            email:loginInput.email,
            password:loginInput.password
        }
        
            axios.post(`/api/login`,data).then((res)=>{
                    localStorage.setItem("token",res.data.token);
                    localStorage.setItem("id",res.data.id);
                    toast(res.data.message);
                    if(res.data.user_type == 'RH'){
                        navigate('/dashboard');
                    }else if(res.data.user_type == 'Chef Department'){
                        navigate('/historychefdep');
                    }else if(res.data.user_type == 'Job Seeker'){
                        navigate('/career');
                    }
                    
            }
            )
           
          };
    

    return (
        
          <div>
        <Navbar/>
        
        
        <div>

         <header class="masthead" >
         <div class="container mt-5" >

              <div class="row">

        <div class="col text-center" >
        <div>
        <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '70vh',
                }}
              >
                <Box sx={{ width: 350, height:300, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
                  <Typography variant="h4" gutterBottom sx={{ marginBottom: "30px" }}>
                    Log in to your account
                  </Typography>
            
            <form onSubmit={loginSubmit}>
                <TextField type={'email'} name="email" onChange={handleInput} value={loginInput.email} variant="standard" placeholder="Email address" margin="normal" size="small" fullWidth={true}/>
                <TextField type={'password'} name="password" onChange={handleInput} value={loginInput.password} variant="standard" placeholder="password" margin="normal" size="small" fullWidth={true}/>
                <Button
  variant="contained"
  color="primary"
  size="large"
  type="submit"
  fullWidth={true}
  sx={{ width: '100%', mt: 2, borderRadius: '20px' }}
>
  Login
</Button>

            </form>
            
          <Typography variant="body1" align="center" color="primary" component="a" href="/signup">
            Sign Up
          </Typography>
            </Box>
            </Box>
            <ToastContainer style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
           
           
        </div>

                     
</div>
</div>
</div>
     </header>
     

     </div>
    </div>

       
       
    )
}
export default Login ;