import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form action="">
        <h2> Iniciar Sesión </h2>
        <label>
            <span>Email: </span>
            <input
                required
                type='email'
                onChange={setEmail(e.target.value)}
                value={email}
            />
        </label>
        <label>
            <span>Contrase;a: </span>
            <input
                required
                type='password'
                onChange={setPassword(e.target.value)}
                value={password}
            />
        </label>
    </form>
  )
}
