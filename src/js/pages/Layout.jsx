import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

import { useState } from "react"

const Layout = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
      setIsOpen(true)
  }

  const closeModal = () => {
      setIsOpen(false)
  }
  return (
    <>
      <Navbar openModal={openModal} closeModal={closeModal}/>
      <main className="App">
        <Outlet context={[openModal, closeModal, modalIsOpen]}/>
      </main>
    </>
  )
}

export default Layout