import React from 'react';
import { jwtDecode } from 'jwt-decode';

function WhoAmI(whatAmI) {

    const handleSubmit = async () => {
        let email = 'none';
        const token = localStorage.getItem("token");
        if(token) {
            const decodedToken = jwtDecode(token);
            email = decodedToken.email;

            try {
                const response = await fetch(`http://localhost:8080/${whatAmI}ByEmail/${email}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(errorText);
                    throw new Error;
                } else {
                    const data = await response.json();

                    return data;
                }
            } catch (erro) {
                console.error(erro);
                throw new Error;
            }
        } else {
            return null;
        }
    }    
    
    return handleSubmit();
}

export default WhoAmI;