import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import image from '../assets/images/1.jpeg'

export default function ProductCard({items, type}) {
    return (
        <>
            <div className={ type == 1 ? 'col-md-3' : 'col-md-4' }>
                <Card>
                    <Card.Img variant="top" src={items.image} />
                    <Card.Body className='text-center'>
                        <Card.Title>{items.name}</Card.Title>
                        <h4>Rs.{items.price}</h4>
                        <Card.Text>
                            { items.description }
                        </Card.Text>
                        <Button variant="primary">Add to Cart</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
