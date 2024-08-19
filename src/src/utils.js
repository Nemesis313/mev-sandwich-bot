// Add utility functions for gas price management, risk management, etc.

module.exports = {
  getGasPrice: async (provider) => {
    const gasPrice = await provider.getGasPrice();
    return gasPrice.mul(2); // Example: double the gas price for higher priority
  },

  calculateRisk: (transaction) => {
    // Implement your risk calculation logic here
    return 0;
  },

  // Add more utility functions as needed
};
