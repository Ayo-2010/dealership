import { d as dealership, a as useSeoMeta, A as AppButton_default, o as formatNumber, N as NuxtLink, v as vehicleTitle, f as formatNaira, p as parsePriceInput } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './NuxtImg-jexAG5NB.mjs';
import { D as DealershipAdvantages_default, F as FinalCta_default } from './FinalCta-CGMGqenw.mjs';
import { a as useVehicles, p as parseVehicleFilters, s as searchVehicles, l as uniqueSorted, f as getModelOptionsForMake } from './useVehicles-DCwHuUps.mjs';
import { V as VehicleCard_default } from './VehicleCard-Tc4SfC6h.mjs';
import { L as LoadingState_default } from './LoadingState-UQOo5w2K.mjs';
import { defineComponent, computed, unref, withCtx, createTextVNode, resolveComponent, mergeProps, createVNode, toDisplayString, ref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
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

// app/components/home/VehicleSearchForm.vue?vue&type=script&setup=true&lang.ts
var VehicleSearchForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VehicleSearchForm",
	__ssrInlineRender: true,
	props: {
		vehicles: {},
		compact: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const make = ref("");
		const model = ref("");
		const condition = ref("");
		const minPrice = ref("");
		const maxPrice = ref("");
		const error = ref("");
		const submitting = ref(false);
		const makes = computed(() => uniqueSorted(props.vehicles.map((vehicle) => vehicle.make)));
		const models = computed(() => getModelOptionsForMake(props.vehicles, make.value || void 0));
		watch(make, () => {
			if (model.value && !models.value.includes(model.value)) model.value = "";
		});
		computed(() => parsePriceInput(minPrice.value));
		computed(() => parsePriceInput(maxPrice.value));
		watch([minPrice, maxPrice], () => {
			if (error.value) error.value = "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppButton = AppButton_default;
			const _component_UIcon = resolveComponent("UIcon");
			_push(`<form${ssrRenderAttrs(mergeProps({
				class: ["border border-line bg-white p-5 shadow-[0_24px_60px_-40px_rgba(17,19,21,0.45)] sm:p-6", __props.compact ? "" : "lg:p-7"],
				novalidate: "",
				"aria-labelledby": "home-search-title"
			}, _attrs))}><div class="flex flex-col gap-1 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between"><div><p class="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-dark">Search inventory</p><h2 id="home-search-title" class="mt-1.5 font-display text-lg font-medium tracking-tight text-ink"> Find your next car </h2></div><button type="button" class="mt-2 self-start text-[10px] font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink sm:mt-0"> Reset fields </button></div><div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-6"><div class="lg:col-span-1"><label for="home-make" class="form-label">Make</label><select id="home-make" class="form-select" autocomplete="off"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(make)) ? ssrLooseContain(unref(make), "") : ssrLooseEqual(unref(make), "")) ? " selected" : ""}>All makes</option><!--[-->`);
			ssrRenderList(unref(makes), (option) => {
				_push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(unref(make)) ? ssrLooseContain(unref(make), option) : ssrLooseEqual(unref(make), option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
			});
			_push(`<!--]--></select></div><div class="lg:col-span-1"><label for="home-model" class="form-label">Model</label><select id="home-model" class="form-select" autocomplete="off"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(model)) ? ssrLooseContain(unref(model), "") : ssrLooseEqual(unref(model), "")) ? " selected" : ""}>All models</option><!--[-->`);
			ssrRenderList(unref(models), (option) => {
				_push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(unref(model)) ? ssrLooseContain(unref(model), option) : ssrLooseEqual(unref(model), option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
			});
			_push(`<!--]--></select></div><div class="lg:col-span-1"><label for="home-condition" class="form-label">Condition</label><select id="home-condition" class="form-select" autocomplete="off"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(condition)) ? ssrLooseContain(unref(condition), "") : ssrLooseEqual(unref(condition), "")) ? " selected" : ""}>Any condition</option><option value="new"${ssrIncludeBooleanAttr(Array.isArray(unref(condition)) ? ssrLooseContain(unref(condition), "new") : ssrLooseEqual(unref(condition), "new")) ? " selected" : ""}>New</option><option value="used"${ssrIncludeBooleanAttr(Array.isArray(unref(condition)) ? ssrLooseContain(unref(condition), "used") : ssrLooseEqual(unref(condition), "used")) ? " selected" : ""}>Pre-owned</option></select></div><div class="lg:col-span-1"><label for="home-min-price" class="form-label">Min price</label><div class="relative"><span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted" aria-hidden="true">₦</span><input id="home-min-price"${ssrRenderAttr("value", unref(minPrice))} type="text" inputmode="numeric" class="form-input pl-7" placeholder="20,000,000" autocomplete="off"${ssrRenderAttr("aria-invalid", Boolean(unref(error)))}${ssrRenderAttr("aria-describedby", unref(error) ? "home-search-error" : void 0)}></div></div><div class="lg:col-span-1"><label for="home-max-price" class="form-label">Max price</label><div class="relative"><span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted" aria-hidden="true">₦</span><input id="home-max-price"${ssrRenderAttr("value", unref(maxPrice))} type="text" inputmode="numeric" class="form-input pl-7" placeholder="75,000,000" autocomplete="off"${ssrRenderAttr("aria-invalid", Boolean(unref(error)))}${ssrRenderAttr("aria-describedby", unref(error) ? "home-search-error" : void 0)}></div></div><div class="flex items-end sm:col-span-2 lg:col-span-1">`);
			_push(ssrRenderComponent(_component_AppButton, {
				type: "submit",
				variant: "dark",
				size: "md",
				block: "",
				loading: unref(submitting),
				"trailing-icon": "i-lucide-arrow-right"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Search `);
					else return [createTextVNode(" Search ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
			if (unref(error)) {
				_push(`<p id="home-search-error" class="form-error" role="alert">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-alert-circle",
					class: "mt-px size-3.5 shrink-0",
					"aria-hidden": "true"
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(error))}</p>`);
			} else _push(`<!---->`);
			_push(`</form>`);
		};
	}
});
// app/components/home/VehicleSearchForm.vue
var _sfc_setup$11 = VehicleSearchForm_vue_vue_type_script_setup_true_lang_default.setup;
VehicleSearchForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/VehicleSearchForm.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var VehicleSearchForm_default = Object.assign(VehicleSearchForm_vue_vue_type_script_setup_true_lang_default, { __name: "VehicleSearchForm" });
// app/components/home/HeroSection.vue?vue&type=script&setup=true&lang.ts
var HeroSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HeroSection",
	__ssrInlineRender: true,
	props: {
		vehicles: {},
		spotlight: {}
	},
	setup(__props) {
		const props = __props;
		const availableCount = computed(() => props.vehicles.filter((vehicle) => vehicle.status === "available").length);
		const newCount = computed(() => props.vehicles.filter((vehicle) => vehicle.condition === "new" && vehicle.status === "available").length);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppButton = AppButton_default;
			const _component_NuxtImg = _sfc_main;
			const _component_NuxtLink = NuxtLink;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_VehicleSearchForm = VehicleSearchForm_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "bg-obsidian",
				"aria-labelledby": "hero-heading"
			}, _attrs))}><div class="grid lg:min-h-[41rem] lg:grid-cols-[0.88fr_1.12fr] xl:min-h-[45rem]"><div class="relative flex items-center border-b border-white/10 px-5 py-14 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16 xl:px-16"><div class="absolute inset-y-0 left-5 hidden w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent sm:left-8 lg:block lg:left-12 xl:left-16" aria-hidden="true"></div><div class="w-full max-w-xl"><p class="eyebrow text-gold-light"> Lagos, Nigeria <span class="mx-1 text-white/25" aria-hidden="true">/</span> New &amp; pre-owned </p><h1 id="hero-heading" class="display-title mt-6 text-[2.7rem] text-ivory sm:text-6xl lg:text-[4.35rem] xl:text-[4.9rem]"> Your Next Drive<br> Starts Here. </h1><p class="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-white/60 sm:text-base"> Discover a curated selection of brand-new and pre-owned vehicles, with straightforward enquiries and a more confident way to buy your next car. </p><div class="mt-8 flex flex-col gap-3 sm:flex-row">`);
			_push(ssrRenderComponent(_component_AppButton, {
				to: "/cars",
				variant: "gold",
				size: "lg",
				"trailing-icon": "i-lucide-arrow-right"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Explore inventory `);
					else return [createTextVNode(" Explore inventory ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_AppButton, {
				to: "/contact",
				variant: "light-outline",
				size: "lg"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Speak to our team `);
					else return [createTextVNode(" Speak to our team ")];
				}),
				_: 1
			}, _parent));
			_push(`</div><dl class="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6"><div><dt class="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">Available</dt><dd class="mt-1.5 font-display text-lg font-medium text-ivory">${ssrInterpolate(unref(formatNumber)(unref(availableCount)))}</dd></div><div><dt class="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">New stock</dt><dd class="mt-1.5 font-display text-lg font-medium text-ivory">${ssrInterpolate(unref(formatNumber)(unref(newCount)))}</dd></div><div><dt class="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">Pricing</dt><dd class="mt-1.5 font-display text-lg font-medium text-ivory">NGN</dd></div></dl></div></div><div class="relative min-h-[20rem] overflow-hidden bg-charcoal sm:min-h-[26rem] lg:min-h-full">`);
			_push(ssrRenderComponent(_component_NuxtImg, {
				src: "/images/hero-showroom.jpg",
				alt: "Silver Audi RS7 Sportback on a mountain road — illustrative automotive photography",
				width: "2400",
				height: "1350",
				preload: "",
				fetchpriority: "high",
				sizes: "sm:100vw xxl:56vw",
				class: "absolute inset-0 size-full object-cover object-[58%_center]"
			}, null, _parent));
			_push(`<div class="absolute inset-0 bg-gradient-to-t from-obsidian/55 via-transparent to-transparent" aria-hidden="true"></div>`);
			if (__props.spotlight) _push(ssrRenderComponent(_component_NuxtLink, {
				to: `/cars/${__props.spotlight.slug}`,
				class: "group absolute bottom-4 left-4 right-4 border border-white/15 bg-ivory p-4 transition-colors hover:bg-white sm:bottom-6 sm:left-6 sm:right-auto sm:w-[19rem]"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<p class="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-dark"${_scopeId}>In the collection</p><p class="mt-2 font-display text-[15px] font-medium leading-snug tracking-tight text-ink"${_scopeId}>${ssrInterpolate(unref(vehicleTitle)(__props.spotlight))}</p><div class="mt-2 flex items-center justify-between gap-3"${_scopeId}><span class="text-[13px] font-semibold text-ink"${_scopeId}>${ssrInterpolate(unref(formatNaira)(__props.spotlight.price))}</span><span class="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-gold-dark"${_scopeId}> View listing `);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-arrow-right",
							class: "size-3 transition-transform group-hover:translate-x-0.5",
							"aria-hidden": "true"
						}, null, _parent, _scopeId));
						_push(`</span></div>`);
					} else return [
						createVNode("p", { class: "text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-dark" }, "In the collection"),
						createVNode("p", { class: "mt-2 font-display text-[15px] font-medium leading-snug tracking-tight text-ink" }, toDisplayString(unref(vehicleTitle)(__props.spotlight)), 1),
						createVNode("div", { class: "mt-2 flex items-center justify-between gap-3" }, [createVNode("span", { class: "text-[13px] font-semibold text-ink" }, toDisplayString(unref(formatNaira)(__props.spotlight.price)), 1), createVNode("span", { class: "flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-gold-dark" }, [createTextVNode(" View listing "), createVNode(_component_UIcon, {
							name: "i-lucide-arrow-right",
							class: "size-3 transition-transform group-hover:translate-x-0.5",
							"aria-hidden": "true"
						})])])
					];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`<p class="absolute right-4 top-4 hidden border border-white/20 bg-obsidian/45 px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-white/65 sm:block"> Illustrative photography </p></div></div><div class="shell pb-10 pt-8 lg:pb-14 lg:pt-10">`);
			_push(ssrRenderComponent(_component_VehicleSearchForm, { vehicles: __props.vehicles }, null, _parent));
			_push(`</div></section>`);
		};
	}
});
// app/components/home/HeroSection.vue
var _sfc_setup$10 = HeroSection_vue_vue_type_script_setup_true_lang_default.setup;
HeroSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HeroSection.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var HeroSection_default = Object.assign(HeroSection_vue_vue_type_script_setup_true_lang_default, { __name: "HeroSection" });
// app/components/shared/SectionHeading.vue?vue&type=script&setup=true&lang.ts
var SectionHeading_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SectionHeading",
	__ssrInlineRender: true,
	props: {
		eyebrow: {},
		title: {},
		description: {},
		align: { default: "left" },
		tone: { default: "light" },
		index: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["flex flex-col gap-5", [__props.align === "center" ? "items-center text-center" : "items-start", __props.tone === "dark" ? "text-ivory" : "text-ink"]] }, _attrs))}><div class="flex items-center gap-4">`);
			if (__props.index) _push(`<span class="font-display text-[10px] font-medium tracking-[0.2em] text-gold">${ssrInterpolate(__props.index)}</span>`);
			else _push(`<!---->`);
			if (__props.eyebrow) _push(`<span class="${ssrRenderClass([__props.tone === "dark" ? "text-gold-light" : "text-gold-dark", "eyebrow"])}">${ssrInterpolate(__props.eyebrow)}</span>`);
			else _push(`<!---->`);
			_push(`</div><div class="flex w-full flex-col gap-5 md:flex-row md:items-end md:justify-between"><div class="max-w-2xl"><h2 class="section-title">${ssrInterpolate(__props.title)}</h2>`);
			if (__props.description) _push(`<p class="${ssrRenderClass([__props.tone === "dark" ? "text-white/65" : "text-muted", "mt-4 max-w-xl text-[0.95rem] leading-relaxed"])}">${ssrInterpolate(__props.description)}</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (_ctx.$slots.action) {
				_push(`<div class="shrink-0">`);
				ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
});
// app/components/shared/SectionHeading.vue
var _sfc_setup$9 = SectionHeading_vue_vue_type_script_setup_true_lang_default.setup;
SectionHeading_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SectionHeading.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var SectionHeading_default = Object.assign(SectionHeading_vue_vue_type_script_setup_true_lang_default, { __name: "SectionHeading" });
// app/components/home/FeaturedVehicles.vue?vue&type=script&setup=true&lang.ts
var FeaturedVehicles_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FeaturedVehicles",
	__ssrInlineRender: true,
	props: {
		vehicles: {},
		title: { default: "The featured collection" },
		description: { default: "A short list of vehicles that best represent the selection this week — each with its details, condition and listed price in one place." },
		eyebrow: { default: "Selected inventory" },
		index: { default: "01" },
		viewAllTo: { default: "/cars" }
	},
	setup(__props) {
		const props = __props;
		const leadVehicle = computed(() => props.vehicles[0]);
		const supportingVehicles = computed(() => props.vehicles.slice(1, 3));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_SectionHeading = SectionHeading_default;
			const _component_AppButton = AppButton_default;
			const _component_VehicleCard = VehicleCard_default;
			if (__props.vehicles.length) {
				_push(`<section${ssrRenderAttrs(mergeProps({
					class: "section-space bg-ivory",
					"aria-labelledby": "featured-heading"
				}, _attrs))}><div class="shell">`);
				_push(ssrRenderComponent(_component_SectionHeading, {
					eyebrow: __props.eyebrow,
					title: __props.title,
					description: __props.description,
					index: __props.index
				}, {
					action: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_AppButton, {
							to: __props.viewAllTo,
							variant: "outline",
							size: "md",
							"trailing-icon": "i-lucide-arrow-right"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` View all cars `);
								else return [createTextVNode(" View all cars ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else return [createVNode(_component_AppButton, {
							to: __props.viewAllTo,
							variant: "outline",
							size: "md",
							"trailing-icon": "i-lucide-arrow-right"
						}, {
							default: withCtx(() => [createTextVNode(" View all cars ")]),
							_: 1
						}, 8, ["to"])];
					}),
					_: 1
				}, _parent));
				_push(`<div class="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-7">`);
				if (unref(leadVehicle)) {
					_push(`<div class="lg:col-span-7">`);
					_push(ssrRenderComponent(_component_VehicleCard, {
						vehicle: unref(leadVehicle),
						eager: ""
					}, null, _parent));
					_push(`</div>`);
				} else _push(`<!---->`);
				if (unref(supportingVehicles).length) {
					_push(`<div class="grid gap-6 lg:col-span-5"><!--[-->`);
					ssrRenderList(unref(supportingVehicles), (vehicle) => {
						_push(ssrRenderComponent(_component_VehicleCard, {
							key: vehicle.id,
							vehicle,
							variant: "compact"
						}, null, _parent));
					});
					_push(`<!--]--></div>`);
				} else {
					_push(`<div class="hidden lg:col-span-5 lg:block"><div class="flex h-full flex-col justify-between border border-line bg-white p-7"><div><p class="eyebrow text-gold-dark">Curated, not crowded</p><p class="mt-5 font-display text-2xl font-medium leading-snug tracking-tight text-ink"> Every listing is presented with the detail you need to shortlist with confidence. </p></div>`);
					_push(ssrRenderComponent(_component_AppButton, {
						to: "/cars",
						variant: "dark",
						size: "md",
						"trailing-icon": "i-lucide-arrow-right",
						class: "mt-8 self-start"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` Browse the collection `);
							else return [createTextVNode(" Browse the collection ")];
						}),
						_: 1
					}, _parent));
					_push(`</div></div>`);
				}
				_push(`</div><p class="mt-6 text-[10px] uppercase tracking-[0.12em] text-muted"> Demonstration inventory · Photography is illustrative </p></div></section>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/home/FeaturedVehicles.vue
var _sfc_setup$8 = FeaturedVehicles_vue_vue_type_script_setup_true_lang_default.setup;
FeaturedVehicles_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/FeaturedVehicles.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var FeaturedVehicles_default = Object.assign(FeaturedVehicles_vue_vue_type_script_setup_true_lang_default, { __name: "FeaturedVehicles" });
// app/data/categories.ts
/**
* Image-led category links. Every destination is a real, working inventory
* filter rather than an empty landing page.
*/
var vehicleCategories = [
	{
		label: "SUVs",
		description: "Space, presence and all-road confidence.",
		href: "/cars?bodyType=SUV",
		image: "/images/categories/suv.jpg",
		cta: "Explore SUVs"
	},
	{
		label: "Sedans",
		description: "Composed comfort for every journey.",
		href: "/cars?bodyType=Sedan",
		image: "/images/categories/sedan.jpg",
		cta: "Explore sedans"
	},
	{
		label: "Coupes",
		description: "Low-slung design with a driver focus.",
		href: "/cars?bodyType=Coupe",
		image: "/images/categories/coupe.jpg",
		cta: "Explore coupes"
	},
	{
		label: "Hatchbacks",
		description: "Compact, practical and easy to place.",
		href: "/cars?bodyType=Hatchback",
		image: "/images/categories/hatchback.jpg",
		cta: "Explore hatchbacks"
	},
	{
		label: "Pickup trucks",
		description: "Built for work without losing presence.",
		href: "/cars?bodyType=Pickup",
		image: "/images/categories/pickup.jpg",
		cta: "Explore pickups"
	},
	{
		label: "Luxury",
		description: "The collection’s highest-specification vehicles.",
		href: `/cars?minPrice=${dealership.luxuryPriceThreshold}`,
		image: "/images/categories/luxury.jpg",
		cta: "Explore luxury"
	}
];
// app/components/home/VehicleCategories.vue?vue&type=script&setup=true&lang.ts
var VehicleCategories_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VehicleCategories",
	__ssrInlineRender: true,
	props: { vehicles: {} },
	setup(__props) {
		const props = __props;
		function categoryCount(href) {
			const queryIndex = href.indexOf("?");
			const params = new URLSearchParams(queryIndex >= 0 ? href.slice(queryIndex + 1) : "");
			const filters = parseVehicleFilters(Object.fromEntries(params.entries()));
			return searchVehicles(props.vehicles, {
				...filters,
				page: 1,
				perPage: 100
			}).total;
		}
		const categoryCounts = computed(() => Object.fromEntries(vehicleCategories.map((category) => [category.href, categoryCount(category.href)])));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_SectionHeading = SectionHeading_default;
			const _component_AppButton = AppButton_default;
			const _component_NuxtLink = NuxtLink;
			const _component_NuxtImg = _sfc_main;
			const _component_UIcon = resolveComponent("UIcon");
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "section-space border-t border-line bg-white",
				"aria-labelledby": "categories-heading"
			}, _attrs))}><div class="shell">`);
			_push(ssrRenderComponent(_component_SectionHeading, {
				eyebrow: "Browse by category",
				title: "Start with the shape of your next car.",
				description: "From everyday practicality to weekend performance, explore the collection by body style.",
				index: "02"
			}, {
				action: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_AppButton, {
						to: "/cars",
						variant: "ghost",
						size: "md",
						"trailing-icon": "i-lucide-arrow-right"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` All inventory `);
							else return [createTextVNode(" All inventory ")];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_AppButton, {
						to: "/cars",
						variant: "ghost",
						size: "md",
						"trailing-icon": "i-lucide-arrow-right"
					}, {
						default: withCtx(() => [createTextVNode(" All inventory ")]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`<div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
			ssrRenderList(unref(vehicleCategories), (category) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: category.label,
					to: category.href,
					class: "group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden bg-charcoal p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_NuxtImg, {
								src: category.image,
								alt: `${category.label} — illustrative category photography`,
								width: "1200",
								height: "900",
								loading: "lazy",
								sizes: "sm:100vw xxl:33vw",
								class: "absolute inset-0 size-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.035]"
							}, null, _parent, _scopeId));
							_push(`<div class="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/25 to-transparent" aria-hidden="true"${_scopeId}></div><div class="relative flex items-end justify-between gap-4"${_scopeId}><div${_scopeId}><p class="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-light"${_scopeId}>${ssrInterpolate(unref(categoryCounts)[category.href])} ${ssrInterpolate(unref(categoryCounts)[category.href] === 1 ? "vehicle" : "vehicles")}</p><h3 class="mt-2 font-display text-2xl font-medium tracking-tight text-ivory"${_scopeId}>${ssrInterpolate(category.label)}</h3><p class="mt-1 max-w-[16rem] text-[11px] leading-relaxed text-white/60"${_scopeId}>${ssrInterpolate(category.description)}</p></div><span class="mb-1 flex size-8 shrink-0 items-center justify-center border border-white/25 text-white/80 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-arrow-up-right",
								class: "size-4",
								"aria-hidden": "true"
							}, null, _parent, _scopeId));
							_push(`</span></div>`);
						} else return [
							createVNode(_component_NuxtImg, {
								src: category.image,
								alt: `${category.label} — illustrative category photography`,
								width: "1200",
								height: "900",
								loading: "lazy",
								sizes: "sm:100vw xxl:33vw",
								class: "absolute inset-0 size-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.035]"
							}, null, 8, ["src", "alt"]),
							createVNode("div", {
								class: "absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/25 to-transparent",
								"aria-hidden": "true"
							}),
							createVNode("div", { class: "relative flex items-end justify-between gap-4" }, [createVNode("div", null, [
								createVNode("p", { class: "text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-light" }, toDisplayString(unref(categoryCounts)[category.href]) + " " + toDisplayString(unref(categoryCounts)[category.href] === 1 ? "vehicle" : "vehicles"), 1),
								createVNode("h3", { class: "mt-2 font-display text-2xl font-medium tracking-tight text-ivory" }, toDisplayString(category.label), 1),
								createVNode("p", { class: "mt-1 max-w-[16rem] text-[11px] leading-relaxed text-white/60" }, toDisplayString(category.description), 1)
							]), createVNode("span", { class: "mb-1 flex size-8 shrink-0 items-center justify-center border border-white/25 text-white/80 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian" }, [createVNode(_component_UIcon, {
								name: "i-lucide-arrow-up-right",
								class: "size-4",
								"aria-hidden": "true"
							})])])
						];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
// app/components/home/VehicleCategories.vue
var _sfc_setup$7 = VehicleCategories_vue_vue_type_script_setup_true_lang_default.setup;
VehicleCategories_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/VehicleCategories.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var VehicleCategories_default = Object.assign(VehicleCategories_vue_vue_type_script_setup_true_lang_default, { __name: "VehicleCategories" });
// app/components/home/NewArrivalsSection.vue?vue&type=script&setup=true&lang.ts
var NewArrivalsSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "NewArrivalsSection",
	__ssrInlineRender: true,
	props: { vehicles: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_SectionHeading = SectionHeading_default;
			const _component_AppButton = AppButton_default;
			const _component_VehicleCard = VehicleCard_default;
			if (__props.vehicles.length) {
				_push(`<section${ssrRenderAttrs(mergeProps({
					class: "section-space border-t border-line bg-white",
					"aria-labelledby": "new-arrivals-heading"
				}, _attrs))}><div class="shell">`);
				_push(ssrRenderComponent(_component_SectionHeading, {
					eyebrow: "Recently listed",
					title: "New to the collection.",
					description: "The latest vehicles published to the website. Listing dates reflect when a vehicle was added online, not a claim about when it arrived in the showroom.",
					index: "03"
				}, {
					action: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_AppButton, {
							to: "/new-arrivals",
							variant: "outline",
							size: "md",
							"trailing-icon": "i-lucide-arrow-right"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` All new arrivals `);
								else return [createTextVNode(" All new arrivals ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else return [createVNode(_component_AppButton, {
							to: "/new-arrivals",
							variant: "outline",
							size: "md",
							"trailing-icon": "i-lucide-arrow-right"
						}, {
							default: withCtx(() => [createTextVNode(" All new arrivals ")]),
							_: 1
						})];
					}),
					_: 1
				}, _parent));
				_push(`<div class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList(__props.vehicles, (vehicle) => {
					_push(ssrRenderComponent(_component_VehicleCard, {
						key: vehicle.id,
						vehicle,
						"show-listed-date": ""
					}, null, _parent));
				});
				_push(`<!--]--></div></div></section>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/home/NewArrivalsSection.vue
var _sfc_setup$6 = NewArrivalsSection_vue_vue_type_script_setup_true_lang_default.setup;
NewArrivalsSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/NewArrivalsSection.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var NewArrivalsSection_default = Object.assign(NewArrivalsSection_vue_vue_type_script_setup_true_lang_default, { __name: "NewArrivalsSection" });
// app/components/home/PremiumVehiclesSection.vue?vue&type=script&setup=true&lang.ts
var PremiumVehiclesSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PremiumVehiclesSection",
	__ssrInlineRender: true,
	props: { vehicles: {} },
	setup(__props) {
		const thresholdLabel = computed(() => formatNaira(dealership.luxuryPriceThreshold));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppButton = AppButton_default;
			const _component_VehicleCard = VehicleCard_default;
			if (__props.vehicles.length) {
				_push(`<section${ssrRenderAttrs(mergeProps({
					class: "section-space bg-ivory",
					"aria-labelledby": "premium-heading"
				}, _attrs))}><div class="shell"><div class="grid gap-6 lg:grid-cols-12 lg:gap-7"><div class="flex flex-col justify-between bg-obsidian p-7 sm:p-9 lg:col-span-4"><div><p class="eyebrow text-gold-light">Premium &amp; luxury</p><h2 id="premium-heading" class="mt-5 font-display text-3xl font-medium leading-tight tracking-tight text-ivory sm:text-[2.35rem]"> The upper end of the collection. </h2><p class="mt-4 text-[13px] leading-relaxed text-white/50"> High-specification vehicles selected for presence, performance and a more considered interior. </p></div><div class="mt-10 border-t border-white/10 pt-5"><p class="text-[10px] uppercase tracking-[0.14em] text-white/35">Price guide</p><p class="mt-2 font-display text-lg text-ivory">From ${ssrInterpolate(unref(thresholdLabel))}</p>`);
				_push(ssrRenderComponent(_component_AppButton, {
					to: `/cars?minPrice=${unref(dealership).luxuryPriceThreshold}`,
					variant: "light-outline",
					size: "md",
					class: "mt-5",
					"trailing-icon": "i-lucide-arrow-right"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` View luxury inventory `);
						else return [createTextVNode(" View luxury inventory ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div><div class="grid gap-6 sm:grid-cols-2 lg:col-span-8"><!--[-->`);
				ssrRenderList(__props.vehicles, (vehicle) => {
					_push(ssrRenderComponent(_component_VehicleCard, {
						key: vehicle.id,
						vehicle
					}, null, _parent));
				});
				_push(`<!--]--></div></div></div></section>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/home/PremiumVehiclesSection.vue
var _sfc_setup$5 = PremiumVehiclesSection_vue_vue_type_script_setup_true_lang_default.setup;
PremiumVehiclesSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/PremiumVehiclesSection.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var PremiumVehiclesSection_default = Object.assign(PremiumVehiclesSection_vue_vue_type_script_setup_true_lang_default, { __name: "PremiumVehiclesSection" });
// app/components/home/UsedVehiclesSection.vue?vue&type=script&setup=true&lang.ts
var UsedVehiclesSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "UsedVehiclesSection",
	__ssrInlineRender: true,
	props: { vehicles: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_VehicleCard = VehicleCard_default;
			if (__props.vehicles.length) {
				_push(`<section${ssrRenderAttrs(mergeProps({
					class: "section-space bg-[#ECEAE3]",
					"aria-labelledby": "used-heading"
				}, _attrs))}><div class="shell"><div class="flex flex-col gap-6 border-b border-charcoal/10 pb-8 md:flex-row md:items-end md:justify-between"><div><p class="eyebrow text-gold-dark">Pre-owned selection</p><h2 id="used-heading" class="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-[2.5rem]"> Proven. Pre-owned. </h2></div><div class="max-w-md"><p class="text-[13px] leading-relaxed text-charcoal/65"> Pre-owned vehicles are presented with their recorded mileage and known specification. Condition and service history should always be confirmed directly with the dealership. </p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/cars?condition=used",
					class: "mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-gold-dark"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(` Browse all pre-owned `);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-arrow-right",
								class: "size-3.5",
								"aria-hidden": "true"
							}, null, _parent, _scopeId));
						} else return [createTextVNode(" Browse all pre-owned "), createVNode(_component_UIcon, {
							name: "i-lucide-arrow-right",
							class: "size-3.5",
							"aria-hidden": "true"
						})];
					}),
					_: 1
				}, _parent));
				_push(`</div></div><div class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList(__props.vehicles, (vehicle) => {
					_push(ssrRenderComponent(_component_VehicleCard, {
						key: vehicle.id,
						vehicle
					}, null, _parent));
				});
				_push(`<!--]--></div></div></section>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/home/UsedVehiclesSection.vue
