import Button  from '../components/Button/Button'
import { useState } from 'react'
import { useFormValidator } from '../hooks/useFormValidator'
import useAuth from '../hooks/useAuth'

import axios from '../../api/axios'

const LOGIN_URL = '/api/v1/auth/login'

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const {errors, validateForm, onBlurField} = useFormValidator(formValues)

  const { setAuth } = useAuth()

  const handleChange = (e) => {
    const {name, value} = e.target
    const nextFormValueState = {
      ...formValues,
      [name]: value
    }
    setFormValues(nextFormValueState)
    if (errors[name].dirty){
      validateForm({form: nextFormValueState, errors, name})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})
    if(!isValid) return

    try {
      const { email, password } = formValues
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({email, password}),
          {
            headers: {'Content-Type': 'application/json'},
            withCredentials: false

          }
      )
      console.log(JSON.stringify(response?.data))

      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      setAuth({email, password, roles, accessToken})

      setFormValues({
        email: '',
        password: ''
      })
    } catch (err) {
      if(!err?.response){
        console.log('El servidor no respondio')
      } else if(err.response?.status === 403) {
        console.log('Datos incorrectos intente nuevamente')
      } else if(err.response?.status === 401) {
        console.log('No estas autorizado para realizar esta operacion')
      } else {
        console.log('Fallo el logueo')
      }

    }
    console.log('Se mando XD')
  }

  // useEffect(() => {
  //   if(Object.keys(errors).length === 0 ){
  //       //  call login function
  //   }

  // }, [errors])
  
  return (
    <div className='login'>
        <form onSubmit={handleSubmit} className='login__form'>
        <h2 className='login__title'> Iniciar Sesión </h2>
        <label className='login__label'>
            <span className='login__span'>Email: </span>
            <input
                className='login__input'
                name='email'
                type='email'
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.email}
                required
            />
        </label>
        {errors.email.dirty && errors.email.error ? (<small className='login__error'>{errors.email.message}</small>) : null} 
        <label className='login__label'> 
            <span className='login__span'>Contraseña: </span>
            <input
                className='login__input'
                name = 'password'
                type='password'
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.password}
                required
            />
        </label>
        {errors.password.dirty && errors.password.error && <p className='login__error'>{errors.password.message}</p>}
        <Button text='Ingresar'/>
    </form>
    </div>
  )
}
