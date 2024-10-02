//import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import HeaderIcon from '../assets/Greenenergyicon.png';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FaOilWell } from 'react-icons/fa6';
//import Button from 'react-bootstrap/Button';
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

  const handleUploadClick = () => {
    navigate('/');
  };

  const handleWellDetailsClick = () => {
    navigate('/welldetails');
  };
  const handlePlotGraphClick = () => {
    navigate('/plotgraph');
  };

  const handleFieldViewClick = () => {
    navigate('/fieldview');
  };
  return (
    <Navbar expand='lg' className='bg-body-tertiary headerStyle'>
      <Container fluid>
        <Navbar.Brand href='#'>
          <img src={HeaderIcon} alt='Logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarAcroll' />
        <Navbar.Collapse id='navbarScroll'>
          {/* <Nav className='mx-auto' style={{ maxHeight: '100px' }} navbarScroll> */}
          {user && Object.keys(user).length > 0 ? (
            <>
              <Nav
                className='mx-auto'
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href='#' onClick={handleUploadClick}>
                  <FaCloudUploadAlt className='rightItemIcon' />
                  Upload
                </Nav.Link>
                <Nav.Link href='#' onClick={handleWellDetailsClick}>
                  <FaOilWell className='rightItemIcon' />
                  Well Details
                </Nav.Link>
                <Nav.Link href='#' onClick={handlePlotGraphClick}>
                  <GoGraph className='rightItemIcon' />
                  Plot graph
                </Nav.Link>
                <Nav.Link href='#' onClick={handleFieldViewClick}>
                  <GoGraph className='rightItemIcon' />
                  Field View
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav className='ml-auto headerRightItemStyle'>
                <Nav.Link href='#' onClick={handleLoginClick}>
                  <FaSignOutAlt className='rightItemIcon' />
                  Login
                </Nav.Link>
                <Nav.Link href='#' onClick={handleRegisterClick}>
                  <FaUser className='rightItemIcon' />
                  Register
                </Nav.Link>
              </Nav>
            </>
          )}

          {user && Object.keys(user).length > 0 && (
            <Nav className='ml-auto'>
              <Nav.Link
                href='#'
                onClick={handleLogOutClick}
                className='headerRightItemStyle'
              >
                <FaSignInAlt className='rightItemIcon' />
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
