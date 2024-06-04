const express = require('express');
const router = express.Router();
//const moongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const Usermodel = require('../../models/UserRegiatrationModel');
const validateRegistrationInput = require('../../api/middlewares/validation/register');
const validateLoginInput = require('../../api/middlewares/validation/login');
const jwt = require('jsonwebtoken');

//steps
// make a post request with the user model

router.post('/register', (req, res) => {
  // logic
  // check if user already exist
  //pass the email to the database
  // if the user does not exist
  // create the user with the hash of a password
  // and store it in the database

  const { errors, isValid } = validateRegistrationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log(req.body);
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        res.send('sucess user exists');
        console.log('User exists:', user);
      } else {
        console.log('User does not exist');

        // create user
        // hash the password
        // save to db
        // redirect to login screen or send jwt

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.confirmPassword = hash;
            newUser
              .save()
              .then((savedUser) => {
                console.log('User saved successfully:', savedUser);
                res.json(savedUser);
              })
              .catch((error) => {
                console.error('Error saving user:', error);
              });
          });
        });
      }

      // Close the connection
      // mongoose.connection.close();
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
  //res.send('general ')
});

router.post('/login', (req, res) => {
  //check if password match
  // retlogurn jwt token
  //bcrpt compare password

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  async function comparePasswords(plaintextPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plaintextPassword, hashedPassword);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  }

  try {
    User.findOne({
      email: req.body.email,
    }).then(async (user) => {
      if (user) {
        const isMatch = await comparePasswords(
          req.body.password.toString(),
          user.password.toString()
        );
        console.log(isMatch);

        if (isMatch) {
          res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
          });
        } else {
          res.status(400).json({ invalidCredentials: 'Invalid Credentials' });
        }
      } else {
        res.send('Login failed, user does not exist');
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  return token;
};

module.exports = router;
