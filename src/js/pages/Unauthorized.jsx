// components
import Button from '../components/Button/Button'
import notAuthorized from '../../assets/user_not_authorized.png'
import Metadata from '../components/Metadata/Metadata'
// hooks
import { useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import Card from '../components/Card/Card'

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
    <>
      <Metadata title={'No autorizado'}/>
      <Card title="Usuario no autorizado">
        <div className='unauthorized'>
            <img className='unauthorized__img' src={notAuthorized} alt='No autorizado'/>
            <h4 className='unauthorized__title'>USUARIO NO AUTORIZADO</h4>
            <p className='unauthorized__text'>
            No estás autorizado para entrar a esta pantalla. 
            Si creés que esto es un error, por favor, contactate con cienciaconecta.utn@gmail.com
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
    </>
  )
}

export default Unauthorized