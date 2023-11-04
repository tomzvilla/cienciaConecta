import axios from "axios";
import useAuth from "./useAuth"
import { useDispatch } from "react-redux";
import { instanciasActions } from "../../store/instancias-slice";

const useRefreshToken = () => {

  const { setAuth } = useAuth()
  const dispatch = useDispatch()
  const axiosRefresh = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
  })

  const refresh = async () => {
    const response = await axiosRefresh.get('/auth/refresh', {
        withCredentials: true
    })
    setAuth(prev => {
        return {...prev, roles:response.data.roles, accessToken: response.data.token}
    })
    const feria = response?.data?.feria
    dispatch(instanciasActions.cargarEstadoFeria(feria))
    return response.data.token
  }
  
  return refresh
}

export default useRefreshToken