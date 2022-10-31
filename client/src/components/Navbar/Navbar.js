import React, { useState,useEffect } from 'react'
import { AppBar, Avatar, Toolbar, Typography,Button} from '@material-ui/core'
import memories from '../../images/memories.png'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import useStyle from './style'
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
const Navbar =() => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    // const user =null
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    
    const logout =()=>{
      dispatch({type:'LOGOUT'})
      navigate('/')
      setUser(null)
    } 
    // console.log(users)
    useEffect(() => {
      const token = user?.token;
      
     if (String(token).length>220) {
         const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
      console.log('aaaaa')
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        
        <div className={classes.brandContainer}>
           <Typography component={Link} to='/'  className={classes.heading} variant='h2' align='center' >Memories</Typography>
           <img className={classes.image} src={memories} alt="memories" height='60' />
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                   <div className={classes.profile}>
                         <Avatar className={classes.purple} alt={user?.result.given_name} src={user?.result.picture}> {user?.result.given_name.charAt(0)} </Avatar>
                        {/* if user does not have image show fisrt letter of his name */}
                        <Typography className={classes.userName} variant="h6">{user?.result.given_name} {user?.result.family_name}</Typography>
                         <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                   </div>
            ):(
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
        
    </AppBar>
  )
}

export default Navbar