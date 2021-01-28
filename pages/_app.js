import { React, useState, useEffect } from "react";
import Head from "next/head";
import "styles/global.scss";
import { ViewportProvider } from "lib/hooks/use-viewport";
import { SWRConfig } from 'swr'; // SWR global config
import fetchJson from "lib/fetchJson"; // custom fetch wrapper


const createTitle = (pageName) => {
  const websiteName = "LPDev";
  return pageName ? `${websiteName} - ${pageName}` : websiteName;
};

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{createTitle(pageProps.pageName || Component.name)}</title>{" "}
        <link rel="icon" href="/icons/favicons/default-favicon.ico" />
      </Head>

      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <ViewportProvider>
          <Component {...pageProps} />
        </ViewportProvider>
      </SWRConfig>

      <style jsx>{`
        //...
      `}</style>
    </>
  );
}

export default App;
