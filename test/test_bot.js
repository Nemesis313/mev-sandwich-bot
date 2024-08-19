const assert = require('assert');
const { ethers } = require('ethers');
const config = require('../src/config');
const utils = require('../src/utils');

describe('MEV Sandwich Bot', function() {
  it('should get gas price', async function() {
    const provider = new ethers.providers.InfuraProvider(config.network, config.infuraProjectId);
    const gasPrice = await utils.getGasPrice(provider);
    assert(gasPrice.gt(0), 'Gas price should be greater than 0');
  });

  // Add more tests as needed
});
