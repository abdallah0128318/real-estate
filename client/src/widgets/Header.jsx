import React from 'react'
import { Link } from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

export default function Header() {
  return (
    <header className="flex bg-slate-200 justify-between items-center  p-3">
      <Link to="/">
        <h1 className='font-bold'>Serene Spaces</h1>
      </Link>
      

      <form className='flex items-center bg-slate-100 rounded-md' >
        <input type="search" className='p-2 bg-transparent sm:w-64 w-24 focus:outline-none' placeholder='search........'/>
        <div className='pr-5'>
          <FaSearch className='text-slate-600 hover:cursor-pointer' />
        </div>
      </form>
    

      <div>
        <ul className='flex gap-4'>
        <Link to="/">
          <li className='hidden sm:inline hover:underline'>Home</li>
        </Link>
        <Link to="/about">
          <li className='hidden sm:inline hover:underline'>About</li>
        </Link>
        <Link to="/sign-in">
          <li className='inline hover:underline'> Sign in</li>
        </Link>
        </ul>
      </div>

    </header>
  )
}
