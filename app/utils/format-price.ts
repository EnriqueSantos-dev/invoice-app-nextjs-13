export function formatPrice(price: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		useGrouping: true,
		currency: "USD",
	}).format(price);
}
