import React from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Navbar from "../components/Navbar/Navbar"
import HeroContent from "../components/Home/HeroContent"
import HeroImage from "../components/Home/HeroImage"
import ComoEmpiezo from '../components/Home/ComoEmpiezo'
import Footer from "../components/Footer/Footer"

const Home = () => {
  const {auth} = useAuth()
  console.log(auth)
  return (
    <div className='home'>
        
        <header>
          <Navbar home={true}/>
          <HeroContent/>
          <HeroImage/>
          
        </header>
        
        <main>
          <ComoEmpiezo/>
          
        </main>

        <footer>
          <Footer/>
        </footer>
        



        <Outlet/>
    </div>
  )
}

export default Home