import { BrowserRouter, Routes, Route } from "react-router"
import './App.css'

import Homepage from "./pages/homepage"
import Payment from "./pages/payment"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='/checkout' element={<Payment />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
