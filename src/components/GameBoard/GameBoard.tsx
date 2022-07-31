import React, { useEffect, useState } from 'react'
import { WordleGame, WORD_LENGTH } from '../../lib/game'
import GameResultModal from '../GameResultModal/GameResultModal'
import Keyboard from '../Keyboard/Keyboard'
import { LetterTile } from '../LetterTile/LetterTile'
import './GameBoard.css'

export default function GameBoard() {
    const [game] = useState(WordleGame.load())
    const [currentWord, setCurrentWord] = useState('')

    const enterLetter = (letter: string) => {
        if (currentWord && currentWord.length < WORD_LENGTH) {
            setCurrentWord(currentWord + letter)
        }
        else if (!currentWord) {
            setCurrentWord(letter)
        }
    }

    const removeLetter = () => {
        if (currentWord && currentWord.length > 0) {
            const newWord = currentWord.substring(0, currentWord.length - 1)
            setCurrentWord(newWord)
        }
    }

    const clearWord = () => {
        setCurrentWord('')
    }

    const submitGuess = () => {
        if (currentWord.length === WORD_LENGTH) {
            game.submitWord(currentWord)
            game.save()
            clearWord()
        }
    }

    const buildWord = (
        turn: string | null,
        index: number
    ): JSX.Element[] => {
        let letters: JSX.Element[] = []

        const result = index < game.currentTurn
            ? game.guessResults[index]
            : undefined

        for (let i=0; i<WORD_LENGTH; i++) {
            const submittedLetter = turn?.at(i)
            const currentLetter = index === game.currentTurn ? currentWord[i] : undefined
            letters.push(
                <LetterTile
                    key={i}
                    submitted={submittedLetter !== undefined}
                    letter={currentLetter || submittedLetter}
                    letterIndex={i}
                    isCorrect={result && result.correctLetters && result.correctLetters.includes(i)}
                    isClose={result && result.closeLetters && result.closeLetters.includes(i)}
                />
            )
        }

        return letters
    }

    return (
        <div className='game'>
            <div className='board'>
                {game.turns.map((turn, i) =>
                    <div key={i} className='word'>
                        {buildWord(turn, i)}
                    </div>
                )}
            </div>
            <div className='keyboard'>
                <Keyboard
                    turns={game.turns}
                    results={game.guessResults}
                    onLetterClicked={enterLetter}
                    onBackClicked={removeLetter}
                    onClearClicked={clearWord}
                    onSubmitClicked={submitGuess}
                />
            </div>

            {game.isGameOver() && (
                <GameResultModal
                    word={game.word}
                    won={game.result || false}
                />
            )}
        </div>
    )
}
