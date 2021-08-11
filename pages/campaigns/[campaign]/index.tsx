import React from "react";
import { useRouter } from "next/router";
import { Card, Container, Grid, GridColumn } from "semantic-ui-react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import CampaignGenerator from "../../../ethereum/Campaign";

const ColumnComponent: React.FC<{ header: string; desc: string }> = ({
  header,
  desc,
}) => {
  return (
    <GridColumn>
      <Card>
        <Card.Content header={header} description={desc} />
      </Card>
    </GridColumn>
  );
};

const Campaign: React.FC<{ data: any }> = ({ data }) => {
  const { query } = useRouter();
  data = JSON.parse(data);
  return (
    <Container>
      <Head>
        <title>{query.campaign}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>Campaign Details</h1>
      <Container>
        <Grid columns={4} stackable>
          <Grid.Row>
            <ColumnComponent header="Minimum Contribution" desc={data["0"]} />
            <ColumnComponent header="Available Balance" desc={data["1"]} />
          </Grid.Row>
          <Grid.Row>
            <ColumnComponent header="Requests Count" desc={data["2"]} />
            <ColumnComponent header="Approvers Count" desc={data["3"]} />
          </Grid.Row>
        </Grid>
      </Container>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const campaign = await CampaignGenerator(context.query.campaign);
  const data = await campaign.methods.getSummary().call();
  return {
    props: {
      data: JSON.stringify(data),
    },
  };
};

export default Campaign;
