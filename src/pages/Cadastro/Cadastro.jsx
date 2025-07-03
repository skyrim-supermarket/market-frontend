import React from "react";
import { useEffect, useState } from "react"; 
import { Link, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "./Cadastro.css";
//import logoWhite from "../assets/logoWhite.svg";
import logo from '../assets/logoWhite.svg';
import button from "../assets/button.svg";

const Cadastro = () => {
  document.title = "Cadastro";
  const preventDrag = (e) => e.preventDefault();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/registerClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMensagem(errorText);
      } else {

        const data = await response.json();
        const token = data.token;

        localStorage.setItem("token", token);
        
        Navigate("/");
      }
    } catch (erro) {
        setMensagem(`${erro}`);
        console.error(erro);
    }
  };

  let flag = 'none';
  const token = localStorage.getItem("token");
  if(token) {
      const decodedToken = jwtDecode(token);
      flag = decodedToken.type;
  }

  if(flag!='none') {
    if(flag=='admin') return (<Navigate to={{ pathname: '/admin' }} />);
    if(flag=='carrocaboy') return (<Navigate to={{ pathname: '/carrocaBoy' }} />);
    if(flag=='cashier') return (<Navigate to={{ pathname: '/cashier' }} />);
    if(flag=='client') return (<Navigate to={{ pathname: '/' }} />);
  } else {
    return (
      <div className="container">
        <div className="cell i1">
          <img src={logo}/> 
        </div>
        <div className="cell i2">
          {mensagem && <span style={{ color: "red" }}>{mensagem}</span>}
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" placeholder="Username" id="username" name="username" value={FormData.username} onChange={handleChange} required />
            </label>
            <br />
            <label>
              <input type="email" placeholder="Email" id="email" name="email" value={FormData.email} onChange={handleChange} required />
            </label>
            <br />
            <label>
              <input type="password" placeholder="Password" id="password" name="password" value={FormData.password} onChange={handleChange} required />
            </label>
            <br />
            <label>
              <input type="text" placeholder="Address" id="address" name="address" value={FormData.address} onChange={handleChange} />
            </label>
            <br />
            <label>
              <input type="submit" style={{ display: "none" }} />
              <svg
                id="button1"
                className="button"
                viewBox="0 0 251 44"
                xmlnssvg="http://www.w3.org/2000/svg"
                onDragStart={preventDrag}
              >
                <image href={button}/>
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="buttonText"
                >
                  Create new account
                </text>
              </svg>
            </label>
          </form>
          <Link to="/login">
            <svg
                id="button1"
                className="button"
                viewBox="0 0 251 44"
                xmlnssvg="http://www.w3.org/2000/svg"
                onDragStart={preventDrag}
              >
                <image href={button}/>
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="buttonText"
                >
                  Go back
                </text>
              </svg>
          </Link>
        </div>
      </div>
    );
  }
};

export default Cadastro;