import { useState, useEffect } from 'react';
import './register.css';
import { InputGroup, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

//steps to implement eye icon

//a state to control the closing an opening of the eye
//that same state to control showing a password or text
function Register() {
  // const [usernameValue, setusernameValue] = useState('');
  // const [emailValue, setEmailValue] = useState('');
  // const [passwordValue, setPasswordValue] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();

  const { email, password, confirmPassword, name } = formData;
  const { user, isSuccess, message } = useSelector((state: any) => state.auth);
  const location = useLocation();
  console.log('message');
  console.log(message);
  const [showPlainTextPassword, setShowPlainTextPassword] = useState(false);
  const [showPlainTextConfirmPassword, setShowPlainTextConfirmPassword] =
    useState(false);

  console.log('registered user');
  console.log(user);

  // const handleUsernameChange = () => {
  //   console.log('usernameChange');
  // };

  // const handlePasswordChange = () => {
  //   console.log('passwordChange');
  // };

  // const handleConfirmPasswordChange = () => {
  //   console.log('confirmPasswordChange2');
  // };

  // const handleSignInClick = () => {
  //   navigate('/login');
  // };

  const handleChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConfirmEyeButtonClicked = () => {
    setShowPlainTextConfirmPassword(!showPlainTextConfirmPassword);
  };

  const handleEyeButtonClicked = () => {
    setShowPlainTextPassword(!showPlainTextPassword);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // if (password != confirmPassword) {
    //   console.log('passwords do not match');
    //   console.log(password);
    //   console.log(confirmPassword);
    // } else {
    console.log('passwords match');
    console.log(password);
    console.log(confirmPassword);
    const userData = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    console.log('registered user data');
    console.log(userData);
    dispatch(register(userData));
    navigate('/');

    //}
  };

  useEffect(() => {
    console.log('registered user');
    console.log(user);
    if (isSuccess || (user && Object.keys(user).length > 0 && user != null)) {
      navigate('/');
    }
    if (typeof user === 'string') {
      navigate('/');
    }

    //dispatch(reset());
    const timer = setTimeout(() => {
      // Reset state when navigating away from the page
      dispatch(reset());
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch, location]);
  // }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <Card
        style={{
          width: '45rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '90px',
          height: '400px',
        }}
      >
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='formPlaintextUsername'
            >
              <Form.Label column sm='2'>
                Username
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='text'
                  placeholder='Enter your username'
                  value={name}
                  onChange={handleChange}
                  name='name'
                />
              </Col>
            </Form.Group>
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
                    onClick={handleEyeButtonClicked}
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
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='formPlaintextConfirmPassword'
            >
              <Form.Label column sm='2'>
                Confirm Password
              </Form.Label>
              <Col sm='10'>
                <InputGroup>
                  <Form.Control
                    disabled={false}
                    type={showPlainTextConfirmPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={confirmPassword}
                    onChange={handleChange}
                    name='confirmPassword'
                  />
                  <Button
                    variant='outline-secondary'
                    onClick={handleConfirmEyeButtonClicked}
                  >
                    {showPlainTextConfirmPassword ? (
                      <BsFillEyeFill />
                    ) : (
                      <BsFillEyeSlashFill />
                    )}
                  </Button>
                </InputGroup>
              </Col>
            </Form.Group>
            <>
              {Object.keys(message).map((key: any, index) => {
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
              className='registerSubmitButton'
              variant='success'
              type='submit'
            >
              Submit
            </Button>
          </Form>
          {/* <Link
            to='/Login'
            className='alreadyAMemberClass'
            onClick={handleSignInClick}
          >
            Already a member? sign in
          </Link> */}
        </Card.Body>
      </Card>
    </>
  );
}

export default Register;
