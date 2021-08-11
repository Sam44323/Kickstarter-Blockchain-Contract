import React from "react";
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import CampaignGenerator from "../../../ethereum/Campaign";

const Campaign: React.FC<{ data: any }> = ({ data }) => {
  const { query } = useRouter();
  console.log(data);
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const campaign = await CampaignGenerator(context.query.campaign);
  console.log(await campaign.methods.getSummary().call());
  return {
    props: {
      data: "",
    },
  };
};

export default Campaign;
