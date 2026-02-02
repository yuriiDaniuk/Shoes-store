import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { NavBar } from './components/layout/NavBar.tsx'
import { CartPage } from './pages/CartPage.tsx'

export function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  )
}

