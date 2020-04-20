const Bowl = require('./bowl');

class Game {
    constructor(timeLimit) {
        this.bowl = new Bowl();
        this.team1Score = 0;
        this.team2Score = 0;
        this.team1sTurn = true;
        this.timeLimit = timeLimit;
        this.inRound = false;
    }

    startRound() {
        if (this.inRound) {
            return null;
        } else {
            this.inRound = true;
            const prompts = [];
            prompts.push(this.bowl.nextPrompt());
            prompts.push(this.bowl.nextPrompt());

            return {
                timeLimit: this.timeLimit,
                prompts: prompts
            }
        }
    }

    next() {
        try {
            return {nextPrompt: this.bowl.nextPrompt()};
        } finally {
            if (this.team1sTurn) {
                this.team1Score++;
            } else {
                this.team2Score++;
            }
        }
    }

    skip() {
        return {nextPrompt: this.bowl.nextPrompt()};
    }

    endRound(prompts) {
        this.bowl.addPrompts(prompts); // the prompts that they didn't complete
        this.team1sTurn = !this.team1sTurn;
        this.bowl.shufflePrompts;
        this.inRound = false;
    }

    addPrompts(newPrompts) {
        this.bowl.addPrompts(newPrompts);
    }
}

module.exports = Game;