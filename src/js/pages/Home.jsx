import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import HeroContent from "../components/Home/HeroContent"
import HeroImage from "../components/Home/HeroImage"
import ComoEmpiezo from '../components/Home/ComoEmpiezo'
import Footer from "../components/Footer/Footer"
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
      <div className='home'>
        {modalIsOpen ? <Modal title="Iniciar Sesión" component={<LoginForm />} setIsOpen={closeModal} /> : ""}
          <header>
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