import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navbar.jsx";
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./components/Home.jsx";
import Students from "./components/Students.jsx";
import Manage from "./components/Manage.jsx";

function App() {


  return (

    <BrowserRouter>
        <Navigation />

        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/students' element={<Students />} />
            <Route path='/manage' element={<Manage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
