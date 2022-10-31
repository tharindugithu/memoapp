import React, { useEffect } from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {


   return (
      <GoogleOAuthProvider clientId='488951685717-gmta23js88mm1brkkt3g8ivsfnag06ng.apps.googleusercontent.com'>
         <Router>
            <Container maxWidth='lg'>
               <Navbar />
               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/auth' element={<Auth />} />
               </Routes>
               {/* <Home /> */}
            </Container>
         </Router>
      </GoogleOAuthProvider>


   )
}
export default App