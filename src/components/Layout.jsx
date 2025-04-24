import { Outlet } from "react-router-dom"
import { FaSearch } from "react-icons/fa";

export const Layout = () => {
  return (
    <div className="w-screen h-screen text-white">
      <h1 className="text-white text-4xl text-center font-extrabold m-6">Home</h1>

      <div className="w-full flex justify-center">
        <div className="flex items-center bg-slate-900 p-3 w-80 rounded-2xl">
          <FaSearch className="ml-2 mr-4 text-slate-600 text-xl" />
          <input
            type="text"
            id="name"
            name="name"
            size="10"
            placeholder="Search for anything..."
            className="w-full focus:outline-none placeholder:text-slate-600" />
        </div>
      </div>

      <Outlet />
    </div>
  )
}
