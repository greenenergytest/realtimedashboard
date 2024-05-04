import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HeaderIcon from '../assets/Greenenergyicon.png';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOutClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const handleLoginClick = () => {
    dispatch(reset());
    navigate('/login');
  };

  const handleRegisterClick = () => {
    dispatch(reset());
    navigate('/register');
  };
  return (
    <Navbar expand='lg' className='bg-body-tertiary headerStyle'>
      <Container fluid>
        <Navbar.Brand href='#'>
          <img src={HeaderIcon} alt='Logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarAcroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='my-2 my-lg-0 headerRightItemStyle'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {user && Object.keys(user).length > 0 ? (
              <Nav.Link href='#' onClick={handleLogOutClick}>
                <FaSignInAlt className='rightItemIcon' />
                logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href='#' onClick={handleLoginClick}>
                  <FaSignOutAlt className='rightItemIcon' />
                  Login
                </Nav.Link>
                <Nav.Link href='#' onClick={handleRegisterClick}>
                  <FaUser className='rightItemIcon' />
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
