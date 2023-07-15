import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth()
    const location = useLocation()
    let pasa = false
    console.log('XD')
    console.log(auth)
    if(auth?.roles === 6) {
        pasa = true
    }

    return (
        //auth?.roles?.find(role => allowedRoles?.includes(role)) ? <Outlet /> : auth?.email ? <Navigate to='/unauthorized' state={{ from: location }} replace/> : <Navigate to='/login' state={{ from: location }} replace />
        pasa ? <Outlet /> : <Navigate to='/unauthorized' state={{ from: location }} replace/>
        
    )
}
export default RequireAuth