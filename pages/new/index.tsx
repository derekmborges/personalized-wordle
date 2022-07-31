import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/NewWordleForm.module.css'

const NewWordleForm: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Personalized Wordle</title>
                <meta name="description" content="Created by Derek Borges" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.title}>
                    <h1>Create personalized wordle</h1>
                </div>
                <div className={styles.form}>
                    <div className={styles.control}>
                        <p>Word:</p>
                        
                    </div>
                </div>
            </main>

            {/* <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer> */}
        </div>
    )
}

export default NewWordleForm
