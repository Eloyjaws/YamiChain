const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
       host: "127.0.0.1",
       port: 7545, // Connect with the local blockchain: ganache
      //  port: 8545,
       network_id: "*",
    }
  },
  compilers: {
    solc: {
      settings: {   
        optimizer: {
          enabled: false,
          runs: 200
        },
      },
      version: "^0.8.0"
    }
  }
};
