const User = require('../models/user.model')
const bcryptjs = require('bcryptjs');
const {userValidation} = require('../utils/validation.js')


exports.signup = async (req, res, next)=>{
    const result = await userValidation(User, req.body)
    if(result.success)
    {
        const {username, email, password} = result.data;
        const hashedPassword = bcryptjs.hashSync(password)
        const user = await User.create({username, email, password:hashedPassword});
        res.status(201).json(user);
    }
    else if(!result.success){
        res.status(401).json(result.errorMsg);
    }   
}

