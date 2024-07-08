import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
// create an express app
const app = express()
// use cors to allow 'cross origin request sharing'
app.use(cors());
// middleware to pares json data sent through the request body and made it available through 'req.body' it is a body parser
app.use(express.json())
// a middleware to parse cookies sent through the http request header to be available through 'req.cookies' it is a cookie parser
app.use(cookieParser())
// initialize 'dotenv' package
dotenv.config()
// connect to mongodb then listen to requests
mongoose.connect(process.env.MONGO_CONN_STR, {dbName: "real-estate1"}).then(data => {
    app.listen(3000, ()=>{
        console.log('server starts at port 3000');
    })
}).catch(err => console.log(err))


// here are our routes "treat them as middleware functions as they are executed during thje request-response 
// cycle and each function can end the request-respopnse cycle"

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)





