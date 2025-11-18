import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputGroup, Card, Form, Button, Row, Col } from 'react-bootstrap';
import './login.css';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
//import { useLocation } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isSuccess, message } = useSelector((state: any) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const [showPlainTextPassword, setShowPlainTextPassword] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const showPlainTextPasswordClicked = () => {
    setShowPlainTextPassword(!showPlainTextPassword);
  };

  const handleChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isSuccess || (user && Object.keys(user).length > 0 && user != null)) {
      navigate('/');
    } else {
      setTimeout(() => {
        navigate('/login');
      }, 10);
    }
    const timer = setTimeout(() => {
      dispatch(reset());
    }, 100);

    return () => clearTimeout(timer);
  }, [user, isSuccess]);

  return (
    <>
      <Card
        style={{
          width: '40rem',
          marginRight: 'auto',
          marginLeft: 'auto',
          marginTop: '100px',
          height: '250px',
        }}
      >
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
                <InputGroup>
                  <Form.Control
                    type={showPlainTextPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={handleChange}
                    name='password'
                  />
                  <Button
                    variant='outline-secondary'
                    onClick={showPlainTextPasswordClicked}
                  >
                    {showPlainTextPassword ? (
                      <BsFillEyeFill />
                    ) : (
                      <BsFillEyeSlashFill />
                    )}
                  </Button>
                </InputGroup>
              </Col>
            </Form.Group>
            <>
              {message &&
                Object.keys(message).map((key: any, index) => {
                  return (
                    <div className='errorMessage' key={index}>
                      {typeof message[key] === 'object'
                        ? message[key].msg
                        : message[key]}
                    </div>
                  );
                })}
            </>
            <Button
              className='loginSubmitButton'
              variant='success'
              type='submit'
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
export default Login;
