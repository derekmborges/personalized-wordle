import React, { useState } from 'react'
import { WordleGame, WORD_LENGTH } from '../lib/game'
import { WordleProps } from '../pages/wordle/[id]'
import GameResultModal from './GameResultModal'
import Keyboard from './Keyboard'
import { LetterTile } from './LetterTile'
import styles from '../styles/GameBoard.module.css'

export default function GameBoard({ word, creatorName }: WordleProps) {
    const [game] = useState(new WordleGame(word))
    const [currentWord, setCurrentWord] = useState('')
    const [showModal, setShowModal] = useState(false)

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
            clearWord()

            setTimeout(() => {
                if (game.isGameOver()) {
                    setShowModal(true)
                }
            }, 3000)
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
        <div className={styles.game}>
            <div className={styles.board}>
                {game.turns.map((turn, i) =>
                    <div key={i} className={styles.word}>
                        {buildWord(turn, i)}
                    </div>
                )}
            </div>
            <div className={styles.keyboard}>
                <Keyboard
                    turns={game.turns}
                    results={game.guessResults}
                    onLetterClicked={enterLetter}
                    onBackClicked={removeLetter}
                    onClearClicked={clearWord}
                    onSubmitClicked={submitGuess}
                />
            </div>

            <GameResultModal
                show={showModal}
                word={game.word}
                creator={creatorName || 'Anonymous'}
                won={game.result || false}
                onHide={() => setShowModal(false)}
            />
        </div>
    )
}
