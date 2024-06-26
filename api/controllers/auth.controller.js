import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import bcryptjs  from 'bcryptjs';
import { body, validationResult } from 'express-validator';

// Here is an array to store signup validation rules
export const signUpValidationRules = [
  body('username')
  .trim()
  .matches(/^[a-z0-9]{3,30}$/).withMessage('Username must be between 3 and 30 small letters and numbers, without spaces'),
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


// ---------------------------------------------------------------
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



// --------------------------------------------------------------------
// signin function
export const signin = async (req, res) => {
    const {email, password } = req.body;
    if(!email || !password )
    {
      return res.status(401).json({'msg': 'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({"msg": "Email Not Found"});
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

// EndPoint Api for google oauth signin

export const google = async (req, res) => {
  const {name, email, photo} = req.body;
  const user = await User.findOne({ email });
  if(!user){
    const username = name.replace(' ', '').toLowerCase() + Math.random().toString(36).slice(-4);
    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword);
    const newUser = new User({ username, email, password:hashedPassword, photo})
    await newUser.save()
    const {password, ...rest} = newUser._doc
    const token = jwt.sign({id: newUser._id}, process.env.JWT_KEY)
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
  }
  else{
    const {password, ...rest} = user._doc
    const token = jwt.sign({id: user._id}, process.env.JWT_KEY)
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
  }

}





























