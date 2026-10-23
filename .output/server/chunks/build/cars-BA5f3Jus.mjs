import { a as useSeoMeta, A as AppButton_default, d as dealership, u as useRoute$1, k as useRouter, _ as _plugin_vue_export_helper_default, p as parsePriceInput } from '../virtual/entry.mjs';
import { P as PageHeader_default } from './PageHeader-NdL0o5jz.mjs';
import { g as getFilterFacets, d as describeResultCount, p as parseVehicleFilters, b as getActiveFilterChips, a as useVehicles, s as searchVehicles, c as createDefaultFilters, e as clearFilterKeys, S as SORT_OPTIONS, f as getModelOptionsForMake, V as VEHICLE_BODY_TYPES, h as VEHICLE_TRANSMISSIONS, i as VEHICLE_FUEL_TYPES, j as VEHICLE_DRIVETRAINS, k as serializeVehicleFilters } from './useVehicles-DCwHuUps.mjs';
import { V as VehicleCard_default } from './VehicleCard-Tc4SfC6h.mjs';
import { p as parseOptionalInteger } from './validation-BW1DElb2.mjs';
import { L as LoadingState_default } from './LoadingState-UQOo5w2K.mjs';
import { E as EmptyState_default } from './EmptyState-JnGm6qtZ.mjs';
import { defineComponent, computed, ref, watch, resolveComponent, withCtx, unref, createVNode, toDisplayString, createTextVNode, nextTick, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderTeleport } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../_/nitro.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'consola';
import 'sitemapd/parse';
import '@iconify/utils';
import 'ipx';
import 'unhead/utils';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import './Breadcrumbs-RqMNGriD.mjs';
import './NuxtImg-jexAG5NB.mjs';

