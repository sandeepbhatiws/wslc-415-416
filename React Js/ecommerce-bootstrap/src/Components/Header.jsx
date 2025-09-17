import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/images/ws-cube-white-logo.svg'
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router';

export default function Header() {
    return (
        <>
            <ToastContainer />
            <div className='container-fluid p-0'>
                <Navbar expand="lg" className="bg-primary">
                    <Container>
                        <Navbar.Brand>
                            <Link to={`/`}>
                                <img src={logo} />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <Link to='/' className='mt-2 px-3 text-decoration-none text-black'>Home</Link>


                                <Link to='/about-us' className='mt-2 px-3 text-decoration-none text-black'>About Us</Link>


                                <Link to='/product-listings' className='mt-2 px-3 text-decoration-none text-black'>Product Listings</Link>



                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>


                                <Link to='/contact-us' className='mt-2 px-3 text-decoration-none text-black'>Contact Us</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}
