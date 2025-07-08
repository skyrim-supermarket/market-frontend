import React, { Link } from 'react';

function NewCategory( newCategoryRequest, setProductsData, setQtdProducts, getProducts = true ) {

    const handleSubmit = async () => {
        
        try {
            if (getProducts) {
                const response = await fetch('http://localhost:8080/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify(newCategoryRequest),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(errorText);
                    setProductsData([]);
                    throw new Error(errorText);
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
                            productName: thisProduct.productName, 
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
                    throw new Error(errorText);

                } else {
                    const res = await response.json();
                    const listItems = [];

                    for (let i = 0; i < res.length; i += 1) {
                        let thisItem = res[i];
                        if(newCategoryRequest!=="sales") {
                            listItems.push({ 
                                id: "ID"+thisItem.id, 
                                username: thisItem.username, 
                                email: thisItem.email,
                                created: thisItem.createdAt,
                                updated: thisItem.updatedAt,
                                lastRun: thisItem.lastRun,
                            });
                            if (newCategoryRequest === 'admins') {
                                listItems[i].root = thisItem.root;
                            }
                            if (newCategoryRequest === 'cashiers' || newCategoryRequest === 'carrocaboys') {
                                listItems[i].totalCommissions = thisItem.totalCommissions;
                            }
                            if (newCategoryRequest === 'cashiers') {
                                listItems[i].section = thisItem.section;
                            }
                            if (newCategoryRequest === 'clients') {
                                listItems[i].address = thisItem.address;
                            }
                        } else {
                            listItems.push({
                                id: "ID"+thisItem.id,
                                idClient: thisItem.idClient,
                                idEmployee: thisItem.idEmployee,
                                totalPriceGold: thisItem.totalPriceGold,
                                status: thisItem.status,
                                address: thisItem.address,
                                createdAt: thisItem.createdAt,
                                updatedAt: thisItem.updatedAt
                            })
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
            throw new Error(erro);
        }
    };

    return handleSubmit();
}

export default NewCategory;