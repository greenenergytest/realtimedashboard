//import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';
import './App.css';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import HomePage from './pages/Home';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import WellDetailsPage from './pages/WellDetails';
import GraphPage from './pages/Graph';
import FieldViewPage from './pages/FieldView';

//import { Card, Form, Button, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <>
      <Router>
        <div style={{ height: '100%' }}>
          <Header />

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/welldetails' element={<WellDetailsPage />} />
            <Route path='/plotgraph' element={<GraphPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/fieldview' element={<FieldViewPage />} />
          </Routes>
        </div>
      </Router>
      {/* {notAMemberValue ? (
        <RegisterPage onClick={alreadyAMemberClicked} />
      ) : (
        <></>
      )}
      {alreadyAMember ? <LoginPage onClick={notAMemberClicked} /> : <></>} */}
      {/* <Card style={{width:'40rem'}}>
      
      <Card.Body>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder='Enter your email' />
              </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
              <Form.Control type="password" placeholder='Password' />
              </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Confirm Password
              </Form.Label>
              <Col sm="10">
              <Form.Control type="password" placeholder='Password' />
              </Col>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
         <a href="#" className="btn btn-primary">Go somewhere</a> 
      </Card.Body>

    </Card> 
     {alreadyAMemberClicked?<RegisterComponent/>: <></>}
      <div className="card">
        <div>
          <label className="usernameLabel" htmlFor="userInput">Username:</label>
            <input
              type="text"
              id="usernameInput"
              name="username"
              value={usernameValue}
              onChange={handleUsernameChange}
              className='usernameInputClass'
            />
        </div>
        <div>
          <label className="userEmailLabel" htmlFor="userInput">Email:</label>
          <input
            type="text"
            id="userEmailInput"
            name="userEmail"
            value={emailValue}
            className='userEmailInputClass'
            onChange={handleEmailChange}

          />
        </div>
       <div>
        <label className="userPasswordLabel" htmlFor="userInput">Password:</label>
        <input
          type="password"
          id="userPasswordInput"
          name="userPassword"
          value={passwordValue}
          className='userPasswordInputClass'
          onChange={handlePasswordChange}

        />
        </div>
        <div>
        <label className="userPasswordLabel" htmlFor="userInput">Confirm Password:</label>
        <input
          type="password"
          id="userPasswordInput"
          name="userConfirmPassword"
          value={confirmPasswordValue}
          className='userPasswordInputClass'
          onChange={confirmPasswordChange}

        />
        </div>
        <div>
          <button className="submitButton">Submit</button>
        </div>
        <div className='testParagraph'>Already a member <a href="#" onClick={handleAlreadyAMemberClick}>sign in</a></div>
        </div>  */}
    </>
  );
}

export default App;
