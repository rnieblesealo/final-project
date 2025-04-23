import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { DetailView } from "./pages/DetailView"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Home />} />
          <Route path="/view" element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
