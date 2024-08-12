import User from '../models/user.model.js'
import bcryptjs  from 'bcryptjs';
import { body, validationResult } from 'express-validator';

// Here is an array to validate usser data during update.
export const updateUserValidationRules = [
  body('username').optional()
  .trim()
  .matches(/^[a-z0-9]{3,30}$/).withMessage('Username must be between 3 and 30 small letters and numbers, without spaces'),
  body('email').optional()
  .isEmail()
  .normalizeEmail({
    all_lowercase: false,
    gmail_remove_dots: false,
    gmail_remove_subaddress: false,
  })
  .withMessage('Enter a valid email address'),
  body('password').optional().trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ];



//  here is function to update a user
export const update = async (req, res) => {
    if(req.user.id !== req.params.id) return res.status(401).json('You can only update your account')
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const errorObject = errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
        }, {});
        return res.status(401).json(errorObject);
        }
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {$set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    photo: req.body.photo
                }
            }, 
            {new: true}
        )
        const {password, ...rest} = updatedUser._doc
        return res.status(201).json(rest);
    } catch (error) {
        console.log(error.message);
    }
    
}

// here is function to delete a user
export const  destroy = async (req, res) => {
    if(req.user.id !== req.params.id) return res.status(401).json('You can only delete your account')
    const userId = req.params.id
    await User.findByIdAndDelete(userId)
    res.clearCookie('access_token')
    return res.status(200).json('User deleted successfully')
}












