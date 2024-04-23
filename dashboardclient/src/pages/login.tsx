import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import './login.css';
import { login, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

function Login(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  console.log('user');
  console.log(user);

  const handleSignUpClick = (event: any) => {
    navigate('/register');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    console.log(userData);

    dispatch(login(userData));
  };

  const handleChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/home');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  return (
    <>
      <Card style={{ width: '40rem' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
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
                  onChange={handleChange}
                  name='email'
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='formPlaintextPassword'
            >
              <Form.Label column sm='2'>
                Password
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={handleChange}
                  name='password'
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
export default Login;
