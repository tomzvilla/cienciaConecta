// components
import Button from '../components/Button/Button'
import notFound from '../../assets/not_found.png'
// hooks
import useAuth from '../hooks/useAuth'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'

const NotFound = () => {
  const { auth } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const logout = useLogout()

  const signOut = async () => {
    await logout()
    navigate('/home')
  }

  const volverInicio = () => {
    navigate('/dashboard', { replace: true })
  }

  return (
    auth?.accessToken ? 
    (<div className='not-found'>
        <img className='not-found__img' src={notFound} alt='Imágen que representa página no encontrada'/>
        <h2 className='not-found__title'>PÁGINA NO ENCONTRADA</h2>
        <p className='not-found__text'>
          La página que estás buscando no existe.
        </p>
        <div className='not-found__buttons'>
          <Button 
            text='Salir' 
            onClickHandler={signOut}
          />
          <Button 
            text='Inicio'
            onClickHandler={volverInicio} 
            activo={true}
          />
        </div>
    </div> )
    : 
    (<Navigate to='/home' state={{ from: location }} replace />)
  )
  
}

export default NotFound
