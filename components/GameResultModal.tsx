import React from 'react'

type Props = {
    won: boolean
    word: string
}

export default function GameResultModal({ won, word }: Props) {
  return (
    <div className='modal'>
        { won ? (
            <h2 className='message'>You got it! I love this about you.</h2>
        ) : (
            <h2 className='message'>Nice try... the word was {word}.</h2>
        )}
        <p>Come back again tomorrow for a new word! Miss you.</p>
    </div>
  )
}
