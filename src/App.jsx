import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { DetailView } from "./pages/DetailView"
import { CreateReview } from "./pages/CreateReview"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Home />} />
          <Route path="/view/:songId" element={<DetailView />} />
          <Route path="/createreview/:songId" element={<CreateReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
