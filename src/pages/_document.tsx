// pages/_document.tsx
import { ServerStyleSheets } from '@mui/styles'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

//このページはcss崩れを防ぐために導入している
// Htmlに lang="ja"
// Headに <meta charSet="utf-8" />
//を入れるのが解決策！？

class MyDocument extends Document {
  render() {
    return (
      <Html lang='ja'>
        <Head>
          <meta charSet='utf-8' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  }
}

export default MyDocument
