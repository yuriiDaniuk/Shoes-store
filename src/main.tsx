import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import { Home } from './pages/Home.tsx'
import { NavBar } from './components/layout/NavBar.tsx'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <div>
        <NavBar />
        <Home />
      </div>
    </Provider>
  </StrictMode>,
)
