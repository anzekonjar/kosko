const express = require("express")
const app = express()

const session = require("express-session")
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const methodOverride = require("method-override")

const auth = require('./routes/auth')
const games = require("./routes/games")
const Game = require("./models/game")
const User = require("./models/user")

const uri = "mongodb+srv://anzekonjar:marmelada37@anzekonjar.p7qiuba.mongodb.net/kosko?retryWrites=true&w=majority"
mongoose.set('strictQuery', false)
mongoose.connect(uri ,{ useNewUrlParser: true, useUnifiedTopology: true },)

app.set('view engine', 'ejs')

app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

passport.use(
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
            return  done(null, false)
          }
     
     const passwordMatched = await bcrypt.compare(password, user.password);
          if (passwordMatched) {
            return done(null, user);
          }
          else  {
            console.log("Incorrect password.");
            return done(null, false)
          }

     } catch (error) {
          console.log(error)
     }  
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  var user = await User.findById(id)
  done(null, user)
})

app.use('/', auth.router)
app.use("/game", games)

app.get("/", auth.checkAuthenticated, async (req, res) => {
  const games = await Game.find( {userId: req.user.id} ).sort({ createdAt: "desc" })
  res.render("index.ejs", { name: req.user.name, games: games })
})

app.listen(8080)