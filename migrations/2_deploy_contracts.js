var MainContract = artifacts.require("./YamiChain.sol");
var MicroLending = artifacts.require("./Lending.sol");

module.exports = function(deployer) {
  deployer.deploy(MainContract);
  deployer.deploy(MicroLending);
};
