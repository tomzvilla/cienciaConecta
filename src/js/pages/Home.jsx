import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import HeroContent from "../components/Home/HeroContent"
import HeroImage from "../components/Home/HeroImage"
import ComoEmpiezo from '../components/Home/ComoEmpiezo'
import Modal from '../components/Modal/Modal'
import LoginForm from '../components/LoginForm/LoginForm'
import Navbar from '../components/Navbar/Navbar'
import Metadata from '../components/Metadata/Metadata'
const Home = (props) => {

  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
      setIsOpen(true)
  }

  const closeModal = () => {
      setIsOpen(false)
  }

  

  return (
    <>
      <Metadata title={'Home'}/>
      <nav className="layout__nav">
        <Navbar openModal={openModal} closeModal={closeModal} home={'/home'}/>
      </nav>

      <div className='home'>
        {modalIsOpen ? <Modal title="Iniciar Sesión" component={<LoginForm />} setIsOpen={closeModal} /> : ""}
           
          <HeroContent/>
          <HeroImage/>

          <ComoEmpiezo openModal={openModal} closeModal={closeModal}/>
         
        <Outlet/>
      </div>
    
    </>
    
  )
}

export default Home