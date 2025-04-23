import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <div className="w-screen h-screen">
      <h1 className="text-white text-4xl text-center font-extrabold m-6">Home</h1>
      <Outlet />
    </div>
  )
}
