import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wordle Generator</title>
        <meta name="description" content="Created by Derek Borges" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Custom Wordle Generator!
        </h1>

        <p className={styles.description}>
          Get started by generating a custom wordle or try out the sample game.
        </p>

        <div className={styles.grid}>
          <div className={styles.grid_row}>
            <a href="/new" className={styles.card}>
              <h2>Generate Wordle &rarr;</h2>
              <p>Define a custom wordle game with a 5-letter word of your choice. 
                Then you can share it with your friends!
              </p>
            </a>
          </div>
          <div className={styles.grid_row}>
            <a href="/wordle/SAMPLE-ID" className={styles.card}>
              <h2>Try our Sample &rarr;</h2>
              <p>Learn how to play Wordle by trying out the sample one we created for you.</p>
            </a>
            <a
              href="https://www.cnet.com/culture/internet/wordle-what-to-know-about-the-viral-word-game/"
              className={styles.card}
            >
              <h2>Learn More &rarr;</h2>
              <p>Find out more about Wordle.</p>
            </a>
          </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <div>
          <a
            href="https://heroku.com/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/heroku.svg" alt="Heroku Logo" width={72} height={16} />
            </span>
          </a>
        </div>
        <div>
          <a
            href="https://github.com/derekmborges/personalized-wordle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute{' '}
            <span className={styles.logo}>
              <Image src="/github.png" alt="Github Logo" width={24} height={24} />
            </span>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home
