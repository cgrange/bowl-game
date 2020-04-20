const express = require('express');
const router = express.Router();
const Game = require('../game');
let game;

router.post('/new-game', (req, res, next) => {
    game = new Game(req.body.timeLimit);
    res.send('success');
});

router.post('/post-prompts', function(req, res, next) {
    game.addPrompts(req.body.prompts);
    res.send('success');
});

router.get('/start-round', (req, res, next) => {
    const response = game.startRound();
    if (response === null) {
        res.json('already in the middle of a round');
    } else {
        console.log('starting round');
        res.json(response);
    }
});

router.get('/skip', (req, res, next) => {
    res.json(game.skip());
});

router.get('/next', (req, res, next) => {
    res.json(game.next());
});

router.post('/end-round', (req, res, next) => {
    console.log('ending round');
    game.endRound(req.body.unfinishedPrompts);
    res.send('success');
});

module.exports = router;