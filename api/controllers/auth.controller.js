const User = require('../models/user.model')
const bcryptjs = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// Here is some validation rules that will be applied for user data using express validator package
const validationRules = [
  body('username').trim().isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
  body('email')
  .isEmail()
  .normalizeEmail({
    all_lowercase: false,
    gmail_remove_dots: false,
    gmail_remove_subaddress: false,
  })
  .withMessage('Enter a valid email address'),
  body('password').trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ];


const signup = async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObject = errors.array().reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
      }, {});
      return res.status(401).json(errorObject);
    }
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password)
    const user = await User.create({username, email, password:hashedPassword});
    res.status(201).json({message: "User registered successfully", email: user.email, username: user.username});
}

module.exports = { signup, validationRules }

