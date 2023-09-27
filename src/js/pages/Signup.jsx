// hooks
import { useState } from 'react'
import { useFormValidator } from '../hooks/useFormValidator'
import { useNavigate } from 'react-router-dom'

// Components
import SignupForm from '../components/Signup/SignupForm'
import SignupProgress from '../components/Signup/SignupProgress'
import SignupConfirm from '../components/Signup/SignupConfirm'
import Metadata from '../components/Metadata/Metadata'

import axios from '../../api/axios'
import Swal from 'sweetalert2'
const SIGNUP_URL = '/auth/register'

const Signup = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    cuil: '',
    phoneNumber: '',
    position: ''
  })

  const [avanzar, setAvanzar] = useState(false)
  const [confirmar, setConfirmar] = useState(false)

  const navigate = useNavigate()

  const {errors, validateForm, onBlurField} = useFormValidator(formValues)
    
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
      const { name, lastname, email, password, cuil, phoneNumber, position } = formValues
      const numericCuil = cuil.replace(/\D/g, '')
      const response = await axios.post(SIGNUP_URL, 
        JSON.stringify({ nombre: name, apellido: lastname, email, password, cuil: numericCuil, telefono: phoneNumber, cargo: position}),
          {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
          }
      )
      
      if(response.status === 201) {
        Swal.fire({
          title: 'Registro confirmado',
          text: '¡Te registraste con éxito en CienciaConecta! Ahora debes esperar que un administrador autorice tu cuenta',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#00ACE6',
        }).then((result) => {
          if(result.isConfirmed || result.isDismissed) {
            navigate('/home')
          }
        })
      }

      setFormValues({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        cuil: '',
        phoneNumber: '',
        position: ''
      })


    } catch (err) {
      let msg = ''
      if(!err?.response){
        msg = 'El servidor no respondió'
      } else if(err.response?.status === 403) {
        msg = 'Datos incorrectos intente nuevamente'
      } else if(err.response?.status === 401) {
        msg = 'No estas autorizado para realizar esta operación'
      } else {
        msg = `Falló el registro <br> ${err.response.data.errors[0].msg}`
      }
      Swal.fire({
        html: msg,
        title: 'Registro NO confirmado',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#00ACE6',
      })
    }

  }


  const handleAvanzar = (e) => {
    e.preventDefault()
    let fieldsToExclude = []
    if(!avanzar) {
      fieldsToExclude = ['password', 'confirmPassword','phoneNumber', 'email']
    }

    const datos = validateForm({form: formValues , errors, forceTouchErrors: true, fieldsToExclude: fieldsToExclude })
  

    // const pasarACuenta = !datos.errors.cue.error & !datos.errors.cuil.error 
    //                   & !datos.errors.dni.error & !datos.errors.lastname.error 
    //                   & !datos.errors.name.error & !datos.errors.position.error

    const pasarACuenta = true


    if (avanzar === false && pasarACuenta) {
      setAvanzar(true)   
    }

    else if (datos.isValid) {
      setConfirmar(true)
    }

  }

  const handleVolver = (e) => {
    if (confirmar){
      setConfirmar(false)
    }
    else if (avanzar === true) {
      setAvanzar(false)
    }

    

  }
      
 
  return (
    <>
      <Metadata title={'Registrarme'}/>
      <div className='signup'>
      <SignupProgress avanzar={avanzar} confirmar={confirmar}/>
      
      {!confirmar ?
      <SignupForm personal={!avanzar} handleChange={handleChange} onBlurField={onBlurField} 
                  formValues={formValues}
                  errors={errors} onSubmit={handleSubmit} handleAvanzar={handleAvanzar} handleVolver={handleVolver}/>
                  : <SignupConfirm  formValues={formValues} handleVolver={handleVolver} handleSubmit={handleSubmit}/>
      }
      </div>
    </>
  )
}

export default Signup