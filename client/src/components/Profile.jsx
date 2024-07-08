import { useSelector } from 'react-redux'
import { deleteFail, deleteSuccess, signOutFail, signOutSuccess } from '../state_slices/userSlice';
import { useDispatch } from 'react-redux';
export default function Profile() {
  const dispatch = useDispatch()
  const errmsg = useSelector(state => state.user.errorMsg)
  const currentUser = useSelector(state => state.user.userData)

  // A function to handle user deletion
  const handleDelete = async ()=> {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  // A function to handle user signOut functionality
  const hanldeSignOut = async() => {
    try {
      const res = await fetch('/api/auth/signOut');
      if(res.status == 200)
      {
        dispatch(dispatch(signOutSuccess()))
      }
      else{
        const data = await res.json()
        dispatch(dispatch(signOutFail(data)))
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

    <p className='text-red-700 text-center mt-5'>{errmsg ? errmsg : ''}</p>

    <form className='flex flex-col gap-4'>
      <input
        type='file'
      />
      <img
        src={currentUser.photo}
        alt='profile'
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
      />

      <input
        type='text'
        placeholder='username'
        id='username'
        className='border p-3 rounded-lg'
      />
      <input
        type='email'
        placeholder='email'
        id='email'
        className='border p-3 rounded-lg'
      />
      <input
        type='password'
        placeholder='password'
        id='password'
        className='border p-3 rounded-lg'
      />
      <button
        className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
      >
        update
      </button>
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
