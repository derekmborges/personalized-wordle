import Link from 'next/link'
import React from 'react'
import { Modal, Button } from 'react-bootstrap'

type Props = {
    show: boolean
    won: boolean
    creator: string
    word: string
    onHide: () => void
}

export default function GameResultModal({ show, won, creator, word, onHide }: Props) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        You {won ? 'Won!' : 'Lost...'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {won 
            ? `Either ${creator} made that way too easy for you, or you're nothing but pure skill!`
            : `The word was ${word}. You can thank ${creator} for making that game for you.`
          }
        </p>
        <p>
          Want to create one for someone? Head over to <Link href='/new'>generate one</Link> yourself!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
