import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Container, Button } from "semantic-ui-react";
import CampaignGenerator from "../../../../ethereum/Campaign";

const Request: React.FC<{ data: any }> = ({ data }) => {
  const { query, push } = useRouter();
  console.log(JSON.parse(data)[0]);
  return (
    <Container>
      <h3>Requests</h3>
      <Button
        primary
        content="Add Requests"
        onClick={() =>
          push(
            `/campaigns/${query.address}/requests/new?address=${query.address}`
          )
        }
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const campaign = await CampaignGenerator(context.query.campaign);
  const requestCount = await campaign.methods.getRequestCount().call();
  const requests = await Promise.all(
    Array(requestCount).map((item, index) =>
      campaign.methods.requests(index).call()
    )
  );
  return {
    props: {
      data: JSON.stringify(requests),
    },
  };
};

export default Request;
