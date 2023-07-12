import Button  from '../components/Button/Button'
import { useState } from 'react'
import { useFormValidator } from '../hooks/useFormValidator'

export default function Login() {
  const [formValues, setFormValues] = useState({
     email: '',
     password: ''
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
            />
        </label>
        {errors.email.dirty && errors.email.error ? (<p className='login__error'>{errors.email.message}</p>) : null} 
        <label className='login__label'> 
            <span className='login__span'>Contraseña: </span>
            <input
                className='login__input'
                name = 'password'
                type='password'
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.password}
            />
        </label>
        {errors.password.dirty && errors.password.error && <p className='login__error'>{errors.password.message}</p>}
        <Button text='Ingresar'/>
    </form>
    </div>
  )
}
