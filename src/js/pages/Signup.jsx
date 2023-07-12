import { useState } from 'react'
import { useFormValidator } from '../hooks/useFormValidator'

import Button  from '../components/Button/Button'

export default function Signup() {
  const [formValues, setFormValues] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    cuil: '',
    dni: '',
    cue: '',
    rol: '',
    status: ''
  })

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
    
  const handleSubmit = (e) => {
    e.preventDefault()
    const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})

    if(!isValid) return

    console.log('Se mando XD')

  }
  //   useEffect(() => {
  //     if(Object.keys(formErrors).length === 0 & isSubmited){
  //         //  call login function
  //     }
  
  //   }, [formErrors, isSubmited])
      
  return (
    <div className='signup'>
      <form onSubmit={handleSubmit} className='signup__form'>
          <h2 className='signup__title'> Registrar Usuario </h2>
          <label className='signup__label'>
              <span className='signup__span'>Nombre </span>
              <input
                  className='signup__input'
                  name='name'
                  type='text'
                  onChange={handleChange}
                  onBlur={onBlurField}
                  value={formValues.name}
              />
          </label>
          {errors.name?.dirty && errors.name.error ? (<small className='signup__error'>{errors.name.message}</small>) : null} 
          <label className='signup__label'>
              <span className='signup__span'>Apellido </span>
              <input
                  className='signup__input'
                  name='lastname'
                  type='text'
                  onChange={handleChange}
                  onBlur={onBlurField}
                  value={formValues.lastname}
              />
          </label>
          {errors.lastname?.dirty && errors.lastname.error ? (<small className='signup__error'>{errors.lastname.message}</small>) : null} 
          <label className='signup__label'>
              <span className='signup__span'>DNI </span>
              <input
                  className='signup__input'
                  name='dni'
                  type='number'
                  onChange={handleChange}
                  onBlur={onBlurField}
                  value={formValues.dni}
              />
          </label>
          {errors.dni?.dirty && errors.dni.error ? (<small className='signup__error'>{errors.dni.message}</small>) : null} 
          <label className='signup__label'>
              <span className='signup__span'>CUIL </span>
              <input
                  className='signup__input'
                  name='cuil'
                  type='number'
                  onChange={handleChange}
                  onBlur={onBlurField}
                  value={formValues.cuil}
              />
          </label>
          {errors.cuil?.dirty && errors.cuil.error ? (<small className='signup__error'>{errors.cuil.message}</small>) : null} 
          <label className='signup__label'>
              <span className='signup__span'>Email </span>
              <input
                  className='signup__input'
                  name='email'
                  type='email'
                  onChange={handleChange}
                  onBlur={onBlurField}
                  value={formValues.email}
              />
          </label>
          {errors.email.dirty && errors.email.error ? (<small className='signup__error'>{errors.email.message}</small>) : null} 
          <label className='signup__label'> 
              <span className='signup__span'>Contraseña </span>
              <input
                  className='signup__input'
                  name = 'password'
                  type='password'
                  onChange={handleChange}
                  onBlur={onBlurField}
                  value={formValues.password}
              />
          </label>
          {errors.password.dirty && errors.password.error ? (<small className='signup__error'>{errors.password.message}</small>) : null} 
          <Button text='Registrarse'/>
          </form>
    </div>
  )
}
