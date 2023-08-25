import axios from "axios";
import useAuth from "./useAuth"

const useRefreshToken = () => {

  const { setAuth } = useAuth()
  const axiosRefresh = axios.create({
    baseURL: 'http://localhost:3100/api/v1',
  })

  const refresh = async () => {
    console.log('se llamo al refresh')
    const response = await axiosRefresh.get('/auth/refresh', {
        withCredentials: true
    })
    console.log(response.status)
    setAuth(prev => {
        console.log(JSON.stringify(prev))
        console.log(response.data)
        return {...prev, roles:response.data.roles, accessToken: response.data.token}
    })
    console.log(response.data)
    return response.data.token
  }
  
  return refresh
}

export default useRefreshToken