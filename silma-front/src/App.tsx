import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Outlet } from "react-router";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductArt from "./pages/ProductArt";
import Storage from "./pages/Storage";
import InOrder from "./pages/InOrder";
import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
       <ToastContainer
        position="top-center"
        autoClose={1000}
        //hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route path="/product-books" element={<Products />} />
          <Route path="/product-articles" element={<ProductArt />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/inorder" element={<InOrder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
