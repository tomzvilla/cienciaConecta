// Components
import Button  from '../Button/Button'
import InputField from '../InputField/InputField'
import LoginFormLink from '../LoginFormLink/LoginFormLink'


// Other imports
import { useState } from 'react'
import { useFormValidator } from '../../hooks/useFormValidator'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from '../../../api/axios'

import ModalHeader from '../Modal/ModalHeader'


const LOGIN_URL = '/auth/login'


const LoginForm = () => {
    const [formValues, setFormValues] = useState({
        cuil: '',
        password: ''
      })
      const { setAuth } = useAuth()
      const {errors, validateForm, onBlurField} = useFormValidator(formValues)
      const navigate = useNavigate()
      const location = useLocation()
      const from = location.state?.from?.pathname || '/home'
    
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
          const { cuil, password } = formValues
          const response = await axios.post(LOGIN_URL, 
            JSON.stringify({cuil, password}),
              {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
    
              }
          )

          const accessToken = response?.data?.token
          const roles = response?.data?.roles
    
          setAuth({cuil, password, roles, accessToken})
    
          setFormValues({
            cuil: '',
            password: ''
          })
          navigate(from, { replace: true })
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


    return (
        <form onSubmit={handleSubmit} className='login-form'>

            <div className='login-form__input login-form__input--first'>
                <InputField
                label='CUIL' 
                name='cuil'
                placeholder="CUIL"
                type='number'
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.cuil}
                errors={errors.cuil}
                required={true}
                />
            </div>

            <div className='login-form__input'>
                <InputField 
                label='Contraseña: '
                name='password'
                type='password'
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.password}
                errors={errors.password}
                required={true}
                />
            </div>

            

            <div className='login-form__button'>
                <Button text='Ingresar' activo={true}/>
            </div>

            <div className='login-form__link-container'>
              <LoginFormLink/>
            </div>
          
            
            
            
        </form>
    )
}


export default LoginForm;