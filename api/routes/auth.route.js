import express from 'express'
import { signUpValidationRules, signup, signaInValidationRules,signin} from '../controllers/auth.controller.js'
export const router = express.Router();



router.post("/signup",signUpValidationRules, signup);
router.post("/signin",signaInValidationRules, signin);


export default router
