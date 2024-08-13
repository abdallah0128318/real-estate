import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import Home from './components/Home'
import Profile from './components/Profile'
import About from './components/About'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Header from './widgets/Header'
import CreateListing from './components/CreateListing'
import PrivateRoute from './components/PrivateRoute'
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/about'  element={<About/>} />

        
        <Route path='/login'  element={<SignIn/>} />
        <Route path='/sign-up'  element={<SignUp/>} />

        {/* here are all the protected routes that requires user authentication */}
        <Route  element={<PrivateRoute/>} >
          <Route path='/profile'  element={<Profile/>} />
          <Route path='/add-listing'  element={<CreateListing/>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
