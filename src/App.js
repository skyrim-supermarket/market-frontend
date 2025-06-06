import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
//import { history } from './helpers/History';
import Cadastro from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/App';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
