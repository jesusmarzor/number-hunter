import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "@/views/Home"
import { Login } from "@/views/Login"
import { PropertiesProvider } from "@/contexts/propertiesContext"
import { ClientProvider } from "@/contexts/clientContext"

const App = () => {
  return (
    <main className="w-full min-h-screen flex justify-center items-center font-eduSABeginner">
      <div className="w-100 h-100 flex flex-col rounded bg-white-medium overflow-hidden p-2">
        <ClientProvider>
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
        </ClientProvider>
      </div>
    </main>
  )
}

export default App