require('dotenv').config();

module.exports = {
  network: 'mainnet', // or 'ropsten' for testnet
  infuraProjectId: process.env.INFURA_PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY,
  flashbotsRelayUrl: process.env.FLASHBOTS_RELAY_URL,
};
