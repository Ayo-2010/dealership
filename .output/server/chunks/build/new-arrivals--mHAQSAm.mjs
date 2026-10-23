import { l as formatDate, a as useSeoMeta, A as AppButton_default } from '../virtual/entry.mjs';
import { P as PageHeader_default } from './PageHeader-NdL0o5jz.mjs';
import { a as useVehicles } from './useVehicles-DCwHuUps.mjs';
import { V as VehicleCard_default } from './VehicleCard-Tc4SfC6h.mjs';
import { L as LoadingState_default } from './LoadingState-UQOo5w2K.mjs';
import { E as EmptyState_default } from './EmptyState-JnGm6qtZ.mjs';
import { defineComponent, computed, withCtx, createTextVNode, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

// app/pages/new-arrivals.vue?vue&type=script&setup=true&lang.ts
var new_arrivals_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "new-arrivals",
	__ssrInlineRender: true,
	setup(__props) {
		const { vehicles, pending, error, refresh } = useVehicles();
		const latest = computed(() => [...vehicles.value].filter((vehicle) => vehicle.status !== "sold").sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 9));
		const latestDate = computed(() => latest.value[0] ? formatDate(latest.value[0].createdAt) : "");
		useSeoMeta({
			title: "New arrivals",
			description: "The latest vehicles added to the Vantage Motors collection, with listed prices, condition and key specifications. New and pre-owned cars in Nigeria.",
			ogTitle: "New arrivals · Vantage Motors",
			ogDescription: "The latest vehicles added to the collection, with transparent naira pricing and direct enquiries."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHeader = PageHeader_default;
			const _component_AppButton = AppButton_default;
			const _component_LoadingState = LoadingState_default;
			const _component_VehicleCard = VehicleCard_default;
			const _component_EmptyState = EmptyState_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHeader, {
				title: "New to the collection.",
				eyebrow: "Recently listed",
				description: "The latest vehicles published to the website. Listing dates show when a vehicle was added online — not a claim about when it physically arrived in the showroom.",
				crumbs: [{ label: "New arrivals" }],
				image: "/images/showroom/showroom-1.jpg",
				"image-alt": "Illustrative modern car showroom with vehicles on display"
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_AppButton, {
							to: "/cars?sort=newest",
							variant: "gold",
							size: "lg",
							"trailing-icon": "i-lucide-arrow-right"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Browse newest first `);
								else return [createTextVNode(" Browse newest first ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_AppButton, {
							to: "/cars",
							variant: "light-outline",
							size: "lg"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` View full inventory `);
								else return [createTextVNode(" View full inventory ")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_AppButton, {
						to: "/cars?sort=newest",
						variant: "gold",
						size: "lg",
						"trailing-icon": "i-lucide-arrow-right"
					}, {
						default: withCtx(() => [createTextVNode(" Browse newest first ")]),
						_: 1
					}), createVNode(_component_AppButton, {
						to: "/cars",
						variant: "light-outline",
						size: "lg"
					}, {
						default: withCtx(() => [createTextVNode(" View full inventory ")]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`<section class="section-space bg-ivory" aria-labelledby="latest-heading"><div class="shell"><div class="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p class="eyebrow text-gold-dark">Latest listings</p><h2 id="latest-heading" class="mt-4 font-display text-3xl font-medium tracking-tight text-ink"> Freshly added. </h2></div>`);
			if (unref(latestDate)) _push(`<p class="text-[11px] text-muted"> Most recent listing: <span class="font-semibold text-ink">${ssrInterpolate(unref(latestDate))}</span></p>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (unref(error)) {
				_push(`<div class="mt-8 border border-red-200 bg-red-50 p-6" role="alert"><p class="font-display text-lg text-ink">New arrivals could not be loaded.</p><p class="mt-2 text-sm text-charcoal/70">Please refresh the page or try again.</p>`);
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
			} else if (unref(pending) && !unref(vehicles).length) _push(ssrRenderComponent(_component_LoadingState, {
				class: "mt-8",
				count: 6
			}, null, _parent));
			else if (unref(latest).length) {
				_push(`<div class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList(unref(latest), (vehicle, index) => {
					_push(ssrRenderComponent(_component_VehicleCard, {
						key: vehicle.id,
						vehicle,
						eager: index < 3,
						"show-listed-date": ""
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-8",
				title: "No new arrivals yet",
				description: "New listings will appear here as they are published. Browse the full inventory in the meantime.",
				icon: "i-lucide-calendar-clock"
			}, null, _parent));
			_push(`<div class="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"><p class="max-w-xl text-[10px] leading-relaxed text-muted"> Demonstration inventory. Listing dates are sample data, and photography is illustrative rather than a photograph of the specific vehicle. </p>`);
			_push(ssrRenderComponent(_component_AppButton, {
				to: "/cars",
				variant: "outline",
				size: "md",
				"trailing-icon": "i-lucide-arrow-right"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` See all available cars `);
					else return [createTextVNode(" See all available cars ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></section></div>`);
		};
	}
});
// app/pages/new-arrivals.vue
var _sfc_setup = new_arrivals_vue_vue_type_script_setup_true_lang_default.setup;
new_arrivals_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/new-arrivals.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var new_arrivals_default = new_arrivals_vue_vue_type_script_setup_true_lang_default;

export { new_arrivals_default as default };
//# sourceMappingURL=new-arrivals--mHAQSAm.mjs.map
