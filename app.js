const express = require('express')
const mongoose = require('mongoose');

const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/test');

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRouter)
app.use('/users', userRouter)

app.use('*', (req, res) => {
    res.status(404).json('Route does not exist')
})

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 500,
            code: err.status || 500
        })
})

app.listen(5000)
