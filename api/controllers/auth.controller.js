import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import bcryptjs  from 'bcryptjs';
import { body, validationResult } from 'express-validator';


/**
 * Validation rules for user sign-up process.
 * This array contains express-validator middleware functions to validate and sanitize user input.
 */
/**
 * Validation rules for user sign-up process.
 * This array contains express-validator middleware functions to validate and sanitize user input.
 */

/**
 * This code defines an array of validation rules for user sign-up using express-validator.
 * It includes three main validation checks:
 * 
 * 1. Username validation:
 *    - Trims whitespace from both ends
 *    - Ensures the username consists of 3-30 lowercase letters and numbers without spaces
 * 
 * 2. Email validation:
 *    - Checks if the input is a valid email address
 *    - Normalizes the email while preserving case and special characters (like dots in Gmail)
 * 
 * 3. Password validation:
 *    - Trims whitespace from both ends
 *    - Ensures the password is at least 8 characters long
 * 
 * Each validation rule includes a custom error message that will be displayed if the validation fails.
 * These rules can be used as middleware in the sign-up route to ensure data integrity and security.
 */


export const signUpValidationRules = [
  // Username validation
  body('username')
    .trim() // Remove whitespace from both ends of the string
    .matches(/^[a-z0-9]{3,30}$/)
    .withMessage('Username must be between 3 and 30 small letters and numbers, without spaces'),
  
  // Email validation
  body('email')
    .isEmail() // Check if the input is a valid email
    .normalizeEmail({
      all_lowercase: false, // Don't convert the whole email to lowercase
      gmail_remove_dots: false, // Don't remove dots from Gmail addresses
      gmail_remove_subaddress: false, // Don't remove subaddresses (e.g., +foo) from Gmail addresses
    })
    .withMessage('Enter a valid email address'),
  
  // Password validation
  body('password')
    .trim() // Remove whitespace from both ends of the string
    .isLength({ min: 8 }) // Ensure password is at least 8 characters long
    .withMessage('Password must be at least 8 characters long')
];



/**
 * Handles user signup process.
 * 
 * Function: signup
 * Parameters:
 *   req - Express request object
 *   res - Express response object
 * 
 * Description:
 * This function performs the following steps:
 * 1. Validates the input data using the validation rules defined earlier.
 * 2. If validation fails, it returns a 401 status with detailed error messages.
 * 3. If validation passes, it extracts username, email, and password from the request body.
 * 4. Hashes the password for secure storage.
 * 5. Creates a new user in the database with the provided information.
 * 6. Returns a 201 status with a success message upon successful user creation.
 * 
 * Returns: JSON response
 * - If validation fails: 401 status with error messages
 * - If signup succeeds: 201 status with success message
 * 
 * Throws: Error if there's an issue with database operations
 */
export const signup = async (req, res) => {
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

    // Extract user data from request body
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password);

    try {
        // Create new user in the database
        const user = await User.create({ username, email, password: hashedPassword });

        // Send success response
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        // Handle any database errors
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}





/**
 * User Sign-in Controller
 * 
 * Function: signin
 * Parameters:
 * - req: Express request object
 * - res: Express response object
 * 
 * Description:
 * This function handles user authentication and sign-in. It performs the following steps:
 * 1. Extracts email and password from the request body.
 * 2. Validates that both email and password are provided.
 * 3. Searches for a user with the provided email in the database.
 * 4. If the user is found, it compares the provided password with the stored hashed password.
 * 5. If credentials are valid, it generates a JWT token and sets it as an HTTP-only cookie.
 * 6. Returns user data (excluding the password) upon successful authentication.
 * 
 * Request body:
 * - email: User's email address
 * - password: User's password
 * 
 * Returns: JSON response
 * - If email or password is missing: 401 status with error message
 * - If email is not found: 401 status with error message
 * - If password is incorrect: 401 status with error message
 * - If authentication succeeds: 200 status with user data and sets JWT cookie
 * 
 * Throws: Potential errors from database operations or JWT signing are not explicitly handled
 */
export const signin = async (req, res) => {
    // Extract email and password from request body
    const {email, password } = req.body;

    // Check if email and password are provided
    if(!email || !password )
    {
      // Return error if either email or password is missing
      return res.status(401).json({'msg': 'All fields are required'})
    }

    // Search for user in the database by email
    const user = await User.findOne({ email });

    // Check if user exists
    if(!user){
      // Return error if user is not found
      return res.status(401).json({"msg": "Email Not Found"});
    }

    // Compare provided password with stored hashed password
    const isMatch = bcryptjs.compareSync(password, user.password);

    // Check if passwords match
    if(!isMatch)
    {
      // Return error if passwords don't match
      return res.status(401).json({"msg": "Invalid credentials"});
    }

    // Generate JWT token
    const token = jwt.sign({id: user._id}, process.env.JWT_KEY)

    // Destructure user object, excluding password
    const {password: pass, ...rest} = user._doc

    // Set JWT as HTTP-only cookie and send user data as JSON response
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
}






/**
 * Google Authentication Function
 * 
 * This function handles user authentication using Google credentials.
 * It either creates a new user account if the email doesn't exist in the database,
 * or logs in an existing user.
 * 
 * The request object - The request object
 * The response object - The response object
 * JSON response with user data and sets a JWT cookie
 */
export const google = async (req, res) => {
  // Extract user information from the request body
  const {name, email, photo} = req.body;

  // Check if a user with this email already exists in the database
  const user = await User.findOne({ email });

  if(!user){
    // If user doesn't exist, create a new account

    // Generate a username by removing spaces from name, converting to lowercase,
    // and appending a random 4-character string
    const username = name.replace(' ', '').toLowerCase() + Math.random().toString(36).slice(-4);

    // Generate a random password (16 characters long)
    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

    // Hash the generated password for security
    const hashedPassword = bcryptjs.hashSync(generatedPassword);

    // Create a new User object with the generated data
    const newUser = new User({ username, email, password:hashedPassword, photo})

    // Save the new user to the database
    await newUser.save()

    // Destructure the user object, excluding the password
    const {password, ...rest} = newUser._doc

    // Generate a JWT token for the new user
    const token = jwt.sign({id: newUser._id}, process.env.JWT_KEY)

    // Set the JWT as an HTTP-only cookie and send the user data as a JSON response
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
  }
  else{
    // If user exists, log them in

    // Destructure the user object, excluding the password
    const {password, ...rest} = user._doc

    // Generate a JWT token for the existing user
    const token = jwt.sign({id: user._id}, process.env.JWT_KEY)

    // Set the JWT as an HTTP-only cookie and send the user data as a JSON response
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
  }

}

/**
 * Handles user sign-out process.
 * This function clears the access token cookie and sends a success response.
 * If an error occurs during the process, it sends an error response.
 *
 *req - The request object from Express.js
 *res - The response object from Express.js
 */
export const signOut = (req, res) => {
  try {
    // Clear the 'access_token' cookie from the client's browser
    res.clearCookie('access_token');

    // Send a success response with status code 200 and a message
    return res.status(200).json('user signed out successfully');
  } catch (error) {
    // If an error occurs, send an error response with status code 500
    // and the error message
    return res.status(500).json(error.message);
  }
}





























