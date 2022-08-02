import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/index.scss'
import Layout from './../components/layout'
import { Provider } from 'react-redux'
import store from './../src/redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Portal Docentes</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
