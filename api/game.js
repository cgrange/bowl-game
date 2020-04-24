const Bowl = require('./bowl');

class Game {
    constructor(timeLimit) {
        this.bowl = new Bowl();
        this.team1Score = 0;
        this.team2Score = 0;
        this.team1sTurn = true;
        this.timeLimit = timeLimit;
        this.inRound = false;
        this.promptsLeft = 0;
    }

    startRound() {
        if (this.inRound) {
            return null;
        } else {
            this.inRound = true;
            const prompts = [];
            for (let i = 0; i < 3; i++) {
                const nextPrompt = this.bowl.nextPrompt();
                if (nextPrompt !== null) {
                    prompts.push(nextPrompt);
                }
            }

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
            this.promptsLeft--;
            if (this.team1sTurn) {
                this.team1Score++;
            } else {
                this.team2Score++;
            }
        }
    }

    endRound(prompts) {
        this.bowl.addPrompts(prompts); // the prompts that they didn't complete
        this.team1sTurn = !this.team1sTurn;
        this.bowl.shufflePrompts();
        this.inRound = false;
    }

    addPrompts(newPrompts) {
        this.bowl.addPrompts(newPrompts);
        this.promptsLeft = this.bowl.prompts.length;
    }
}

module.exports = Game;