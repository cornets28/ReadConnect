import "@/styles/globals.css";
import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../utils/theme";
import createEmotionCache from "../createEmotionCache";
import { StylesProvider } from "@mui/styles";

import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

import { StateProvider } from "@/context/StateContext";
import reducer, { initialState } from "@/context/StateReducer";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>ReadConnect</title>
      </Head>
      <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <CssBaseline />
        <StylesProvider
          generateClassName={(rule, sheet) =>
            // @ts-ignore
            `${sheet.options.classNamePrefix}-${rule.key}`
          }
        >
          <Component {...pageProps} />
        </StylesProvider>

        <Footer />
      </ThemeProvider>
      </StateProvider>
    
    </CacheProvider>
  );
}
