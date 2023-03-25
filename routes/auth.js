const express = require('express')
const router = express.Router()

const User = require("../models/user")
const bcrypt = require("bcrypt")
const passport = require('passport')
const user = require('../models/user')

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs', { error: null })
})

router.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
}))

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

router.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        user = await user.save()
        res.redirect("/login")
    } catch (e) {
        console.log(e)
        res.redirect("/register")
    }
})

router.delete("/logout", (req, res) => {
    req.logOut((e) => {
        if (e) { return next(e); }
        res.redirect('/');
    })
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }

    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/")
  }

  next()
}

module.exports = { router: router, checkAuthenticated: checkAuthenticated, checkNotAuthenticated: checkNotAuthenticated }