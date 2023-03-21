const express = require("express")
const app = express()

const session = require("express-session")
const mongoose = require("mongoose")
const passport = require("./passport-config")
const methodOverride = require("method-override")

const auth = require('./routes/auth')
const games = require("./routes/games")
const Game = require("./models/game")

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
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

app.use('/', auth.router)
app.use("/game", games)

app.get("/", (req,res) => {
  res.render("login.ejs")
})

app.listen(8080)