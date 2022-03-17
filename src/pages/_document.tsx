import Document, { Html, Head, Main, NextScript } from 'next/document'
import { DESCRIPTION, TITLE } from 'utils/constants'

export default class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
