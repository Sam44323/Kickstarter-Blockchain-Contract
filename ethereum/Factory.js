import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x4bF3298D19874058c1D160dE29ca9B292A28B440"
);

export default instance;
