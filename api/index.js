const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const User = require('./models/user.model')
const userRouter = require('./routes/user.route')
const authRouter = require('./routes/auth.route')
// create an express app
const app = express()
// use cors to allow 'cross origin request sharing'
app.use(cors());
// configure the server to receive json data
app.use(express.json())
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





