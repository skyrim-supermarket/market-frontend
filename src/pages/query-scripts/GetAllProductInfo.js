import React from 'react';

function GetAllProductInfo( id ) {
    const handleSubmit = async () => {
        // remoção do "product" da frente
        const newId = String(id).replace(/\D/g, '');

        try {
            const response = await fetch(`http://localhost:8080/product/${newId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(errorText)
                throw new Error;
            }
            
            else {
                const data = await response.json();
                return data;
            }  
        }
        
        catch (erro) {
            console.error(erro);
            throw new Error;
        }
    };

    return handleSubmit();
}

export default GetAllProductInfo;