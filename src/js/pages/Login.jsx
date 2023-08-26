// Components
import LoginForm from '../components/LoginForm/LoginForm'
import Modal from '../components/Modal/Modal'

// hooks
import { useState } from 'react'

const Login = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Modal title="Iniciar Sesión" component={<LoginForm />} setIsOpen={setIsOpen}/>
    </>
  )
}

export default Login;

