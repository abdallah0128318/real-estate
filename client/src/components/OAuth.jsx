import { app } from "../firebase"
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import {useDispatch} from 'react-redux'
import { signinSuccess } from "../state_slices/userSlice"
import { useNavigate } from 'react-router-dom'


const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleoAuth = async ()=> {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      // send data to the server-side to be stored into database
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        })
      })
      const data = await res.json()
      dispatch(signinSuccess(data))
      navigate('/')
    } catch (error) {
      console.log('couldn`t signin with google', error);
    }

  }
  return (
    <>
        <button type='button' onClick={handleoAuth} className='block w-full p-2 my-3 hover:opacity-70 disabled:opacity-70
        rounded-lg bg-red-700 text-white'>Continue with Google</button>
    </>
  )
}

export default OAuth