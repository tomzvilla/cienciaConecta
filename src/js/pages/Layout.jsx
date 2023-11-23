import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import Sidebar from "../components/Sidebar/Sidebar"
import { Toaster } from 'sonner';
import { useLocation } from 'react-router-dom';

import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const [notificationPosition, setNotificationPosition] = useState('bottom-right')

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // Agrega el event listener para manejar el cambio de tamaño de la ventana
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize.width < 600) {
      setNotificationPosition('top-center');
    } else {
      setNotificationPosition('bottom-right');
    }
  }, [windowSize.width]);

  const { auth } = useAuth()

  const openModal = () => {
      setIsOpen(true)
  }

  const closeModal = () => {
      setIsOpen(false)
  }


  const location = useLocation();

  const home = location.pathname === '/' ? true : location.pathname === '/home' ? true : false;
  const signup = location.pathname === '/signup' ? true : false;

  const showSidebar = useSelector(state => state.ui.sidebar)

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
        { auth?.accessToken ? <aside className="layout__side"> <Sidebar /> </aside> : null }
        <main className={showSidebar ?  "layout__main layout__main--full-width" : "layout__main" }>
          <Toaster position={notificationPosition} closeButton  />
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