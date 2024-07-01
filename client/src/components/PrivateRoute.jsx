// Here is a route to protect our componets form unauthenticated users so if the user is not authenticted he will never access our components

import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoute = () => {
  const currentUser = useSelector(state => state.user.userData)
    //   here Outlet component is the child component 'profile' in this case of the wrapper component 'PrivateRoute' in this case
  return currentUser ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateRoute