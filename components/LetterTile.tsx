import React from 'react'

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

  const getResultClass = (): string => {
    return isCorrect ? 'green'
      : isClose ? 'yellow'
        : 'grey'
  }

  const getStagger = (): string => {
    if (!letterIndex || letterIndex === 0) return ''
    return `stagger-${letterIndex}`
  }

  return (
    <div className='scene'>
      <div className={`card ${submitted ? 'revealed' : ''} ${getStagger()}`}>
        <div className='card-face front'>
          {letter && <h1 className='letter'>{letter}</h1>}
        </div>
        <div className={`card-face back ${getResultClass()}`}>
          <h1 className='letter'>{letter}</h1>
        </div>
      </div>
    </div>
  )
}
