import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/HomePage.tsx'
import { NavBar } from './components/layout/NavBar.tsx'
import { CartPage } from './pages/CartPage.tsx'
import { ProductPage } from './pages/ProductPage.tsx'
import { Toaster } from 'react-hot-toast'

export function App() {
  return (
    <>
      <NavBar />

      <Toaster position="top-center" reverseOrder={false}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  )
}

