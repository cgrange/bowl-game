function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [arr[i], arr[j]] = [arr[j], arr[i]]; //swap j and i
    }
    return arr;
}

class Game {
    constructor(timeLimit) {
        this.allPrompts = [];
        this.tempPrompts = [];
        this.team1Score = 0;
        this.team2Score = 0;
        this.team1sTurn = true;
        this.timeLimit = timeLimit;
        this.inTurn = false;
        this.promptsLeft = 0;
    }

    startTurn() {
        if (this.inTurn) {
            return null;
        } else {
            this.inTurn = true;

            return {
                timeLimit: this.timeLimit,
                prompts: this.tempPrompts.splice(0)
            }
        }
    }

    next() {
        this.promptsLeft--;
        if (this.team1sTurn) {
            this.team1Score++;
        } else {
            this.team2Score++;
        }
    }

    endTurn(prompts) {
        this.tempPrompts = this.tempPrompts.concat(prompts); // the prompts that they didn't complete
        this.team1sTurn = !this.team1sTurn;
        this.tempPrompts = shuffleArray(this.tempPrompts);
        this.inTurn = false;
    }

    endRound() {
        this.tempPrompts = this.tempPrompts.concat(this.allPrompts);
        this.promptsLeft = this.tempPrompts.length;
        this.tempPrompts = shuffleArray(this.tempPrompts);
        if (this.team1sTurn) {
            this.team1Score++;
        } else {
            this.team2Score++;
        }

        return { prompts: this.tempPrompts.splice(0) };
    }

    addPrompts(newPrompts) {
        this.allPrompts = this.allPrompts.concat(newPrompts);
        this.tempPrompts = this.tempPrompts.concat(newPrompts);
        this.promptsLeft = this.tempPrompts.length;
        this.tempPrompts = shuffleArray(this.tempPrompts);
    }
}

module.exports = Game;