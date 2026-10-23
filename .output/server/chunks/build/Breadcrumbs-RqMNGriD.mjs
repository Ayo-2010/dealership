import { N as NuxtLink } from '../virtual/entry.mjs';
import { defineComponent, computed, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';

// app/components/shared/Breadcrumbs.vue?vue&type=script&setup=true&lang.ts
var Breadcrumbs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Breadcrumbs",
	__ssrInlineRender: true,
	props: {
		items: {},
		tone: { default: "light" }
	},
	setup(__props) {
		const props = __props;
		const allItems = computed(() => [{
			label: "Home",
			to: "/"
		}, ...props.items]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_UIcon = resolveComponent("UIcon");
			_push(`<nav${ssrRenderAttrs(mergeProps({
				"aria-label": "Breadcrumb",
				class: "text-[11px]"
			}, _attrs))}><ol class="${ssrRenderClass([__props.tone === "dark" ? "text-white/40" : "text-muted", "flex flex-wrap items-center gap-x-2 gap-y-1"])}"><!--[-->`);
			ssrRenderList(unref(allItems), (item, index) => {
				_push(`<li class="flex items-center gap-x-2">`);
				if (item.to && index < unref(allItems).length - 1) _push(ssrRenderComponent(_component_NuxtLink, {
					to: item.to,
					class: ["transition-colors", __props.tone === "dark" ? "hover:text-white" : "hover:text-ink"]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(item.label)}`);
						else return [createTextVNode(toDisplayString(item.label), 1)];
					}),
					_: 2
				}, _parent));
				else _push(`<span${ssrRenderAttr("aria-current", index === unref(allItems).length - 1 ? "page" : void 0)} class="${ssrRenderClass([index === unref(allItems).length - 1 ? "font-medium" : "", index === unref(allItems).length - 1 ? __props.tone === "dark" ? "text-white/80" : "text-ink" : ""])}">${ssrInterpolate(item.label)}</span>`);
				if (index < unref(allItems).length - 1) _push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-chevron-right",
					class: ["size-3", __props.tone === "dark" ? "text-white/20" : "text-line"],
					"aria-hidden": "true"
				}, null, _parent));
				else _push(`<!---->`);
				_push(`</li>`);
			});
			_push(`<!--]--></ol></nav>`);
		};
	}
});
// app/components/shared/Breadcrumbs.vue
var _sfc_setup = Breadcrumbs_vue_vue_type_script_setup_true_lang_default.setup;
Breadcrumbs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/Breadcrumbs.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Breadcrumbs_default = Object.assign(Breadcrumbs_vue_vue_type_script_setup_true_lang_default, { __name: "Breadcrumbs" });

export { Breadcrumbs_default as B };
//# sourceMappingURL=Breadcrumbs-RqMNGriD.mjs.map
