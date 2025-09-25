import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import './assets/CSS/style.css';
import Home from "./Components/Home";
import RootLayout from "./Components/RootLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import PlayQuiz from "./Components/PlayQuiz";
import AddQuiz from "./Components/AddQuiz";
import ViewQuiz from "./Components/ViewQuiz";
import Login from "./Components/Login";
import Register from "./Components/Register";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>

      <Route element={<RootLayout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="play-quiz" element={<PlayQuiz/>} />
        <Route path="add-quiz" element={<AddQuiz/>} />
        <Route path="view-quiz" element={<ViewQuiz/>} />

        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
      </Route>

    </Routes>
  </BrowserRouter>,
);
