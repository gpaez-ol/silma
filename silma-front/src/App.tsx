import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Storage from './pages/Storage';
import InOrder from './pages/InOrder';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inicio-sesion" element={<Login/>} />
        <Route path="/productos" element={<Products/>} />
        <Route path="/surtido-interno" element={<Storage/>} />
        <Route path="/orden-entrada" element={<InOrder/>} />
      </Routes>
    </Router>
  );
}

export default App;
