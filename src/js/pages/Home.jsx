import React from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const {auth} = useAuth()
  console.log(auth)
  return (
    <div className='home'>
        <h2>Este es el HOME</h2>
        <Outlet/>
    </div>
  )
}
