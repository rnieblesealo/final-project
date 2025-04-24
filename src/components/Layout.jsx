import { Outlet } from "react-router-dom"
import { SearchBar } from "./SearchBar";

export const Layout = () => {
  return (
    <div className="w-screen h-screen text-white">
      <h1 className="text-white text-4xl text-center font-extrabold m-6">Home</h1>
      <SearchBar />
      <Outlet />
    </div>
  )
}
