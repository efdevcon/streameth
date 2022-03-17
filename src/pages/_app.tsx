import 'assets/globals.css'
import { Layout } from 'components/layout'
import { SEO } from 'components/seo'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <SEO />
    <Component {...pageProps} />
  </Layout>
}
