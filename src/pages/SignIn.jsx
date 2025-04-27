import { useState, useEffect } from "react"

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

import { useNavigate } from "react-router-dom"
import { handleSignIn, handleSignUp, getSession } from "../scripts/client"

export const SignIn = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [shouldSignUp, setShouldSignUp] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    console.log(email, password)

    // FIXME: no error reporting here!
    if (shouldSignUp) {
      // sign up
      // if successful try sign in
      // if signin successful go to homepage
      const signUp = await handleSignUp(email, password, username)
      if (signUp) {
        const signIn = await handleSignIn(email, password)
        if (signIn) {
          navigate("/")
        }
      }
      // if just signing in, do that only
    } else {
      const signIn = await handleSignIn(email, password)
      if (signIn) {
        navigate("/")
      }
    }
  }

  return (
    <div className="w-screen h-screen text-white flex flex-col justify-center items-center">

      <form onSubmit={handleSubmit} className="w-min h-min flex items-center justify-center flex-col gap-4">
        <span className="text-3xl font-bold m-4">
          {shouldSignUp ? "Sign Up" : "Sign In"}
        </span>

        {shouldSignUp &&
          <div className="outline-2 outline-white rounded-2xl flex items-center p-4">
            <label htmlFor="usernme" className="mr-2">
              <FaUser />
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="focus:outline-0 placeholder:text-gray-600"
            />
          </div>
        }

        <div className="outline-2 outline-white rounded-2xl flex items-center p-4">
          <label htmlFor="email" className="mr-2">
            <FaEnvelope />
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="focus:outline-0 placeholder:text-gray-600"
          />
        </div>

        <div className="outline-2 outline-white rounded-2xl flex items-center p-4">
          <label htmlFor="password" className="mr-2">
            <FaLock />
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="focus:outline-0 placeholder:text-gray-600"
          />
        </div>

        <button type="submit" />
      </form>

      <button
        onClick={() => setShouldSignUp(!shouldSignUp)}
        className="m-4 text-left underline cursor-pointer">
        {shouldSignUp ? "Sign In" : "Sign Up"}
      </button>

    </div>
  )
}
