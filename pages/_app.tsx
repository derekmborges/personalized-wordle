import '../styles/globals.css'
import '../styles/GameBoard.css'
import '../styles/LetterTile.css'
import '../styles/Keyboard.css'
import '../styles/GameResultModal.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
