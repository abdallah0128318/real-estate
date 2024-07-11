import User from '../models/user.model.js'
import bcryptjs  from 'bcryptjs';
export const  destroy = async (req, res) => {
    const userId = req.params.id
    await User.findByIdAndDelete(userId)
    res.clearCookie('access_token')
    return res.status(200).json('User deleted successfully')
}


export const update = async (req, res) => {
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {$set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    photo: req.body.photo
                }
            }, 
            {new: true}
        )

        const {password, ...rest} = updatedUser._doc
        return res.status(201).json(rest);

    } catch (error) {
        console.log(error);
    }
    
}


// 

// $2a$10$KncRq4B9fX.5XNOZ66MXhOsqujjTf5l8GX1g9kTAOCHMnoDXC4wd6








