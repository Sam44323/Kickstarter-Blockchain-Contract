import web3 from "./web3";
import Campaign from "./build/Campaign.json";

// returning a particular campaign based on the address

const getCampaign = async (address) => {
  const instance = new web3.eth.Contract(
    JSON.parse(Campaign.interface),
    address
  );
  return instance;
};

export default getCampaign;