var _sfc_setup$4 = UsedVehiclesSection_vue_vue_type_script_setup_true_lang_default.setup;
UsedVehiclesSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/UsedVehiclesSection.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var UsedVehiclesSection_default = Object.assign(UsedVehiclesSection_vue_vue_type_script_setup_true_lang_default, { __name: "UsedVehiclesSection" });
// app/components/home/BrandStory.vue?vue&type=script&setup=true&lang.ts
var BrandStory_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BrandStory",
	__ssrInlineRender: true,
	setup(__props) {
		const values = [
			{
				title: "Curated, not crowded",
				description: "A focused selection presented with the specification that matters."
			},
			{
				title: "Clear from the start",
				description: "Listed prices in naira, with condition and availability shown on every vehicle."
			},
			{
				title: "Direct conversation",
				description: "Speak with the team by WhatsApp or telephone, without a maze of forms."
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtImg = _sfc_main;
			const _component_AppButton = AppButton_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "section-space bg-ivory",
				"aria-labelledby": "story-heading"
			}, _attrs))}><div class="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16"><div class="relative lg:col-span-6"><div class="overflow-hidden bg-line">`);
			_push(ssrRenderComponent(_component_NuxtImg, {
				src: "/images/showroom/showroom-1.jpg",
				alt: "An illustrative modern car showroom with several vehicles on display",
				width: "1800",
				height: "1200",
				loading: "lazy",
				sizes: "sm:100vw xxl:50vw",
				class: "aspect-[4/3] w-full object-cover"
			}, null, _parent));
			_push(`</div><div class="mt-3 flex items-center justify-between gap-4"><p class="text-[9px] uppercase tracking-[0.14em] text-muted">Illustrative showroom photography</p><span class="hidden h-px flex-1 bg-line sm:block" aria-hidden="true"></span></div></div><div class="lg:col-span-6 lg:pl-4"><span class="eyebrow text-gold-dark">The dealership</span><h2 id="story-heading" class="section-title mt-4"> Car buying should feel considered, not complicated. </h2><div class="prose-editorial mt-5 max-w-xl"><p> Vantage Motors is a demonstration dealership concept built around a simple idea: present a small, well-chosen collection clearly, and make it easy to speak with a real person. </p><p> The showroom information on this build is placeholder content. Before launch, replace the business story, address, contact details and inventory with verified dealership information. </p></div><dl class="mt-8 grid gap-5 sm:grid-cols-3"><!--[-->`);
			ssrRenderList(values, (value) => {
				_push(`<div class="border-t border-line pt-4"><dt class="font-display text-[13px] font-medium tracking-tight text-ink">${ssrInterpolate(value.title)}</dt><dd class="mt-2 text-[11px] leading-relaxed text-muted">${ssrInterpolate(value.description)}</dd></div>`);
			});
			_push(`<!--]--></dl><div class="mt-8 flex flex-wrap gap-3">`);
			_push(ssrRenderComponent(_component_AppButton, {
				to: "/about",
				variant: "dark",
				size: "md",
				"trailing-icon": "i-lucide-arrow-right"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` About the dealership `);
					else return [createTextVNode(" About the dealership ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_AppButton, {
				href: `tel:${unref(dealership).contact.phone.e164}`,
				variant: "outline",
				size: "md",
				icon: "i-lucide-phone"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(dealership).contact.phone.display)}`);
					else return [createTextVNode(toDisplayString(unref(dealership).contact.phone.display), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></section>`);
		};
	}
});
// app/components/home/BrandStory.vue
var _sfc_setup$3 = BrandStory_vue_vue_type_script_setup_true_lang_default.setup;
BrandStory_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/BrandStory.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var BrandStory_default = Object.assign(BrandStory_vue_vue_type_script_setup_true_lang_default, { __name: "BrandStory" });
// app/components/shared/TestimonialCard.vue?vue&type=script&setup=true&lang.ts
var TestimonialCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TestimonialCard",
	__ssrInlineRender: true,
	props: { testimonial: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			_push(`<figure${ssrRenderAttrs(mergeProps({ class: "flex h-full flex-col justify-between border border-white/10 bg-white/[0.035] p-6" }, _attrs))}><div><div class="flex items-center justify-between gap-3">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-quote",
				class: "size-5 text-gold",
				"aria-hidden": "true"
			}, null, _parent));
			_push(`<span class="border border-white/15 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/55"> Demo content </span></div><blockquote class="mt-5 text-[0.95rem] leading-relaxed text-white/75"> “${ssrInterpolate(__props.testimonial.quote)}” </blockquote></div><figcaption class="mt-8 border-t border-white/10 pt-4"><p class="font-display text-sm font-medium text-ivory">${ssrInterpolate(__props.testimonial.name)}</p><p class="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">${ssrInterpolate(__props.testimonial.context)}</p></figcaption></figure>`);
		};
	}
});
// app/components/shared/TestimonialCard.vue
var _sfc_setup$2 = TestimonialCard_vue_vue_type_script_setup_true_lang_default.setup;
TestimonialCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/TestimonialCard.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var TestimonialCard_default = Object.assign(TestimonialCard_vue_vue_type_script_setup_true_lang_default, { __name: "TestimonialCard" });
// app/data/testimonials.ts
var demoTestimonials = [
	{
		quote: "The listing was clear about the vehicle’s specification and price, and my questions were answered without pressure. That made the shortlist much easier.",
		name: "Adaeze O.",
		context: "Pre-owned SUV enquiry",
		isDemo: true
	},
	{
		quote: "I appreciated being able to send the exact vehicle details on WhatsApp. It kept the conversation focused on the car I was actually interested in.",
		name: "Tunde A.",
		context: "Luxury sedan enquiry",
		isDemo: true
	},
	{
		quote: "A straightforward process: see the price, review the details, ask a question. The team was responsive and the next steps were explained clearly.",
		name: "Ifeoma N.",
		context: "New vehicle enquiry",
		isDemo: true
	}
];
var testimonialDisclaimer = "Illustrative demo content. These are not verified customer reviews and do not describe real transactions.";
// app/components/home/TestimonialsSection.vue?vue&type=script&setup=true&lang.ts
var TestimonialsSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TestimonialsSection",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			const _component_TestimonialCard = TestimonialCard_default;
			const _component_AppButton = AppButton_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "section-space bg-obsidian",
				"aria-labelledby": "testimonials-heading"
			}, _attrs))}><div class="shell"><div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><p class="eyebrow text-gold-light">In their words</p><h2 id="testimonials-heading" class="section-title mt-4 max-w-xl text-ivory"> A good buying experience is worth talking about. </h2></div><div class="max-w-xs border border-white/15 px-4 py-3"><p class="flex items-start gap-2 text-[10px] leading-relaxed text-white/55">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-triangle-alert",
				class: "mt-px size-3.5 shrink-0 text-gold",
				"aria-hidden": "true"
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(testimonialDisclaimer))}</p></div></div><div class="mt-10 grid gap-4 md:grid-cols-3"><!--[-->`);
			ssrRenderList(unref(demoTestimonials), (testimonial) => {
				_push(ssrRenderComponent(_component_TestimonialCard, {
					key: testimonial.name,
					testimonial
				}, null, _parent));
			});
			_push(`<!--]--></div><div class="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"><p class="text-[11px] leading-relaxed text-white/40"> Replace these examples with verified reviews, shared with customer permission, before launch. </p>`);
			_push(ssrRenderComponent(_component_AppButton, {
				to: "/contact",
				variant: "light-outline",
				size: "sm",
				"trailing-icon": "i-lucide-arrow-right"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Talk to the team `);
					else return [createTextVNode(" Talk to the team ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></section>`);
		};
	}
});
// app/components/home/TestimonialsSection.vue
var _sfc_setup$1 = TestimonialsSection_vue_vue_type_script_setup_true_lang_default.setup;
TestimonialsSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/TestimonialsSection.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var TestimonialsSection_default = Object.assign(TestimonialsSection_vue_vue_type_script_setup_true_lang_default, { __name: "TestimonialsSection" });
// app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { vehicles, availableVehicles, featuredVehicles, pending, error, refresh } = useVehicles();
		const featured = computed(() => featuredVehicles.value.slice(0, 3));
		const usedSlugs = computed(() => new Set(featured.value.map((vehicle) => vehicle.slug)));
		const newArrivalSelection = computed(() => [...availableVehicles.value].filter((vehicle) => !usedSlugs.value.has(vehicle.slug)).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 3));
		const premiumSelection = computed(() => {
			const excluded = /* @__PURE__ */ new Set([...usedSlugs.value, ...newArrivalSelection.value.map((vehicle) => vehicle.slug)]);
			return availableVehicles.value.filter((vehicle) => vehicle.price >= dealership.luxuryPriceThreshold && !excluded.has(vehicle.slug)).sort((a, b) => b.price - a.price).slice(0, 2);
		});
		const usedSelection = computed(() => {
			const excluded = /* @__PURE__ */ new Set([
				...usedSlugs.value,
				...newArrivalSelection.value.map((vehicle) => vehicle.slug),
				...premiumSelection.value.map((vehicle) => vehicle.slug)
			]);
			return availableVehicles.value.filter((vehicle) => vehicle.condition === "used" && !excluded.has(vehicle.slug)).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 3);
		});
		const spotlight = computed(() => featured.value[0] ?? availableVehicles.value[0]);
		useSeoMeta({
			description: dealership.seo.defaultDescription,
			ogTitle: `${dealership.name} — ${dealership.tagline}`,
			ogDescription: dealership.seo.defaultDescription,
			twitterTitle: `${dealership.name} — ${dealership.tagline}`,
			twitterDescription: dealership.seo.defaultDescription
		});
		function retry() {
			refresh();
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_HeroSection = HeroSection_default;
			const _component_AppButton = AppButton_default;
			const _component_FeaturedVehicles = FeaturedVehicles_default;
			const _component_VehicleCategories = VehicleCategories_default;
			const _component_DealershipAdvantages = DealershipAdvantages_default;
			const _component_NewArrivalsSection = NewArrivalsSection_default;
			const _component_PremiumVehiclesSection = PremiumVehiclesSection_default;
			const _component_UsedVehiclesSection = UsedVehiclesSection_default;
			const _component_BrandStory = BrandStory_default;
			const _component_TestimonialsSection = TestimonialsSection_default;
			const _component_FinalCta = FinalCta_default;
			const _component_LoadingState = LoadingState_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_HeroSection, {
				vehicles: unref(vehicles),
				spotlight: unref(spotlight)
			}, null, _parent));
			if (unref(error)) {
				_push(`<div class="shell py-12"><div class="border border-red-200 bg-red-50 p-6" role="alert"><p class="font-display text-lg text-ink">The inventory could not be loaded.</p><p class="mt-2 text-sm text-charcoal/70">Please refresh the page or try again.</p>`);
				_push(ssrRenderComponent(_component_AppButton, {
					variant: "dark",
					size: "md",
					class: "mt-4",
					onClick: retry
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Try again`);
						else return [createTextVNode("Try again")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			} else {
				_push(`<!--[-->`);
				if (unref(featured).length) _push(ssrRenderComponent(_component_FeaturedVehicles, {
					vehicles: unref(featured),
					title: `The featured collection`,
					description: `A short list of vehicles that best represent the selection this week — each with its details, condition and listed price in one place.`
				}, null, _parent));
				else _push(`<!---->`);
				if (unref(vehicles).length) _push(ssrRenderComponent(_component_VehicleCategories, { vehicles: unref(vehicles) }, null, _parent));
				else _push(`<!---->`);
				_push(ssrRenderComponent(_component_DealershipAdvantages, null, null, _parent));
				if (unref(newArrivalSelection).length) _push(ssrRenderComponent(_component_NewArrivalsSection, { vehicles: unref(newArrivalSelection) }, null, _parent));
				else _push(`<!---->`);
				if (unref(premiumSelection).length) _push(ssrRenderComponent(_component_PremiumVehiclesSection, { vehicles: unref(premiumSelection) }, null, _parent));
				else _push(`<!---->`);
				if (unref(usedSelection).length) _push(ssrRenderComponent(_component_UsedVehiclesSection, { vehicles: unref(usedSelection) }, null, _parent));
				else _push(`<!---->`);
				_push(ssrRenderComponent(_component_BrandStory, null, null, _parent));
				_push(ssrRenderComponent(_component_TestimonialsSection, null, null, _parent));
				_push(ssrRenderComponent(_component_FinalCta, null, null, _parent));
				_push(`<!--]-->`);
			}
			if (unref(pending) && !unref(vehicles).length) _push(ssrRenderComponent(_component_LoadingState, {
				class: "shell py-12",
				count: 3,
				label: "Loading the collection"
			}, null, _parent));
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-BxVUInCj.mjs.map
