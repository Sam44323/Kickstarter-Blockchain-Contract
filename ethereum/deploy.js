const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

const provider = new HDWalletProvider(
  process.env.SECRET_PHRASE,
  "https://rinkeby.infura.io/v3/e904562b4f2146c3850485a7ecd87240"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: compiledFactory.bytecode,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
      gasPrice: web3.utils.toWei("2", "gwei"),
    });
};

deploy();
