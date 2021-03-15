const MainContract = artifacts.require("YamiChain");


module.exports = function(deployer) {
  deployer.deploy(MainContract);
};
