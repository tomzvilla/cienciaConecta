import { Outlet } from "react-router-dom"
import LinkPage from "./LinkPage"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

import { useState } from "react"

const Layout = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
      console.log('entro al open')
      setIsOpen(true)
  }

  const closeModal = () => {
      setIsOpen(false)
  }
  return (
    <>
      <Navbar openModal={openModal} closeModal={closeModal}/>
      <main className="App">
        {/* <LinkPage /> */}
        <Outlet context={[openModal, closeModal, modalIsOpen]}/>
      </main>
    </>
  )
}

export default Layout