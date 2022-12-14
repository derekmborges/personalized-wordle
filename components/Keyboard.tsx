import React from 'react'
import { GuessResult } from '../lib/game'
import styles from '../styles/Keyboard.module.css'
import cx from 'classnames'

type Props = {
  turns: (string | null)[]
  results: GuessResult[]
  onLetterClicked: (letter: string) => void
  onBackClicked: () => void
  onClearClicked: () => void
  onSubmitClicked: () => void
}

interface KeyboardKey {
  label: string
  isLetter: boolean
  customAction?: () => void
}

export default function Keyboard({
  turns, results, onBackClicked, onLetterClicked, onClearClicked, onSubmitClicked
}: Props) {

  const allCorrect: string[] = []
  const allClose: string[] = []
  const allWrong: string[] = []
  results.forEach((result, i) => {
    const word = turns[i]
    if (word) {
      result.correctLetters?.forEach(li => {
        if (!allCorrect.includes(word[li])) {
          allCorrect.push(word[li])
        }
      })

      result.closeLetters?.forEach(li => {
        if (!allClose.includes(word[li])) {
          allClose.push(word[li])
        }
      })

      Array.from(word).forEach(letter => {
        if (!allCorrect.includes(letter) && !allClose.includes(letter) && !allWrong.includes(letter))
          allWrong.push(letter)
      })
    }
  })

  const letter_template: KeyboardKey = {
    label: '',
    isLetter: true
  }

  const KEYBOARD_KEYS: KeyboardKey[][] = [
    [
      { ...letter_template, label: 'Q' },
      { ...letter_template, label: 'W' },
      { ...letter_template, label: 'E' },
      { ...letter_template, label: 'R' },
      { ...letter_template, label: 'T' },
      { ...letter_template, label: 'Y' },
      { ...letter_template, label: 'U' },
      { ...letter_template, label: 'I' },
      { ...letter_template, label: 'O' },
      { ...letter_template, label: 'P' },
    ],
    [
      { ...letter_template, label: 'A' },
      { ...letter_template, label: 'S' },
      { ...letter_template, label: 'D' },
      { ...letter_template, label: 'F' },
      { ...letter_template, label: 'G' },
      { ...letter_template, label: 'H' },
      { ...letter_template, label: 'J' },
      { ...letter_template, label: 'K' },
      { ...letter_template, label: 'L' },
    ],
    [
      { ...letter_template, label: 'Z' },
      { ...letter_template, label: 'X' },
      { ...letter_template, label: 'C' },
      { ...letter_template, label: 'V' },
      { ...letter_template, label: 'B' },
      { ...letter_template, label: 'N' },
      { ...letter_template, label: 'M' },
      {
        label: 'Submit',
        isLetter: false,
        customAction: onSubmitClicked
      }
    ],
    [
      {
        label: 'Back',
        isLetter: false,
        customAction: onBackClicked
      },
      {
        label: 'Clear',
        isLetter: false,
        customAction: onClearClicked
      },
    ]
  ]

  const keyClicked = (key: KeyboardKey) => {
    if (key.isLetter)
      onLetterClicked(key.label)
    else if (key.customAction) {
      key.customAction()
    }
  }

  const getUsedColor = (key: KeyboardKey) => {
    if (!key.isLetter) return null

    return allCorrect.includes(key.label) ? styles.green
      : allClose.includes(key.label) ? styles.yellow
      : allWrong.includes(key.label) ? styles.grey
      : null
  }

  return (
    <div className={styles.keyboard}>
      {KEYBOARD_KEYS.map((row, i) =>
        <div key={i} className={styles.row}>
          {row.map((key, i) =>
            <div key={i} className={cx(
                styles.key,
                key.customAction ? styles.action : null,
                getUsedColor(key)
              )}
              onClick={() => keyClicked(key)}>
              <p className={styles.keyLabel}>{key.label}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
