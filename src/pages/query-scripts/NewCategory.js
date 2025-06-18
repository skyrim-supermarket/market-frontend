import React, { Link } from 'react';

function NewCategory( newCategoryRequest, setProductsData ) {

    const handleSubmit = async () => {
        
        try {
            const response = await fetch('http://localhost:8080/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(newCategoryRequest),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(errorText);
                setProductsData([]);
                return -1;
            }
            
            else {
                const data = await response.json();

                const n = data.totalCount;
                const listProducts = [];

                for (let i = 0; i <= newCategoryRequest.pageSize; i += 1) {
                    let thisProduct = data.query[i];
                    listProducts.push({ id: thisProduct.id, name: thisProduct.name, price: thisProduct.price });
                }

                setProductsData(
                    /*{ id: 'product1', name: 'Shadowed Tower', price: 300, image: `${boneArrow}` },*/
                listProducts);

                return n;
            }  
        }
        
        catch (erro) {
            console.error(erro);
            return -1;
        }
    };

    return handleSubmit();
}

export default NewCategory;