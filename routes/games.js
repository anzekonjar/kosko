const express = require("express")
const router = express.Router()

const Game = require("../models/game")
const { checkAuthenticated } = require("./auth")

router.get("/new", checkAuthenticated, (req, res) => {
    res.render("games/set-up")
})

router.get("/", checkAuthenticated, (req, res) => {
    res.render("games/kosko")
})

router.post("/", checkAuthenticated, async (req, res) => {
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

router.get('/:id', checkAuthenticated, async (req, res) => {
    const game = await Game.findById(req.params.id)
    if (game == null) res.redirect('/')
    res.render('games/show', { game: game })
})

router.delete("/:id", async (req, res) => {
    await Game.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

module.exports = router