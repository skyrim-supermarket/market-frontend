import React from "react";
import "./Login.css"; // Certifique-se de que este arquivo exista
// import logoWhite from "../assets/logoWhite.svg";
//import button from "../assets/button.svg";

const Login = () => {
  const preventDrag = (e) => e.preventDefault();
  document.title = "Login";
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
        <form>
          <label>
            <input type="email" placeholder="Email" id="user" name="user" required />
          </label>
          <br />
          <label>
            <input type="password" placeholder="Senha" id="pwd" name="pwd" required />
          </label>
          <br />
          <label>
            <input type="submit" style={{ display: "none" }} />
            <svg
              id="button1"
              className="button"
              viewBox="0 0 251 44"
              xmlnsSvg="http://www.w3.org/2000/svg"
              onDragStart={preventDrag}
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="buttonText"
              >
                Entrar
              </text>
            </svg>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Login;