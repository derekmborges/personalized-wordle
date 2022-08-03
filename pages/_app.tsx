import '../styles/globals.css'
import '../styles/GameResultModal.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
