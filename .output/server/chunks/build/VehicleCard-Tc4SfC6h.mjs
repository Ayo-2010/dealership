import { q as vehicleShortTitle, v as vehicleTitle, e as formatMileage, f as formatNaira, c as conditionLabel, r as statusLabel, N as NuxtLink, l as formatDate, A as AppButton_default, W as WhatsAppButton_default } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './NuxtImg-jexAG5NB.mjs';
import { defineComponent, ref, computed, resolveComponent, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';

// app/components/vehicles/VehicleCard.vue?vue&type=script&setup=true&lang.ts
var VehicleCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VehicleCard",
	__ssrInlineRender: true,
	props: {
		vehicle: {},
		variant: { default: "default" },
		eager: {
			type: Boolean,
			default: false
		},
		showListedDate: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const imageFailed = ref(false);
		const title = computed(() => vehicleShortTitle(props.vehicle));
		const fullTitle = computed(() => vehicleTitle(props.vehicle));
		const mileage = computed(() => formatMileage(props.vehicle.mileage));
		const price = computed(() => formatNaira(props.vehicle.price));
		const condition = computed(() => conditionLabel(props.vehicle.condition));
		const status = computed(() => statusLabel(props.vehicle.status));
		const detailLink = computed(() => `/cars/${props.vehicle.slug}`);
		const specItems = computed(() => {
			return [
				{
					icon: "i-lucide-gauge",
					label: mileage.value
				},
				{
					icon: "i-lucide-cog",
					label: props.vehicle.transmission
				},
				{
					icon: "i-lucide-fuel",
					label: props.vehicle.fuelType
				}
			].filter((item) => Boolean(item.label));
		});
		const statusDotClass = computed(() => {
			switch (props.vehicle.status) {
				case "reserved": return "bg-amber-500";
				case "sold": return "bg-muted";
				default: return "bg-emerald-600";
			}
		});
		const imageAlt = computed(() => `${fullTitle.value} — illustrative automotive photograph (${condition.value.toLowerCase()} vehicle demonstration listing)`);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_NuxtImg = _sfc_main;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_AppButton = AppButton_default;
			const _component_WhatsAppButton = WhatsAppButton_default;
			_push(`<article${ssrRenderAttrs(mergeProps({ class: ["group surface-card flex h-full flex-col overflow-hidden", __props.variant === "compact" ? "sm:flex-row" : ""] }, _attrs))}>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(detailLink),
				class: ["relative block shrink-0 overflow-hidden bg-line focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold", __props.variant === "compact" ? "aspect-[4/3] sm:aspect-auto sm:min-h-[13rem] sm:w-[42%]" : "aspect-[4/3]"],
				"aria-label": `View details for the ${unref(fullTitle)}`
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (!unref(imageFailed)) _push(ssrRenderComponent(_component_NuxtImg, {
							src: __props.vehicle.images[0],
							alt: unref(imageAlt),
							width: "800",
							height: "600",
							loading: __props.eager ? "eager" : "lazy",
							fetchpriority: __props.eager ? "high" : "auto",
							sizes: "sm:100vw xxl:33vw",
							class: "absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]",
							onError: ($event) => imageFailed.value = true
						}, null, _parent, _scopeId));
						else {
							_push(`<div class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-charcoal text-white/40" role="img"${ssrRenderAttr("aria-label", `Image unavailable for the ${unref(fullTitle)}`)}${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-car-front",
								class: "size-8",
								"aria-hidden": "true"
							}, null, _parent, _scopeId));
							_push(`<span class="text-[10px] uppercase tracking-[0.16em]"${_scopeId}>Image unavailable</span></div>`);
						}
						_push(`<div class="absolute left-3 top-3 flex flex-wrap items-center gap-2"${_scopeId}><span class="${ssrRenderClass([__props.vehicle.condition === "new" ? "border-gold bg-gold text-obsidian" : "border-white/60 bg-white/95 text-ink", "border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"])}"${_scopeId}>${ssrInterpolate(unref(condition))}</span>`);
						if (__props.vehicle.status !== "available") _push(`<span class="${ssrRenderClass([__props.vehicle.status === "sold" ? "border-obsidian bg-obsidian text-white" : "border-amber-300 bg-amber-50 text-amber-900", "border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"])}"${_scopeId}>${ssrInterpolate(unref(status))}</span>`);
						else _push(`<!---->`);
						_push(`</div><div class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-obsidian/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"${_scopeId}></div>`);
					} else return [
						!unref(imageFailed) ? (openBlock(), createBlock(_component_NuxtImg, {
							key: 0,
							src: __props.vehicle.images[0],
							alt: unref(imageAlt),
							width: "800",
							height: "600",
							loading: __props.eager ? "eager" : "lazy",
							fetchpriority: __props.eager ? "high" : "auto",
							sizes: "sm:100vw xxl:33vw",
							class: "absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]",
							onError: ($event) => imageFailed.value = true
						}, null, 8, [
							"src",
							"alt",
							"loading",
							"fetchpriority",
							"onError"
						])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-charcoal text-white/40",
							role: "img",
							"aria-label": `Image unavailable for the ${unref(fullTitle)}`
						}, [createVNode(_component_UIcon, {
							name: "i-lucide-car-front",
							class: "size-8",
							"aria-hidden": "true"
						}), createVNode("span", { class: "text-[10px] uppercase tracking-[0.16em]" }, "Image unavailable")], 8, ["aria-label"])),
						createVNode("div", { class: "absolute left-3 top-3 flex flex-wrap items-center gap-2" }, [createVNode("span", { class: ["border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em]", __props.vehicle.condition === "new" ? "border-gold bg-gold text-obsidian" : "border-white/60 bg-white/95 text-ink"] }, toDisplayString(unref(condition)), 3), __props.vehicle.status !== "available" ? (openBlock(), createBlock("span", {
							key: 0,
							class: ["border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em]", __props.vehicle.status === "sold" ? "border-obsidian bg-obsidian text-white" : "border-amber-300 bg-amber-50 text-amber-900"]
						}, toDisplayString(unref(status)), 3)) : createCommentVNode("", true)]),
						createVNode("div", {
							class: "pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-obsidian/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
							"aria-hidden": "true"
						})
					];
				}),
				_: 1
			}, _parent));
			_push(`<div class="${ssrRenderClass([__props.variant === "compact" ? "sm:p-5" : "", "flex flex-1 flex-col p-5"])}"><div class="flex items-center justify-between gap-3"><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">${ssrInterpolate(__props.vehicle.year)} · ${ssrInterpolate(__props.vehicle.bodyType ?? "Vehicle")}</p><span class="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted"><span class="${ssrRenderClass([unref(statusDotClass), "size-1.5 rounded-full"])}" aria-hidden="true"></span> ${ssrInterpolate(unref(status))}</span></div><h3 class="mt-2.5 min-h-[1.65rem] font-display text-[19px] font-medium leading-snug tracking-tight text-ink">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(detailLink),
				class: "transition-colors hover:text-gold-dark"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(title))}`);
					else return [createTextVNode(toDisplayString(unref(title)), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</h3>`);
			if (__props.vehicle.trim) _push(`<p class="mt-1 truncate text-[12px] text-muted">${ssrInterpolate(__props.vehicle.trim)}</p>`);
			else _push(`<!---->`);
			if (unref(specItems).length) {
				_push(`<ul class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2"><!--[-->`);
				ssrRenderList(unref(specItems), (item) => {
					_push(`<li class="flex items-center gap-1.5 text-[11px] text-charcoal/75">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: item.icon,
						class: "size-3.5 text-gold-dark",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(item.label)}</li>`);
				});
				_push(`<!--]--></ul>`);
			} else _push(`<!---->`);
			_push(`<div class="mt-auto pt-5"><div class="flex items-end justify-between gap-3 border-t border-line pt-4"><div><p class="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">Listed price</p><p class="mt-1 font-display text-[20px] font-medium tracking-tight text-ink">${ssrInterpolate(unref(price))}</p></div><span class="mb-0.5 text-right text-[9px] uppercase tracking-[0.1em] text-muted">${ssrInterpolate(__props.vehicle.stockNumber)} `);
			if (__props.showListedDate) _push(`<!--[--><br><span class="normal-case tracking-normal">Listed ${ssrInterpolate(unref(formatDate)(__props.vehicle.createdAt))}</span><!--]-->`);
			else _push(`<!---->`);
			_push(`</span></div><div class="mt-4 flex items-center gap-2">`);
			_push(ssrRenderComponent(_component_AppButton, {
				to: unref(detailLink),
				variant: "outline",
				size: "sm",
				class: "flex-1"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` View details `);
					else return [createTextVNode(" View details ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_WhatsAppButton, {
				vehicle: __props.vehicle,
				label: "WhatsApp",
				variant: "ghost",
				size: "sm",
				class: "shrink-0 text-[10px]! tracking-[0.08em]! text-muted hover:text-gold-dark!"
			}, null, _parent));
			_push(`</div></div></div></article>`);
		};
	}
});
// app/components/vehicles/VehicleCard.vue
var _sfc_setup = VehicleCard_vue_vue_type_script_setup_true_lang_default.setup;
VehicleCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/vehicles/VehicleCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var VehicleCard_default = Object.assign(VehicleCard_vue_vue_type_script_setup_true_lang_default, { __name: "VehicleCard" });

export { VehicleCard_default as V };
//# sourceMappingURL=VehicleCard-Tc4SfC6h.mjs.map
