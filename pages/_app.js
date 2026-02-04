import Head from "next/head";
import MainHeader from "../components/layout/MainHeader";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainHeader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
