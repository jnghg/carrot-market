import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SWRConfig } from "swr"; // fetcher 함수를 모든 화면에서 사용할 수 있도록 설정

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-lg mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
