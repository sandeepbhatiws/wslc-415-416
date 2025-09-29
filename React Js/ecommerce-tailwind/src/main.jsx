import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import './assets/css/style.css';
import RootLayout from "./Components/RootLayout";
import Home from "./Components/Home";
import ProductListing from "./Components/ProductListing";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
      <Routes>
        
        <Route element={<RootLayout/>}>
            <Route path="/" element={<Home/>} />
            <Route path="products" element={<ProductListing/>} />
        </Route>

      </Routes>
  </BrowserRouter>,
);
