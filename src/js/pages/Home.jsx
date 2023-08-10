import React from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Navbar from "../components/Navbar/Navbar"
import HeroContent from "../components/HeroContent/HeroContent"
import HeroImage from "../components/HeroImage/HeroImage"
import ComoEmpiezo from '../components/ComoEmpiezo/ComoEmpiezo'
import Footer from "../components/Footer/Footer"
import { useState } from "react"
import Modal from '../components/Modal/Modal'
import LoginForm from '../components/LoginForm/LoginForm'

const Home = () => {
  const {auth} = useAuth()
  console.log(auth)

  const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

  return (
    <>
      {modalIsOpen ? <Modal title="Iniciar Sesión" component={<LoginForm />} setIsOpen={closeModal} /> : ""}

      <div className='home'>
        
        <header>
          <Navbar openModal={openModal} closeModal={closeModal}/>
          <HeroContent/>
          <HeroImage/>
          
        </header>
        
        <main>
          <ComoEmpiezo openModal={openModal} closeModal={closeModal}/>
          
        </main>

        <footer>
          <Footer/>
        </footer>
        



        <Outlet/>
    </div>
    
    
    
    </>
    
  )
}

export default Home