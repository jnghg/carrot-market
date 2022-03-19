import Document, { Head, Html, Main, NextScript } from "next/document";

// nextJS font는 구글폰트에서 가져와야 최적화를 해줌.
// document는 실행 후 한번만 수행됨.
class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ko">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
