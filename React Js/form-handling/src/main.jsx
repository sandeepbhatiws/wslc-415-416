import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/style.css'
import Home from './Home'

createRoot(document.getElementById('root')).render(
  <>
    <Home/>
  </>,
)
