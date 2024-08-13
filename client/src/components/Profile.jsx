import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteFail, deleteSuccess, signOutFail, 
          signOutSuccess, imageUploadSuccess, beforeUpdate, updateFail, updateSuccess} from '../state_slices/userSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {app} from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
export default function Profile() {
  const imgRef = useRef(null)
  const dispatch = useDispatch()
  // update form fields error states
  const usernameError = useSelector(state => state.user.usernameError)
  const emailError = useSelector(state => state.user.emailError)
  const passwordError = useSelector(state => state.user.passwordError)
  // errmsg state is just to handle delete and signOut errors
  const errmsg = useSelector(state => state.user.errorMsg)
  const currentUser = useSelector(state => state.user.userData)
  const isLoading = useSelector(state => state.user.isLoading)
  const [file, setFile] = useState(null)
  const [uploadProgress, setuploadProgress] = useState(null)
  const [uploadError, setuploadError] = useState(null)
  // Here is a state to manage form data
  const [formData, setFormData] = useState({})
  // This state is just a flag to ensure that the firebase storage validation has been completed 
  // so I can ensure that the uploadErrot state is exact and real weather it is 'false' or 'true'
  // because if we check it before the validation completes it will be always false what can always leads to unexpected behavior.
  const [validationComplete, setValidationComplete] = useState(false)
  // useEffect hook to handle file upload
  useEffect(()=>{
    if (file) {
      handleFileUpload(file);
    }
  }, [file])

  // A function to handle file upload when a user changes his profile picture
  const handleFileUpload = (file)=>{
    // intitilize a storage
    const storage = getStorage(app)
    // make filename unique
    const filename = new Date().getTime() + file.name
    const storageRef = ref(storage, `profilePics/${filename}`)
    const uploadedTask = uploadBytesResumable(storageRef, file)

    // handle progress operation
    uploadedTask.on('state_changed', 
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
        setuploadProgress(progress)
      },
      // handle unsuccessfull uploads
      (error)=>
      {
          setuploadError(`file size exceeds 2 MB`)
          setValidationComplete(true)
      },
      // handle successfull uploads
      ()=>{
        getDownloadURL(uploadedTask.snapshot.ref).then((downloadURL)=>{
          dispatch(imageUploadSuccess(downloadURL))
          setFormData({...formData, photo: downloadURL})
          setuploadError(null)
          setValidationComplete(true)
        })
      })

  }

  // A function to handle user deletion
  const handleDelete = async ()=> {
      const res = await fetch(`/api/users/deleteUser/${currentUser._id}`, {
        method: 'DELETE',
      });
      if(res.status == 200)
      {
        dispatch(deleteSuccess())
      }
      else{
        const data = await res.json()
        dispatch(deleteFail(data))
      }
  }

  // A function to handle user signOut functionality
  const hanldeSignOut = async() => {
      const res = await fetch('/api/auth/signOut');
      if(res.status == 200)
      {
        dispatch(dispatch(signOutSuccess()))
      }
      else{
        const data = await res.json()
        dispatch(dispatch(signOutFail(data)))
      }
  }

  // Here is a function to handle form fields change
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }



  // Here is a function to handle form submission
  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log(formData);
    dispatch(beforeUpdate())
    const res = await fetch(`/api/users/update/${currentUser._id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if(res.status == 201){
      const data = await res.json()
      dispatch(updateSuccess(data))
      console.log(data);
    }
    else if(res.status == 401)
    {
      const data = await res.json()
      dispatch(updateFail(data))
      console.log(data);
    }
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

    {errmsg ? (<p className='text-red-700 text-center mt-5'> {errmsg} </p>): ''}

    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <input type='file' ref={imgRef}  hidden accept='image/*' onChange={(e)=> setFile(e.target.files[0])} />
      <img
        src={currentUser.photo}
        alt='profile'
        onClick={()=> imgRef.current.click()}
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
      />

      {uploadError && uploadProgress == 100 && validationComplete ?(
        <p className='text-red-700 text-center mt-5'> {uploadError} </p>
      ):uploadProgress > 0 && uploadProgress < 100 ? (
        <p className='text-center mt-5'>{uploadProgress ? `Uploading: ${Math.round(uploadProgress)} %` : ''}</p>
      ): !uploadError && uploadProgress == 100 && validationComplete ?(
        <p className='text-green-700 text-center mt-5'>Image uploaded Succefully</p>
      ): ''
      }

      <input
        type='text'
        placeholder='username'
        id='username'
        className='border p-3 rounded-lg'
        defaultValue={currentUser.username}
        onChange={handleChange}
      />
      {usernameError ? (<p className='text-red-700 text-center'> {usernameError} </p>): ''}

      <input
        type='text'
        placeholder='email'
        id='email'
        className='border p-3 rounded-lg'
        defaultValue={currentUser.email}
        onChange={handleChange}
      />
      {emailError ? (<p className='text-red-700 text-center'> {emailError} </p>): ''}


      <input
        type='password'
        placeholder='password'
        id='password'
        className='border p-3 rounded-lg'
        onChange={handleChange}
      />
      {passwordError ? (<p className='text-red-700 text-center'> {passwordError} </p>): ''}


      <button
        disabled={isLoading}
        className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
      >
        {isLoading ? 'Updating...': 'Update'}
      </button>

      <Link to={"/add-listing"} 
      className='bg-green-500 rounded-lg p-3 mt-1 text-white uppercase text-center hover:opacity-80'>
        Create a Listing
      </Link>

    </form>




    <div className='flex justify-between mt-5'>
      <span
        className='text-red-700 cursor-pointer'
        onClick={handleDelete}
      >
        Delete account
      </span>
      <span className='text-red-700 cursor-pointer'
       onClick={hanldeSignOut}
      >
        Sign out
      </span>
    </div>

  </div>
  )
}
