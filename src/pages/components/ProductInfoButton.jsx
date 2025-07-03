import React from "react";

// sobre ESTILO
import button from "../assets/button.svg";
import './styles/SessionButton.css';

const ProductInfoButton = ({ toEdit, handleSubmit }) => {

    return (
        <span id="edit-button">
            <svg
                id="button1"
                className="sessionButton"
                viewBox="0 0 251 44"
                xmlnssvg="http://www.w3.org/2000/svg"
                onClick={handleSubmit}
            >
            <image href={button}/>
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="sessionText"
            >
                {toEdit ? "Edit product" : "Return"}
            </text>
            </svg>
        </span>
    );
};

export default ProductInfoButton;