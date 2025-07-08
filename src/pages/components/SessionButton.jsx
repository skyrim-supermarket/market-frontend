import React from "react";
import { useNavigate, Link } from "react-router-dom";
import button from "../assets/button.svg";
import './styles/SessionButton.css';

const SessionButton = ({ setIAm = () => 'none' }) => {
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        setIAm('none');
        navigate("/");
        window.location.reload();
    }

    return (
        <span id="login-button">
        {token && 
              <svg
                    id="button1"
                    className="sessionButton"
                    viewBox="0 0 251 44"
                    xmlnssvg="http://www.w3.org/2000/svg"
                    onClick={handleLogout}
                >
                <image href={button}/>
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="sessionText"
                >
                  Log Out
                </text>
              </svg>
        }
        {!token && 
            <Link to="/login">
            <svg
                id="button1"
                className="sessionButton"
                viewBox="0 0 251 44"
                xmlnssvg="http://www.w3.org/2000/svg"
              >
                <image href={button}/>
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="sessionText"
                >
                  Log In
                </text>
              </svg>
          </Link>
        }
        </span>
    );
};

export default SessionButton;