import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
//TODO: Create a login/register functionallity
//TODO: Create dark / light mode
//TODO: Fully new ui design
//TODO: Socket.io  