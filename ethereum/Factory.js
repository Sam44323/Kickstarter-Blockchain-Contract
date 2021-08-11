import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xE6408a174cC5D3A3Eeac222c922A9a0e0d72e7ec"
);

export default instance;
