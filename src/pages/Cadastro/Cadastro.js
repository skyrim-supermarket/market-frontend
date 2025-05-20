import React from "react";
import { useEffect, useState } from "react"; 
import "./Cadastro.css";
//import logoWhite from "../assets/logoWhite.svg";
import button from "../assets/button.svg";

const Cadastro = () => {
  document.title = "Cadastro";
  const preventDrag = (e) => e.preventDefault();

  const [formData, setFormData] = useState({
    id: 1,
    username: '',
    email: '',
    password: '',
    address: '',
  });

  const dadosParaEnviar = {
    ...formData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSpecialClient: false,
    lastRun: new Date().toISOString()
  };

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
      const resposta = await fetch('http://localhost:8080/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      if (!resposta.ok) {
        throw new Error(`Erro: ${resposta.status}`);
      }

      const dados = await resposta.json();
      console.log('Resposta da API:', dados);
      setMensagem('Formulário enviado com sucesso!');
    } catch (erro) {
      console.error('Erro ao enviar:', erro);
      setMensagem('Ocorreu um erro ao enviar o formulário.');
    }
  };

  return (
    <div className="container">
      <div className="cell i1">
        <svg
          id="logo"
          className="logo"
          viewBox="0 0 516 976"
          xmlnssvg="http://www.w3.org/2000/svg"
          onDragStart={preventDrag}
        >
        </svg>
      </div>
      <div className="cell i2">
        {mensagem && <span style={{ color: "red" }}>{mensagem}</span>}
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder="Nome" id="username" name="username" value={FormData.username} onChange={handleChange} required />
          </label>
          <br />
          <label>
            <input type="email" placeholder="Email" id="user" name="user" value={FormData.email} onChange={handleChange} required />
          </label>
          <br />
          <label>
            <input type="password" placeholder="Senha" id="password" name="password" value={FormData.password} onChange={handleChange} required />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Endereço" id="address" name="address" value={FormData.address} onChange={handleChange} />
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
                Cadastrar
              </text>
            </svg>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;