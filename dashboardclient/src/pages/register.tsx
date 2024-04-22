import { useState } from 'react';
import './register.css';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function register(props: any) {
  const [usernameValue, setusernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = () => {
    console.log('usernameChange');
  };

  const handlePasswordChange = () => {
    console.log('passwordChange');
  };

  const handleConfirmPasswordChange = () => {
    console.log('confirmPasswordChange2');
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <>
      <Card style={{ width: '40rem' }}>
        <Card.Body>
          <Form>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='formPlaintextEmail'
            >
              <Form.Label column sm='2'>
                Email
              </Form.Label>
              <Col sm='10'>
                <Form.Control type='text' placeholder='Enter your email' />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='formPlaintextEmail'
            >
              <Form.Label column sm='2'>
                Password
              </Form.Label>
              <Col sm='10'>
                <Form.Control type='password' placeholder='Password' />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='formPlaintextEmail'
            >
              <Form.Label column sm='2'>
                Confirm Password
              </Form.Label>
              <Col sm='10'>
                <Form.Control type='password' placeholder='Password' />
              </Col>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          <Link
            to='/Login'
            className='alreadyAMemberClass'
            onClick={handleSignInClick}
          >
            Already a member? sign in
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default register;
