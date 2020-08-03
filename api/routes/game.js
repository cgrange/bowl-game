const express = require('express');
const router = express.Router();
const Game = require('../game');
const sse = require('sse-broadcast')();
let game = null;

const getLobbyState = function() {
    if (game === null) {
        return {
            timeLimit: 45,
            gameStarted: false,
            team1Score: 0,
            team2Score: 0,
            team1sTurn: true,
            promptsLeft: 0
        };
    } else {
        return {
            timeLimit: game.timeLimit,
            gameStarted: true,
            team1Score: game.team1Score,
            team2Score: game.team2Score,
            team1sTurn: game.team1sTurn,
            promptsLeft: game.promptsLeft
        };
    }
}

router.post('/new-game', (req, res, next) => {
    game = new Game(req.body.timeLimit);
    res.send('success');
    sse.publish('lobby', 'state-change', JSON.stringify(getLobbyState()));
});

router.post('/post-prompts', function(req, res, next) {
    game.addPrompts(req.body.prompts);
    res.send('success');
    sse.publish('lobby', 'state-change', JSON.stringify(getLobbyState()));
});

// arena calls
router.get('/start-turn', (req, res, next) => {
    const response = game.startTurn();
    if (response === null) {
        res.json({valid:false});
    } else {
        console.log('starting turn');
        res.json({valid:true, ...response});
    }
});

router.get('/next', (req, res, next) => {
    res.json("success");
    game.next();
    sse.publish('lobby', 'state-change', JSON.stringify(getLobbyState()));
});

router.get('/end-round', (req, res, next) => {
    res.json(game.endRound());
    sse.publish('lobby', 'state-change', JSON.stringify(getLobbyState()));
});

router.post('/end-turn', (req, res, next) => {
    console.log('ending turn');
    game.endTurn(req.body.unfinishedPrompts);
    console.log('temp prompts: ' + game.tempPrompts);
    res.json('success');
    sse.publish('lobby', 'state-change', JSON.stringify(getLobbyState()));
});

// get events 
//      lobby and waiting area data is broadcasted on subscription basis
//      clients subscribe to those broadcasts here

router.get('/events', (req, res, next) => {
    sse.subscribe('lobby', res);
    sse.sendEvent(res, 'state-change', JSON.stringify(getLobbyState()));
});

module.exports = router;