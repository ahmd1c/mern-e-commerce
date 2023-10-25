
import './App.css'
import { createBrowserRouter , RouterProvider , createRoutesFromElements , Route } from "react-router-dom"
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import RootLayout from './mainComponents/appLayout/RootLayout'
import Product from './pages/singleProduct/Product'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import Settings from './pages/user/settings/Settings'

function App() {
  
  const Router = createBrowserRouter(createRoutesFromElements(
    <Route path="/"  element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="product/:id" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/user" element={<Settings />} />
    </Route>
  ))

  return (
    <>
      <RouterProvider router={Router}  />
    </>
  )
}

export default App
