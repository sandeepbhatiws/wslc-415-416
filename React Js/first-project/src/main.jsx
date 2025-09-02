import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './HomePage'
import Header from './Header'
import './assets/css/style.css'

createRoot(document.getElementById('root')).render(
  <>
    {/* As a Open tag */}


    <Header/>
    <header></header>
    <HomePage/> 


    {/* As a Closed Tag */}
    {/* <HomePage></HomePage> */}

  </>,
)
