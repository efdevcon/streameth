import 'assets/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { LayoutPageType, DefaultLayout } from 'layouts'
import { SEO } from 'components/seo'
import type { AppProps } from 'next/app'
import init from '@socialgouv/matomo-next'
import { useEffect, useMemo } from 'react'
import Script from 'next/script'
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react'

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
  }, [pageProps.event])

  if (!process.env.NEXT_PUBLIC_STUDIO_API_KEY){ 
    console.error('process.env.NEXT_PUBLIC_STUDIO_API_KEY is not set')
  }

  const livepeerClient = useMemo(
    () =>
      createReactClient({
        provider: studioProvider({
          apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY ?? '',
        }),
      }),
    []
  )

  return (
    <>
      <Script src="/theme.js" />
      <LivepeerConfig dehydratedState={pageProps?.dehydratedState} client={livepeerClient}>
        <Layout>
          <SEO />
          <Component {...pageProps} />
        </Layout>
      </LivepeerConfig>
    </>
  )
}
