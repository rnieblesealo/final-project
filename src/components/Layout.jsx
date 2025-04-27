import { Outlet } from "react-router-dom"
import { SearchBar } from "./SearchBar";
import { useEffect } from "react"
import { getSession } from "../scripts/client"
import { useNavigate } from "react-router-dom"

export const Layout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // user will always land here
    // they will be taken to signin screen if they arent authd
    async function redirectIfNotSignedIn() {
      const signedIn = await getSession()
      if (!signedIn) {
        navigate("/signin")
      }
    }

    redirectIfNotSignedIn()
  }, [navigate])

  return (
    <div className="w-screen h-screen text-white">
      <h1 className="text-white text-4xl text-center font-extrabold m-6">Home</h1>
      <SearchBar />
      <Outlet />
    </div>
  )
}
