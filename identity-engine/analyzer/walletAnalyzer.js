export async function analyzeWallet(address){

  // لاحقاً نربطه بـ Etherscan API

  return {
    wallet: address,
    transactions: 0,
    firstActivity: null,
    lastActivity: null,
    balance: "0",
    network: "Base"
  };

}