// app/components/inventory/VehicleSort.vue?vue&type=script&setup=true&lang.ts
var VehicleSort_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VehicleSort",
	__ssrInlineRender: true,
	props: {
		modelValue: {},
		id: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}><label${ssrRenderAttr("for", __props.id ?? "vehicle-sort")} class="hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted sm:block"> Sort </label><select${ssrRenderAttr("id", __props.id ?? "vehicle-sort")}${ssrRenderAttr("value", __props.modelValue)} class="form-select w-auto! min-w-[11.5rem] py-2! text-[11px]!"><!--[-->`);
			ssrRenderList(unref(SORT_OPTIONS), (option) => {
				_push(`<option${ssrRenderAttr("value", option.value)}>${ssrInterpolate(option.label)}</option>`);
			});
			_push(`<!--]--></select></div>`);
		};
	}
});
// app/components/inventory/VehicleSort.vue
var _sfc_setup$6 = VehicleSort_vue_vue_type_script_setup_true_lang_default.setup;
VehicleSort_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inventory/VehicleSort.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var VehicleSort_default = Object.assign(VehicleSort_vue_vue_type_script_setup_true_lang_default, { __name: "VehicleSort" });
// app/components/inventory/ActiveFilterChips.vue?vue&type=script&setup=true&lang.ts
var ActiveFilterChips_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ActiveFilterChips",
	__ssrInlineRender: true,
	props: { chips: {} },
	emits: ["remove", "clear"],
	setup(__props, { emit: __emit }) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			if (__props.chips.length) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap items-center gap-2" }, _attrs))}><span class="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Active</span><!--[-->`);
				ssrRenderList(__props.chips, (chip) => {
					_push(`<button type="button" class="group inline-flex items-center gap-2 border border-line bg-white px-2.5 py-1.5 text-[11px] text-charcoal transition-colors hover:border-ink"${ssrRenderAttr("aria-label", `Remove ${chip.label} filter: ${chip.value}`)}><span class="text-muted">${ssrInterpolate(chip.label)}:</span><span class="font-medium">${ssrInterpolate(chip.value)}</span>`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-x",
						class: "size-3 text-muted transition-colors group-hover:text-ink",
						"aria-hidden": "true"
					}, null, _parent));
					_push(`</button>`);
				});
				_push(`<!--]--><button type="button" class="ml-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-dark underline-offset-4 transition-colors hover:text-ink hover:underline"> Clear all </button></div>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/inventory/ActiveFilterChips.vue
var _sfc_setup$5 = ActiveFilterChips_vue_vue_type_script_setup_true_lang_default.setup;
ActiveFilterChips_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inventory/ActiveFilterChips.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var ActiveFilterChips_default = Object.assign(ActiveFilterChips_vue_vue_type_script_setup_true_lang_default, { __name: "ActiveFilterChips" });
// app/components/inventory/VehicleFilters.vue?vue&type=script&setup=true&lang.ts
var VehicleFilters_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VehicleFilters",
	__ssrInlineRender: true,
	props: {
		filters: {},
		vehicles: {},
		facets: {},
		idPrefix: { default: "filter" }
	},
	emits: ["apply"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const q = ref(props.filters.q ?? "");
		const make = ref(props.filters.make ?? "");
		const model = ref(props.filters.model ?? "");
		const condition = ref(props.filters.condition ?? "");
		const minPrice = ref(props.filters.minPrice !== void 0 ? String(props.filters.minPrice) : "");
		const maxPrice = ref(props.filters.maxPrice !== void 0 ? String(props.filters.maxPrice) : "");
		const minYear = ref(props.filters.minYear !== void 0 ? String(props.filters.minYear) : "");
		const maxYear = ref(props.filters.maxYear !== void 0 ? String(props.filters.maxYear) : "");
		const bodyType = ref(props.filters.bodyType ?? "");
		const transmission = ref(props.filters.transmission ?? "");
		const fuelType = ref(props.filters.fuelType ?? "");
		const minMileage = ref(props.filters.minMileage !== void 0 ? String(props.filters.minMileage) : "");
		const maxMileage = ref(props.filters.maxMileage !== void 0 ? String(props.filters.maxMileage) : "");
		const exteriorColor = ref(props.filters.exteriorColor ?? "");
		const drivetrain = ref(props.filters.drivetrain ?? "");
		const validationErrors = ref([]);
		const conditionOptions = [
			{
				label: "Any",
				value: ""
			},
			{
				label: "New",
				value: "new"
			},
			{
				label: "Pre-owned",
				value: "used"
			}
		];
		const facets = computed(() => props.facets ?? getFilterFacets(props.vehicles));
		const modelOptions = computed(() => getModelOptionsForMake(props.vehicles, make.value || void 0));
		const yearCeiling = (/* @__PURE__ */ new Date()).getFullYear() + 1;
		function syncFromProps(next) {
			q.value = next.q ?? "";
			make.value = next.make ?? "";
			model.value = next.model ?? "";
			condition.value = next.condition ?? "";
			minPrice.value = next.minPrice !== void 0 ? String(next.minPrice) : "";
			maxPrice.value = next.maxPrice !== void 0 ? String(next.maxPrice) : "";
			minYear.value = next.minYear !== void 0 ? String(next.minYear) : "";
			maxYear.value = next.maxYear !== void 0 ? String(next.maxYear) : "";
			bodyType.value = next.bodyType ?? "";
			transmission.value = next.transmission ?? "";
			fuelType.value = next.fuelType ?? "";
			minMileage.value = next.minMileage !== void 0 ? String(next.minMileage) : "";
			maxMileage.value = next.maxMileage !== void 0 ? String(next.maxMileage) : "";
			exteriorColor.value = next.exteriorColor ?? "";
			drivetrain.value = next.drivetrain ?? "";
			validationErrors.value = [];
		}
		watch(() => props.filters, (next) => syncFromProps(next), { deep: true });
		watch(make, () => {
			if (model.value && !modelOptions.value.includes(model.value)) model.value = "";
		});
		const minPriceValue = computed(() => parsePriceInput(minPrice.value));
		const maxPriceValue = computed(() => parsePriceInput(maxPrice.value));
		const minYearValue = computed(() => parseOptionalInteger(minYear.value));
		const maxYearValue = computed(() => parseOptionalInteger(maxYear.value));
		const minMileageValue = computed(() => parseOptionalInteger(minMileage.value));
		const maxMileageValue = computed(() => parseOptionalInteger(maxMileage.value));
		function buildDraftFilters() {
			const next = createDefaultFilters({
				sort: props.filters.sort,
				perPage: props.filters.perPage
			});
			if (q.value.trim()) next.q = q.value.trim();
			if (make.value) next.make = make.value;
			if (model.value) next.model = model.value;
			if (condition.value) next.condition = condition.value;
			if (minPriceValue.value !== void 0) next.minPrice = minPriceValue.value;
			if (maxPriceValue.value !== void 0) next.maxPrice = maxPriceValue.value;
			if (minYearValue.value !== void 0) next.minYear = minYearValue.value;
			if (maxYearValue.value !== void 0) next.maxYear = maxYearValue.value;
			if (bodyType.value) next.bodyType = bodyType.value;
			if (transmission.value) next.transmission = transmission.value;
			if (fuelType.value) next.fuelType = fuelType.value;
			if (minMileageValue.value !== void 0) next.minMileage = minMileageValue.value;
			if (maxMileageValue.value !== void 0) next.maxMileage = maxMileageValue.value;
			if (exteriorColor.value) next.exteriorColor = exteriorColor.value;
			if (drivetrain.value) next.drivetrain = drivetrain.value;
			return next;
		}
		const draftFilters = computed(() => buildDraftFilters());
		const previewCount = computed(() => searchVehicles(props.vehicles, draftFilters.value).total);
		const previewLabel = computed(() => {
			if (previewCount.value === 1) return "1 matching vehicle";
			return `${previewCount.value.toLocaleString("en-NG")} matching vehicles`;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			const _component_AppButton = AppButton_default;
			_push(`<form${ssrRenderAttrs(mergeProps({
				class: "border border-line bg-white",
				novalidate: "",
				"aria-labelledby": `${__props.idPrefix}-heading`
			}, _attrs))}><div class="flex items-start justify-between gap-4 border-b border-line p-5"><div><h2${ssrRenderAttr("id", `${__props.idPrefix}-heading`)} class="font-display text-lg font-medium tracking-tight text-ink"> Filter inventory </h2><p class="mt-1 text-[11px] leading-relaxed text-muted" role="status" aria-live="polite">${ssrInterpolate(unref(previewLabel))}</p></div><button type="button" class="shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"> Reset </button></div><div class="px-5 pb-5"><div class="filter-section"><label${ssrRenderAttr("for", `${__props.idPrefix}-q`)} class="form-label">Keyword search</label><input${ssrRenderAttr("id", `${__props.idPrefix}-q`)}${ssrRenderAttr("value", unref(q))} type="search" class="form-input" placeholder="Make, model, colour…" autocomplete="off" enterkeyhint="search"></div><details class="filter-section" open><summary class="filter-summary">Condition</summary><div class="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Vehicle condition"><!--[-->`);
			ssrRenderList(conditionOptions, (option) => {
				_push(`<button type="button" class="${ssrRenderClass([unref(condition) === option.value ? "border-obsidian bg-obsidian text-white" : "border-line bg-white text-muted hover:border-ink hover:text-ink", "border px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors"])}"${ssrRenderAttr("aria-pressed", unref(condition) === option.value)}>${ssrInterpolate(option.label)}</button>`);
			});
			_push(`<!--]--></div></details><details class="filter-section" open><summary class="filter-summary">Make &amp; model</summary><div class="mt-4 space-y-3"><div><label${ssrRenderAttr("for", `${__props.idPrefix}-make`)} class="form-label">Make</label><select${ssrRenderAttr("id", `${__props.idPrefix}-make`)} class="form-select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(make)) ? ssrLooseContain(unref(make), "") : ssrLooseEqual(unref(make), "")) ? " selected" : ""}>All makes</option><!--[-->`);
			ssrRenderList(unref(facets).makes, (option) => {
				_push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(unref(make)) ? ssrLooseContain(unref(make), option) : ssrLooseEqual(unref(make), option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
			});
			_push(`<!--]--></select></div><div><label${ssrRenderAttr("for", `${__props.idPrefix}-model`)} class="form-label">Model</label><select${ssrRenderAttr("id", `${__props.idPrefix}-model`)} class="form-select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(model)) ? ssrLooseContain(unref(model), "") : ssrLooseEqual(unref(model), "")) ? " selected" : ""}>All models</option><!--[-->`);
			ssrRenderList(unref(modelOptions), (option) => {
				_push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(unref(model)) ? ssrLooseContain(unref(model), option) : ssrLooseEqual(unref(model), option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
			});
			_push(`<!--]--></select></div></div></details><details class="filter-section" open><summary class="filter-summary">Price (NGN)</summary><div class="mt-4 grid grid-cols-2 gap-3"><div><label${ssrRenderAttr("for", `${__props.idPrefix}-min-price`)} class="form-label">Minimum</label><input${ssrRenderAttr("id", `${__props.idPrefix}-min-price`)}${ssrRenderAttr("value", unref(minPrice))} type="text" inputmode="numeric" class="form-input" placeholder="0" autocomplete="off"${ssrRenderAttr("aria-invalid", unref(validationErrors).length > 0)}${ssrRenderAttr("aria-describedby", unref(validationErrors).length ? `${__props.idPrefix}-validation-errors` : void 0)}></div><div><label${ssrRenderAttr("for", `${__props.idPrefix}-max-price`)} class="form-label">Maximum</label><input${ssrRenderAttr("id", `${__props.idPrefix}-max-price`)}${ssrRenderAttr("value", unref(maxPrice))} type="text" inputmode="numeric" class="form-input" placeholder="Any" autocomplete="off"${ssrRenderAttr("aria-invalid", unref(validationErrors).length > 0)}${ssrRenderAttr("aria-describedby", unref(validationErrors).length ? `${__props.idPrefix}-validation-errors` : void 0)}></div></div></details><details class="filter-section" open><summary class="filter-summary">Year</summary><div class="mt-4 grid grid-cols-2 gap-3"><div><label${ssrRenderAttr("for", `${__props.idPrefix}-min-year`)} class="form-label">From</label><input${ssrRenderAttr("id", `${__props.idPrefix}-min-year`)}${ssrRenderAttr("value", unref(minYear))} type="number" inputmode="numeric" min="1950"${ssrRenderAttr("max", yearCeiling)} class="form-input" placeholder="1950"${ssrRenderAttr("aria-invalid", unref(validationErrors).length > 0)}${ssrRenderAttr("aria-describedby", unref(validationErrors).length ? `${__props.idPrefix}-validation-errors` : void 0)}></div><div><label${ssrRenderAttr("for", `${__props.idPrefix}-max-year`)} class="form-label">To</label><input${ssrRenderAttr("id", `${__props.idPrefix}-max-year`)}${ssrRenderAttr("value", unref(maxYear))} type="number" inputmode="numeric" min="1950"${ssrRenderAttr("max", yearCeiling)} class="form-input"${ssrRenderAttr("placeholder", String(yearCeiling))}${ssrRenderAttr("aria-invalid", unref(validationErrors).length > 0)}${ssrRenderAttr("aria-describedby", unref(validationErrors).length ? `${__props.idPrefix}-validation-errors` : void 0)}></div></div></details><details class="filter-section"><summary class="filter-summary">Body style</summary><div class="mt-4"><label${ssrRenderAttr("for", `${__props.idPrefix}-body`)} class="form-label">Body style</label><select${ssrRenderAttr("id", `${__props.idPrefix}-body`)} class="form-select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(bodyType)) ? ssrLooseContain(unref(bodyType), "") : ssrLooseEqual(unref(bodyType), "")) ? " selected" : ""}>All body styles</option><!--[-->`);
			ssrRenderList(unref(VEHICLE_BODY_TYPES), (option) => {
				_push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(unref(bodyType)) ? ssrLooseContain(unref(bodyType), option) : ssrLooseEqual(unref(bodyType), option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
			});
			_push(`<!--]--></select></div></details><details class="filter-section"><summary class="filter-summary">Transmission &amp; fuel</summary><div class="mt-4 space-y-3"><div><label${ssrRenderAttr("for", `${__props.idPrefix}-transmission`)} class="form-label">Transmission</label><select${ssrRenderAttr("id", `${__props.idPrefix}-transmission`)} class="form-select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(transmission)) ? ssrLooseContain(unref(transmission), "") : ssrLooseEqual(unref(transmission), "")) ? " selected" : ""}>Any transmission</option><!--[-->`);
			ssrRenderList(unref(VEHICLE_TRANSMISSIONS), (option) => {
				_push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(unref(transmission)) ? ssrLooseContain(unref(transmission), option) : ssrLooseEqual(unref(transmission), option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
			});
			_push(`<!--]--></select></div><div><label${ssrRenderAttr("for", `${__props.idPrefix}-fuel`)} class="form-label">Fuel type</label><select${ssrRenderAttr("id", `${__props.idPrefix}-fuel`)} class="form-select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(fuelType)) ? ssrLooseContain(unref(fuelType), "") : ssrLooseEqual(unref(fuelType), "")) ? " selected" : ""}>Any fuel type</option><!--[-->`);
			ssrRenderList(unref(VEHICLE_FUEL_TYPES), (option) => {
				_push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(unref(fuelType)) ? ssrLooseContain(unref(fuelType), option) : ssrLooseEqual(unref(fuelType), option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
			});
			_push(`<!--]--></select></div><div><label${ssrRenderAttr("for", `${__props.idPrefix}-drivetrain`)} class="form-label">Drivetrain</label><select${ssrRenderAttr("id", `${__props.idPrefix}-drivetrain`)} class="form-select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(drivetrain)) ? ssrLooseContain(unref(drivetrain), "") : ssrLooseEqual(unref(drivetrain), "")) ? " selected" : ""}>Any drivetrain</option><!--[-->`);
			ssrRenderList(unref(VEHICLE_DRIVETRAINS), (option) => {
				_push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(unref(drivetrain)) ? ssrLooseContain(unref(drivetrain), option) : ssrLooseEqual(unref(drivetrain), option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
			});
			_push(`<!--]--></select></div></div></details><details class="filter-section"><summary class="filter-summary">Mileage (km)</summary><div class="mt-4 grid grid-cols-2 gap-3"><div><label${ssrRenderAttr("for", `${__props.idPrefix}-min-mileage`)} class="form-label">Minimum</label><input${ssrRenderAttr("id", `${__props.idPrefix}-min-mileage`)}${ssrRenderAttr("value", unref(minMileage))} type="text" inputmode="numeric" class="form-input" placeholder="0" autocomplete="off"${ssrRenderAttr("aria-invalid", unref(validationErrors).length > 0)}${ssrRenderAttr("aria-describedby", unref(validationErrors).length ? `${__props.idPrefix}-validation-errors` : void 0)}></div><div><label${ssrRenderAttr("for", `${__props.idPrefix}-max-mileage`)} class="form-label">Maximum</label><input${ssrRenderAttr("id", `${__props.idPrefix}-max-mileage`)}${ssrRenderAttr("value", unref(maxMileage))} type="text" inputmode="numeric" class="form-input" placeholder="Any" autocomplete="off"${ssrRenderAttr("aria-invalid", unref(validationErrors).length > 0)}${ssrRenderAttr("aria-describedby", unref(validationErrors).length ? `${__props.idPrefix}-validation-errors` : void 0)}></div></div></details><details class="filter-section"><summary class="filter-summary">Colour</summary><div class="mt-4"><label${ssrRenderAttr("for", `${__props.idPrefix}-colour`)} class="form-label">Exterior colour</label><select${ssrRenderAttr("id", `${__props.idPrefix}-colour`)} class="form-select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(exteriorColor)) ? ssrLooseContain(unref(exteriorColor), "") : ssrLooseEqual(unref(exteriorColor), "")) ? " selected" : ""}>Any colour</option><!--[-->`);
			ssrRenderList(unref(facets).colors, (option) => {
				_push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(unref(exteriorColor)) ? ssrLooseContain(unref(exteriorColor), option) : ssrLooseEqual(unref(exteriorColor), option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
			});
			_push(`<!--]--></select></div></details>`);
			if (unref(validationErrors).length) {
				_push(`<div${ssrRenderAttr("id", `${__props.idPrefix}-validation-errors`)} class="mt-4 border border-red-200 bg-red-50 p-3" role="alert"><!--[-->`);
				ssrRenderList(unref(validationErrors), (message) => {
					_push(`<p class="form-error mt-0">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(message)}</p>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(ssrRenderComponent(_component_AppButton, {
				type: "submit",
				variant: "dark",
				size: "md",
				block: "",
				class: "mt-5"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Show ${ssrInterpolate(unref(previewCount))} ${ssrInterpolate(unref(previewCount) === 1 ? "vehicle" : "vehicles")}`);
					else return [createTextVNode(" Show " + toDisplayString(unref(previewCount)) + " " + toDisplayString(unref(previewCount) === 1 ? "vehicle" : "vehicles"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></form>`);
		};
	}
});
// app/components/inventory/VehicleFilters.vue
var _sfc_setup$4 = VehicleFilters_vue_vue_type_script_setup_true_lang_default.setup;
VehicleFilters_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inventory/VehicleFilters.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var VehicleFilters_default = Object.assign(VehicleFilters_vue_vue_type_script_setup_true_lang_default, { __name: "VehicleFilters" });
// app/components/vehicles/VehicleGrid.vue?vue&type=script&setup=true&lang.ts
var VehicleGrid_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VehicleGrid",
	__ssrInlineRender: true,
	props: {
		vehicles: {},
		emptyTitle: { default: "No vehicles to show" },
		emptyDescription: { default: "Try adjusting your selection or browse the full inventory." },
		eagerCount: { default: 0 }
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_VehicleCard = VehicleCard_default;
			const _component_EmptyState = EmptyState_default;
			if (__props.vehicles.length) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" }, _attrs))}><!--[-->`);
				ssrRenderList(__props.vehicles, (vehicle, index) => {
					_push(ssrRenderComponent(_component_VehicleCard, {
						key: vehicle.id,
						vehicle,
						eager: index < __props.eagerCount
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(ssrRenderComponent(_component_EmptyState, mergeProps({
				title: __props.emptyTitle,
				description: __props.emptyDescription,
				"action-label": "Browse all cars",
				"action-to": "/cars"
			}, _attrs), null, _parent));
		};
	}
});
// app/components/vehicles/VehicleGrid.vue
var _sfc_setup$3 = VehicleGrid_vue_vue_type_script_setup_true_lang_default.setup;
VehicleGrid_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/vehicles/VehicleGrid.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var VehicleGrid_default = Object.assign(VehicleGrid_vue_vue_type_script_setup_true_lang_default, { __name: "VehicleGrid" });
// app/components/shared/Pagination.vue?vue&type=script&setup=true&lang.ts
var Pagination_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Pagination",
	__ssrInlineRender: true,
	props: {
		page: {},
		pageCount: {},
		total: {}
	},
	emits: ["change"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const visiblePages = computed(() => {
			const total = props.pageCount;
			const current = props.page;
			return [.../* @__PURE__ */ new Set([
				1,
				total,
				current - 1,
				current,
				current + 1
			])].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			if (__props.pageCount > 1) {
				_push(`<nav${ssrRenderAttrs(mergeProps({
					"aria-label": "Inventory pagination",
					class: "flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"
				}, _attrs))}><p class="text-xs text-muted"> Page <span class="font-semibold text-ink">${ssrInterpolate(__props.page)}</span> of <span class="font-semibold text-ink">${ssrInterpolate(__props.pageCount)}</span><span class="sr-only">, ${ssrInterpolate(__props.total)} results</span></p><div class="flex items-center gap-1"><button type="button" class="flex size-9 items-center justify-center border border-line bg-white text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"${ssrIncludeBooleanAttr(__props.page <= 1) ? " disabled" : ""} aria-label="Previous page">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-chevron-left",
					class: "size-4",
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</button><!--[-->`);
				ssrRenderList(unref(visiblePages), (item, index) => {
					_push(`<!--[-->`);
					if (index > 0 && item - unref(visiblePages)[index - 1] > 1) _push(`<span class="flex size-9 items-center justify-center text-xs text-muted" aria-hidden="true">…</span>`);
					else _push(`<!---->`);
					_push(`<button type="button" class="${ssrRenderClass([item === __props.page ? "border-obsidian bg-obsidian text-white" : "border-line bg-white text-ink hover:border-ink", "flex size-9 items-center justify-center border text-xs font-semibold transition-colors"])}"${ssrRenderAttr("aria-current", item === __props.page ? "page" : void 0)}${ssrRenderAttr("aria-label", `Page ${item}`)}>${ssrInterpolate(item)}</button><!--]-->`);
				});
				_push(`<!--]--><button type="button" class="flex size-9 items-center justify-center border border-line bg-white text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"${ssrIncludeBooleanAttr(__props.page >= __props.pageCount) ? " disabled" : ""} aria-label="Next page">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-chevron-right",
					class: "size-4",
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</button></div></nav>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/shared/Pagination.vue
var _sfc_setup$2 = Pagination_vue_vue_type_script_setup_true_lang_default.setup;
Pagination_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/Pagination.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Pagination_default = Object.assign(Pagination_vue_vue_type_script_setup_true_lang_default, { __name: "Pagination" });
// app/components/inventory/VehicleFilterDrawer.vue?vue&type=script&setup=true&lang.ts
var VehicleFilterDrawer_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VehicleFilterDrawer",
	__ssrInlineRender: true,
	props: {
		open: { type: Boolean },
		filters: {},
		vehicles: {},
		facets: {}
	},
	emits: ["close", "apply"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		ref(null);
		ref(null);
		watch(() => props.open, async (open) => {});
		function apply(next) {
			emit("apply", next);
			emit("close");
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			const _component_VehicleFilters = VehicleFilters_default;
			ssrRenderTeleport(_push, (_push) => {
				if (__props.open) {
					_push(`<div class="fixed inset-0 z-50 lg:hidden" data-v-c859fc32><button type="button" class="absolute inset-0 h-full w-full cursor-default bg-obsidian/65" tabindex="-1" aria-label="Close filters" data-v-c859fc32></button><div role="dialog" aria-modal="true" aria-label="Filter inventory" class="filter-drawer-panel absolute inset-y-0 right-0 flex w-full max-w-[25rem] flex-col bg-ivory shadow-2xl" data-v-c859fc32><div class="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-5" data-v-c859fc32><p class="font-display text-base font-medium tracking-tight text-ink" data-v-c859fc32>Filter inventory</p><button type="button" class="flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink" aria-label="Close filters" data-v-c859fc32>`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-x",
						class: "size-5",
						"aria-hidden": "true"
					}, null, _parent));
					_push(`</button></div><div class="flex-1 overflow-y-auto p-4" data-v-c859fc32>`);
					_push(ssrRenderComponent(_component_VehicleFilters, {
						filters: __props.filters,
						vehicles: __props.vehicles,
						facets: __props.facets,
						"id-prefix": "mobile-filter",
						onApply: apply
					}, null, _parent));
					_push(`</div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
// app/components/inventory/VehicleFilterDrawer.vue
var _sfc_setup$1 = VehicleFilterDrawer_vue_vue_type_script_setup_true_lang_default.setup;
VehicleFilterDrawer_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inventory/VehicleFilterDrawer.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var VehicleFilterDrawer_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(VehicleFilterDrawer_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-c859fc32"]]), { __name: "VehicleFilterDrawer" });
// app/composables/useVehicleFilters.ts
/**
* Keeps inventory filters in sync with URL query parameters so filtered views
* can be shared, bookmarked and restored on refresh.
*/
function useVehicleFilters() {
	const route = useRoute$1();
	const router = useRouter();
	const filters = computed(() => parseVehicleFilters(route.query));
	const activeChips = computed(() => getActiveFilterChips(filters.value));
	const hasActive = computed(() => activeChips.value.length > 0);
	function navigate(next) {
		const query = serializeVehicleFilters(next);
		const current = serializeVehicleFilters(filters.value);
		if (JSON.stringify(query) === JSON.stringify(current)) return;
		router.push({
			path: route.path,
			query
		});
	}
	function applyFilters(next) {
		navigate({
			...next,
			sort: next.sort ?? filters.value.sort,
			perPage: next.perPage ?? filters.value.perPage,
			page: next.page ?? 1
		});
	}
	function updateFilters(patch) {
		navigate({
			...filters.value,
			...patch,
			page: 1
		});
	}
	function removeFilter(keys) {
		navigate(clearFilterKeys(filters.value, keys));
	}
	function clearFilters() {
		navigate(createDefaultFilters({
			sort: filters.value.sort,
			perPage: filters.value.perPage
		}));
	}
	function setSort(sort) {
		navigate({
			...filters.value,
			sort,
			page: 1
		});
	}
	function setPage(page) {
		navigate({
			...filters.value,
			page: Math.max(1, page)
		});
	}
	return {
		filters,
		activeChips,
		hasActive,
		applyFilters,
		updateFilters,
		removeFilter,
		clearFilters,
		setSort,
		setPage
	};
}
// app/composables/useVehicleSearch.ts
/**
* Applies the typed filter contract to the inventory loaded through the
* repository. The pure `searchVehicles` utility is shared with the mock
* repository, and can later be mirrored server-side.
*/
function useVehicleSearch(filters) {
	const { vehicles, pending, error, refresh } = useVehicles();
	return {
		result: computed(() => searchVehicles(vehicles.value, filters.value)),
		vehicles,
		pending,
		error,
		refresh
	};
}
// app/pages/cars/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { filters, activeChips, hasActive, applyFilters, removeFilter, clearFilters, setSort, setPage } = useVehicleFilters();
		const { result, vehicles, pending, error, refresh } = useVehicleSearch(filters);
		const facets = computed(() => getFilterFacets(vehicles.value));
		const drawerOpen = ref(false);
		const searchTerm = ref(filters.value.q ?? "");
		const resultsRef = ref(null);
		const searchInputRef = ref(null);
		watch(() => filters.value.q, (value) => {
			searchTerm.value = value ?? "";
		});
		const resultCountLabel = computed(() => describeResultCount(result.value.total));
		const availableCount = computed(() => vehicles.value.filter((vehicle) => vehicle.status === "available").length);
		const newCount = computed(() => vehicles.value.filter((vehicle) => vehicle.condition === "new" && vehicle.status === "available").length);
		const usedCount = computed(() => vehicles.value.filter((vehicle) => vehicle.condition === "used" && vehicle.status === "available").length);
		useSeoMeta({
			title: "Cars for sale in Nigeria",
			description: "Browse new and pre-owned cars with transparent naira prices, detailed specifications and direct WhatsApp enquiries. Filter by make, body style, price, year and mileage.",
			ogTitle: "Cars for sale · Vantage Motors",
			ogDescription: "Browse new and pre-owned cars with transparent naira prices, detailed specifications and direct WhatsApp enquiries."
		});
		function applyAll(next) {
			applyFilters(next);
		}
		function clearAll() {
			clearFilters();
			nextTick(() => searchInputRef.value?.focus());
		}
		function changePage(page) {
			setPage(page);
			nextTick(() => {
				resultsRef.value?.scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHeader = PageHeader_default;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_AppButton = AppButton_default;
			const _component_VehicleSort = VehicleSort_default;
			const _component_ActiveFilterChips = ActiveFilterChips_default;
			const _component_VehicleFilters = VehicleFilters_default;
			const _component_LoadingState = LoadingState_default;
			const _component_VehicleGrid = VehicleGrid_default;
			const _component_EmptyState = EmptyState_default;
			const _component_Pagination = Pagination_default;
			const _component_VehicleFilterDrawer = VehicleFilterDrawer_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHeader, {
				title: "The collection.",
				eyebrow: "Browse inventory",
				description: "New and pre-owned vehicles, each presented with its listed price, condition and key specification. Filter the full inventory to find the cars worth a closer look.",
				crumbs: [{ label: "Cars" }]
			}, {
				meta: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<dl class="grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-5"${_scopeId}><div${_scopeId}><dt class="text-[9px] uppercase tracking-[0.16em] text-white/35"${_scopeId}>Available</dt><dd class="mt-1 font-display text-lg text-ivory"${_scopeId}>${ssrInterpolate(unref(availableCount))}</dd></div><div${_scopeId}><dt class="text-[9px] uppercase tracking-[0.16em] text-white/35"${_scopeId}>New</dt><dd class="mt-1 font-display text-lg text-ivory"${_scopeId}>${ssrInterpolate(unref(newCount))}</dd></div><div${_scopeId}><dt class="text-[9px] uppercase tracking-[0.16em] text-white/35"${_scopeId}>Pre-owned</dt><dd class="mt-1 font-display text-lg text-ivory"${_scopeId}>${ssrInterpolate(unref(usedCount))}</dd></div></dl>`);
					else return [createVNode("dl", { class: "grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-5" }, [
						createVNode("div", null, [createVNode("dt", { class: "text-[9px] uppercase tracking-[0.16em] text-white/35" }, "Available"), createVNode("dd", { class: "mt-1 font-display text-lg text-ivory" }, toDisplayString(unref(availableCount)), 1)]),
						createVNode("div", null, [createVNode("dt", { class: "text-[9px] uppercase tracking-[0.16em] text-white/35" }, "New"), createVNode("dd", { class: "mt-1 font-display text-lg text-ivory" }, toDisplayString(unref(newCount)), 1)]),
						createVNode("div", null, [createVNode("dt", { class: "text-[9px] uppercase tracking-[0.16em] text-white/35" }, "Pre-owned"), createVNode("dd", { class: "mt-1 font-display text-lg text-ivory" }, toDisplayString(unref(usedCount)), 1)])
					])];
				}),
				_: 1
			}, _parent));
			_push(`<section class="section-space bg-ivory" aria-labelledby="inventory-heading"><div class="shell"><h2 id="inventory-heading" class="sr-only">Inventory results</h2><div class="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between"><div class="w-full max-w-xl"><form role="search" class="flex gap-2"><div class="relative flex-1"><label for="inventory-search" class="sr-only">Search inventory</label>`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-search",
				class: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted",
				"aria-hidden": "true"
			}, null, _parent));
			_push(`<input id="inventory-search"${ssrRenderAttr("value", unref(searchTerm))} type="search" class="form-input pl-9!" placeholder="Search make, model, colour or stock number" autocomplete="off" enterkeyhint="search">`);
			if (unref(searchTerm)) {
				_push(`<button type="button" class="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center text-muted transition-colors hover:text-ink" aria-label="Clear search">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-x",
					class: "size-4",
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</button>`);
			} else _push(`<!---->`);
			_push(`</div>`);
			_push(ssrRenderComponent(_component_AppButton, {
				type: "submit",
				variant: "dark",
				size: "md"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Search`);
					else return [createTextVNode("Search")];
				}),
				_: 1
			}, _parent));
			_push(`</form></div><div class="flex flex-wrap items-center justify-between gap-3 sm:justify-start"><p class="text-[11px] text-muted" role="status" aria-live="polite"><span class="font-semibold text-ink">${ssrInterpolate(unref(resultCountLabel))}</span>`);
			if (unref(hasActive)) _push(`<span> match your filters</span>`);
			else _push(`<!---->`);
			_push(`</p><button type="button" class="inline-flex items-center gap-2 border border-line bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink lg:hidden">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-sliders-horizontal",
				class: "size-3.5",
				"aria-hidden": "true"
			}, null, _parent));
			_push(` Filters `);
			if (unref(activeChips).length) _push(`<span class="flex size-4 items-center justify-center rounded-full bg-gold text-[9px] text-obsidian">${ssrInterpolate(unref(activeChips).length)}</span>`);
			else _push(`<!---->`);
			_push(`</button>`);
			_push(ssrRenderComponent(_component_VehicleSort, {
				id: "inventory-sort",
				"model-value": unref(filters).sort,
				"onUpdate:modelValue": unref(setSort)
			}, null, _parent));
			_push(`</div></div>`);
			if (unref(hasActive)) {
				_push(`<div class="border-b border-line py-4">`);
				_push(ssrRenderComponent(_component_ActiveFilterChips, {
					chips: unref(activeChips),
					onRemove: unref(removeFilter),
					onClear: clearAll
				}, null, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<div class="mt-8 grid gap-8 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-10"><aside class="hidden lg:block" aria-label="Inventory filters"><div class="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">`);
			_push(ssrRenderComponent(_component_VehicleFilters, {
				filters: unref(filters),
				vehicles: unref(vehicles),
				facets: unref(facets),
				"id-prefix": "desktop-filter",
				onApply: applyAll
			}, null, _parent));
			_push(`</div></aside><div class="min-w-0 scroll-mt-28">`);
			if (unref(error)) {
				_push(`<div class="border border-red-200 bg-red-50 p-6" role="alert"><p class="font-display text-lg text-ink">Inventory could not be loaded.</p><p class="mt-2 text-sm text-charcoal/70">Please refresh the page or try again.</p>`);
				_push(ssrRenderComponent(_component_AppButton, {
					variant: "dark",
					size: "md",
					class: "mt-4",
					onClick: ($event) => unref(refresh)()
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Try again`);
						else return [createTextVNode("Try again")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else if (unref(pending) && !unref(vehicles).length) _push(ssrRenderComponent(_component_LoadingState, { count: 6 }, null, _parent));
			else {
				_push(`<!--[-->`);
				if (unref(result).items.length) _push(ssrRenderComponent(_component_VehicleGrid, {
					vehicles: unref(result).items,
					"eager-count": 3
				}, null, _parent));
				else _push(ssrRenderComponent(_component_EmptyState, {
					title: "No vehicles match these filters",
					description: "Try widening the price or year range, removing a filter, or searching for a different make or model.",
					icon: "i-lucide-search-x"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="mt-6 flex flex-col gap-2 sm:flex-row"${_scopeId}>`);
							_push(ssrRenderComponent(_component_AppButton, {
								variant: "dark",
								size: "md",
								onClick: clearAll
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`Clear all filters`);
									else return [createTextVNode("Clear all filters")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_AppButton, {
								to: "/new-arrivals",
								variant: "outline",
								size: "md"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`Browse new arrivals`);
									else return [createTextVNode("Browse new arrivals")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "mt-6 flex flex-col gap-2 sm:flex-row" }, [createVNode(_component_AppButton, {
							variant: "dark",
							size: "md",
							onClick: clearAll
						}, {
							default: withCtx(() => [createTextVNode("Clear all filters")]),
							_: 1
						}), createVNode(_component_AppButton, {
							to: "/new-arrivals",
							variant: "outline",
							size: "md"
						}, {
							default: withCtx(() => [createTextVNode("Browse new arrivals")]),
							_: 1
						})])];
					}),
					_: 1
				}, _parent));
				if (unref(result).items.length) _push(ssrRenderComponent(_component_Pagination, {
					class: "mt-10",
					page: unref(result).page,
					"page-count": unref(result).pageCount,
					total: unref(result).total,
					onChange: changePage
				}, null, _parent));
				else _push(`<!---->`);
				if (unref(result).items.length) _push(`<p class="mt-5 text-[10px] leading-relaxed text-muted">${ssrInterpolate(unref(dealership).policies.priceNotice)}</p>`);
				else _push(`<!---->`);
				_push(`<!--]-->`);
			}
			_push(`</div></div></div></section>`);
			_push(ssrRenderComponent(_component_VehicleFilterDrawer, {
				open: unref(drawerOpen),
				filters: unref(filters),
				vehicles: unref(vehicles),
				facets: unref(facets),
				onClose: ($event) => drawerOpen.value = false,
				onApply: applyAll
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/cars/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cars/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var cars_default = index_vue_vue_type_script_setup_true_lang_default;

export { cars_default as default };
//# sourceMappingURL=cars-BA5f3Jus.mjs.map
