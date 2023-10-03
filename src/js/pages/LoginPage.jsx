// Components
import LoginForm from '../components/LoginForm/LoginForm'
import Metadata from '../components/Metadata/Metadata';
import Card from '../components/Card/Card';
// hooks

const LoginPage = () => {


  return (
    <>
      <Metadata title={'Login'}/>
      <Card title={'Iniciar sesión'}>
        <LoginForm />
      </Card>

    </>
  )
}

export default LoginPage;

