import type { NextPage } from 'next'
import GameBoard from '../components/GameBoard';
import styles from '../styles/Wordle.module.css'

const Wordle: NextPage = () => {
    return (
        <div className={styles.App}>
            <div className={styles.header}>
                <h1 className={styles.title}>Personalized Wordle</h1>
                <p className={styles.subtitle}>Some message</p>
            </div>
            <div className='game-container'>
                <GameBoard />
            </div>
        </div>
    );
}

export default Wordle
