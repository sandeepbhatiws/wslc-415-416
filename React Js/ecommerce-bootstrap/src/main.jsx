import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FaFacebook } from "react-icons/fa";
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from './Components/Home';
import ProductListing from './Components/ProductListing';

createRoot(document.getElementById('root')).render(
  <>
      {/* <Home/> */}


      <ProductListing/>
  </>,
)
