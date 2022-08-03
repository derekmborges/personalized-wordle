import React from 'react'
import styles from '../styles/LetterTile.module.css'
import cx from 'classnames'

type Props = {
  letter?: string
  letterIndex?: number
  submitted?: boolean
  isCorrect?: boolean
  isClose?: boolean
}

export const LetterTile = ({
  letter, submitted, isCorrect, isClose, letterIndex
}: Props) => {

  const getResultClass = () => {
    return isCorrect ? styles.green
      : isClose ? styles.yellow
        : styles.grey
  }

  const getStaggeStyle = () => {
    if (letterIndex === 1) return styles.stagger1
    if (letterIndex === 2) return styles.stagger2
    if (letterIndex === 3) return styles.stagger3
    if (letterIndex === 4) return styles.stagger4
    return null
  }

  return (
    <div className={styles.scene}>
      <div className={cx(
        styles.card,
        submitted ? styles.revealed : null,
        getStaggeStyle()
        )}>
        <div className={cx(styles.cardFace, styles.front)}>
          {letter && <h1 className={styles.letter}>{letter}</h1>}
        </div>
        <div className={cx(
          styles.cardFace,
          styles.back,
          getResultClass()
          )}>
          <p className={styles.letter}>{letter}</p>
        </div>
      </div>
    </div>
  )
}
