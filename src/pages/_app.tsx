import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MuiThemeProvider from 'hooks/theme'
import Layout from 'layout/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV !== 'production') {
    const MockServer = () => import('@/../mock/worker')
    MockServer()
  }
  return (
    <MuiThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MuiThemeProvider>
  )
}
export default MyApp
