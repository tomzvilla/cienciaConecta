// components
import Button from '../components/Button/Button'
import notAuthorized from '../../assets/user_not_authorized.png'

// hooks
import { useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'

const Unauthorized = () => {
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
    <div className='unauthorized'>
        <img className='unauthorized__img' src={notAuthorized}/>
        <h2 className='unauthorized__title'>USUARIO NO AUTORIZADO</h2>
        <p className='unauthorized__text'>
        No estás autorizado para entrar a esta pantalla. 
        Si crees que esto es un error, porfavor, contáctate con cienciaconecta.utn@gmail.com
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
  )
}

export default Unauthorized