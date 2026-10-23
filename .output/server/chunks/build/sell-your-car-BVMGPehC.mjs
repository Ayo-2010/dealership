import { d as dealership, a as useSeoMeta, W as WhatsAppButton_default, A as AppButton_default, p as parsePriceInput, f as formatNaira } from '../virtual/entry.mjs';
import { P as PageHeader_default } from './PageHeader-NdL0o5jz.mjs';
import { u as useDemoEnquiry, E as EnquiryResultPanel_default } from './useDemoEnquiry-BkazzJSu.mjs';
import { defineComponent, computed, resolveComponent, withCtx, createTextVNode, createVNode, unref, ref, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
import './useToast-CFIXcbF3.mjs';

// app/components/forms/SellVehicleForm.vue?vue&type=script&setup=true&lang.ts
var SellVehicleForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SellVehicleForm",
	__ssrInlineRender: true,
	setup(__props) {
		const { submitting, result, submitError, reset } = useDemoEnquiry();
		const fullName = ref("");
		const phone = ref("");
		const email = ref("");
		const make = ref("");
		const model = ref("");
		const year = ref("");
		const mileage = ref("");
		const condition = ref("");
		const expectedPrice = ref("");
		const details = ref("");
		const errors = ref({});
		const conditionOptions = [
			{
				label: "Excellent — well maintained, no known issues",
				value: "excellent"
			},
			{
				label: "Good — used regularly, minor wear",
				value: "good"
			},
			{
				label: "Fair — visible wear or repairs needed",
				value: "fair"
			},
			{
				label: "Needs work — significant repairs required",
				value: "needs-work"
			}
		];
		const yearCeiling = (/* @__PURE__ */ new Date()).getFullYear() + 1;
		function prepareAnother() {
			reset();
			nextTick(() => (void 0).getElementById("sell-full-name")?.focus());
		}
		const pricePreview = computed(() => {
			const value = parsePriceInput(expectedPrice.value);
			return value !== void 0 ? formatNaira(value) : "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_EnquiryResultPanel = EnquiryResultPanel_default;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_AppButton = AppButton_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			if (unref(result)) _push(ssrRenderComponent(_component_EnquiryResultPanel, {
				result: unref(result),
				title: "Your vehicle details are ready",
				onReset: prepareAnother
			}, null, _parent));
			else {
				_push(`<form class="border border-line bg-white p-5 sm:p-7" novalidate aria-labelledby="sell-form-heading"><div class="border-b border-line pb-5"><p class="eyebrow text-gold-dark">Sell or trade in</p><h2 id="sell-form-heading" class="mt-4 font-display text-2xl font-medium tracking-tight text-ink"> Tell us about your car. </h2><p class="mt-2 text-[12px] leading-relaxed text-muted"> Share the basics and the team can review whether a purchase or trade-in arrangement is possible. This is an enquiry, not an offer. </p></div>`);
				if (Object.keys(unref(errors)).length) {
					_push(`<div class="mt-5 border border-red-200 bg-red-50 p-3" role="alert"><p class="flex items-start gap-2 text-[12px] font-medium text-red-800">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-0.5 size-4 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` Please check the highlighted fields below. </p></div>`);
				} else _push(`<!---->`);
				_push(`<fieldset class="mt-6"><legend class="font-display text-[13px] font-semibold tracking-tight text-ink">Your details</legend><div class="mt-4 grid gap-5 sm:grid-cols-2"><div><label for="sell-full-name" class="form-label">Full name <span class="text-gold-dark">*</span></label><input id="sell-full-name"${ssrRenderAttr("value", unref(fullName))} type="text" class="form-input" autocomplete="name" placeholder="Your full name"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).fullName))}${ssrRenderAttr("aria-describedby", unref(errors).fullName ? "sell-full-name-error" : void 0)}>`);
				if (unref(errors).fullName) {
					_push(`<p id="sell-full-name-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).fullName)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div><label for="sell-phone" class="form-label">Phone number <span class="text-gold-dark">*</span></label><input id="sell-phone"${ssrRenderAttr("value", unref(phone))} type="tel" class="form-input" autocomplete="tel" inputmode="tel" placeholder="0801 234 5678"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).phone))}${ssrRenderAttr("aria-describedby", unref(errors).phone ? "sell-phone-error" : void 0)}>`);
				if (unref(errors).phone) {
					_push(`<p id="sell-phone-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).phone)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div class="sm:col-span-2"><label for="sell-email" class="form-label">Email <span class="normal-case tracking-normal text-muted">(optional)</span></label><input id="sell-email"${ssrRenderAttr("value", unref(email))} type="email" class="form-input" autocomplete="email" placeholder="you@example.com"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).email))}${ssrRenderAttr("aria-describedby", unref(errors).email ? "sell-email-error" : void 0)}>`);
				if (unref(errors).email) {
					_push(`<p id="sell-email-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).email)}</p>`);
				} else _push(`<!---->`);
				_push(`</div></div></fieldset><fieldset class="mt-8 border-t border-line pt-6"><legend class="font-display text-[13px] font-semibold tracking-tight text-ink">Vehicle details</legend><div class="mt-4 grid gap-5 sm:grid-cols-2"><div><label for="sell-make" class="form-label">Make <span class="text-gold-dark">*</span></label><input id="sell-make"${ssrRenderAttr("value", unref(make))} type="text" class="form-input" autocomplete="off" placeholder="e.g. Toyota"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).make))}${ssrRenderAttr("aria-describedby", unref(errors).make ? "sell-make-error" : void 0)}>`);
				if (unref(errors).make) {
					_push(`<p id="sell-make-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).make)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div><label for="sell-model" class="form-label">Model <span class="text-gold-dark">*</span></label><input id="sell-model"${ssrRenderAttr("value", unref(model))} type="text" class="form-input" autocomplete="off" placeholder="e.g. Camry"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).model))}${ssrRenderAttr("aria-describedby", unref(errors).model ? "sell-model-error" : void 0)}>`);
				if (unref(errors).model) {
					_push(`<p id="sell-model-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).model)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div><label for="sell-year" class="form-label">Model year <span class="text-gold-dark">*</span></label><input id="sell-year"${ssrRenderAttr("value", unref(year))} type="number" inputmode="numeric" min="1950"${ssrRenderAttr("max", yearCeiling)} class="form-input" placeholder="2019"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).year))}${ssrRenderAttr("aria-describedby", unref(errors).year ? "sell-year-error" : void 0)}>`);
				if (unref(errors).year) {
					_push(`<p id="sell-year-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).year)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div><label for="sell-mileage" class="form-label">Mileage (km) <span class="text-gold-dark">*</span></label><input id="sell-mileage"${ssrRenderAttr("value", unref(mileage))} type="text" inputmode="numeric" class="form-input" placeholder="45,000" autocomplete="off"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).mileage))}${ssrRenderAttr("aria-describedby", unref(errors).mileage ? "sell-mileage-error" : "sell-mileage-hint")}>`);
				if (unref(errors).mileage) {
					_push(`<p id="sell-mileage-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).mileage)}</p>`);
				} else _push(`<p id="sell-mileage-hint" class="form-hint">Use kilometres, not miles.</p>`);
				_push(`</div><div class="sm:col-span-2"><label for="sell-condition" class="form-label">Condition <span class="text-gold-dark">*</span></label><select id="sell-condition" class="form-select"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).condition))}${ssrRenderAttr("aria-describedby", unref(errors).condition ? "sell-condition-error" : void 0)}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(condition)) ? ssrLooseContain(unref(condition), "") : ssrLooseEqual(unref(condition), "")) ? " selected" : ""}>Select a condition</option><!--[-->`);
				ssrRenderList(conditionOptions, (option) => {
					_push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(condition)) ? ssrLooseContain(unref(condition), option.value) : ssrLooseEqual(unref(condition), option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
				});
				_push(`<!--]--></select>`);
				if (unref(errors).condition) {
					_push(`<p id="sell-condition-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).condition)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div><label for="sell-expectedPrice" class="form-label">Expected price <span class="normal-case tracking-normal text-muted">(optional)</span></label><input id="sell-expectedPrice"${ssrRenderAttr("value", unref(expectedPrice))} type="text" inputmode="numeric" class="form-input" placeholder="15,000,000" autocomplete="off"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).expectedPrice))}${ssrRenderAttr("aria-describedby", unref(errors).expectedPrice ? "sell-expectedPrice-error" : "sell-expectedPrice-hint")}>`);
				if (unref(errors).expectedPrice) {
					_push(`<p id="sell-expectedPrice-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).expectedPrice)}</p>`);
				} else _push(`<p id="sell-expectedPrice-hint" class="form-hint">${ssrInterpolate(unref(pricePreview) ? `Preview: ${unref(pricePreview)}` : "An indication, not a valuation.")}</p>`);
				_push(`</div><div class="sm:col-span-2"><label for="sell-details" class="form-label">Additional details <span class="normal-case tracking-normal text-muted">(optional)</span></label><textarea id="sell-details" class="form-textarea" rows="4" placeholder="Service history, known faults, specification, or anything else the team should know.">${ssrInterpolate(unref(details))}</textarea></div></div></fieldset>`);
				if (unref(submitError)) {
					_push(`<p class="form-error mt-4" role="alert">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(submitError))}</p>`);
				} else _push(`<!---->`);
				_push(`<div class="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between"><p class="max-w-sm text-[10px] leading-relaxed text-muted"> Preparing this enquiry does not create an offer, valuation or agreement. Nothing is sent or stored automatically. </p>`);
				_push(ssrRenderComponent(_component_AppButton, {
					type: "submit",
					variant: "dark",
					size: "lg",
					loading: unref(submitting),
					"trailing-icon": "i-lucide-arrow-right"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Prepare vehicle details `);
						else return [createTextVNode(" Prepare vehicle details ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></form>`);
			}
			_push(`</div>`);
		};
	}
});
// app/components/forms/SellVehicleForm.vue
var _sfc_setup$1 = SellVehicleForm_vue_vue_type_script_setup_true_lang_default.setup;
SellVehicleForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/SellVehicleForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var SellVehicleForm_default = Object.assign(SellVehicleForm_vue_vue_type_script_setup_true_lang_default, { __name: "SellVehicleForm" });
// app/pages/sell-your-car.vue?vue&type=script&setup=true&lang.ts
var sell_your_car_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "sell-your-car",
	__ssrInlineRender: true,
	setup(__props) {
		const tradeInEnabled = computed(() => dealership.isServiceEnabled("trade-in"));
		const steps = [
			{
				number: "01",
				title: "Share the basics",
				description: "Tell us the make, model, year, mileage and condition. Add any service history or known faults."
			},
			{
				number: "02",
				title: "The team reviews the details",
				description: "The dealership can assess whether a purchase or trade-in arrangement is worth exploring. No offer is created automatically."
			},
			{
				number: "03",
				title: "A direct conversation",
				description: "If there is a possible next step, the team contacts you to discuss an inspection, valuation and any documentation."
			}
		];
		const checklist = [
			"Model year, make, model and trim",
			"Current mileage in kilometres",
			"Condition and any known faults",
			"Service history or recent repairs, if available",
			"Your expected price, if you have one in mind",
			"Any outstanding finance or documentation questions"
		];
		useSeoMeta({
			title: "Sell or trade in your car",
			description: "Tell Vantage Motors about your current vehicle. Prepare a sale or trade-in enquiry with its make, model, year, mileage and condition. An enquiry is not an offer.",
			ogTitle: "Sell or trade in your car · Vantage Motors",
			ogDescription: "Share your vehicle details and prepare a sale or trade-in enquiry. No offer is created automatically."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHeader = PageHeader_default;
			const _component_WhatsAppButton = WhatsAppButton_default;
			const _component_AppButton = AppButton_default;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_SellVehicleForm = SellVehicleForm_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHeader, {
				title: "Sell or trade in your car.",
				eyebrow: "Your current vehicle",
				description: "Share the details of your car and prepare an enquiry for the team. This is a conversation starter, not an instant valuation or a guaranteed offer.",
				crumbs: [{ label: "Sell your car" }],
				image: "/images/showroom/showroom-1.jpg",
				"image-alt": "Illustrative showroom with cars on display"
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_WhatsAppButton, {
							label: "Ask about selling",
							variant: "gold",
							size: "lg"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_AppButton, {
							to: "/cars",
							variant: "light-outline",
							size: "lg"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Browse inventory`);
								else return [createTextVNode("Browse inventory")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_WhatsAppButton, {
						label: "Ask about selling",
						variant: "gold",
						size: "lg"
					}), createVNode(_component_AppButton, {
						to: "/cars",
						variant: "light-outline",
						size: "lg"
					}, {
						default: withCtx(() => [createTextVNode("Browse inventory")]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`<section class="section-space bg-ivory" aria-labelledby="sell-heading"><div class="shell grid gap-10 lg:grid-cols-12 lg:gap-12"><div class="lg:col-span-5"><p class="eyebrow text-gold-dark">How it works</p><h2 id="sell-heading" class="section-title mt-4"> A straightforward first step. </h2><p class="mt-4 max-w-lg text-[13px] leading-relaxed text-muted"> A website form cannot value a car properly. What it can do is give the team enough information to decide whether a conversation is worthwhile. </p><ol class="mt-8 border-y border-line"><!--[-->`);
			ssrRenderList(steps, (step) => {
				_push(`<li class="flex gap-4 border-b border-line py-5 last:border-b-0"><span class="font-display text-[10px] tracking-[0.16em] text-gold-dark">${ssrInterpolate(step.number)}</span><div><h3 class="font-display text-sm font-medium tracking-tight text-ink">${ssrInterpolate(step.title)}</h3><p class="mt-1.5 text-[11px] leading-relaxed text-muted">${ssrInterpolate(step.description)}</p></div></li>`);
			});
			_push(`<!--]--></ol><div class="mt-6 border border-line bg-white p-5"><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Useful details</p><ul class="mt-3 space-y-2"><!--[-->`);
			ssrRenderList(checklist, (item) => {
				_push(`<li class="flex items-start gap-2 text-[11px] leading-relaxed text-charcoal/70">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-check",
					class: "mt-0.5 size-3.5 shrink-0 text-gold-dark",
					"aria-hidden": "true"
				}, null, _parent));
				_push(` ${ssrInterpolate(item)}</li>`);
			});
			_push(`<!--]--></ul></div><p class="mt-5 border-l-2 border-gold pl-3 text-[11px] leading-relaxed text-muted"> No offer, valuation or acceptance is created by preparing or sending this enquiry. Any arrangement must be discussed and confirmed directly with the dealership. </p></div><div class="lg:col-span-7">`);
			if (unref(tradeInEnabled)) _push(ssrRenderComponent(_component_SellVehicleForm, null, null, _parent));
			else {
				_push(`<div class="border border-line bg-white p-6"><p class="font-display text-lg font-medium text-ink">Trade-in enquiries are currently unavailable.</p><p class="mt-2 text-[12px] leading-relaxed text-muted">Contact the team directly to discuss selling your vehicle.</p>`);
				_push(ssrRenderComponent(_component_AppButton, {
					to: "/contact",
					variant: "dark",
					size: "md",
					class: "mt-4"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Contact the team`);
						else return [createTextVNode("Contact the team")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			}
			_push(`</div></div></section></div>`);
		};
	}
});
// app/pages/sell-your-car.vue
var _sfc_setup = sell_your_car_vue_vue_type_script_setup_true_lang_default.setup;
sell_your_car_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sell-your-car.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var sell_your_car_default = sell_your_car_vue_vue_type_script_setup_true_lang_default;

export { sell_your_car_default as default };
//# sourceMappingURL=sell-your-car-BVMGPehC.mjs.map
