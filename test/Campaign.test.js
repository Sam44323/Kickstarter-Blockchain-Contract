const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledContract = require("../ethereum/build/Campaign.json");

let accounts; // storing the accounts of ganache addresses
let factory; // storing the factory instance for the factory contract
let campaignAddress;
let campaign; // storing the instance for the campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // deploying the factory contract for the campaign

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: compiledFactory.bytecode,
    })
    .send({
      from: accounts[0],
      gas: "10000000",
    });

  // creating an instance of the campaign from the factory

  await factory.methods
    .createCampaign("100")
    .send({ from: accounts[0], gas: "10000000" });

  // getting the first address for the campaign(for test cases, it will always be length of one) and storing it in the campaignAddress

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
});
