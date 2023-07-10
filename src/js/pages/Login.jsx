import { useState } from 'react'
import Button  from '../components/Button/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='login'>
        <form action="" className='login__form'>
        <h2 className='login__title'> Iniciar Sesión </h2>
        <label className='login__label'>
            <span className='login__span'>Email: </span>
            <input
                className='login__input'
                required
                type='email'
                onChange={ (e) => setEmail(e.target.value)}
                value={email}
            />
        </label>
        <label className='login__label'> 
            <span className='login__span'>Contraseña: </span>
            <input
                className='login__input'
                required
                type='password'
                onChange={ (e) => setPassword(e.target.value)}
                value={password}
            />
        </label>
        <Button text='Ingresar'/>
    </form>
    </div>
  )
}
