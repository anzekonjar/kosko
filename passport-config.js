const passport = require("passport")
const bcrypt = require("bcrypt")
const User = require("./models/user")
const LocalStrategy = require("passport-local").Strategy

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    var user = await User.findById(id)
    done(null, user)
})

passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (email, password, done) {
       try {
        const user =  await User.findOne({ email: email });
            console.log(user);
            if (!user) {
            console.log("Incorrect username.");
            }
       
       const passwordMatched = await bcrypt.compare(password, user.passwordHash);//unable to get user.password because it store in hash
            if (passwordMatched) {
              return user;
            }
            else  {
              console.log("Incorrect password.");
            }

       } catch (error) {
            console.log(error)
       }  
    }
));

module.exports = passport