import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navbar.jsx";
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./components/Home.jsx";

function App() {


  return (

    <BrowserRouter>
        <Navigation />

        <Routes>
            <Route exact path='/' element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
