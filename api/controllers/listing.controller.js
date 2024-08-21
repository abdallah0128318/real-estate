import { body, validationResult } from 'express-validator';
import Listing from '../models/listing.model.js';



// Define an array of validation rules for adding a new listing
export const addListingValidationRules = [
  // Validation rules for the 'name' field
  body('name')
    // Ensure the name is not empty
    .notEmpty().withMessage('Name can`t be empty')
    // Custom validator to check if the name is not a numeric string
    .custom(value => {
      if(/^\d+$/.test(value)){
        throw new Error('Username must not be a numeric string')
      }
      return true
    }),

  // Validation rules for the 'description' field
  body('description')
    // Ensure the description is not empty
    .notEmpty().withMessage('Description can`t be empty')
    // Custom validator to check if the description is not a numeric string
    .custom(value => {
      if(/^\d+$/.test(value)){
        throw new Error('Description must not be a numeric string')
      }
      return true
    }),

  // Validation rules for the 'address' field
  body('address')
    // Ensure the address is not empty
    .notEmpty().withMessage('Address can`t be empty')
    // Custom validator to check if the address is not a numeric string
    .custom(value => {
      if(/^\d+$/.test(value)){
        throw new Error('Address must not be a numeric string')
      }
      return true
    }),

  // Validation rules for the 'regularPrice' field
  body('regularPrice')
    // Ensure the regular price is not empty
    .notEmpty().withMessage('regularPrice can`t be empty')
    // Check if the regular price is a valid number
    .isNumeric().withMessage('please, Enter a valid price'),

  // Validation rules for the 'discountPrice' field
  body('discountPrice')
    // Make this field optional, but if provided, ensure it's a valid number
    .optional().isNumeric().withMessage('please, Enter a valid price'),

  // Validation rules for the 'bedrooms' field
  body('bedrooms')
    // Ensure the number of bedrooms is not empty
    .notEmpty().withMessage('bedrooms number can`t be empty')
    // Check if the number of bedrooms is a valid number
    .isNumeric().withMessage('bedrooms must be a number'),

  // Validation rules for the 'bathrooms' field
  body('bathrooms')
    // Ensure the number of bathrooms is not empty
    .notEmpty().withMessage('bathrooms number can`t be empty')
    // Check if the number of bathrooms is a valid number
    .isNumeric().withMessage('bathrooms must be a number'),

  // Validation rules for the 'type' field (to be handled at client-side)
  body('type')
    // Ensure the type is not empty
    .notEmpty().withMessage('description can`t be empty')
    // Check if the type is a string
    .isString().withMessage('please, Enter a valid type')
    // Custom validator to check if the type is not a numeric string
    .custom(value => {
      if(/^\d+$/.test(value)){
        throw new Error('Type must not be a numeric string')
      }
      return true
    }),
];





    
/**
 * Creates a new listing.
 * 
 * @async
 * @function create
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the created listing or error messages
 * 
 * @description
 * This function performs the following steps:
 * 1. Validates the request body using express-validator
 * 2. If validation fails, it returns a 401 status with detailed error messages
 * 3. If validation passes, it creates a new listing in the database
 * 4. Returns the created listing with a 201 status code
 * 
 * @throws {Error} If there's an issue with database operations
 */
export const create = async (req, res) => {
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

    try {
        // Create new listing in the database
        const listing = await Listing.create(req.body);

        // Send success response with the created listing
        return res.status(201).json(listing);
    } catch (error) {
        // Handle any database errors
        return res.status(500).json({ message: "Error creating listing", error: error.message });
    }
}