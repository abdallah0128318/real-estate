import { body, validationResult } from 'express-validator';
import Listing from '../models/listing.model.js';


// Here is an array to store create listing validation rules
export const addListingValidationRules = [
  // name validators
    body('name')
    .notEmpty().withMessage('Name can`t be empty')
    .custom(value => {
      if(/^\d+$/.test(value)){
        throw new Error('Username must not be a numeric string')
      }
      return true
    }),

    // description validators
    body('description')
    .notEmpty().withMessage('Description can`t be empty')
    .custom(value => {
      if(/^\d+$/.test(value)){
        throw new Error('Description must not be a numeric string')
      }
      return true
    }),

    // address validators
    body('address')
    .notEmpty().withMessage('Address can`t be empty')
    .custom(value => {
      if(/^\d+$/.test(value)){
        throw new Error('Address must not be a numeric string')
      }
      return true
    }),

    // regularPrice validators
    body('regularPrice')
    .notEmpty().withMessage('regularPrice can`t be empty')
    .isNumeric().withMessage('please, Enter a valid price'),

    // discountPrice validators
    body('discountPrice')
    .optional().isNumeric().withMessage('please, Enter a valid price'),

    // bedrooms number validators
    body('bedrooms')
    .notEmpty().withMessage('bedrooms number can`t be empty')
    .isNumeric().withMessage('bedrooms must be a number'),

    // bathrooms number validators
    body('bathrooms').notEmpty().withMessage('bathrooms number can`t be empty')
    .isNumeric().withMessage('bathrooms must be a number'),


    // will be handled at client-side
    body('type').notEmpty().withMessage('description can`t be empty')
    .isString().withMessage('please, Enter a valid type')
    .custom(value => {
      if(/^\d+$/.test(value)){
        throw new Error('Type must not be a numeric string')
      }
      return true
    }),

    ];

    // A function to create a listing
export const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObject = errors.array().reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
      }, {});
      return res.status(401).json(errorObject);
    }
    const listing = await Listing.create(req.body)
    return res.status(201).json(listing)
}