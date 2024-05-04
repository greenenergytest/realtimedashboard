const Validator = require('validator');
const isEmpty = require('./isEmpty.js');

module.exports = function validateLoginData(data) {
  // check if email is in valid format
  // check that name field is not empty
  // check that email field is not empty
  // check that password field is not empty
  // check that password must reach minimum password length

  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'password is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'password must be atleast 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
