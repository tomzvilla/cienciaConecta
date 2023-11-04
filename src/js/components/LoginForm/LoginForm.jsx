// components
import Button  from '../Button/Button'
import InputField from '../InputField/InputField'
import LoginFormLink from '../LoginFormLink/LoginFormLink'
import RecoverPasswordLink from '../RecoverPasswordLink/RecoverPasswordLink'
// hooks
import { useState } from 'react'
import { useFormValidator } from '../../hooks/useFormValidator'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { instanciasActions } from '../../../store/instancias-slice'
import axios from '../../../api/axios'
import Swal from 'sweetalert2'

const LOGIN_URL = '/auth/login'


const LoginForm = () => {
    const [formValues, setFormValues] = useState({
        cuil: '',
        password: ''
      })
      const [loading, setLoading] = useState(false)
      const { setAuth } = useAuth()
      const {errors, validateForm, onBlurField} = useFormValidator(formValues)
      const navigate = useNavigate()
      const location = useLocation()
      const from = location.state?.from?.pathname || '/dashboard'
      const dispatch = useDispatch()
    
      const handleChange = (e) => {
        let {name, value} = e.target
        if(name === 'cuil'){
          value = formatCuil(value)
        }
        const nextFormValueState = {
          ...formValues,
          [name]: value
        }
        
        setFormValues(nextFormValueState)
        if (errors[name].dirty){
          validateForm({form: nextFormValueState, errors, name})
        }
      }

      const formatCuil = (input) => {
        // Eliminar todos los caracteres no numéricos
        const numericInput = input.replace(/\D/g, '');
    
        // Aplicar el formato con guiones
        if (numericInput.length <= 2) {
          return numericInput;
        } else if (numericInput.length <= 10) {
          return `${numericInput.slice(0, 2)}-${numericInput.slice(2)}`;
        } else {
          return `${numericInput.slice(0, 2)}-${numericInput.slice(2, 10)}-${numericInput.slice(10, 11)}`;
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})
        if(!isValid) return

        try {
          const { cuil, password } = formValues
          const numericCuil = cuil.replace(/\D/g, '');
          setLoading(true)
          const response = await axios.post(LOGIN_URL, 
            JSON.stringify({cuil: numericCuil, password}),
              {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
    
              }
          )
          setLoading(false)

          const accessToken = response?.data?.token
          const roles = response?.data?.roles
          const refreshExpiresIn = response?.data?.refreshExpiresIn
          const feria = response?.data?.feria
          dispatch(instanciasActions.cargarEstadoFeria(feria))
          // save refresh expiration in local storage
          localStorage.setItem("refreshExpiresIn",refreshExpiresIn);
          setAuth({ cuil, password, roles, accessToken, feria })
    
          setFormValues({
            cuil: '',
            password: ''
          })
          navigate(from, { replace: true })
        } catch (err) {
          setLoading(false)
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
                type='text'
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

            

            {!loading ? 
            <div className='login-form__button'>
                <Button text='Ingresar' activo={true}/>
            </div>
            :
            <div className='login-form__button'>
                <Button text='Cargando...' activo={true} disabled={true}/>
            </div>
            }

            <div className='login-form__link-container'>
              <LoginFormLink/>
            </div>
            <div className='login-form__recover-container'>
              <RecoverPasswordLink/>
            </div>
        </form>
    )
}


export default LoginForm;