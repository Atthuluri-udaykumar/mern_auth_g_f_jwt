const express = require('express')
const app = express()

const mongoose = require("mongoose")
const morgan = require('morgan')
const passport = require('passport')
const cookieParser = require("cookie-parser")
require('dotenv').config()
app.use(cookieParser())


mongoose.Promise = global.Promise;
// db connection :--
mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("db connected");
    }
});

// Middlewares

app.use(morgan("dev"))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("/users", require("./api/routes/users"))
// port
const port = process.env.PORT || 2020

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}`))