// Components

import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'

import LoginForm from '../components/LoginForm/LoginForm'

const LOGIN_URL = '/auth/login'

const Login = () => {
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
      console.log(JSON.stringify(response?.data))
      console.log(JSON.stringify(response?.data.token))
      
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
    <div className='login'>
        {/* <Navbar/> */}

        <LoginForm />


    {/* <Footer/> */}
    </div>
  )
}

export default Login;

