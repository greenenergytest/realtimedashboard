import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

function login(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleSignUpClick = (event: any) => {
    navigate('/register');
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
                <Form.Control
                  type='text'
                  placeholder='Enter your email'
                  value={email}
                />
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
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                />
              </Col>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          <Link
            to='/register'
            className='notAMemberClass'
            onClick={handleSignUpClick}
          >
            Not a member? sign up
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
export default login;
