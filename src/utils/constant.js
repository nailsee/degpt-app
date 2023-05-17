
export const netWorkList = {
    mainnet: {
        chainId: "0xa4b1",
        chainName: "Arbitrum",
        nativeCurrency: {
          name: "ETH",
          symbol: "eth",
          decimals: 18,
        },
        rpcUrls: ["https://arb1.arbitrum.io/rpc"],
      },
    testnet: {
        chainId: "0x66eed",
        chainName: "Arbitrum Goerli Testnet",
        nativeCurrency: {
          name: "ETH",
          symbol: "eth",
          decimals: 18,
        },
        rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"],
      }
}
export const tokenContract = {
	mainnet: '',
	testnet: '0xF31FF3Ec48Aa82dC5E80282269f40ab7E225F2ab',
}