import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Cadastro from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/App';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
