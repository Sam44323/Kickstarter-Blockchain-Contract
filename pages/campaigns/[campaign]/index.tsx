import React from "react";
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import Head from "next/head";

const Campaign: React.FC = () => {
  const { query } = useRouter();
  return (
    <Container>
      <Head>
        <title>{query.campaign}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>Campaign Details</h1>
    </Container>
  );
};

export default Campaign;
