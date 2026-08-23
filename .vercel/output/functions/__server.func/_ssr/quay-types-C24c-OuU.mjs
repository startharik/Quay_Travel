//#region node_modules/.nitro/vite/services/ssr/assets/quay-types-C24c-OuU.js
function lodgingLabel(v) {
	if (v === "budget") return "Budget";
	if (v === "luxury") return "Luxury";
	return "Mid-range";
}
function placeKeyFrom(destination) {
	const d = destination.toLowerCase();
	if (d.includes("santo") || d.includes("oia")) return "santorini";
	if (d.includes("kyoto") || d.includes("japan")) return "kyoto";
	if (d.includes("lisbon") || d.includes("porto")) return "lisbon";
	if (d.includes("iceland") || d.includes("reyk")) return "iceland";
	if (d.includes("marra") || d.includes("fez")) return "marrakech";
	if (d.includes("amalfi") || d.includes("positano")) return "amalfi";
	return "default";
}
//#endregion
export { placeKeyFrom as n, lodgingLabel as t };
