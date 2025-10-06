import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import './assets/css/style.css';
import RootLayout from "./Components/RootLayout";
import Home from "./Components/Home";
import ProductListing from "./Components/ProductListing";
import { Provider } from "react-redux";
import { reduxToolkit } from "./Components/Redux Toolkit/ReduxToolkit";
import ViewCart from "./Components/ViewCart";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>

    <Provider store={ reduxToolkit }>
      <Routes>

        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<ProductListing />} />
          <Route path="view-carts" element={<ViewCart />} />
        </Route>

      </Routes>
    </Provider>

  </BrowserRouter>,
);
