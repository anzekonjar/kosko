const express = require("express")
const router = express.Router()

const Game = require("../models/game")
const { checkAuthenticated } = require("./auth")

router.get("/new", (req, res) => {
    res.render("games/set-up.ejs")
})

router.get("/", (req, res) => {
    res.render("games/kosko.ejs")
})

router.post("/", async (req, res) => {
    let result = JSON.parse(req.body.game)
    let game = new Game({
        result: result,
        userId: req.user.id,
    })

    try {
        game = await game.save()
        res.redirect("/")
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    const game = await Game.findById(req.params.id)
    if (game == null) res.redirect('/')
    res.render('games/show', { game: game })
})
  

module.exports = router