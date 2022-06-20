import Header from "./components/Header";
import Login from "./pages/login";
import Gallery from "./pages/gallery";
import Register from "./pages/register";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
// import { useState, useEffect} from "react";

function App() {
  
  return (
    <Router>
      <section className="">
        <div className="container">
       <Header />
       <Routes>
       <Route path="/" element={< Gallery />} />
       <Route path="/login" element={< Login />} />
       <Route path="/register" element={< Register />} />
       </Routes>
     
       <ToastContainer />
       </div>
      </section></Router>
  );
}

export default App;
