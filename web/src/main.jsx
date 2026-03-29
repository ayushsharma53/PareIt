import { StrictMode } from 'react'
import { createRoot} from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import {ToastProvider} from '../components/ui/Toast.jsx'
import { ProfileProvider } from '../components/Context/ProfileContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ToastProvider>
    <ProfileProvider>
    <App />
    </ProfileProvider>
    </ToastProvider>
  </BrowserRouter>,
  </StrictMode>
)
