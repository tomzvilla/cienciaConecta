import axios from "axios";
import useAuth from "./useAuth"

const useRefreshToken = () => {

  const { setAuth } = useAuth()
  const axiosRefresh = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
  })

  const refresh = async () => {
    const response = await axiosRefresh.get('/auth/refresh', {
        withCredentials: true
    })
    setAuth(prev => {
        return {...prev, roles:response.data.roles, accessToken: response.data.token}
    })
    return response.data.token
  }
  
  return refresh
}

export default useRefreshToken