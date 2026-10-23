import { u as useRoute$1, v as vehicleTitle, c as conditionLabel, f as formatNaira, a as useSeoMeta, d as dealership, b as useAsyncData, e as formatMileage, s as statusDescription, A as AppButton_default, g as createError$2, h as useRuntimeConfig, _ as _plugin_vue_export_helper_default, i as useWhatsApp, W as WhatsAppButton_default, j as useRequestURL } from '../virtual/entry.mjs';
import { B as Breadcrumbs_default } from './Breadcrumbs-RqMNGriD.mjs';
import { _ as _sfc_main } from './NuxtImg-jexAG5NB.mjs';
import { u as useVehicle, v as vehicleRepository, a as useVehicles } from './useVehicles-DCwHuUps.mjs';
import { u as useToast } from './useToast-CFIXcbF3.mjs';
import { V as VehicleCard_default } from './VehicleCard-Tc4SfC6h.mjs';
import { defineComponent, withAsyncContext, computed, resolveComponent, unref, withCtx, createTextVNode, ref, mergeProps, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrRenderTeleport, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/components/vehicles/VehicleGallery.vue?vue&type=script&setup=true&lang.ts
var VehicleGallery_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VehicleGallery",
	__ssrInlineRender: true,
	props: {
		images: {},
		label: {},
		status: { default: "available" }
	},
	setup(__props) {
		const props = __props;
		const activeIndex = ref(0);
		const lightboxOpen = ref(false);
		const failedIndexes = ref([]);
		ref(null);
		const slides = computed(() => props.images.length ? props.images : []);
		const currentImage = computed(() => slides.value[activeIndex.value]);
		const total = computed(() => slides.value.length);
		const statusLabel = computed(() => {
			if (props.status === "sold") return "Sold";
			if (props.status === "reserved") return "Reserved";
			return "";
		});
		function isFailed(index) {
			return failedIndexes.value.includes(index);
		}
		function markFailed(index) {
			if (!failedIndexes.value.includes(index)) failedIndexes.value = [...failedIndexes.value, index];
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtImg = _sfc_main;
			const _component_UIcon = resolveComponent("UIcon");
			_push(`<div${ssrRenderAttrs(_attrs)} data-v-39b17e2c><div class="relative overflow-hidden border border-line bg-charcoal" data-v-39b17e2c><button type="button" class="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden"${ssrRenderAttr("aria-label", `Open full-screen gallery for the ${__props.label}, image ${unref(activeIndex) + 1} of ${unref(total)}`)} data-v-39b17e2c>`);
			if (unref(currentImage) && !isFailed(unref(activeIndex))) _push(ssrRenderComponent(_component_NuxtImg, {
				src: unref(currentImage),
				alt: `${__props.label} — illustrative automotive photograph, image ${unref(activeIndex) + 1} of ${unref(total)}`,
				width: "1400",
				height: "1050",
				preload: "",
				fetchpriority: "high",
				sizes: "sm:100vw xxl:58vw",
				class: "absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]",
				onError: ($event) => markFailed(unref(activeIndex))
			}, null, _parent));
			else {
				_push(`<span class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/40" role="img"${ssrRenderAttr("aria-label", `Image unavailable for the ${__props.label}`)} data-v-39b17e2c>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-car-front",
					class: "size-10",
					"aria-hidden": "true"
				}, null, _parent));
				_push(`<span class="text-[10px] uppercase tracking-[0.16em]" data-v-39b17e2c>Image unavailable</span></span>`);
			}
			if (unref(statusLabel)) _push(`<span class="${ssrRenderClass([__props.status === "sold" ? "border-obsidian bg-obsidian text-white" : "border-amber-300 bg-amber-50 text-amber-900", "absolute left-4 top-4 border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]"])}" data-v-39b17e2c>${ssrInterpolate(unref(statusLabel))}</span>`);
			else _push(`<!---->`);
			_push(`<span class="absolute bottom-4 right-4 flex items-center gap-2 border border-white/20 bg-obsidian/55 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/75" data-v-39b17e2c>`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-expand",
				class: "size-3",
				"aria-hidden": "true"
			}, null, _parent));
			_push(` View gallery </span></button></div>`);
			if (unref(total) > 1) {
				_push(`<div class="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5" data-v-39b17e2c><!--[-->`);
				ssrRenderList(unref(slides), (image, index) => {
					_push(`<button type="button" class="${ssrRenderClass([index === unref(activeIndex) ? "border-gold" : "border-line hover:border-ink", "relative aspect-[4/3] overflow-hidden border bg-charcoal transition-colors"])}"${ssrRenderAttr("aria-label", `Show image ${index + 1} of ${unref(total)}`)}${ssrRenderAttr("aria-current", index === unref(activeIndex) ? "true" : void 0)} data-v-39b17e2c>`);
					if (!isFailed(index)) _push(ssrRenderComponent(_component_NuxtImg, {
						src: image,
						alt: `${__props.label} — thumbnail ${index + 1}`,
						width: "320",
						height: "240",
						loading: "lazy",
						class: "absolute inset-0 size-full object-cover",
						onError: ($event) => markFailed(index)
					}, null, _parent));
					else {
						_push(`<span class="absolute inset-0 flex items-center justify-center bg-ivory text-muted" data-v-39b17e2c>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-image-off",
							class: "size-4",
							"aria-hidden": "true"
						}, null, _parent));
						_push(`</span>`);
					}
					_push(`</button>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`<p class="mt-3 text-[10px] uppercase tracking-[0.12em] text-muted" data-v-39b17e2c> Illustrative photography · Not the specific vehicle pictured </p>`);
			ssrRenderTeleport(_push, (_push) => {
				if (unref(lightboxOpen)) {
					_push(`<div class="fixed inset-0 z-[60] flex flex-col bg-obsidian/95" data-v-39b17e2c><div id="vehicle-lightbox" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", `${__props.label} image gallery`)} class="flex h-full flex-col" data-v-39b17e2c><div class="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6" data-v-39b17e2c><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55" data-v-39b17e2c>${ssrInterpolate(__props.label)} <span class="ml-2 text-gold-light" data-v-39b17e2c>${ssrInterpolate(unref(activeIndex) + 1)} / ${ssrInterpolate(unref(total))}</span></p><button type="button" class="flex size-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-gold hover:text-gold-light" aria-label="Close gallery" data-v-39b17e2c>`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-x",
						class: "size-5",
						"aria-hidden": "true"
					}, null, _parent));
					_push(`</button></div><div class="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8" data-v-39b17e2c>`);
					if (unref(currentImage) && !isFailed(unref(activeIndex))) _push(ssrRenderComponent(_component_NuxtImg, {
						src: unref(currentImage),
						alt: `${__props.label} — illustrative photograph, image ${unref(activeIndex) + 1} of ${unref(total)}`,
						width: "1800",
						height: "1350",
						sizes: "xxl:100vw",
						class: "max-h-full max-w-full object-contain",
						onError: ($event) => markFailed(unref(activeIndex))
					}, null, _parent));
					else {
						_push(`<div class="flex flex-col items-center gap-3 text-white/40" data-v-39b17e2c>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-image-off",
							class: "size-10",
							"aria-hidden": "true"
						}, null, _parent));
						_push(`<p class="text-xs uppercase tracking-[0.14em]" data-v-39b17e2c>Image unavailable</p></div>`);
					}
					if (unref(total) > 1) {
						_push(`<button type="button" class="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-obsidian/50 text-white transition-colors hover:border-gold hover:text-gold-light sm:left-5" aria-label="Previous image" data-v-39b17e2c>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-chevron-left",
							class: "size-5",
							"aria-hidden": "true"
						}, null, _parent));
						_push(`</button>`);
					} else _push(`<!---->`);
					if (unref(total) > 1) {
						_push(`<button type="button" class="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-obsidian/50 text-white transition-colors hover:border-gold hover:text-gold-light sm:right-5" aria-label="Next image" data-v-39b17e2c>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-chevron-right",
							class: "size-5",
							"aria-hidden": "true"
						}, null, _parent));
						_push(`</button>`);
					} else _push(`<!---->`);
					_push(`</div>`);
					if (unref(total) > 1) {
						_push(`<div class="shrink-0 border-t border-white/10 px-4 py-3 sm:px-6" data-v-39b17e2c><div class="no-scrollbar flex justify-center gap-2 overflow-x-auto" data-v-39b17e2c><!--[-->`);
						ssrRenderList(unref(slides), (image, index) => {
							_push(`<button type="button" class="${ssrRenderClass([index === unref(activeIndex) ? "border-gold" : "border-white/15 hover:border-white/40", "relative size-16 shrink-0 overflow-hidden border transition-colors"])}"${ssrRenderAttr("aria-label", `Show image ${index + 1} of ${unref(total)}`)}${ssrRenderAttr("aria-current", index === unref(activeIndex) ? "true" : void 0)} data-v-39b17e2c>`);
							if (!isFailed(index)) _push(ssrRenderComponent(_component_NuxtImg, {
								src: image,
								alt: "",
								width: "160",
								height: "120",
								loading: "lazy",
								class: "size-full object-cover"
							}, null, _parent));
							else {
								_push(`<span class="flex size-full items-center justify-center bg-charcoal text-white/30" data-v-39b17e2c>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-image-off",
									class: "size-4",
									"aria-hidden": "true"
								}, null, _parent));
								_push(`</span>`);
							}
							_push(`</button>`);
						});
						_push(`<!--]--></div><p class="mt-2 text-center text-[9px] uppercase tracking-[0.14em] text-white/35" data-v-39b17e2c> Use the arrow keys to browse · Escape to close </p></div>`);
					} else _push(`<!---->`);
					_push(`</div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
			_push(`</div>`);
		};
	}
});
// app/components/vehicles/VehicleGallery.vue
var _sfc_setup$6 = VehicleGallery_vue_vue_type_script_setup_true_lang_default.setup;
VehicleGallery_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/vehicles/VehicleGallery.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var VehicleGallery_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(VehicleGallery_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-39b17e2c"]]), { __name: "VehicleGallery" });
// app/composables/useShare.ts
/**
* Native share sheet where available, clipboard fallback otherwise.
* No fake "shared" state: feedback is only shown after a real action.
*/
function useShare() {
	useToast();
	useRequestURL();
	const sharing = ref(false);
	async function shareVehicle(vehicle) {}
	return {
		shareVehicle,
		sharing
	};
}
// app/components/vehicles/VehicleEnquiryPanel.vue?vue&type=script&setup=true&lang.ts
var VehicleEnquiryPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VehicleEnquiryPanel",
	__ssrInlineRender: true,
	props: { vehicle: {} },
	setup(__props) {
		const props = __props;
		const { phoneHref } = useWhatsApp();
		const { sharing } = useShare();
		const testDriveUrl = computed(() => `/test-drive?vehicle=${encodeURIComponent(props.vehicle.slug)}`);
		const mileage = computed(() => formatMileage(props.vehicle.mileage));
		const isSold = computed(() => props.vehicle.status === "sold");
		const isReserved = computed(() => props.vehicle.status === "reserved");
		const statusTone = computed(() => {
			if (isSold.value) return "border-obsidian bg-obsidian text-white";
			if (isReserved.value) return "border-amber-300 bg-amber-50 text-amber-900";
			return "border-emerald-200 bg-emerald-50 text-emerald-900";
		});
		const quickFacts = computed(() => [
			{
				label: "Condition",
				value: conditionLabel(props.vehicle.condition)
			},
			props.vehicle.transmission ? {
				label: "Transmission",
				value: props.vehicle.transmission
			} : null,
			props.vehicle.fuelType ? {
				label: "Fuel",
				value: props.vehicle.fuelType
			} : null,
			mileage.value ? {
				label: "Mileage",
				value: mileage.value
			} : null
		].filter((item) => Boolean(item)));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_WhatsAppButton = WhatsAppButton_default;
			const _component_AppButton = AppButton_default;
			const _component_UIcon = resolveComponent("UIcon");
			_push(`<aside${ssrRenderAttrs(mergeProps({
				class: "border border-line bg-white",
				"aria-labelledby": "enquiry-panel-heading"
			}, _attrs))}><div class="border-b border-line p-5 sm:p-6"><div class="flex items-center justify-between gap-3"><p class="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">Listed price</p><span class="${ssrRenderClass([unref(statusTone), "border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em]"])}">${ssrInterpolate(unref(isSold) ? "Sold" : unref(isReserved) ? "Reserved" : "Available")}</span></div><p class="mt-3 font-display text-[2rem] font-medium tracking-tight text-ink">${ssrInterpolate(unref(formatNaira)(__props.vehicle.price))}</p><p class="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted">${ssrInterpolate(__props.vehicle.stockNumber)}</p><dl class="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line"><!--[-->`);
			ssrRenderList(unref(quickFacts), (fact) => {
				_push(`<div class="bg-white px-3 py-2.5"><dt class="text-[9px] uppercase tracking-[0.1em] text-muted">${ssrInterpolate(fact.label)}</dt><dd class="mt-1 text-[12px] font-medium text-ink">${ssrInterpolate(fact.value)}</dd></div>`);
			});
			_push(`<!--]--></dl><p class="${ssrRenderClass([unref(isSold) ? "border-muted text-muted" : unref(isReserved) ? "border-amber-500 text-amber-900" : "border-emerald-600 text-charcoal/70", "mt-4 border-l-2 pl-3 text-[11px] leading-relaxed"])}">${ssrInterpolate(unref(statusDescription)(__props.vehicle))}</p></div><div class="space-y-3 p-5 sm:p-6"><h2 id="enquiry-panel-heading" class="sr-only">Enquire about this vehicle</h2>`);
			_push(ssrRenderComponent(_component_WhatsAppButton, {
				vehicle: __props.vehicle,
				label: unref(isSold) ? "Ask about similar vehicles" : "Enquire on WhatsApp",
				variant: "gold",
				size: "lg",
				block: ""
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppButton, {
				href: unref(phoneHref),
				variant: "outline",
				size: "md",
				block: "",
				icon: "i-lucide-phone"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Call ${ssrInterpolate(unref(dealership).contact.phone.display)}`);
					else return [createTextVNode(" Call " + toDisplayString(unref(dealership).contact.phone.display), 1)];
				}),
				_: 1
			}, _parent));
			if (!unref(isSold)) _push(ssrRenderComponent(_component_AppButton, {
				to: unref(testDriveUrl),
				variant: "ghost",
				size: "md",
				block: "",
				"trailing-icon": "i-lucide-arrow-up-right"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Request a test drive `);
					else return [createTextVNode(" Request a test drive ")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`<button type="button" class="flex w-full items-center justify-center gap-2 border-t border-line pt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"${ssrIncludeBooleanAttr(unref(sharing)) ? " disabled" : ""}>`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: unref(sharing) ? "i-lucide-loader-circle" : "i-lucide-share-2",
				class: ["size-3.5", unref(sharing) ? "animate-spin" : ""],
				"aria-hidden": "true"
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(sharing) ? "Preparing link" : "Share this listing")}</button></div><div class="border-t border-line bg-ivory p-5 sm:p-6"><p class="text-[10px] leading-relaxed text-muted">${ssrInterpolate(unref(dealership).policies.priceNotice)}</p><p class="mt-2 text-[10px] leading-relaxed text-muted">${ssrInterpolate(unref(dealership).policies.demoInventoryNotice)}</p></div></aside>`);
		};
	}
});
// app/components/vehicles/VehicleEnquiryPanel.vue
var _sfc_setup$5 = VehicleEnquiryPanel_vue_vue_type_script_setup_true_lang_default.setup;
VehicleEnquiryPanel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/vehicles/VehicleEnquiryPanel.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var VehicleEnquiryPanel_default = Object.assign(VehicleEnquiryPanel_vue_vue_type_script_setup_true_lang_default, { __name: "VehicleEnquiryPanel" });
// app/components/vehicles/VehicleSpecifications.vue?vue&type=script&setup=true&lang.ts
var VehicleSpecifications_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VehicleSpecifications",
	__ssrInlineRender: true,
	props: { vehicle: {} },
	setup(__props) {
		const props = __props;
		const specs = computed(() => {
			const v = props.vehicle;
			return [
				{
					label: "Model year",
					value: String(v.year)
				},
				{
					label: "Condition",
					value: conditionLabel(v.condition)
				},
				v.mileage !== void 0 ? {
					label: "Mileage",
					value: formatMileage(v.mileage) ?? `${v.mileage} km`
				} : null,
				v.transmission ? {
					label: "Transmission",
					value: v.transmission
				} : null,
				v.fuelType ? {
					label: "Fuel type",
					value: v.fuelType
				} : null,
				v.drivetrain ? {
					label: "Drivetrain",
					value: v.drivetrain
				} : null,
				v.bodyType ? {
					label: "Body style",
					value: v.bodyType
				} : null,
				v.engine ? {
					label: "Engine",
					value: v.engine
				} : null,
				v.exteriorColor ? {
					label: "Exterior colour",
					value: v.exteriorColor
				} : null,
				v.interiorColor ? {
					label: "Interior",
					value: v.interiorColor
				} : null,
				v.seatingCapacity ? {
					label: "Seating capacity",
					value: `${v.seatingCapacity} seats`
				} : null,
				v.doors ? {
					label: "Doors",
					value: String(v.doors)
				} : null,
				{
					label: "Stock number",
					value: v.stockNumber
				}
			].filter((item) => Boolean(item));
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ "aria-labelledby": "specifications-heading" }, _attrs))}><div class="flex items-center justify-between gap-4 border-b border-line pb-4"><h2 id="specifications-heading" class="font-display text-2xl font-medium tracking-tight text-ink"> Specifications </h2><span class="text-[9px] uppercase tracking-[0.14em] text-muted">As listed</span></div><dl class="mt-5 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2"><!--[-->`);
			ssrRenderList(unref(specs), (item) => {
				_push(`<div class="flex items-baseline justify-between gap-4 bg-white px-4 py-3"><dt class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">${ssrInterpolate(item.label)}</dt><dd class="text-right text-[13px] font-medium text-ink">${ssrInterpolate(item.value)}</dd></div>`);
			});
			_push(`<!--]--></dl><p class="mt-3 text-[10px] leading-relaxed text-muted"> Specifications are demonstration data. Confirm the exact specification, condition and history with the dealership before purchase. </p></section>`);
		};
	}
});
// app/components/vehicles/VehicleSpecifications.vue
var _sfc_setup$4 = VehicleSpecifications_vue_vue_type_script_setup_true_lang_default.setup;
VehicleSpecifications_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/vehicles/VehicleSpecifications.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var VehicleSpecifications_default = Object.assign(VehicleSpecifications_vue_vue_type_script_setup_true_lang_default, { __name: "VehicleSpecifications" });
// app/components/vehicles/VehicleFeatures.vue?vue&type=script&setup=true&lang.ts
var VehicleFeatures_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VehicleFeatures",
	__ssrInlineRender: true,
	props: { features: {} },
	setup(__props) {
		const props = __props;
		const groups = [
			{
				key: "safety",
				label: "Safety",
				icon: "i-lucide-shield-check"
			},
			{
				key: "comfort",
				label: "Comfort & convenience",
				icon: "i-lucide-armchair"
			},
			{
				key: "interior",
				label: "Interior",
				icon: "i-lucide-layout-panel-left"
			},
			{
				key: "exterior",
				label: "Exterior",
				icon: "i-lucide-car-front"
			},
			{
				key: "infotainment",
				label: "Infotainment",
				icon: "i-lucide-monitor-speaker"
			},
			{
				key: "driverAssistance",
				label: "Driver assistance",
				icon: "i-lucide-scan-line"
			}
		];
		const visibleGroups = computed(() => groups.map((group) => ({
			...group,
			items: props.features[group.key] ?? []
		})).filter((group) => group.items.length > 0));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			if (unref(visibleGroups).length) {
				_push(`<section${ssrRenderAttrs(mergeProps({ "aria-labelledby": "features-heading" }, _attrs))}><div class="flex items-center justify-between gap-4 border-b border-line pb-4"><h2 id="features-heading" class="font-display text-2xl font-medium tracking-tight text-ink"> Features &amp; equipment </h2><span class="text-[9px] uppercase tracking-[0.14em] text-muted">Selected highlights</span></div><div class="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2"><!--[-->`);
				ssrRenderList(unref(visibleGroups), (group) => {
					_push(`<div><h3 class="flex items-center gap-2 font-display text-[13px] font-semibold tracking-tight text-ink">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: group.icon,
						class: "size-4 text-gold-dark",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(group.label)}</h3><ul class="mt-3 space-y-2 border-t border-line pt-3"><!--[-->`);
					ssrRenderList(group.items, (item) => {
						_push(`<li class="flex items-start gap-2 text-[12px] leading-relaxed text-charcoal/75"><span class="mt-[0.45rem] size-1 shrink-0 rounded-full bg-gold" aria-hidden="true"></span> ${ssrInterpolate(item)}</li>`);
					});
					_push(`<!--]--></ul></div>`);
				});
				_push(`<!--]--></div><p class="mt-6 text-[10px] leading-relaxed text-muted"> Equipment lists are illustrative and may vary from the delivered vehicle. Ask the team to confirm the features that matter to you. </p></section>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/vehicles/VehicleFeatures.vue
var _sfc_setup$3 = VehicleFeatures_vue_vue_type_script_setup_true_lang_default.setup;
VehicleFeatures_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/vehicles/VehicleFeatures.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var VehicleFeatures_default = Object.assign(VehicleFeatures_vue_vue_type_script_setup_true_lang_default, { __name: "VehicleFeatures" });
// app/components/vehicles/RelatedVehicles.vue?vue&type=script&setup=true&lang.ts
var RelatedVehicles_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RelatedVehicles",
	__ssrInlineRender: true,
	props: { vehicles: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppButton = AppButton_default;
			const _component_VehicleCard = VehicleCard_default;
			if (__props.vehicles.length) {
				_push(`<section${ssrRenderAttrs(mergeProps({
					class: "section-space border-t border-line bg-ivory",
					"aria-labelledby": "related-heading"
				}, _attrs))}><div class="shell"><div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p class="eyebrow text-gold-dark">Keep exploring</p><h2 id="related-heading" class="mt-4 font-display text-3xl font-medium tracking-tight text-ink"> Similar vehicles </h2></div>`);
				_push(ssrRenderComponent(_component_AppButton, {
					to: "/cars",
					variant: "outline",
					size: "md",
					"trailing-icon": "i-lucide-arrow-right"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Browse all cars `);
						else return [createTextVNode(" Browse all cars ")];
					}),
					_: 1
				}, _parent));
				_push(`</div><div class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
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
// app/components/vehicles/RelatedVehicles.vue
var _sfc_setup$2 = RelatedVehicles_vue_vue_type_script_setup_true_lang_default.setup;
RelatedVehicles_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/vehicles/RelatedVehicles.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var RelatedVehicles_default = Object.assign(RelatedVehicles_vue_vue_type_script_setup_true_lang_default, { __name: "RelatedVehicles" });
// app/composables/useRecentlyViewedVehicles.ts
var MAX_ITEMS = 6;
/**
* Stores recently viewed vehicle slugs only — never customer information.
* Reading happens after mount so SSR and hydration render identically.
*/
function useRecentlyViewedVehicles() {
	const slugs = ref([]);
	const hydrated = ref(false);
	function track(slug) {
		if (!slug) return;
		slugs.value = [slug, ...slugs.value.filter((item) => item !== slug)].slice(0, MAX_ITEMS);
	}
	function clear() {
		slugs.value = [];
	}
	return {
		slugs,
		hydrated,
		track,
		clear
	};
}
// app/components/vehicles/RecentlyViewedVehicles.vue?vue&type=script&setup=true&lang.ts
var RecentlyViewedVehicles_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RecentlyViewedVehicles",
	__ssrInlineRender: true,
	props: {
		vehicles: {},
		currentSlug: { default: "" }
	},
	setup(__props) {
		const props = __props;
		const { slugs, hydrated} = useRecentlyViewedVehicles();
		const recentlyViewed = computed(() => {
			if (!hydrated.value) return [];
			return slugs.value.filter((slug) => slug !== props.currentSlug).map((slug) => props.vehicles.find((vehicle) => vehicle.slug === slug)).filter((vehicle) => Boolean(vehicle)).slice(0, 3);
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_VehicleCard = VehicleCard_default;
			if (unref(recentlyViewed).length) {
				_push(`<section${ssrRenderAttrs(mergeProps({
					class: "section-space border-t border-line bg-white",
					"aria-labelledby": "recently-viewed-heading"
				}, _attrs))}><div class="shell"><div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p class="eyebrow text-gold-dark">On this device</p><h2 id="recently-viewed-heading" class="mt-4 font-display text-2xl font-medium tracking-tight text-ink"> Recently viewed </h2></div><button type="button" class="self-start text-[10px] font-semibold uppercase tracking-[0.1em] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline sm:self-auto"> Clear history </button></div><div class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList(unref(recentlyViewed), (vehicle) => {
					_push(ssrRenderComponent(_component_VehicleCard, {
						key: vehicle.id,
						vehicle
					}, null, _parent));
				});
				_push(`<!--]--></div><p class="mt-5 text-[10px] text-muted"> Stored only in this browser. No account or server record is created. </p></div></section>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/vehicles/RecentlyViewedVehicles.vue
var _sfc_setup$1 = RecentlyViewedVehicles_vue_vue_type_script_setup_true_lang_default.setup;
RecentlyViewedVehicles_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/vehicles/RecentlyViewedVehicles.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var RecentlyViewedVehicles_default = Object.assign(RecentlyViewedVehicles_vue_vue_type_script_setup_true_lang_default, { __name: "RecentlyViewedVehicles" });
// app/pages/cars/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const slugParam = useRoute$1().params.slug;
		const slug = Array.isArray(slugParam) ? slugParam[0] ?? "" : slugParam ?? "";
		const { data, error } = ([__temp, __restore] = withAsyncContext(() => useVehicle(slug)), __temp = await __temp, __restore(), __temp);
		function notFound() {
			throw createError$2({
				statusCode: 404,
				statusMessage: "Vehicle not found",
				message: "This vehicle listing could not be found. It may have been removed or the address may be incorrect.",
				fatal: true
			});
		}
		const car = data.value ?? notFound();
		if (error.value) notFound();
		const title = vehicleTitle(car);
		const image = car.images[0];
		const runtimeConfig = useRuntimeConfig();
		const siteUrl = String(runtimeConfig.public.siteUrl).replace(/\/$/, "");
		const seoDescription = `${title} — ${conditionLabel(car.condition).toLowerCase()} vehicle listed at ${formatNaira(car.price)} with ${car.stockNumber}. View specifications and enquire with Vantage Motors.`;
		useSeoMeta({
			title,
			description: seoDescription,
			ogType: "website",
			ogTitle: `${title} · ${dealership.name}`,
			ogDescription: seoDescription,
			ogImage: image ? `${siteUrl}${image}` : `${siteUrl}${dealership.seo.ogImage}`,
			ogImageAlt: `${title} — illustrative automotive photograph`,
			twitterCard: "summary_large_image",
			twitterTitle: `${title} · ${dealership.name}`,
			twitterDescription: seoDescription,
			twitterImage: image ? `${siteUrl}${image}` : `${siteUrl}${dealership.seo.ogImage}`
		});
		const { data: related } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`related-${car.slug}`, () => vehicleRepository.getRelated(car.slug, 3), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const { vehicles: inventoryVehicles } = useVehicles();
		useRecentlyViewedVehicles();
		const paragraphs = computed(() => car.description.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean));
		const mileage = computed(() => formatMileage(car.mileage));
		const headerMeta = computed(() => [
			String(car.year),
			conditionLabel(car.condition),
			car.bodyType,
			mileage.value
		].filter(Boolean).join(" · "));
		const statusTone = computed(() => {
			if (car.status === "sold") return "border-muted/30 bg-white text-charcoal";
			if (car.status === "reserved") return "border-amber-300 bg-amber-50 text-amber-900";
			return "border-emerald-200 bg-emerald-50 text-emerald-900";
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Breadcrumbs = Breadcrumbs_default;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_VehicleGallery = VehicleGallery_default;
			const _component_VehicleEnquiryPanel = VehicleEnquiryPanel_default;
			const _component_VehicleSpecifications = VehicleSpecifications_default;
			const _component_VehicleFeatures = VehicleFeatures_default;
			const _component_AppButton = AppButton_default;
			const _component_RelatedVehicles = RelatedVehicles_default;
			const _component_RecentlyViewedVehicles = RecentlyViewedVehicles_default;
			_push(`<div${ssrRenderAttrs(_attrs)}><div class="border-b border-line bg-ivory"><div class="shell py-5">`);
			_push(ssrRenderComponent(_component_Breadcrumbs, { items: [{
				label: "Cars",
				to: "/cars"
			}, { label: unref(vehicleTitle)(unref(car), { includeYear: false }) }] }, null, _parent));
			_push(`</div></div><section class="bg-ivory pb-12 pt-8 sm:pt-10" aria-labelledby="vehicle-heading"><div class="shell"><div class="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between"><div><div class="flex flex-wrap items-center gap-2"><span class="border border-gold bg-gold px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-obsidian">${ssrInterpolate(unref(conditionLabel)(unref(car).condition))}</span><span class="${ssrRenderClass([unref(statusTone), "border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"])}">${ssrInterpolate(unref(car).status === "available" ? "Available" : unref(car).status === "reserved" ? "Reserved" : "Sold")}</span><span class="text-[10px] uppercase tracking-[0.12em] text-muted">Stock ${ssrInterpolate(unref(car).stockNumber)}</span></div><h1 id="vehicle-heading" class="display-title mt-4 max-w-3xl text-[2.3rem] text-ink sm:text-5xl lg:text-[3.5rem]">${ssrInterpolate(unref(title))}</h1><p class="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">${ssrInterpolate(unref(headerMeta))}</p></div><div class="shrink-0 border-t border-line pt-4 lg:border-t-0 lg:pt-0 lg:text-right"><p class="text-[9px] uppercase tracking-[0.14em] text-muted">Listed price</p><p class="mt-1 font-display text-2xl font-medium tracking-tight text-ink">${ssrInterpolate(unref(formatNaira)(unref(car).price))}</p></div></div>`);
			if (unref(car).status !== "available") {
				_push(`<div class="${ssrRenderClass([unref(car).status === "sold" ? "border-muted bg-white" : "border-amber-500 bg-amber-50", "mt-6 border-l-2 p-4"])}"><p class="${ssrRenderClass([unref(car).status === "sold" ? "text-charcoal/70" : "text-amber-900", "flex items-start gap-3 text-[12px] leading-relaxed"])}">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: unref(car).status === "sold" ? "i-lucide-circle-slash" : "i-lucide-clock",
					class: "mt-0.5 size-4 shrink-0",
					"aria-hidden": "true"
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(statusDescription)(unref(car)))}</p></div>`);
			} else _push(`<!---->`);
			_push(`<div class="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10"><div class="min-w-0 lg:col-span-7">`);
			_push(ssrRenderComponent(_component_VehicleGallery, {
				images: unref(car).images,
				label: unref(title),
				status: unref(car).status
			}, null, _parent));
			_push(`</div><div class="lg:col-span-5"><div class="lg:sticky lg:top-24">`);
			_push(ssrRenderComponent(_component_VehicleEnquiryPanel, { vehicle: unref(car) }, null, _parent));
			_push(`</div></div><div class="min-w-0 space-y-12 lg:col-span-7"><section aria-labelledby="overview-heading" class="border-t border-line pt-8"><div class="flex items-center justify-between gap-4"><h2 id="overview-heading" class="font-display text-2xl font-medium tracking-tight text-ink">Overview</h2><span class="text-[9px] uppercase tracking-[0.14em] text-muted">Vehicle notes</span></div><div class="prose-editorial mt-5"><!--[-->`);
			ssrRenderList(unref(paragraphs), (paragraph, index) => {
				_push(`<p>${ssrInterpolate(paragraph)}</p>`);
			});
			_push(`<!--]--></div></section>`);
			_push(ssrRenderComponent(_component_VehicleSpecifications, { vehicle: unref(car) }, null, _parent));
			_push(ssrRenderComponent(_component_VehicleFeatures, { features: unref(car).features }, null, _parent));
			_push(`<div class="border border-line bg-white p-5"><p class="flex items-start gap-2 text-[11px] leading-relaxed text-charcoal/70">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-info",
				class: "mt-0.5 size-3.5 shrink-0 text-gold-dark",
				"aria-hidden": "true"
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(dealership).policies.availabilityNotice)}</p><p class="mt-2 flex items-start gap-2 text-[11px] leading-relaxed text-charcoal/70">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-image-off",
				class: "mt-0.5 size-3.5 shrink-0 text-gold-dark",
				"aria-hidden": "true"
			}, null, _parent));
			_push(` Photography is illustrative stock imagery and does not show the specific vehicle described. </p></div><div class="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">`);
			_push(ssrRenderComponent(_component_AppButton, {
				to: "/cars",
				variant: "outline",
				size: "md",
				icon: "i-lucide-arrow-left"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Back to inventory `);
					else return [createTextVNode(" Back to inventory ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_AppButton, {
				to: "/contact",
				variant: "ghost",
				size: "md",
				"trailing-icon": "i-lucide-arrow-right"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Ask a general question `);
					else return [createTextVNode(" Ask a general question ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></div></section>`);
			_push(ssrRenderComponent(_component_RelatedVehicles, { vehicles: unref(related) }, null, _parent));
			_push(ssrRenderComponent(_component_RecentlyViewedVehicles, {
				vehicles: unref(inventoryVehicles),
				"current-slug": unref(car).slug
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/cars/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cars/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-nFrZSWmw.mjs.map
