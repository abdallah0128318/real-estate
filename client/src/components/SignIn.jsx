import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch } from  'react-redux' 
import { signinFail, signIn, signinSuccess } from '../state_slices/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const isLoading = useSelector(state => state.user.isLoading);
  const errorMsg = useSelector(state => state.user.errorMsg);
  const dispatch = useDispatch();
  // const [errorMsg, setErrorMsg] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // a function to pick data up from form fields then assign it in 'formData' object
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  // a function to handle form submission
  const handleSubmit = async (e)=>{
    e.preventDefault()
    dispatch(signIn())
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if(res.status == 200){
      const data = await res.json();
      dispatch(signinSuccess(data))
      navigate('/')
    }
    else if(res.status == 401){
      const errorObj = await res.json();  
      dispatch(signinFail(errorObj.msg))
      return 0;
    }
  }


  return (
    <div>
      <h1 className="text-center my-7 font-semibold text-2xl ">Login</h1>

      <form className='w-3/4 sm:w-1/2  md:w-1/3 mt-8 mb-3 mx-auto' onSubmit={handleSubmit}>

          {errorMsg && (  <p className='text-center text-red-500'> {errorMsg} </p> )}

          <input className='block w-full p-2 my-3 rounded-lg focus:outline-none' 
          type="text" name="email" id="email" placeholder='email' onChange={handleChange}/>

          <input className='block w-full p-2 my-3 rounded-lg focus:outline-none' 
          type="password" name="password" id="password" placeholder='password' onChange={handleChange}/>

          <button className='block w-full p-2 my-3 hover:opacity-70 disabled:opacity-70
          rounded-lg bg-indigo-950 text-white' disabled={isLoading} > {isLoading ? 'Loading' : 'Login'} </button>
      </form>

      <p className='w-3/4 sm:w-1/2  md:w-1/3 mt-3 mx-auto' >Have an account?
        <Link to="/sign-up">
          <span className="text-blue-700"> Signup</span>
        </Link>
        </p>
        
    </div>
  )
}
