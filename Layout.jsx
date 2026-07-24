import { Outlet } from "react-router-dom"
import Navbar from "./src/components/Navbar"
import { AuthProvider } from "./src/components/AuthContext"

const Layout = () => {
  return (
    <AuthProvider>
      <div className="relative">
        <Navbar/>
        <main className="max-w-6xl px-6 py-8 md:mx-auto mt-17.5">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  )
}

export default Layout