import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './style';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import Input from './Input';
import {useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../constans/actionType';
import axios from 'axios'
import {signin,signup} from '../../actions/auth'
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
function Auth() {
    const classes = useStyles()
    const dispatch = useDispatch();
    const [showPassword,setShowPassword] = useState(false)
    const [isSignUp,setSignUp] = useState(true)
    const [formData,setFormData] = useState(initialState)
    const navigate = useNavigate();


    const handleSubmit =(e)=>{
        e.preventDefault()
        if(isSignUp){
          dispatch(signup(formData,navigate))
        }else{
          dispatch(signin(formData,navigate))
        }
    }
    
    const handleChange =(e)=>{
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    
    const handleShowPassword =()=>setShowPassword((prevShowPassword)=>!prevShowPassword)
    
    const switchMode =()=>{
        setSignUp((prevsignUp)=>!prevsignUp)
       // handleShowPassword()
    }
    
    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});
    
     function handleGoogleLoginSuccess(res) {
      
      const token = res?.access_token//if there not token then undifined
      axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(async response=>{
      const result = response?.data
      dispatch({ type: AUTH, data: { result, token } });
      navigate('/')
    })
      
      // try {
      //   dispatch({ type: AUTH, data: { token } });
      //   navigate('/')
  
      // } catch (error) {
      //   console.log(error);
      // }

    
  }

  //  const googleSuccess = async(res) =>{
  //   console.log(jwt_decode(res.credential))
  //   // const result = res?.profileObj;
  //   // const token = res?.tokenId;

  //   // try {
  //   //   dispatch({ type: 'AUTH', data: { result, token } });
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  //  }
  //  const googleFailure = (error) =>{
  //      console.log(error)
  //      console.log('Google sign is unsuccessful.tryagain later')
  //  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
         <Avatar className={classes.Avatar}>
           <LockOutlinedIcon/>
         </Avatar>
         <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
         <form className={classes.form} onSubmit={handleSubmit} >
            <Grid container spacing={2}>
                 {
                    isSignUp && (
                        <>
                        <Input name='firstName' label='First Name' handleChange={handleChange}   half />
                        <Input name='lastName' label='Last Name' handleChange={handleChange}  half /> 
                        </>  
                    )
                 }
                  {/* //both login and regisster form */}
                <Input name='email' label='Eamil Address' handleChange={handleChange} type="email"  /> 
                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                {/* type is text using because we use btn for show password in Input component */}

                {
                    isSignUp && (
                        <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange}  type='password'  />
                    )
                 }
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                {isSignUp ? 'Sign Up':'Sign In'}
            </Button>
            <Button onClick={() => login()} color='secondary' style={{background:'green',width:'363px'}} className={classes.submit}><i class="fa-brands fa-google"></i>  Sign in with google</Button>
             {/* <GoogleLogin
               clientId='488951685717-gmta23js88mm1brkkt3g8ivsfnag06ng.apps.googleusercontent.com'
               render={(renderPros)=>(
                <Button 
                
                onClick={renderPros.onClick} 
                disabled={renderPros.disabled} 
                // startIcon={<Icon />} 
                >
                </Button>
               )}
               onSuccess={googleSuccess}
               onFailure={googleFailure}
               useOneTap
            />  */}
           
            <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
         </form>
      </Paper>
    </Container>
  )
}

export default Auth