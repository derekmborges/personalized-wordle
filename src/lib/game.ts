import { TODAYS_WORDLE } from "./words";

export interface GuessResult {
    correctLetters?: number[] // indices
    closeLetters?: number[] // indices
}

export const WORD_LENGTH = 5;
export const MAX_TURNS = 6;

export interface WordleGameData {
    word: string
    turns: (string | null)[]
    guessResults: GuessResult[]
    currentTurn: number
    result: boolean | null
}

export class WordleGame {
    word: string;
    turns: (string | null)[];
    guessResults: GuessResult[];
    currentTurn: number;
    result: boolean | null;

    constructor() {
        // var randomWord = require('random-word-by-length');
        // this.word = randomWord(WORD_LENGTH)
        this.word = TODAYS_WORDLE.toUpperCase()
        this.turns = []
        for (let i=0; i<MAX_TURNS; i++) {
            this.turns.push(null);
        }
        this.guessResults = []
        this.currentTurn = 0
        this.result = null
    }

    submitWord(guess: string) {
        // Save the user's guess
        this.turns[this.currentTurn] = guess
        
        // Check for any correct or close letters
        let processedLetters: string[] = []
        let correctLetters: number[] = []
        let closeLetters: number[] = []
        for (let i=0; i<guess.length; i++) {
            const char = guess.charAt(i)

            if (char === this.word.charAt(i)) {
                correctLetters.push(i)
                processedLetters.push(char)
            }

            else if (this.word.includes(char) && !processedLetters.includes(char)) {
                closeLetters.push(i)
                processedLetters.push(char)
            }

        }

        // Check for letters that shouldn't be close after the whole word was checked
        correctLetters.forEach(i => {
            const letter = guess.charAt(i)
            const numLetters = Array.from(this.word).filter(l => l === letter).length
            const numFound = correctLetters.map(i => guess.charAt(i)).filter(l => l === letter).length
            if (closeLetters.map(i => guess.charAt(i)).includes(letter) && numFound === numLetters) {
                closeLetters = closeLetters.splice(i, 1)
            }
        })

        // Check for a win
        if (correctLetters.length === this.word.length) {
            this.result = true
        }

        // Set the user to their next turn
        this.currentTurn++

        this.guessResults.push({
            correctLetters,
            closeLetters
        })
    }

    isGameOver(): boolean {
        if (this.result != null) return true

        if (this.guessResults.length === MAX_TURNS) {
            this.result = false
            return true
        }

        return false
    }

    save() {
        const gameData = {
            word: this.word,
            turns: this.turns,
            guessResults: this.guessResults,
            currentTurn: this.currentTurn,
            result: this.result
        } as WordleGameData

        localStorage.setItem("wordleGameData", JSON.stringify(gameData))
    }

    static load(): WordleGame {
        const game = new WordleGame()

        const existingGameData = localStorage.getItem("wordleGameData")
        if (existingGameData) {
            const gameData: WordleGameData = JSON.parse(existingGameData)
            game.word = gameData.word
            game.currentTurn = gameData.currentTurn
            game.turns = gameData.turns
            game.guessResults = gameData.guessResults
            game.result = gameData.result
        }

        return game
    }

}
