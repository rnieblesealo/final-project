import { useState, useEffect } from "react"

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    console.log(email, password)

    // sign in w supabase // WARN: not working on UCF due to CORS

    // await signIn(email, password)
  }

  useEffect(() => {
    /*
    async function checkLogin() {
      console.log(await getCurrentUser())
    }
    */
  }, [])

  return (
    <div className="w-screen h-screen text-white">

      <form onSubmit={handleSubmit} className="w-full h-full flex items-center justify-center flex-col gap-4">
        <span className="text-3xl font-bold m-4">Sign In</span>

        <div className="outline-2 outline-white rounded-2xl flex items-center p-4">
          <label htmlFor="email" className="mr-2">
            <FaUser />
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
            placeholder="Email"
            className="focus:outline-0 placeholder:text-gray-600"
          />
        </div>

        <button type="submit" />
      </form>

    </div>
  )
}
