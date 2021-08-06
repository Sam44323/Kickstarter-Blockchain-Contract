import React from "react";
import { AppProps } from "next/app";
import "semantic-ui-css/semantic.min.css";
import Header from "../components/Header";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default App;
