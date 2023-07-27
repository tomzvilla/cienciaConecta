import { useState, useEffect } from 'react'

export const useLogin = () =>{
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const login = async (email, password) =>{
        setError(null)
        setIsPending(true)

        // login the user out

        try {
            // const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch login action

            // dispatch({type: 'LOGIN', payload: res.user})

            // update state

            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }
        catch(err){
            if (!isCancelled){
                setIsPending(false)
                console.log(err.message)
                setError(err.message)
            }
        }

    }
    useEffect(() => {
        return () => setIsCancelled(true)
      }, [])
      
  
    return {login, error, isPending}
}