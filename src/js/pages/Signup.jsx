import { useState } from 'react'
import { useFormValidator } from '../hooks/useFormValidator'
import { useNavigate } from 'react-router-dom'
// Components
import Button  from '../components/Button/Button'
import InputField from '../components/InputField/InputField'

import axios from '../../api/axios'
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
      
  return (
    <div className='signup'>
      <form onSubmit={handleSubmit} className='signup__form'>
          <h2 className='signup__title'> Registrar Usuario </h2>
          <InputField
            label='Nombre: ' 
            name='name'
            type='text'
            onChange={handleChange}
            onBlur={onBlurField}
            value={formValues.name}
            errors={errors.name}
            required={true}
          />
          <InputField
            label='Apellido: ' 
            name='lastname'
            type='text'
            onChange={handleChange}
            onBlur={onBlurField}
            value={formValues.lastname}
            errors={errors.lastname}
            required={true}
          />
          <InputField
            label='DNI' 
            name='dni'
            type='number'
            onChange={handleChange}
            onBlur={onBlurField}
            value={formValues.dni}
            errors={errors.dni}
            required={true}
          />
          <InputField
            label='CUIL' 
            name='cuil'
            type='number'
            onChange={handleChange}
            onBlur={onBlurField}
            value={formValues.cuil}
            errors={errors.cuil}
            required={true}
          />
          <InputField
            label='CUE' 
            name='cue'
            type='number'
            onChange={handleChange}
            onBlur={onBlurField}
            value={formValues.cue}
            errors={errors.cue}
            required={true}
          />
          <InputField
            label='Cargo' 
            name='position'
            type='text'
            onChange={handleChange}
            onBlur={onBlurField}
            value={formValues.position}
            errors={errors.position}
            required={true}
          />
          <InputField
            label='Telefono' 
            name='phoneNumber'
            type='number'
            onChange={handleChange}
            onBlur={onBlurField}
            value={formValues.phoneNumber}
            errors={errors.phoneNumber}
            required={true}
          />
          <InputField
            label='Email' 
            name='email'
            type='email'
            onChange={handleChange}
            onBlur={onBlurField}
            value={formValues.email}
            errors={errors.email}
            required={true}
          />
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
          <InputField 
            label='Repita la contraseña: '
            name='confirmPassword'
            type='password'
            onChange={handleChange}
            onBlur={onBlurField}
            value={formValues.confirmPassword}
            errors={errors.confirmPassword}
            required={true}
          />
          <Button text='Registrarse'/>
          </form>
    </div>
  )
}

export default Signup