import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useSelector } from 'react-redux'

const RequireAuth = ({ allowedRoles, allowedStates }) => {
    const { auth } = useAuth()
    const location = useLocation()
    const feria = useSelector(state => state.instancias.feria)
    const check = allowedStates?.length > 0
    console.log(feria)

    return (
        
        auth?.roles?.find(role => allowedRoles?.includes(role)) && ( !check || allowedStates.includes(feria?.estado)) ? 
        <Outlet /> : auth?.accessToken ? <Navigate to='/unauthorized' state={{ from: location }} replace/> : <Navigate to='/login' state={{ from: location }} replace />
        
    )
}
export default RequireAuth