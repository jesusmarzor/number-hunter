import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./views/Home"
import { Login } from "./views/Login"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Login />}
        />
        <Route
          path="/:maxNumber/:channel"
          element={<Home/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App