import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x5cfC93CD1dD22Ca0973a4A28Fa85e330389C9074"
);

export default instance;
