import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Outlet } from "react-router";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Products";
import Storage from "./pages/Storage";
import InOrder from "./pages/InOrder";
import Navbar from "./components/Navbar";

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
          <Route path="/products" element={<Products />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/inorder" element={<InOrder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
