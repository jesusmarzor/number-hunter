import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./views/Home"
import { Login } from "./views/Login"
import { PropertiesProvider } from "./contexts/propertiesContext"

const App = () => {
  return (
    <main className="w-full min-h-screen flex justify-center items-center font-[EduSABeginner]">
      <div className="w-96 h-96 rounded bg-[#F3F3F3] overflow-hidden">
        <PropertiesProvider>
          <BrowserRouter>
            <Routes>
              <Route
                index
                element={<Login />}
              />
              <Route
                path="/:channel"
                element={<Home/>}
              />
            </Routes>
          </BrowserRouter>
        </PropertiesProvider>
      </div>
    </main>
  )
}

export default App