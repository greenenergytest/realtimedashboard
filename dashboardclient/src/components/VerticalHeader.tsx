import './VerticalHeader.css';
//import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
//import HomePage from '../pages/Home';
import { Link } from 'react-router-dom';

const VerticalHeaders = () => {
  // const handleClick = (e: any) => {
  //   e.preventDefault();
  // };

  return (
    <div className='verticalHeader'>
      <Navbar bg='dark' variant='dark' expand='sm'>
        <Navbar.Brand href='/'>Vertical Header</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' />
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default VerticalHeaders;
