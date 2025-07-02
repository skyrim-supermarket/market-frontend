import React from 'react';
import { jwtDecode } from 'jwt-decode';

function WhatAmI() {

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const flag = decodedToken.type;
            return flag;
        } else {
            return 'none';
        }
    }    
    
    return handleSubmit();
}

export default WhatAmI;