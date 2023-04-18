import 'assets/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { LayoutPageType, DefaultLayout } from 'layouts'
import { SEO } from 'components/seo'
import type { AppProps } from 'next/app'
import init from '@socialgouv/matomo-next'
import { useEffect, useMemo } from 'react'
import Script from 'next/script'
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react'
import { page } from 'types'

import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

type Props = {
  pages: page[]
}

type AppLayoutProps = AppProps & {
  Component: LayoutPageType
  pageProps: Props
}

type LayoutProps = {
  pages: page[]
  children: React.ReactNode
}

const pages = [
  {
    name: 'Dome',
    href: '/stage/5',
  },
  {
    name: 'Board Room',
    href: '/stage/4',
  },
  {
    name: 'Archive',
    href: '/schedule',
  },
]

export default function App({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout || ((props: LayoutProps) => <DefaultLayout pages={pages}>{props.children}</DefaultLayout>)

  const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY ?? '' }), publicProvider()]
  )
  const { connectors } = getDefaultWallets({
    appName: 'StreamETH',
    chains,
  })
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  console.log('pageProps', pageProps)
  useEffect(() => {
    const plugin = pageProps.event?.plugins.find((i: any) => i['name'] === 'matomo')
    if (plugin) {
      init({
        url: plugin.config['url'],
        siteId: plugin.config['siteId'] as string,
      })
    }
  }, [pageProps.event])

  if (!process.env.NEXT_PUBLIC_STUDIO_API_KEY) {
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
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Script src="/theme.js" />
        <LivepeerConfig dehydratedState={pageProps?.dehydratedState} client={livepeerClient}>
          <Layout pages={pageProps.pages}>
            <SEO />
            <Component {...pageProps} />
          </Layout>
        </LivepeerConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
