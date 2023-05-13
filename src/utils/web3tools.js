export const shortenAddress = (address, chars = 6) => {
	return `${address?.substring(0, chars + 1)}...${address?.substring(42 - chars)}`
}

export const formatterSum = (value) => {
	if(isNaN(value)) return value;
	return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}