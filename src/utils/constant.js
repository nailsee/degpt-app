
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
	testnet: '0x5ba8050eac5017730c5389f1091617206f470bb8',
}