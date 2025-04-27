import { Outlet } from "react-router-dom"
import { SearchBar } from "./SearchBar";
import { useState, useEffect } from "react"
import { getSession, signOutUser } from "../scripts/client"
import { useNavigate } from "react-router-dom"

export const Layout = () => {
  const navigate = useNavigate()

  const [sessionData, setSessionData] = useState(null)
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
      console.log(sessionData)
      setSessionData(sessionData)

      // get more specific user metadata
      const { user_metadata: userMetadata } = sessionData
      console.log(userMetadata)
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
    <div className="w-screen h-screen text-white">
      <div className="w-full flex justify-center items-center relative">
        <h1 className="relative w-full text-white text-4xl text-center font-extrabold m-6">Home</h1>

        <div className="absolute flex items-center right-5">
          <span className="right-10 font-bold mr-2 text-gray-500">
            Logged in as
            <span className="text-white mx-1">{userMetadata?.username}</span>
          </span>
          <button
            onClick={handleSignOut}
            className="bg-red-700 font-bold text-sm rounded-lg p-2 cursor-pointer">
            Sign Out
          </button>
        </div>

      </div>
      <SearchBar />
      <Outlet />
    </div>
  )
}
