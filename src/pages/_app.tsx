import 'assets/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { LayoutPageType, DefaultLayout } from 'layouts'
import { SEO } from 'components/seo'
import type { AppProps } from 'next/app'
import init from '@socialgouv/matomo-next'
import { useEffect } from 'react'

type AppLayoutProps = AppProps & {
  Component: LayoutPageType
}

export default function App({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout || ((props) => <DefaultLayout>{props.children}</DefaultLayout>)

  useEffect(() => {
    init({
      url: 'https://matomo.ethereum.org/',
      siteId: '34',
    })
  }, [])

  return (
    <Layout>
      <SEO />
      <Component {...pageProps} />
    </Layout>
  )
}
