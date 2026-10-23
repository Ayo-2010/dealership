import { d as dealership, A as AppButton_default } from '../virtual/entry.mjs';
import { defineComponent, computed, resolveComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';

// app/components/home/DealershipAdvantages.vue?vue&type=script&setup=true&lang.ts
var DealershipAdvantages_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DealershipAdvantages",
	__ssrInlineRender: true,
	setup(__props) {
		const iconMap = {
			"curated-selection": "i-lucide-gem",
			"transparent-pricing": "i-lucide-badge-naira",
			"responsive-enquiries": "i-lucide-messages-square",
			documentation: "i-lucide-file-check",
			"trade-in": "i-lucide-repeat",
			financing: "i-lucide-landmark",
			delivery: "i-lucide-truck",
			warranty: "i-lucide-shield-check",
			insurance: "i-lucide-umbrella"
		};
		const advantageKeys = [
			"curated-selection",
			"transparent-pricing",
			"responsive-enquiries",
			"documentation"
		];
		const advantages = computed(() => advantageKeys.map((key) => dealership.services.find((service) => service.key === key)).filter((service) => Boolean(service?.enabled)));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "border-y border-white/10 bg-charcoal py-14 md:py-20",
				"aria-labelledby": "advantages-heading"
			}, _attrs))}><div class="shell"><div class="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16"><div><p class="eyebrow text-gold-light">Why Vantage</p><h2 id="advantages-heading" class="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-ivory md:text-[2.5rem]"> A calmer, clearer way to choose. </h2><p class="mt-4 max-w-sm text-[13px] leading-relaxed text-white/50"> No pressure tactics, no invented badges. Just a focused inventory and a team you can speak to directly. </p></div><ul class="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2"><!--[-->`);
			ssrRenderList(unref(advantages), (service, index) => {
				_push(`<li class="flex flex-col bg-charcoal p-6 md:p-7"><div class="flex items-center justify-between">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: iconMap[service.key],
					class: "size-5 text-gold",
					"aria-hidden": "true"
				}, null, _parent));
				_push(`<span class="font-display text-[10px] tracking-[0.16em] text-white/25">${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span></div><h3 class="mt-5 font-display text-[15px] font-medium tracking-tight text-ivory">${ssrInterpolate(service.label)}</h3><p class="mt-2 text-[12px] leading-relaxed text-white/45">${ssrInterpolate(service.description)}</p></li>`);
			});
			_push(`<!--]--></ul></div></div></section>`);
		};
	}
});
// app/components/home/DealershipAdvantages.vue
var _sfc_setup$1 = DealershipAdvantages_vue_vue_type_script_setup_true_lang_default.setup;
DealershipAdvantages_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/DealershipAdvantages.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var DealershipAdvantages_default = Object.assign(DealershipAdvantages_vue_vue_type_script_setup_true_lang_default, { __name: "DealershipAdvantages" });
// app/components/home/FinalCta.vue?vue&type=script&setup=true&lang.ts
var FinalCta_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FinalCta",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppButton = AppButton_default;
			const _component_UIcon = resolveComponent("UIcon");
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "bg-ivory pb-16 pt-6 md:pb-20",
				"aria-labelledby": "final-cta-heading"
			}, _attrs))}><div class="shell"><div class="relative isolate overflow-hidden bg-charcoal px-6 py-14 sm:px-10 md:py-20 lg:px-16"><img${ssrRenderAttr("src", unref(dealership).logo.mark)} alt="" width="320" height="320" class="pointer-events-none absolute -bottom-12 -right-8 w-64 opacity-[0.07] md:w-80" aria-hidden="true"><div class="relative max-w-2xl"><p class="eyebrow text-gold-light">Next step</p><h2 id="final-cta-heading" class="display-title mt-5 text-4xl text-ivory sm:text-5xl md:text-[3.6rem]"> Find the car.<br> Then ask us anything. </h2><p class="mt-5 max-w-lg text-sm leading-relaxed text-white/55"> Browse the available inventory or speak directly with the team. We will confirm availability, specification and the next steps with you. </p><div class="mt-8 flex flex-col gap-3 sm:flex-row">`);
			_push(ssrRenderComponent(_component_AppButton, {
				to: "/cars",
				variant: "gold",
				size: "lg",
				"trailing-icon": "i-lucide-arrow-right"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Browse inventory `);
					else return [createTextVNode(" Browse inventory ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_AppButton, {
				to: "/contact",
				variant: "light-outline",
				size: "lg"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Contact the team `);
					else return [createTextVNode(" Contact the team ")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] text-white/45"><a${ssrRenderAttr("href", `tel:${unref(dealership).contact.phone.e164}`)} class="flex items-center gap-2 transition-colors hover:text-white">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-phone",
				class: "size-3.5 text-gold",
				"aria-hidden": "true"
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(dealership).contact.phone.display)}</a><a${ssrRenderAttr("href", `mailto:${unref(dealership).contact.email}`)} class="flex items-center gap-2 break-all transition-colors hover:text-white">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-mail",
				class: "size-3.5 text-gold",
				"aria-hidden": "true"
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(dealership).contact.email)}</a><span class="flex items-center gap-2">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-map-pin",
				class: "size-3.5 text-gold",
				"aria-hidden": "true"
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(dealership).address.area)}, ${ssrInterpolate(unref(dealership).address.city)}</span></div></div></div></div></section>`);
		};
	}
});
// app/components/home/FinalCta.vue
var _sfc_setup = FinalCta_vue_vue_type_script_setup_true_lang_default.setup;
FinalCta_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/FinalCta.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var FinalCta_default = Object.assign(FinalCta_vue_vue_type_script_setup_true_lang_default, { __name: "FinalCta" });

export { DealershipAdvantages_default as D, FinalCta_default as F };
//# sourceMappingURL=FinalCta-CGMGqenw.mjs.map
