
import './App.css'
import { createBrowserRouter , RouterProvider , createRoutesFromElements , Route } from "react-router-dom"
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import RootLayout from './mainComponents/appLayout/RootLayout'

function App() {
  
  const Router = createBrowserRouter(createRoutesFromElements(
    <Route path="/"  element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      {/* <Route path="products/:id" element={<Products />} /> */}
    </Route>
  ))

  return (
    <>
      <RouterProvider router={Router}  />
    </>
  )
}

export default App
