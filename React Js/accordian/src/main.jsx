import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/css/style.css"
import Acordian from './Acordian'
import HomeComponent from './HomeComponent'

createRoot(document.getElementById('root')).render(
  <>
    <Acordian/>

    {/* <HomeComponent/> */}
  </>,
)
