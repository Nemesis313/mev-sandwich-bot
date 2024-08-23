const assert = require('assert');
const { ethers } = require('ethers');
const config = require('../src/config');
const utils = require('../src/utils');
const { FlashbotsBundleProvider } = require('@flashbots/ethers-provider-bundle');

describe('MEV Sandwich Bot', function() {
  let provider, wallet, flashbotsProvider;

  before(async function() {
    provider = new ethers.providers.InfuraProvider('sepolia', config.infuraProjectId); // Use Sepolia network
    wallet = new ethers.Wallet(config.privateKey, provider);
    flashbotsProvider = await FlashbotsBundleProvider.create(provider, wallet, config.flashbotsRelayUrl);
  });

  it('should get gas price', async function() {
    const gasPrice = await utils.getGasPrice(provider);
    assert(gasPrice.gt(0), 'Gas price should be greater than 0');
  });

  it('should simulate a sandwich transaction', async function() {
    // Create a dummy transaction for testing
    const dummyTx = {
      to: '0xYourTargetAddress',
      value: ethers.utils.parseEther('0.1'),
      gasLimit: 21000,
      nonce: await wallet.getTransactionCount(),
      chainId: (await provider.getNetwork()).chainId,
    };

    const signedTx = await wallet.signTransaction(dummyTx);
    const bundle = [
      { signedTransaction: signedTx },
      // Add more transactions to the bundle if needed
    ];

    const signedBundle = await flashbotsProvider.signBundle(bundle);
    const simulation = await flashbotsProvider.simulate(signedBundle);

    assert(simulation, 'Simulation should return a result');
    assert(!simulation.firstRevert, 'Simulation should not revert');
  });

  // Add more tests as needed
});
