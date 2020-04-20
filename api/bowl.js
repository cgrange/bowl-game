class Bowl {
    constructor () {
        this.prompts = [];
    }

    addPrompts(newPrompts) {
        this.prompts = this.prompts.concat(newPrompts);
    }

    nextPrompt() {
        return this.prompts.pop();
    }

    shufflePrompts() {
        for (let i = this.prompts.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [this.prompts[i], this.prompts[j]] = [this.prompts[j], this.prompts[i]]; //swap j and i
        }
    }
}

module.exports = Bowl;