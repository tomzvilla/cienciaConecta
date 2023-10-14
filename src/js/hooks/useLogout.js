import axios from "../../api/axios"
import useAuth from "./useAuth"

const useLogout= () => {

    const { setAuth } = useAuth()

    const logout = async () => {
        setAuth({})
        try {
            const res = await axios.get('/auth/logout', {
                withCredentials: true,
                credentials: "include",
            })
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return logout
}

export default useLogout;