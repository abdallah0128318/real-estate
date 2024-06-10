import express from 'express'
import { signUpValidationRules, signup, signin} from '../controllers/auth.controller.js'
export const router = express.Router();



router.post("/signup",signUpValidationRules, signup);
router.post("/signin", signin);


export default router
