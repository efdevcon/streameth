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
    const plugin = pageProps.event?.plugins.find((i: any) => i['name'] === 'matomo')
    if (plugin) {
      init({
        url: plugin.config['url'],
        siteId: plugin.config['siteId'] as string,
      })
    }
  }, [])

  return (
    <Layout>
      <SEO />
      <Component {...pageProps} />
    </Layout>
  )
}
