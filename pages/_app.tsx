import React from "react";
import { AppProps } from "next/app";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Layout />
      <Component {...pageProps} />
    </>
  );
};

export default App;
