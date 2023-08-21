import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";


const App: React.FC = () => {
  return (
     <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        {/* Define more routes here */}
      </Routes>
  );
};

export default App;