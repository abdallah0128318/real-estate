import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import bcryptjs  from 'bcryptjs';
import { body, validationResult } from 'express-validator';

// signup validation rules
export const signUpValidationRules = [
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


// here is the signup function

export const signup = async (req, res)=>{
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
    res.status(201).json({message: "User registered successfully"});
}




// signin function
export const signin = async (req, res) => {
    const {email, password } = req.body;
    if(!email || !password )
    {
      return res.status(401).json({'msg': 'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({"msg": "Invalid credentials"});
    }
    const isMatch = bcryptjs.compareSync(password, user.password);
    if(!isMatch)
    {
      return res.status(401).json({"msg": "Invalid credentials"});
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_KEY)
    const {password: pass, ...rest} = user._doc
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
}

