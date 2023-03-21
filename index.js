const express = require("express")
const app = express()

const session = require("express-session")
const mongoose = require("mongoose")
const passport = require("./passport-config")
const methodOverride = require("method-override")

const auth = require('./routes/auth')
const games = require("./routes/games")
const Game = require("./models/game")

const uri = "mongodb+srv://anzekonjar:17f63l52a%40AK@anzekonjar.p7qiuba.mongodb.net/kosko?retryWrites=true&w=majority"
mongoose.set('strictQuery', false)
mongoose.connect(uri ,{ useNewUrlParser: true, useUnifiedTopology: true },)

app.set('view engine', 'ejs')

app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: false }))

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

app.get("/", async (req, res) => {
    try {
      res.json({
        status: 200,
        message: "Get data has successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));