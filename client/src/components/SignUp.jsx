import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true)

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if(res.status == 201){
      setIsLoading(false)
      setError(null)
      navigate('/sign-in')
    }
    else if(res.status == 401){
      const msg = await res.json();
      setError(msg);
      setIsLoading(false)
         return 0;
    }
  }


  return (
    <div>
      <h1 className="text-center my-7 font-semibold text-2xl ">Sign Up</h1>
      <p className='text-red-600 text-center' >{ error? error : ""}</p>
      <form className='w-3/4 sm:w-1/2  md:w-1/3 mt-8 mb-3 mx-auto' onSubmit={handleSubmit}>

          <input className='block w-full p-2 my-3 rounded-lg focus:outline-none' 
          type="text" name="username" id="username" placeholder='username' onChange={handleChange}/>

          <input className='block w-full p-2 my-3 rounded-lg focus:outline-none' 
          type="text" name="email" id="email" placeholder='email' onChange={handleChange}/>

          <input className='block w-full p-2 my-3 rounded-lg focus:outline-none' 
          type="password" name="password" id="password" placeholder='password' onChange={handleChange}/>

          <button className='block w-full p-2 my-3 hover:opacity-70 disabled:opacity-70 
          rounded-lg bg-indigo-950 text-white' disabled={isLoading} > {isLoading ? 'Loading' : 'SIGN UP'} </button>
      </form>

      <p className='w-3/4 sm:w-1/2  md:w-1/3 mt-3 mx-auto' >Have an account?
        <Link to="/sign-in">
          <span className="text-blue-700"> Sign in</span> 
        </Link>
        </p>
        
    </div>
  )
}
