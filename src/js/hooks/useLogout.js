import axios from "../../api/axios"
import useAuth from "./useAuth"

import { useDispatch } from "react-redux"
import { loginActions } from "../../store/login-slice"

const useLogout= () => {

    const { setAuth } = useAuth()
    const dispatch = useDispatch()

    const logout = async () => {
        setAuth({})
        try {
            dispatch(loginActions.setLoggingOut(true))
            const res = await axios.get('/auth/logout', {
                withCredentials: true,
            })
            if(res.status === 200) {
                dispatch(loginActions.setLoggingOut(false))
            }
        } catch (err) {
            console.log(err)
        }
    }

    return logout
}

export default useLogout;