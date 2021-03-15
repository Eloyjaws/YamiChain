var MainContract = artifacts.require("YamiChain");
var MicroLending = artifacts.require("MicroLending");

module.exports = function(deployer) {
  deployer.deploy(MainContract);
  deployer.deploy(MicroLending);
};
