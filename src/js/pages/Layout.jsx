import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import Sidebar from "../components/Sidebar/Sidebar"

import { useLocation } from 'react-router-dom';

import { useState } from "react"

const Layout = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
      setIsOpen(true)
  }

  const closeModal = () => {
      setIsOpen(false)
  }


  const location = useLocation();

  const home = location.pathname === '/home' ? true : false;

  const signup = location.pathname === '/signup' ? true : false;

  return (
    <div className="layout">
      <nav className="layout__nav">
        <Navbar openModal={openModal} closeModal={closeModal} home={home}/>
      </nav>


      {signup || home ? (

          <>
            <main className="layout__main layout__main--full-width">
              <Outlet context={[openModal, closeModal, modalIsOpen]}/>
            </main> 
            
            <footer className="layout__footer">
              <Footer />
            </footer>
          </>

        ) :
      <>

        
        <aside className="layout__side">
          <Sidebar />
        </aside>
        
        
        <main className="layout__main">
          {/* <LinkPage /> */}
          <Outlet context={[openModal, closeModal, modalIsOpen]}/>
        </main>

        <footer className="layout__footer">
          <Footer />
        </footer>

      </>
      }

      
    </div>
  )
}

export default Layout