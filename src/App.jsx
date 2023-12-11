import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />}/>
            {/* <Route path="home" element={<Home/>} /> */}
            <Route path="about" element={<About />}/>
            <Route path="contact" element={<Contact />}/>
            <Route path="services" element={<Services />}/>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
            <Route path='*' element={<NotFound />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
