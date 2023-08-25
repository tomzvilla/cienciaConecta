import axios from "../../api/axios"
import useAuth from "./useAuth"

const useLogout= () => {

    const { setAuth } = useAuth()

    const logout = async () => {
        setAuth({})
        try {
            console.log('Iniciando deslogueo')
            const response = await axios('/auth/logout', {
                withCredentials: true
            })
        } catch (err) {
            console.log(err)
        }
    }

    return logout
}

export default useLogout;