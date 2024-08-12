import express from 'express'
import { addListingValidationRules, create } from '../controllers/listing.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';



const router = express.Router()
router.post("/create", verifyToken, addListingValidationRules, create)

export default router