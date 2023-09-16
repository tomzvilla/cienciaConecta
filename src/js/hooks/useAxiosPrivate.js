import { axiosPrivate } from "../../api/axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import useAuth from "./useAuth"
import useLogout from './useLogout'
import { useNavigate } from "react-router-dom"

import Swal from "sweetalert2"

const useAxiosPrivate = () => {

  const refresh = useRefreshToken()
  const { auth } = useAuth()
  const logout = useLogout()
  const navigate = useNavigate()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
            }
            return config
        }, (error) => Promise.reject(error)
    )
  
    const responseIntercept = axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config
            if (error?.response.status === 401 && !prevRequest?.sent) {
                prevRequest.sent = true
                try {
                  const newAcessToken = await refresh()
                  prevRequest.headers['Authorization'] = `Bearer ${newAcessToken}`
                  return axiosPrivate(prevRequest)
                } catch (err) {
                  Swal.fire({
                    title: 'La sesion expiró',
                    text: 'Por favor, inica sesión nuevamente',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
                        logout()
                        navigate('/home',{replace: true})
                    }
                  })
                }

            }
            return Promise.reject(error)
        }
    )
  
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])
  

  return axiosPrivate
}

export default useAxiosPrivate
