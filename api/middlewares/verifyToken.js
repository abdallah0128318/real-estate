import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json('Unuthorized user')   
    jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
        // user here is just the id we have hashed after login
        if(err) return res.status(403).json('You have to register first!')
        req.user = user
        next()
    })
}
