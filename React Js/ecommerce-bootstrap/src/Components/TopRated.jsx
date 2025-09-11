import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios';
import { toast } from 'react-toastify';


export default function TopRated() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/products.php?limit=12&page=2')
        .then((result) => {
            setProducts(result.data.data);
        })
        .catch(() => {
            toast.error('Something went wrong !',{

            });
        })
    },[]);

    return (
        <>
            <div className='container-fluid mb-5'>
                <div className='container'>
                    <div className='row p-5 text-center'>
                        <h2>Top Rated Products</h2>
                    </div>
                    <div className='row row-gap-3'>
                        {
                            products.map((item, index) => {
                                return(
                                    <ProductCard key={index} items={item} type="1" />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
