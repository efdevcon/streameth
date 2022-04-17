import 'assets/css/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { LayoutPageType, DefaultLayout } from 'layouts'
import { SEO } from 'components/seo'
import type { AppProps } from 'next/app'
import PlausibleProvider from 'next-plausible'

type AppLayoutProps = AppProps & {
  Component: LayoutPageType
}

export default function App({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout || (props => <DefaultLayout>{props.children}</DefaultLayout>)

  return (
    <PlausibleProvider domain={'streameth.tv'} trackOutboundLinks>
      <Layout>
        <SEO />
        <Component {...pageProps} />
      </Layout>
    </PlausibleProvider>
  )
}
