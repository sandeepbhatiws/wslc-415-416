import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/images/ws-cube-white-logo.svg'
import { Link } from 'react-router';

export default function Footer() {
  return (
    <>
      <div className='container-fluid p-0'>
                <Navbar expand="lg" className="bg-primary text-center">
                    <Container>
                        <Navbar.Brand>
                            <Link to={`/`}>
                                <img src={logo} />
                            </Link>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
    </>
  )
}
