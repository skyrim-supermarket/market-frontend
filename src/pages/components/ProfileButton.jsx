import React from "react";
import { useNavigate, Link } from "react-router-dom";
import button from "../assets/button.svg";
import './styles/SessionButton.css';

const ProfileButton = ({ goToHome, iAm = 'none', additionalFunction = () => {}}) => {
    const navigate = useNavigate();
    
    return (
        <span id="login-button">
        {(goToHome === null) && (<>
            
                <svg
                    id="button1"
                    className="sessionButton"
                    viewBox="0 0 251 44"
                    xmlnssvg="http://www.w3.org/2000/svg"
                    onClick={additionalFunction}
                >
                <image href={button}/>
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="sessionText"
                >
                    Cancel Sale
                </text>
                </svg>
            
        </>
        )}


        {(goToHome) && (<>
            
            <Link to="/">
                <svg
                    id="button1"
                    className="sessionButton"
                    viewBox="0 0 251 44"
                    xmlnssvg="http://www.w3.org/2000/svg"
                    onClick={() => {
                        additionalFunction();
                        navigate("/")}
                    }
                >
                <image href={button}/>
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="sessionText"
                >
                    Go to Home
                </text>
                </svg>
            </Link>
            
        </>
        )}

        {(!goToHome) && (<>
            {(iAm == 'client') && (<>
                <Link to="/user">
                    <svg
                        id="button1"
                        className="sessionButton"
                        viewBox="0 0 251 44"
                        xmlnssvg="http://www.w3.org/2000/svg"
                        onClick={() => navigate("/user")}
                    >
                    <image href={button}/>
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="sessionText"
                    >
                        My Profile
                    </text>
                    </svg>
                </Link>
            </>)}
            {(iAm == 'admin') && (<>
                <Link to="/admin">
                    <svg
                        id="button1"
                        className="sessionButton"
                        viewBox="0 0 251 44"
                        xmlnssvg="http://www.w3.org/2000/svg"
                        onClick={() => navigate("/admin")}
                    >
                    <image href={button}/>
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="sessionText"
                    >
                        Admin Edit Mode
                    </text>
                    </svg>
                </Link>
            </>)}
            </>
        )}

        
        </span>
    );
};

export default ProfileButton;