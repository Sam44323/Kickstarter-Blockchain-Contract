const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledContract = require("../ethereum/build/Campaign.json");
const {
  isTargetLikeServerless,
} = require("next/dist/next-server/server/config");

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
      gas: "1000000",
    });

  // creating an instance of the campaign from the factory

  await factory.methods
    .createCampaign("100")
    .send({ from: accounts[0], gas: "1000000" });

  // getting the first address for the campaign(for test cases, it will always be length of one) and storing it in the campaignAddress

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  // creating a local instance for the campaign based on the abi and the address to which it is deployed

  campaign = await new web3.eth.Contract(
    JSON.parse(compiledContract.interface),
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller of the create campaign method as the manager", async () => {
    const managerAddress = await campaign.methods.manager().call();
    assert.strictEqual(managerAddress, accounts[0]);
  });

  it("allows to contribute to a campaign and get marked as an approver", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert.strictEqual(isContributor, true);
  });

  it("requires a minimum contribution to be considered as an approver", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "95",
        from: accounts[1],
      });
      assert(false);
    } catch (error) {
      assert(true);
    }
  });

  it("allows a manager to make a payment request", async () => {
    await campaign.methods
      .createRequest("Buy some batteries", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    const request = await campaign.methods.requests(0).call();
    assert("Buy some batteries", request.description);
  });

  it("processes a request", async () => {
    await campaign.methods.contribute().send({
      value: web3.utils.toWei("10", "ether"),
      from: accounts[0],
    });

    await campaign.methods
      .createRequest(
        "This is a description",
        web3.utils.toWei("5", "ether"),
        accounts[1]
      )
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    await campaign.methods.approveRequest(1).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });
});
