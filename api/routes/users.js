const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport")
const userController = require("../controllers/users")
const posspoerConf = require("../passport")

router.route("/signup")
    .post(userController.signUp)

router.route("/signin")
    .post(passport.authenticate("local", { session: false }), userController.signIn)

router.route("/secret")
    .get(passport.authenticate("jwt", { session: false }), userController.secret)

router.route("/oauth/google")
    .post(passport.authenticate("googleToken", { session: false }), userController.googleAuth)

router.route("/oauth/facebook")
    .post(passport.authenticate("facebookToken", { session: false }), userController.facebook)
router.route("/logout")
    .get(passport.authenticate("jwt", { session: false }), userController.logout)
module.exports = router