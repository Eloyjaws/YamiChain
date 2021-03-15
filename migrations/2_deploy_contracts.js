const MicroLending = artifacts.require("MicroLending");
const MainContract = artifacts.require("YamiChain");
const CustomerContract = artifacts.require("InformationStorage");
//const ProviderContract = artifacts.require("Provider");


module.exports = function(deployer) {
  deployer.deploy(MainContract);
  deployer.deploy(MicroLending);
  deployer.deploy(CustomerContract);
  //deployer.deploy(ProviderContract);
};
