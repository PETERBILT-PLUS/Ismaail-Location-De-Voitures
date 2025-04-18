import './index.css'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <>
    <HelmetProvider>
      <ToastContainer />
      <App />
    </HelmetProvider>
  </>,
)
