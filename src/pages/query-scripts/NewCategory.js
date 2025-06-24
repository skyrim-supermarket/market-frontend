import React, { Link } from 'react';

function NewCategory( newCategoryRequest, setProductsData, setQtdProducts ) {

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
                throw new Error;
            }
            
            else {
                const res = await response.json();

                const data = res.results;

                const n = data.totalCount;
                const totalQueried = data.query.length;

                const listProducts = [];

                for (let i = 0; i < totalQueried; i += 1) {
                    let thisProduct = data.query[i];
                    console.log(thisProduct);
                    listProducts.push({ 
                        id: thisProduct.id, 
                        name: thisProduct.productName, 
                        price: thisProduct.priceGold, 
                        image: thisProduct.image, });
                }

                setQtdProducts(n);
                setProductsData(
                    /*{ id: 'product1', name: 'Shadowed Tower', price: 300, image: `${boneArrow}` },*/
                listProducts);

            }  
        }
        
        catch (erro) {
            console.error(erro);
            throw new Error;
        }
    };

    return handleSubmit();
}

export default NewCategory;