import { useState } from 'react'
import './App.css'
import { Login, Dashboard, Home } from './pages'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App