import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x590dCE7b4b09Eb8d1960767Ed9515E6336b20416"
);

export default instance;
