import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Outlet } from 'react-router';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductArt from './pages/ProductArt';
import Storage from './pages/Storage';
import InOrder from './pages/InOrder';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
        <Route path="/product-books" element={<Products/>} />
        <Route path="/product-articles" element={<ProductArt/>} />
        <Route path="/storage" element={<Storage/>} />
        <Route path="/inorder" element={<InOrder/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
