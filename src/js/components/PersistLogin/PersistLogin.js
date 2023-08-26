import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import useRefreshToken from "../../hooks/useRefreshToken"
import useAuth from "../../hooks/useAuth"
import Spinner from "../Spinner/Spinner"

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    const [openModal, closeModal, modalIsOpen] = useOutletContext()

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
      
    }, [isLoading])
  return (
    <>
        {isLoading 
            ? <Spinner /> 
              : 
              <Outlet context={[openModal, closeModal, modalIsOpen]}/>
        }
    </>
  )
}

export default PersistLogin
