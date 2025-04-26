import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Layout } from "./components/Layout"
import { SignIn } from "./pages/SignIn"
import { Home } from "./pages/Home"
import { DetailView } from "./pages/DetailView"
import { CreateReview } from "./pages/CreateReview"

import { useState, useEffect } from "react"

// perform auth check when hitting /
// if not auth redirect to signin
// if yes redirect to home
// structure goes public route
//  protected routes (parented by layout)
//  catchall route (for 404s)

function App() {
  const [signedIn, setSignedIn] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={signedIn ? <Layout /> : <SignIn />}>
          <Route index={true} element={<Home />} />
          <Route path="/view/:songId" element={<DetailView />} />
          <Route path="/createreview/:songId" element={<CreateReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
