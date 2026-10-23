// app/utils/validation.ts
function todayISODate() {
	const now = /* @__PURE__ */ new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function parseOptionalInteger(value) {
	if (value === null || value === void 0 || value === "") return void 0;
	const parsed = Number(String(value).replace(/[^\d]/g, ""));
	return Number.isFinite(parsed) ? Math.round(parsed) : void 0;
}

export { parseOptionalInteger as p, todayISODate as t };
//# sourceMappingURL=validation-BW1DElb2.mjs.map
