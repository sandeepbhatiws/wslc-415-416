import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import image from '../assets/images/1.jpeg'
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { Context } from './ContextAPI';

export default function ProductCard({items, type}) {

    const { addToCart } = useContext(Context);

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
