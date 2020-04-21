const express = require('express');
const router = express.Router();
const Game = require('../game');
let game = null;

router.post('/new-game', (req, res, next) => {
    game = new Game(req.body.timeLimit);
    res.send('success');
});

router.post('/post-prompts', function(req, res, next) {
    game.addPrompts(req.body.prompts);
    res.send('success');
});

router.post('/end-round', (req, res, next) => {
    console.log('ending round');
    game.endRound(req.body.unfinishedPrompts);
    res.send('success');
});

// get state

router.get('/landing-page', (req, res, next) => {
    if (game === null) {
        res.json({timeLimit: 45, gameStarted: false});
    } else {
        res.json({timeLimit: game.timeLimit, gameStarted: true});
    }
});

router.get('/lobby', (req, res, next) => {
    res.send({
        team1Score: game.team1Score,
        team2Score: game.team2Score,
        promptsLeft: game.bowl.prompts.length,
        team1sTurn: game.team1sTurn
    });
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

module.exports = router;