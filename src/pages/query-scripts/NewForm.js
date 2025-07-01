import React, { Link } from 'react';

function NewForm( category, setLabels ) {
    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/labels/${category}`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(errorText);
                setLabels([]);
                throw new Error;
            }
            
            else {
                const data = await response.json();
                const sizeData = data.length;

                const listLabels = [];

                for (let i = 0; i < sizeData; i += 1) {
                    let thisLabel = data[i];
                    listLabels.push({ 
                        name: thisLabel.name, 
                        type: thisLabel.type,  });
                }


                setLabels(listLabels);
            }  
        }
        
        catch (erro) {
            console.error(erro);
            throw new Error;
        }
    };

    return handleSubmit();
}

export default NewForm;