// src/App.js
import React, { useEffect, useState } from 'react';

import './styles/Form.css';
import button from "../assets/button.svg";
import NewForm from '../query-scripts/NewForm';

/* copiado do anterior -- tem q coisar as mudanças */

const Form = ({whatDoIWant, sendLabelsUp, appendData}) => {
  const types = ["AMMUNITION", "ARMOR", "BOOKS", "CLOTHING", "FOOD", "INGREDIENTS", "MISCELLANEOUS", "ORES", "POTIONS", "SOUL GEMS", "WEAPONS"];

  const [formLabels, setFormLabels] = useState([]);
  const [formData, setFormData] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // para diferentes tipos de produtos
  const [productCategory, setProductCategory] = useState("");

  const preventDrag = (e) => e.preventDefault();
  const handleChange = (e) => {setFormData({...formData, [e.target.name]: e.target.value});};

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    const data = new FormData();
    
    formLabels.forEach(({ name }) => {
      data.append(name, formData[name]);
    });

    if (imageData) {
      data.append("image", imageData);
    }

    const target = (whatDoIWant === "PRODUCTS") ? `Product/${productCategory.charAt(0).toUpperCase() + productCategory.slice(1).toLowerCase()}`
                                                : whatDoIWant.charAt(0).toUpperCase() + whatDoIWant.slice(1).toLowerCase();

    const endpoint = `http://localhost:8080/new${target}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage(errorText);
        throw new Error(errorText);
      }

      const result = await response.text();
      setSuccessMessage(result);

      const cleanData = {}
      formLabels.forEach(({ name, type }) => {
        if (type.includes("INT") || type.includes("DOUBLE") || type.includes("FLOAT")) {
          cleanData[name] = 0;
        } else if (type.includes("BOOLEAN")) {
          cleanData[name] = false;
        } else {
          cleanData[name] = "";
        }
      })

      setFormData(cleanData);
      setImageData(null);

      window.scrollTo({ top: 0, behavior: 'smooth' });
      appendData(); // faz nova query com o novo coiso
      
    } catch(error) {
      const errorText = error.message || "Unknown error occurred";
      setErrorMessage(errorText);
      console.error(error);
    }
  };

  const getLabels = async (e) => {
    // função pra quando trocamos os labels do produto

    setProductCategory(e.target.value);
    NewForm(e.target.value, setFormLabels);
    setFormData(
      formLabels.map((label) => {
        const name = label.name;
        const type = label.type.toUpperCase();

        let defaultValue = "";
        if (type.includes("INT") || type.includes("DOUBLE") || type.includes("FLOAT")) {
          defaultValue = 0;
        } else if (type.includes("BOOL")) {
          defaultValue = false;
        }
        sendLabelsUp(formLabels);

        return [name, defaultValue];
      })
    )
    // na teoria a partir desse ponto o formData tem os labels corretos e bem tipados
  }

  useEffect(() => {
    if (whatDoIWant !== "PRODUCTS") {
      const whatDoIWantFormatted = whatDoIWant.slice(0,1).toUpperCase() + whatDoIWant.slice(1, whatDoIWant.length).toLowerCase();
      NewForm(whatDoIWantFormatted, setFormLabels); // pega os labels, e atualiza o estado
      sendLabelsUp(formLabels);
    } else {
      setFormLabels([]);
    }
  }, [whatDoIWant]); 

  useEffect(() => {
    if (formLabels.length > 0) {
      const initialData = {};

      formLabels.forEach((label) => {
        const name = label.name;
        const type = label.type.toUpperCase();

        if (type.includes("INT") || type.includes("DOUBLE") || type.includes("FLOAT")) {
          initialData[name] = 0;
        } else if (type.includes("BOOL")) {
          initialData[name] = false;
        } else {
          initialData[name] = "";
        }
      });

      setFormData(initialData);
    }
  }, [formLabels]);

  return (
    <div className="adminInsertionContainer" >
          
          {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
          {successMessage && <span style={{ color: "green" }}>{successMessage}</span>}
          
          {(whatDoIWant === "PRODUCTS") && (<>
            <select id="product-selector-form" onChange={getLabels}>
              {types.map((type) => (
                <option value={setProductCategory}> {type.slice(0,1).toUpperCase() + type.slice(1, type.length).toLowerCase()}
                </option>
              ))}
              <option value="" disabled selected >Select the category of product</option>
            </select>
          </>
          )}

          <form onSubmit={handleSubmit}>
            {formLabels.map((label) => {
              const name = label.name;
              const type = label.type.toUpperCase();

              if (name !== "image") {
                let labelType = "text", step = 1, minimum = 0, maximum = 10000;
                if (type.includes("INT")) {
                  labelType = "number"; 
                } else if (type.includes("DOUBLE")) {
                  labelType = "number";
                  step = 0.01;
                } else if (type.includes("BOOL")) {
                  labelType = "checkbox";
                  maximum = 1;
                }

                if (name === "password") labelType=name;

                const newName = name.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, c => c.toUpperCase());

                return (
                <label> {newName}: 
                  <input 
                    type={labelType} 
                    placeholder={`Insert ${newName.toLowerCase()}`} 
                    id={name} 
                    name={name} 
                    value={labelType === "checkbox" ? true : formData[name]}
                    className={`form-${labelType}`} 
                    onChange={handleChange} 
                    required={labelType !== 'checkbox'}
                    min={labelType === "number" ? minimum : undefined}
                    max={labelType === "number" ? maximum : undefined}
                    step={labelType === "number" ? step : undefined}
                  />
                </label>)
              }
            })}
            

            {((whatDoIWant !== "PRODUCTS") || (formLabels.length != 0)) && (<>

              {(whatDoIWant === "PRODUCTS") && (<>
                <label>
                Choose an image:
                <input type="file" id="image" name="image" onChange={(e) => setImageData(e.target.files[0])}/>
              </label>
              </>
              )}
              
              <label>
              <input type="submit" style={{ display: "none" }} />
              <svg
                id="buttonForm"
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
                  className="buttonFormText"
                >
                  Insert
                </text>
              </svg>
            </label>
            </>)}


            
          </form>
        
    </div>
  );
};

export default Form;
