const express = require('express')
const router = express.Router();
const {signup, validationRules} = require('../controllers/auth.controller')




router.post("/signup",validationRules, signup);


module.exports = router;