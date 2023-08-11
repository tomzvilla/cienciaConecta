// Components

import { useState } from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import Modal from '../components/Modal/Modal'

const Login = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Modal title="Iniciar Sesión" component={<LoginForm />} setIsOpen={setIsOpen}/>    
    </>
  )
}

export default Login;

