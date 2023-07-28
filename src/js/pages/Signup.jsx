import { useState } from 'react'
import { useFormValidator } from '../hooks/useFormValidator'
import { useNavigate } from 'react-router-dom'

// Components
import Button  from '../components/Button/Button'
import InputField from '../components/InputField/InputField'
import SignupForm from '../components/SignupForm/SignupForm'
import SignupProgress from '../components/SignupProgress/SignupProgress'
import Navbar from '../components/Navbar/Navbar'

import axios from '../../api/axios'
import SignupConfirm from '../components/SignupConfirm/SignupConfirm'
const SIGNUP_URL = '/auth/register'

const Signup = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    cuil: '',
    dni: '',
    cue: '',
    phoneNumber: '',
    position: ''
  })

  const [avanzar, setAvanzar] = useState(false)
  const [confirmar, setConfirmar] = useState(false)

  const navigate = useNavigate()

  const {errors, validateForm, onBlurField} = useFormValidator(formValues)
    
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
      const { name, lastname, email, password, cuil, dni, cue, phoneNumber, position } = formValues
      const response = await axios.post(SIGNUP_URL, 
        JSON.stringify({ nombre: name, apellido: lastname, email, password, cuil, dni, cue, telefono: phoneNumber, cargo: position}),
          {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
          }
      )
      console.log(JSON.stringify(response?.data))
      

      setFormValues({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        cuil: '',
        dni: '',
        cue: '',
        phoneNumber: '',
        position: ''
      })

      navigate('/home')
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


  const handleAvanzar = (e) => {
    e.preventDefault()
    const datos = validateForm({form: formValues , errors, forceTouchErrors: true})
  

    const pasarACuenta = !datos.errors.cue.error & !datos.errors.cuil.error 
                      & !datos.errors.dni.error & !datos.errors.lastname.error 
                      & !datos.errors.name.error & !datos.errors.position.error


    if (avanzar == false && pasarACuenta) {
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
    else if (avanzar == true) {
      setAvanzar(false)
    }

    

  }
      
 
  return (
    <div className='signup'>
      <div className='signup__navbar'>
        <Navbar />
      </div>
      
      
      <SignupProgress avanzar={avanzar} confirmar={confirmar}/>
      


      {!confirmar ?
      <SignupForm personal={!avanzar} handleChange={handleChange} onBlurField={onBlurField} 
                  formValues={formValues}
                  errors={errors} onSubmit={handleSubmit} handleAvanzar={handleAvanzar} handleVolver={handleVolver}/>
                  : <SignupConfirm  formValues={formValues} handleVolver={handleVolver}/>
      }
      </div>
  )
}

export default Signup