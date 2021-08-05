import React from "react";
import factory from "../ethereum/Factory";
import { GetServerSideProps } from "next";

const CampaignHome: React.FC<{ campaigns: string[] }> = (props) => {
  console.log(props.campaigns);
  return <>Campaigns Index!</>;
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
