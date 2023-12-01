// components
import Button from '../components/Button/Button'
import notFound from '../../assets/not_found.png'
// hooks
import useAuth from '../hooks/useAuth'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import Card from '../components/Card/Card'

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
    (
    <Card title="Página no encontrada">
    <div className='unauthorized'>
        <img className='unauthorized__img' src={notFound} alt='Imágen que representa página no encontrada'/>
        <h2 className='unauthorized__title'>PÁGINA NO ENCONTRADA</h2>
        <p className='unauthorized__text'>
          La página que estás buscando no existe.
        </p>
        <div className='unauthorized__buttons'>
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
    </div> 
    </Card>
    )
    : 
    (<Navigate to='/home' state={{ from: location }} replace />)
  )
  
}

export default NotFound
