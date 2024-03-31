const express = require('express');
const router = express.Router();
//const moongoose =  require('mongoose');
const bcrypt = require('bcryptjs')
const Usermodel = require('/Users/mitem/projects/realtimedashboard/backend/models/UserRegiatrationModel');
const validateRegistrationInput = require("../../api/middlewares/validation/register")

//steps
// make a post request with the user model
//

router.post("/register", (req,res)=>{
   // const {errors, isValid} = validateRegisterInput(req.body)
   // console.log(errors)
    //console.log(isValid)

    // logic
    // check if user already exist
        //pass the email to the database
    // if the user does not exist
    // create the user with the hash of a password 
    // and store it in the database

    const {errors, isValid} = validateRegistrationInput(req.body);
    if (!isValid){
        return res.status(400).json(errors)
    }
    console.log(req.body);
    User.findOne({
        email: req.body.email
    }).then((user)=> {
    
        if(user){
            res.send('sucess user exists')
            console.log('User exists:', user);
            
        } else{
            console.log('User does not exist')

            // create user
            // hash the password
            // save to db
            // redirect to login screen or send jwt

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            });

            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash)=>{
                    newUser.password = hash;
                    newUser.confirmPassword = hash;
                    newUser.save()
                    .then((savedUser) =>{
                        console.log('User saved successfully:', savedUser)
                        res.json(savedUser)
                    }).catch((error)=> {
                        console.error("Error saving user:", error)
                    })
            
                })
            })
      
        }
        
        // Close the connection
       // mongoose.connection.close();
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
    //res.send('general ')
})

module.exports = router;