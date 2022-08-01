import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, Row, Card, Button, Form, Spinner } from 'react-bootstrap'
import styles from '../../styles/NewWordleForm.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'

const NewWordleForm: NextPage = () => {
    const [word, setWord] = useState('')
    const [message, setMessage] = useState('')
    const [fromName, setFromName] = useState('')

    const [processing, setProcessing] = useState(false)
    const [customURL, setCustomURL] = useState('')
    const baseUrl = `${process.env.BASE_URL}/wordle`

    const onWordChanged = (e: { target: { value: string } }) => {
        const word: string = e.target.value
        setWord(word.toUpperCase())
    }

    const onMessageChanged = (e: { target: { value: string } }) => {
        setMessage(e.target.value)
    }

    const onFromNameChanged = (e: { target: { value: string } }) => {
        setFromName(e.target.value)
    }

    const canGenerateWordle = () => {
        return word.length === 5 && message.length > 0;
    }

    const generateWordle = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setProcessing(true)
        try {
            const body = { word, message, fromName }
            const response = await fetch(`/api/wordle`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const createdWordle = await response.json()

            setCustomURL(`${baseUrl}/${createdWordle.id}`)

        } catch (error) {
            console.error(error)
        }
        setProcessing(false)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Personalized Wordle</title>
                <meta name="description" content="Created by Derek Borges" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container className='mt-3'>
                <h2>
                    Create a personalized wordle for someone!
                </h2>
                <p>
                    You get to choose the word and add a message for the recipient.
                </p>
                <Container>
                    <Row className="justify-content-md-between">
                        <Card className="sml-card">
                            <Card.Body>
                                <Card.Title className='mb-3'>Game Details</Card.Title>
                                <Form onSubmit={generateWordle}>
                                    <Form.Group className="mb-3" controlId="formWord">
                                        <Form.Label>5-Letter Word</Form.Label>
                                        <Form.Control
                                            type="text"
                                            minLength={5}
                                            maxLength={5}
                                            onChange={onWordChanged}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formMessage">
                                        <Form.Label>Personal Message</Form.Label>
                                        <Form.Control type="text" onChange={onMessageChanged} />
                                        <Form.Text className="text-muted">
                                            Add a clue, category, or any personal message you want the recipient to see.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formFromName">
                                        <Form.Label>Your Name (optional)</Form.Label>
                                        <Form.Control type="text" onChange={onFromNameChanged} />
                                        <Form.Text className="text-muted">
                                            Let them know who created this wordle for them, or stay anonymous.
                                        </Form.Text>
                                    </Form.Group>

                                    {customURL.length === 0 && (
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            disabled={!canGenerateWordle()}>
                                            {processing ? (
                                                <Spinner animation="border" role="status" size="sm">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            ) : 'Generate'}
                                        </Button>
                                    )}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Row>

                    {customURL.length > 0 && (
                        <Row className="mt-3">
                            <Card className="sml-card">
                                <Card.Body className='text-center'>
                                    <Card.Title className='mb-3'>Success!</Card.Title>
                                    <Card.Subtitle>
                                        The link to share for this custom wordle is:
                                    </Card.Subtitle>
                                    <Card.Link target="_blank" href={customURL}>{customURL}</Card.Link>
                                </Card.Body>
                            </Card>
                        </Row>
                    )}
                </Container>
            </Container>
        </div>
    )
}

export default NewWordleForm
