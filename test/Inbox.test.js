const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); // Web3 is a constructor function, so we used upper-case
const { interface, bytecode } = require("../compile");
// creating a web3 instance with a provider
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_STRING = "Hi there!";

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // use one of the those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address); // checks for the existence(not null) of address
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, INITIAL_STRING);
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye!").send({
      from: accounts[0],
    }); // sending a transaction for changing the contracts data
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "bye!");
  });
});
