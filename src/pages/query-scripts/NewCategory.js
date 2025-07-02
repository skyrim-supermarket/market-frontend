import React, { Link } from 'react';

function NewCategory( newCategoryRequest, setProductsData, setQtdProducts, notAProduct = true ) {

    const handleSubmit = async () => {
        
        try {
            if (notAProduct) {
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
                        listProducts.push({ 
                            id: "ID"+thisProduct.id, 
                            name: thisProduct.productName, 
                            stock: thisProduct.stock,
                            price: thisProduct.priceGold, 
                            image: thisProduct.image, });
                    }

                    setQtdProducts(n);
                    setProductsData(
                        /*{ id: 'product1', name: 'Shadowed Tower', price: 300, image: `${boneArrow}` },*/
                    listProducts);

                }  

            } else {
                const response = await fetch(`http://localhost:8080/${newCategoryRequest}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(errorText);
                    setProductsData([]);
                    throw new Error;

                } else {
                    const res = await response.json();
                    const listItems = [];

                    for (let i = 0; i < res.length; i += 1) {
                        let thisItem = res[i];
                        listItems.push({ 
                            id: "ID"+thisItem.id, 
                            name: thisItem.username, 
                            email: thisItem.email,
                            created: thisItem.createdAt,
                            updated: thisItem.updatedAt,
                            lastRun: thisItem.lastRun,
                        });
                        if (newCategoryRequest == 'admins') {
                            listItems[i].isRoot = thisItem.root ? "Yes" : "No";
                        }
                        if (newCategoryRequest == 'cashier' || newCategoryRequest == 'carrocaboy') {
                            listItems[i].totalCommissions = thisItem.totalCommissions;
                        }
                        if (newCategoryRequest == 'cashier') {
                            listItems[i].section = thisItem.section;
                        }
                        if (newCategoryRequest == 'client') {
                            listItems[i].isSpecialClient = thisItem.isSpecialClient;
                            listItems[i].address = thisItem.address;
                        }
                    }

                    setProductsData(
                        /*{ id: 'product1', name: 'Shadowed Tower', price: 300, image: `${boneArrow}` },*/
                    listItems);
                }
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