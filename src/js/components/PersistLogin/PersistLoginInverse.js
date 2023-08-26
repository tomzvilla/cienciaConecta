import { useState, useEffect } from "react"
import { useOutletContext, Navigate, Outlet } from "react-router-dom"
import useRefreshToken from "../../hooks/useRefreshToken"
import useAuth from "../../hooks/useAuth"
import Spinner from "../Spinner/Spinner"

const PersistLoginInverse = () => {

    const [openModal, closeModal, modalIsOpen] = useOutletContext()
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    
    useEffect(() => {
      let isMounted = true
      const verifyRefreshToken = async () => {
        try {
          await refresh()
        } catch (err) {
          console.error(err)
        } finally {
          isMounted && setIsLoading(false)
        }
      }
  
      !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
  
      return () => isMounted = false
    },[isLoading])
  

  return (
    <>
        { isLoading ? <Spinner /> : auth?.accessToken ? <Navigate to={"/dashboard"} /> : <Outlet context={[openModal, closeModal, modalIsOpen]}/>}
    </>
  )
}

export default PersistLoginInverse
