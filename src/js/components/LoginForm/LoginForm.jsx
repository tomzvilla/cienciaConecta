// components
import Button  from '../Button/Button'
import InputField from '../InputField/InputField'
import LoginFormLink from '../LoginFormLink/LoginFormLink'
import ModalHeader from '../Modal/ModalHeader'
// hooks
import { useState } from 'react'
import { useFormValidator } from '../../hooks/useFormValidator'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from '../../../api/axios'
import Swal from 'sweetalert2'


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
      const from = location.state?.from?.pathname || '/dashboard'
    
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
          console.log(err.response)
          let msg = ''
          if(!err?.response){
            msg = 'El servidor no respondió'
          } else if(err.response?.status === 403) {
            msg = 'Datos incorrectos intente nuevamente'
          } else if(err.response?.status === 401) {
            msg = 'No estas autorizado para realizar esta operación'
          } else {
            msg = `Falló el logueo <br> ${err.response.data.errors[0].msg}`
          }
          Swal.fire({
            html: msg,
            title: 'No se pudo autenticar al usuario',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#00ACE6',
          })
        }
      }


    return (
        <form onSubmit={handleSubmit} className='login-form'>

            <div className='login-form__input '>
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