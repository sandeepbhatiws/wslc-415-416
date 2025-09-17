import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import image from '../assets/images/1.jpeg'
import { Link } from 'react-router';

export default function ProductCard({items, type, cartItems, setCartItems}) {

    const addToCart = (productDetails) => {

        const data = {
            id : productDetails.id,
            name : productDetails.name,
            image : productDetails.image,
            price : productDetails.price,
            quantity : 1,
            description : productDetails.description,
        }

        const finalData = [data, ...cartItems];
        setCartItems(finalData);

        console.log(finalData);
    }

    return (
        <>
            <div className={ type == 1 ? 'col-md-3' : 'col-md-4' }>
                <Card>
                    <Link to={ `/product-details/${ items.id }` }>
                        <Card.Img variant="top" src={items.image} />
                    </Link>
                    
                    <Card.Body className='text-center'>
                        <Card.Title>{items.name}</Card.Title>
                        <h4>Rs.{items.price}</h4>
                        <Card.Text>
                            { items.description }
                        </Card.Text>
                        <Button variant="primary" onClick={ () => addToCart(items) }>Add to Cart</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
