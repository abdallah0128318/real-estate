import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import Home from './components/Home'
import Profile from './components/Profile'
import About from './components/About'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Header from './widgets/Header'
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/profile'  element={<Profile/>} />
        <Route path='/about'  element={<About/>} />
        <Route path='/sign-in'  element={<SignIn/>} />
        <Route path='/sign-up'  element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}
