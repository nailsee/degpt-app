// import { isAddress } from 'web3-utils'

export const shortenAddress = (address, chars = 6) => {
	// const parsed = isAddress(address)
	// if (!parsed) {
	// 	console.error(`Invalid 'address' parameter '${address}'.`)
	// }
	return `${address?.substring(0, chars + 1)}...${address?.substring(42 - chars)}`
}