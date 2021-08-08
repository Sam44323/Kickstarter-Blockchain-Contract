import React from "react";
import factory from "../ethereum/Factory";
import { GetServerSideProps } from "next";
import { Card, Button } from "semantic-ui-react";

const CampaignHome: React.FC<{
  campaigns: string[];
}> = (props) => {
  const renderItems = (): {
    header: string;
    description: any;
    fluid: boolean;
  }[] => {
    return props.campaigns.map((item) => ({
      header: item,
      description: <a>View Campaign</a>,
      fluid: true,
    }));
  };
  return (
    <>
      <h3>Open Campaigns</h3>
      <Card.Group items={renderItems()} />
      <Button content="Create Campaign" icon="add" primary floated="right" />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: {
      campaigns,
    },
  };
};

export default CampaignHome;
