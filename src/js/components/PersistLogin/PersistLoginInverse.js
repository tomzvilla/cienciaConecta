import { Outlet, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { useOutletContext, Navigate } from "react-router-dom"
import useRefreshToken from "../../hooks/useRefreshToken"
import useAuth from "../../hooks/useAuth"

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [persist, setPersist] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    const [openModal, closeModal, modalIsOpen] = useOutletContext()
    const location = useLocation()
    console.log(location)
    if(location.pathname === "/home" || location.pathname === "/login" || location.pathname === "/signup") setPersist(false)

    useEffect(() => {
        let isMounted = true
        const verifyRefreshToken = async () => {
          try {
                await refresh()
          } catch (err) {
            setIsLoading(false)
          } finally {
            isMounted && setIsLoading(false)
          }
        }
        console.log(!auth?.accessToken)
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
      
    }, [isLoading])
  return (
    <>
        {auth ? <Navigate to={"/dashboard"} /> : <Outlet context={[openModal, closeModal, modalIsOpen]}/>}
    </>
  )
}

export default PersistLogin
