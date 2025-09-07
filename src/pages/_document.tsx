import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta charSet="UTF-8" />
        {/* <meta name="yandex-verification" content="0ea5eb96cbb6d0d8" /> */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        {/* <script defer src="https://cloud.umami.is/script.js" data-website-id="f1625584-2110-4e0b-92c5-bb2765cc123b"></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
