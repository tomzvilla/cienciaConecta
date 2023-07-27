import { Outlet } from "react-router-dom"
import LinkPage from "./LinkPage"

export default function Layout() {
  return (
    <main className="App">
        <LinkPage />
        <Outlet />
    </main>
  )
}
