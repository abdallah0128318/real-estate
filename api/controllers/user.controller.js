import User from '../models/user.model.js'
import bcryptjs  from 'bcryptjs';
import { body, validationResult } from 'express-validator';

/**
 * Validation rules for updating user data.
 * This array contains express-validator middleware functions to validate and sanitize user input during the update process.
 * It includes optional checks for username, email, and password, allowing partial updates.
 */
export const updateUserValidationRules = [
  // Username validation (optional)
  body('username').optional()
    .trim() // Remove whitespace from both ends
    .matches(/^[a-z0-9]{3,30}$/).withMessage('Username must be between 3 and 30 small letters and numbers, without spaces'),
  
  // Email validation (optional)
  body('email').optional()
    .isEmail() // Check if it's a valid email format
    .normalizeEmail({
      all_lowercase: false, // Don't convert the whole email to lowercase
      gmail_remove_dots: false, // Don't remove dots from Gmail addresses
      gmail_remove_subaddress: false, // Don't remove subaddresses (e.g., +foo) from Gmail addresses
    })
    .withMessage('Enter a valid email address'),
  
  // Password validation (optional)
  body('password').optional()
    .trim() // Remove whitespace from both ends
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];







/**
 * Function to update a user's information.
 * This asynchronous function handles the process of updating a user's profile,
 * including validation of input data, password hashing, and database update.
 * 
 * @param {Object} req - The request object containing user data and parameters
 * @param {Object} res - The response object used to send the result back to the client
 * @returns {Object} JSON response with updated user data or error messages
 */
export const update = async (req, res) => {
    // Check if the user is trying to update their own account
    if(req.user.id !== req.params.id) return res.status(401).json('You can only update your account')
    
    try {
        // Validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Convert validation errors to a more user-friendly format
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {});
            return res.status(401).json(errorObject);
        }

        // Hash the new password if provided
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password)
        }

        // Update user in the database
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {$set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    photo: req.body.photo
                }
            }, 
            {new: true} // Return the updated document
        )

        // Remove password from the response
        const {password, ...rest} = updatedUser._doc
        return res.status(201).json(rest);
    } catch (error) {
        console.log(error.message);
    }
}







/**
 * Function to delete a user's account.
 * This asynchronous function handles the process of deleting a user's account from the database
 * and clearing their authentication token.
 * 
 * @param {Object} req - The request object containing user parameters
 * @param {Object} res - The response object used to send the result back to the client
 * @returns {Object} JSON response confirming successful deletion or error message
 */
export const destroy = async (req, res) => {
    // Check if the user is trying to delete their own account
    if(req.user.id !== req.params.id) return res.status(401).json('You can only delete your account')
    
    // Extract user ID from request parameters
    const userId = req.params.id
    
    // Delete user from the database
    await User.findByIdAndDelete(userId)
    
    // Clear the authentication cookie
    res.clearCookie('access_token')
    
    // Send success response
    return res.status(200).json('User deleted successfully')
}









