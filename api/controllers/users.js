const JWT = require("jsonwebtoken")
const bcrypt = require('bcryptjs');

const { signUpValidaton, signInValidaton } = require("../helpers/routeHelper")
const User = require("../model/user")

module.exports = {
    signUp: async (req, res, next) => {
        const { error } = signUpValidaton(req.body);
        if (error) return res.json({
            status: 400,
            msg: error.details[0].message
        })
        const { email, password } = req.body;

        // checking for email already exist or not
        const foundUser = await User.findOne({ "local.email": email })
        if (foundUser) return res.json({
            status: 403,
            msg: "Email is already in use"
        })

        // paassword hashing usong bcsript:-
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);

        const newUser = new User({ methods: "local", local: { email, password: hash } })
        await newUser.save();

        const token = JWT.sign(
            {
                iss: process.env.SECRET_KEY,
                sub: newUser.id,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            }, process.env.SECRET_KEY);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.json({
            status: 200,
            token: token
        })
    },
    signIn: async (req, res, next) => {
        const { error } = signInValidaton(req.body);
        if (error) return res.json({
            status: 400,
            msg: error.details[0].message
        })

        const token = JWT.sign(
            {
                iss: "kumar",
                sub: req.user.id,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            }, process.env.SECRET_KEY);
        res.cookie("access_token", token, { httpOnly: true }, { sameSite: true })
        res.json({
            status: 200,
            token: token
        })
    },

    secret: async (req, res, next) => {
        console.log("this is controller user");
        res.json({
            status: 200,
            msg: "successfully entered"
        })

    },
    logout: async (req, res, next) => {
        res.clearCookie("access_token");
        res.json(req.user)
    },
    googleAuth: async (req, res, next) => {
        const token = JWT.sign(
            {
                iss: "kumar",
                sub: req.user.id,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            }, process.env.SECRET_KEY);
        res.cookie("access_token", token, { httpOnly: true }, { sameSite: true })
        res.json({
            status: 200,
            token: token
        })
    },
    facebook: async (req, res, next) => {
        res.json({ status: 200 })
        console.log(req.user);
    }
}
