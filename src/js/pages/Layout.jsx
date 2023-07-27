import { Outlet } from "react-router-dom"
import LinkPage from "./LinkPage"

const Layout = () => {
  return (
    <main className="App">
        {/* <LinkPage /> */}
        <Outlet />
    </main>
  )
}

export default Layout