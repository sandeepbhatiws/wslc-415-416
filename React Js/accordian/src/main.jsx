import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/css/style.css"
import Acordian from './Acordian'

createRoot(document.getElementById('root')).render(
  <>
    <Acordian/>
  </>,
)
