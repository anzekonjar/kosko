const passport = require("passport")
const bcrypt = require("bcrypt")
const User = require("./models/user")
const LocalStrategy = require("passport-local").Strategy

passport.serializeUser((user, done) => {
    process.nextTick(function() {
        return done(null, user.id)
    })
})

passport.deserializeUser(async (id, done) => {
    var user = await User.findById(id)
    return done(null, user)
})

passport.use(
    new LocalStrategy({ usernameField: "email"}, (email, password, done) => {
        User.findOne({ email: email })
            .then(user => bcrypt.compare(password, user.password, (e, isMatch) => {
                if (e) throw e

                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: "Wrong password" })
                }
            }))
            .catch(e => {
                return done(null, false, { message: e })
            })
    })
)

module.exports = passport