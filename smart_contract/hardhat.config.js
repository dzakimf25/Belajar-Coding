require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    holesky: {
      url: `https://eth-holesky.g.alchemy.com/v2/75VwwuCAJ7CcnFubxZ4YGnbN4RwARr4b`,
      accounts: [`d580071d056563756702bbfe272f61a575dc4728bd507000fc0219df64884f34`], // Private Key Metamask
    },
  },
};
