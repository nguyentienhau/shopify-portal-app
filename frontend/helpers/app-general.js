export function formatMoney(value = 0, format = "") {
	return format.format({ value });
}
