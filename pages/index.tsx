import React, { useEffect } from "react";
import factory from "../ethereum/Factory";

const CampaignHome: React.FC = () => {
  useEffect(() => {
    const getCampaignsList = async () => {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      console.log(campaigns);
    };
    getCampaignsList();
  });
  return <>nice</>;
};

export default CampaignHome;
