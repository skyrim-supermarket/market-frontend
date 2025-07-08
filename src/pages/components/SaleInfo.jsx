import React, { useState, useEffect, useRef } from 'react';

import './styles/SaleInfo.css'
import gold from '../assets/gold.png';

function SaleInfo({idSale, showExtraInfo = false}) {
    const [aboutSale, setAboutSale] = useState(null);
    const [aboutClient, setAboutClient] = useState(null);
    const [aboutEmployee, setAboutEmployee] = useState(null);
    const [aboutProducts, setAboutProducts] = useState([]);
    const [errorQuery, setErrorQuery] = useState(null);

    useEffect(() => {
        setAboutSale(null);
        setAboutClient(null);
        setAboutEmployee(null);
        setAboutProducts([]);
        setErrorQuery(null);
        const fetchData = async () => {
            try {
                const saleRes = await fetch(`http://localhost:8080/getSale/${idSale}`);
                const saleData = await saleRes.json();

                setAboutSale(saleData.sale);
                setAboutProducts(saleData.products);

                if(saleData.sale.idClient !== null && saleData.sale.idClient !== undefined) {
                    const clientRes = await fetch(`http://localhost:8080/clientById/${saleData.sale.idClient}`);
                    const clientData = await clientRes.json();

                    setAboutClient(clientData);
                }

                if(saleData.sale.idEmployee !== null && saleData.sale.idEmployee !== undefined) {
                    const employeeRes = await fetch(`http://localhost:8080/employeeById/${saleData.sale.idEmployee}`);
                    const employeeData = await employeeRes.json();

                    setAboutEmployee(employeeData);
                }
            } catch (error) {
                console.error(error);
                setErrorQuery(error);
            }
        }
        
        fetchData();
    }, [idSale])
    

    return (
        <div>
            {errorQuery && 
                (<>
                    <p style={{color: "red"}}>{errorQuery}</p>
                </>)}

            {!errorQuery && 
                (<>
                    <div className='saleinfo-grid'>
                    {aboutSale && <>
                        <div className='saledata'>
                            <div><h3>Sale #{aboutSale.id}</h3></div>
                            <div><img src={gold}/><span><h4>{aboutSale.totalPriceGold}</h4></span></div>
                        </div>
                        <div><p>Address: {aboutSale.address}</p></div>
                    </>}
                    {aboutClient && <div><p>Client: {aboutClient.username}</p></div>}

                    {showExtraInfo && <>
                        {aboutEmployee && <><div><p>Responsible employee: {aboutEmployee.username}</p></div></>}
                        {aboutSale && <>
                            <div><p>Status: {aboutSale.status}</p></div>
                            <div><p>Created at: {aboutSale.createdAt}</p></div>
                            <div><p>Updated at: {aboutSale.updatedAt}</p></div>
                        </>}
                    </>}

                    {aboutProducts.length > 0 && (<>
                    <div>
                        <h3>Products:</h3>
                    </div>
                        {aboutProducts.map((product, index) => (
                            <div className='saleinfo-product'>
                            <div><img src={product.image} alt=''/></div> <div>{product.productName} (x{product.quantity})</div> <div><img src={gold}/><span><h4>{product.priceGold}</h4></span></div>
                            </div>
                        ))}
                    </>)}
                    </div>
                </>)}
        </div>
    )
}
export default SaleInfo;