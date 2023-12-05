import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { toast,ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = (registerInput) => {
        let errors = {};
        if (!registerInput.first_name) {
          errors.first_name = 'First Name is required';
        }
        if (!registerInput.last_name) {
          errors.last_name = 'Last Name is required';
        }
        if (!registerInput.email) {
          errors.email = 'Email is required';
        }
        if (!registerInput.password) {
          errors.password = 'Password is required';
        } else if (registerInput.password.length < 8) {
          errors.password = 'Password should have a minimum of 8 characters';
        }
        return errors;
      };

  const [registerInput ,setRegisterInput]=useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
 }
 );

 const handleInput=(e)=>{
  e.persist();
  setRegisterInput({...registerInput,[e.target.name]:e.target.value});
}

const signupSubmit=(e)=>{
  e.preventDefault();
  const errors = validate(registerInput);
  setErrors(errors);
 if (Object.keys(errors).length === 0) {
  const data={
    first_name:registerInput.first_name,
    last_name:registerInput.last_name,
    email:registerInput.email,
    password:registerInput.password,
    
  }

   setIsLoading(true);
        
       
        toast.promise(
      axios.post(`/api/register`,data).then((response)=>{
              
          setIsLoading(false);
          navigate('/login'); // Rediriger vers la page de connexion
          return { success: true, message: response.data.message };
        }).catch((error) => {
          if (error.response.status === 422) {
            setErrors(error.response.data.errors);
          }
          setIsLoading(false);
          return { success: false, message: "An error occurred." };
        
        })
        ,
          
          {
              pending: "Loading...",
              success: "Sign Up successfuly!",
              error: ({ message }) => message,
            }
            );
  }
}

  return (
    
      <div>
        <Navbar/>
        <div>
          <header class="masthead">
            <div class="container mt-5">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80vh',
                }}
              >
                <Box sx={{ width: 450, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
                  <Typography variant="h3" align="center" gutterBottom  sx={{ marginBottom: "30px" }}>
                    Sign Up
                  </Typography>
                  <form onSubmit={signupSubmit}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      type={'text'} 
                      name="first_name"
                      value={registerInput.first_name}
                      onChange={handleInput}
                      fullWidth
                      margin="normal"
                      error={!!errors.first_name}
                      helperText={errors.first_name}
                    />
                   <TextField
                      label="Last Name"
                      variant="outlined"
                      type={'text'} 
                      name="last_name"
                      value={registerInput.last_name}
                      onChange={handleInput}
                      fullWidth
                      margin="normal"
                      error={!!errors.last_name}
                      helperText={errors.last_name}
                    />
                    <TextField
                      label="E-mail"
                      variant="outlined"
                      type={'email'}
                      name="email"
                      value={registerInput.email}
                      onChange={handleInput}
                      fullWidth
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  <TextField
  label="Password"
  variant="outlined"
  type="password"
  name="password"
  value={registerInput.password}
  onChange={handleInput}
  fullWidth
  margin="normal"
  error={!!errors.password}
  helperText={errors.password || (errors.password ? '' : 'Password should have a minimum of 8 characters')}
  sx={{
    '& .MuiFormHelperText-root': {
      color: registerInput.password.length < 8 ? 'red' : 'inherit',
    },
  }}
/>
                   
                   <Button
  variant="contained"
  type="submit"
  sx={{ width: '100%', mt: 2, borderRadius: '20px' }}
>
  Sign Up
</Button>
                  </form>
                </Box>
              </Box>
            </div>
          </header>
        </div>
        <ToastContainer style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/>  
      </div>
    
  );
};

export default SignUp;