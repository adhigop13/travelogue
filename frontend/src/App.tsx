import { useState } from 'react'
// import './App.css'
import { Login, Dashboard, Home, Register, CreateTrip} from './pages';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createtrip" element = {<CreateTrip />}/>
    </Routes>
  )
}

export default App