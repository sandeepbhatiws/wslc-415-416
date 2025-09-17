import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FaFacebook } from "react-icons/fa";
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from './Components/Home';
import ProductListing from './Components/ProductListing';
import { BrowserRouter, Route, Routes } from 'react-router';
import AboutUs from './Components/AboutUs';
import ProductDetails from './Components/ProductDetails';
import RootLayout from './Components/RootLayout';
import ContactUs from './Components/ContactUs';

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Routes>


        <Route element={<RootLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/product-listings/:slug1?/:slug2?' element={<ProductListing />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='/contact-us' element={<ContactUs />} />
        </Route>

        <Route path='admin-panel' element={<RootLayout />}>

          <Route path='categories' >
            <Route path='add' element={<Home />} />
            <Route path='view' element={<Home />} />
            <Route path='edit' element={<Home />} />
            <Route path='details' element={<Home />} />
          </Route>

          <Route path='products'>
            <Route path='add' element={<Home />} />
            <Route path='view' element={<Home />} />
            <Route path='edit' element={<Home />} />
            <Route path='details' element={<Home />} />
          </Route>


        </Route>






      </Routes>
    </BrowserRouter>


    {/* <Home/> */}


    {/* <ProductListing/> */}
  </>,
)
