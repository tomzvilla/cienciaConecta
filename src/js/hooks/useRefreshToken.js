import axios from "axios";
import useAuth from "./useAuth"

const useRefreshToken = () => {

  const { setAuth } = useAuth()
  const axiosRefresh = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
  })

  console.log(process.env.REACT_APP_URL_API)

  const refresh = async () => {
    const response = await axiosRefresh.get('/auth/refresh', {
        withCredentials: true
    })
    console.log(response)
    setAuth(prev => {
        return {...prev, roles:response.data.roles, accessToken: response.data.token}
    })
    return response.data.token
  }
  
  return refresh
}

export default useRefreshToken