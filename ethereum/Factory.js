import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xfc562412a06f2fD85eeC406F74C6620c0AA2D49D"
);

export default instance;
