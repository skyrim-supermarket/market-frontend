import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
//import { history } from './helpers/History';
import Cadastro from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';
import Home from './pages/main/Home/Home';
import Admin from './pages/main/Admin/Admin';
import User from './pages/main/User/User';
import Cashier from './pages/main/Cashier/Cashier';
import Carrocaboy from './pages/main/Carrocaboy/Carrocaboy';
import EditAccount from './pages/EditAccount/EditAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/user" element={<User/>}/>
        <Route path="/cashier" element={<Cashier/>}/>
        <Route path="/carrocaboy" element={<Carrocaboy/>}/>
        <Route path="/editAccount" element={<EditAccount/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
