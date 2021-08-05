import React, { useEffect } from "react";
import factory from "../ethereum/Factory";
import { GetServerSideProps } from "next";

const CampaignHome: React.FC<{ campaigns: string[] }> = (props) => {
  console.log(props.campaigns);
  return <>Campaigns Index!</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: {
      campaigns,
    },
  };
};

export default CampaignHome;
