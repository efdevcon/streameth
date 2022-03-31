import 'assets/css/main.scss'
import { LayoutPageType, DefaultLayout } from 'layouts'
import { SEO } from 'components/seo'
import type { AppProps } from 'next/app'

type AppLayoutProps = AppProps & {
  Component: LayoutPageType
}

export default function App({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout || (props => <DefaultLayout>{props.children}</DefaultLayout>)

  return (
    <Layout>
      <SEO />
      <Component {...pageProps} />
    </Layout>
  )
}
