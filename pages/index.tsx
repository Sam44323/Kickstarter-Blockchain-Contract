import React from "react";
import factory from "../ethereum/Factory";
import { GetServerSideProps } from "next";

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
  return <>nice</>;
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
