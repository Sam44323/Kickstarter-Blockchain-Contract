import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.

  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum); // using the same provider as the browser
} else {
  // We are on the server *OR* the user is not running metamask

  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/c65de9dd9e6a4d2cb17c756fb3f6a446"
  );
  web3 = new Web3(provider); // using our custom provider provided by infura for rinkeby
}

export default web3;
