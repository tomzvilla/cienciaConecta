import axios from "../../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {

  const { setAuth } = useAuth()

  const refresh = async () => {
    const response = await axios.get('/auth/refresh', {
        withCredentials: true
    })

    setAuth(prev => {
        console.log(JSON.stringify(prev))
        console.log(response.data)
        return {...prev, roles:response.data.rol, accessToken: response.data.token}
    })

    return response.data.token
  }
  
  return refresh
}

export default useRefreshToken