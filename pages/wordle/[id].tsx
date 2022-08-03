import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head';
import GameBoard from '../../components/GameBoard';
import styles from '../../styles/Wordle.module.css'

export type WordleProps = {
    word: string
    message: string
    creatorName?: string
}

const PersonalizedWordle: React.FC<WordleProps> = props => {

    if (!props.word) {
        console.error('error loading wordle:', props)
    }

    const creator: string = props.creatorName || 'Anonymous'
    return (
        <div className={styles.App}>
            <Head>
                <title>Custom Wordle</title>
                <meta name="description" content="Created by Derek Borges" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.header}>
                <h1 className={styles.title}>Personalized Wordle by {creator}</h1>
                <p className={styles.subtitle}>{props.message}</p>
            </div>
            <div className='game-container'>
                <GameBoard {...props} />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const baseUrl = process.env.BASE_URL
    const res = await fetch(`${baseUrl}/api/wordle/${context.params?.id}`)
    const data = await res.json()
    return { props: { ...data } }
}

export default PersonalizedWordle
