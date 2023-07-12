export default function Signup() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        cuit: '',
        dni: '',
        cue: '',
        institutionName: '',

      })
      const [formErrors, setFormErrors] = useState({ })
      const [isSubmited, setIsSubmited] = useState(false)
    
    
      const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]: value})
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(handleValidate(formValues))
        setIsSubmited(true)
      }
    
      const handleValidate = (values) => {
        const {email, password} = values
        const errors = {}
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i; // eslint-disable-line
        if(!email) {
            errors.email = 'Se requiere el email'
        } else if (!regex.test(email)){
            errors.email = 'Se debe ingresar un email valido'
        }
        if(!password) {
            errors.password = 'Se requiere la contraseña'
        }
        console.log(errors)
        return errors
      }
    
    //   useEffect(() => {
    //     if(Object.keys(formErrors).length === 0 & isSubmited){
    //         //  call login function
    //     }
    
    //   }, [formErrors, isSubmited])
      
    return (
      <div className='login'>
        <form onSubmit={handleSubmit} className='login__form'>
            <h2 className='login__title'> Iniciar Sesión </h2>
            <label className='login__label'>
                <span className='login__span'>Email: </span>
                <input
                    onBlur={() => setFormErrors(handleValidate(formValues))}
                    className='login__input'
                    name='email'
                    type='email'
                    onChange={handleChange}
                    value={formValues.email}
                />
            </label>
            <small className='login__error'>{formErrors.email}</small>
            <label className='login__label'> 
                <span className='login__span'>Contraseña: </span>
                <input
                    onBlur={() => setFormErrors(handleValidate(formValues))}
                    className='login__input'
                    name = 'password'
                    type='password'
                    onChange={handleChange}
                    value={formValues.password}
                />
            </label>
            <small className='login__error'>{formErrors.password}</small>
            <button className='login__btn'> Ingresar </button>
            </form>
      </div>
  )
}
