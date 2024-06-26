import express from 'express'
import { signUpValidationRules, signup, signin, google} from '../controllers/auth.controller.js'
export const router = express.Router();



router.post("/signup",signUpValidationRules, signup);
router.post("/signin", signin);
router.post("/google", google);


export default router
