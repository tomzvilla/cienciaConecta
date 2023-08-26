import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Navbar from "../components/Navbar/Navbar"
import HeroContent from "../components/Home/HeroContent"
import HeroImage from "../components/Home/HeroImage"
import ComoEmpiezo from '../components/Home/ComoEmpiezo'
import Footer from "../components/Footer/Footer"
import { useState } from "react"
import Modal from '../components/Modal/Modal'
import LoginForm from '../components/LoginForm/LoginForm'

const Home = (props) => {

  // const [modalIsOpen, setIsOpen] = useState(false)

  //   const openModal = () => {
  //       setIsOpen(true)
  //   }

  //   const closeModal = () => {
  //       setIsOpen(false)
  //   }
  const [openModal, closeModal, modalIsOpen] = useOutletContext()
  return (
    <>
      {modalIsOpen ? <Modal title="Iniciar Sesión" component={<LoginForm />} setIsOpen={closeModal} /> : ""}
      <div className='home'>
        

          <HeroContent/>
          <HeroImage/>

          <ComoEmpiezo openModal={openModal} closeModal={closeModal}/>
          




        <Outlet/>
    </div>
    
    
    
    </>
    
  )
}

export default Home