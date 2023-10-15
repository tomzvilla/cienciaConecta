import { useState, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import useRefreshToken from "../../hooks/useRefreshToken"
import useAuth from "../../hooks/useAuth"
import Spinner from "../Spinner/Spinner"

import { useSelector } from "react-redux"

const PersistLoginInverse = () => {

    const isLoggingOut = useSelector(state => state.login.isLoggingOut)

    // const [openModal, closeModal, modalIsOpen] = useOutletContext()
    const [openModal, closeModal] = useState(5)
    const modalIsOpen = false
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    
    useEffect(() => {
      let isMounted = true
      const verifyRefreshToken = async () => {
        try {
          if(!isLoggingOut) {
            await refresh()
          } 
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
