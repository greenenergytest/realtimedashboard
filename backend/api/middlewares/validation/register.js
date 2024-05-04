const Validator = require('validator');
const isEmpty = require('./isEmpty.js');

module.exports = function validateRegisterData(data) {
  // check if email is in valid format
  // check that name field is not empty
  // check that email field is not empty
  // check that password field is not empty
  // check if date is in valid format
  // check password must reach minimum password length
  // check that confirm password must match

  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'password must be atleast 6 characters';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password is required';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
