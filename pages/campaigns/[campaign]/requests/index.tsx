import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Container, Button } from "semantic-ui-react";
import CampaignGenerator from "../../../../ethereum/Campaign";

const Request: React.FC = () => {
  const { query, push } = useRouter();
  return (
    <Container>
      <h3>Requests</h3>
      <Button
        primary
        content="Add Requests"
        onClick={() =>
          push(
            `/campaigns/${query.campaign}/requests/new?address=${query.campaign}`
          )
        }
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const campaign = await CampaignGenerator(context.query.campaign);

  return {
    props: {
      data: "",
    },
  };
};

export default Request;
