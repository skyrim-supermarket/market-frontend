import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "./EditAccount.css"; // Certifique-se de que este arquivo exista
// import logoWhite from "../assets/logoWhite.svg";
import button from "../assets/button.svg";



const Login = () => {
  const preventDrag = (e) => e.preventDefault();
  document.title = "Edit Account";
  const navigate = useNavigate();

  const[email, setEmail] = useState('');

  const[formData, setFormData] = useState({
    username: '',
    email: '',
    prevPassword: '',
    newPassword: '',
    address: ''
  });

  useEffect(() => {
    let flag = 'none';
    let flagemail = ''
    const token = localStorage.getItem("token");
    if(token) {
        const decodedToken = jwtDecode(token);
        flag = decodedToken.type;
        flagemail = decodedToken.email;
        setEmail(flagemail);
    }
    if(flag!=='client') navigate(`/${flag}`);

    async function getData() {
      flag = '';
      const token = localStorage.getItem("token");
      if(token) {
          const decodedToken = jwtDecode(token);
          flag = decodedToken.email;
      }
      try {
        const res = await fetch(`http://localhost:8080/clientByEmail/${flagemail}`, {
          method: 'GET'
        });

        if(!res.ok) {
          const errorText = await res.text();
          console.error(errorText);
          throw new Error;
        }

        const data = await res.json();

        setFormData({
          ...formData,
          username: data.username,
          email: data.email,
          address: data.address
        });
      } catch(erro) {
          console.error(erro);
          throw new Error;
      }} getData();
  }, [])

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
      const response = await fetch(`http://localhost:8080/editClient/${email}`, {
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
        localStorage.removeItem("token");

        const data = await response.json();
        const token = data.token;

        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (erro) {
        setMensagem(`${erro}`);
        console.error(erro);
    }
  };

    return (
      <div className="container">
        <div className="cell i1">
          <svg
            id="logo"
            className="logo"
            viewBox="0 0 516 976"
            xmlnsSvg="http://www.w3.org/2000/svg"
            onDragStart={preventDrag}
          >
          </svg>
        </div>
        <div className="cell i2">
          {mensagem && <span style={{ color: "red" }}>{mensagem}</span>}
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" placeholder="Username" id="username" name="username" value={formData.username} onChange={handleChange} required />
            </label>
            <br />
            <label>
              <input type="email" placeholder="Email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <br />
            <label>
              <input type="password" placeholder="Previous password" id="prevPassword" name="prevPassword" value={formData.prevPassword} onChange={handleChange}  />
            </label>
            <br />
            <label>
              <input type="password" placeholder="New Password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange}  />
            </label>
            <br />
            <label>
              <input type="text" placeholder="Address" id="address" name="address" value={formData.address} onChange={handleChange} required />
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
                  Edit
                </text>
              </svg>
            </label>
          </form>
          <Link to="/">
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

export default Login;