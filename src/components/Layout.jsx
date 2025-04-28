import { Outlet } from "react-router-dom"
import { SearchBar } from "./SearchBar";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom"
import { MdLibraryMusic } from "react-icons/md";
import { useState, useEffect } from "react"
import { getSession, signOutUser } from "../scripts/client"
import { useNavigate } from "react-router-dom"

export const Layout = () => {
  const navigate = useNavigate()

  const [userMetadata, setUserMetadata] = useState(null)

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

    async function loadSessionData() {
      // get all session data
      const { user: sessionData } = await getSession()

      // get more specific user metadata
      const { user_metadata: userMetadata } = sessionData
      setUserMetadata(userMetadata)
    }

    // if we do sign in, pull username from session info and set it
    loadSessionData()

  }, [navigate])

  // if user clicks sign out theyre signed out and taken back to signin screen
  async function handleSignOut() {
    const signedOut = await signOutUser()
    if (signedOut) {
      navigate("/signin")
    }
  }

  return (
    <div className="w-full h-min text-white mb-12">
      <div className="w-full flex flex-col justify-center items-center relative">
        <h1 className="relative w-min text-white text-4xl text-center font-extrabold flex items-center mt-4 mb-1"><MdLibraryMusic className="mr-2" /> Tunecrate</h1>

        <div className="relative flex items-center mt-1 mb-2 text-xs">
          <span className="text-gray-500">
            Logged in as
            <span className="font-bold text-white mx-1">{userMetadata?.username}</span>
          </span>
          <button
            onClick={handleSignOut}
            className="outline-1 outline-red-700 text-red-700 font-bold rounded-lg px-2 py-1 cursor-pointer ml-1">
            Sign Out
          </button>
        </div>

        <Link
          to="/"
          className="outline-1 flex items-center font-bold my-4 text-white rounded-lg p-2 text-sm">
          <FaHouse className="mr-1" />Home
        </Link>

      </div>
      <SearchBar />
      <Outlet />
    </div>
  )
}
