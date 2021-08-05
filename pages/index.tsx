import React from "react";
import factory from "../ethereum/Factory";
import { GetServerSideProps } from "next";

const CampaignHome: React.FC<{ campaigns: string[] }> = (props) => {
  return (
    <>
      {props.campaigns.map((campaign) => (
        <h1>{campaign}</h1>
      ))}
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
