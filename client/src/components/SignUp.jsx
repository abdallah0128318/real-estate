import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from './OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // a function to pick data up from form fields then assign it in 'formData' object
  // spread operator is for data persistence so if the username is existing then 
  // the field of email is change there will be an email key-value without losing the username key-value
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  // a function to handle form submission
  const handleSubmit = async (e)=>{
    e.preventDefault()
    setIsLoading(true)

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if(res.status == 201){
      const msg = await res.json();
      setIsLoading(false)
      navigate('/login')
    }
    else if(res.status == 401){
      const errorObj = await res.json();
      setIsLoading(false)
      setUsernameError(errorObj.username)
      setEmailError(errorObj.email)
      setPasswordError(errorObj.password)
      return 0;
    }
  }


  return (
    <div>
      <h1 className="text-center my-7 font-semibold text-2xl ">Sign Up</h1>

      <form className='w-3/4 sm:w-1/2  md:w-1/3 mt-8 mb-3 mx-auto' onSubmit={handleSubmit}>

          <input className='block w-full p-2 my-3 rounded-lg focus:outline-none' 
          type="text" name="username" id="username" placeholder='username' onChange={handleChange}/>
          {usernameError && (  <p className='text-center text-red-500'> {usernameError} </p> )}

          <input className='block w-full p-2 my-3 rounded-lg focus:outline-none' 
          type="text" name="email" id="email" placeholder='email' onChange={handleChange}/>
          {emailError && (  <p className='text-center text-red-500'> {emailError} </p> )}

          <input className='block w-full p-2 my-3 rounded-lg focus:outline-none' 
          type="password" name="password" id="password" placeholder='password' onChange={handleChange}/>
          {passwordError && (  <p className='text-center text-red-500'> {passwordError} </p> )}

          <button className='block w-full p-2 my-3 hover:opacity-70 disabled:opacity-70 
          rounded-lg bg-indigo-950 text-white' disabled={isLoading} > {isLoading ? 'Loading' : 'SIGN UP'} </button>
          <OAuth/>
      </form>

      <p className='w-3/4 sm:w-1/2  md:w-1/3 mt-3 mx-auto' >Have an account?
        <Link to="/sign-in">
          <span className="text-blue-700"> Login</span> 
        </Link>
        </p>
        
    </div>
  )
}
