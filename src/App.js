import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
//import { history } from './helpers/History';
import Cadastro from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import NewAmmunition from './pages/AdminRegisters/NewAmmunition';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/newAmmunition" element={<NewAmmunition/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
