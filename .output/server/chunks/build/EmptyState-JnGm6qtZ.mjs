import { A as AppButton_default } from '../virtual/entry.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

// app/components/shared/EmptyState.vue?vue&type=script&setup=true&lang.ts
var EmptyState_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "EmptyState",
	__ssrInlineRender: true,
	props: {
		title: {},
		description: {},
		icon: { default: "i-lucide-search-x" },
		actionLabel: {},
		actionTo: {},
		compact: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			const _component_AppButton = AppButton_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["flex flex-col items-center justify-center border border-line bg-white px-6 text-center", __props.compact ? "py-12" : "py-20"] }, _attrs))}><span class="flex size-12 items-center justify-center rounded-full border border-line bg-ivory">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: __props.icon,
				class: "size-5 text-gold-dark",
				"aria-hidden": "true"
			}, null, _parent));
			_push(`</span><h3 class="mt-5 font-display text-xl font-medium tracking-tight text-ink">${ssrInterpolate(__props.title)}</h3>`);
			if (__props.description) _push(`<p class="mt-3 max-w-md text-sm leading-relaxed text-muted">${ssrInterpolate(__props.description)}</p>`);
			else _push(`<!---->`);
			if (__props.actionLabel && __props.actionTo) {
				_push(`<div class="mt-6">`);
				_push(ssrRenderComponent(_component_AppButton, {
					to: __props.actionTo,
					variant: "dark",
					size: "md"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(__props.actionLabel)}`);
						else return [createTextVNode(toDisplayString(__props.actionLabel), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
// app/components/shared/EmptyState.vue
var _sfc_setup = EmptyState_vue_vue_type_script_setup_true_lang_default.setup;
EmptyState_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/EmptyState.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var EmptyState_default = Object.assign(EmptyState_vue_vue_type_script_setup_true_lang_default, { __name: "EmptyState" });

export { EmptyState_default as E };
//# sourceMappingURL=EmptyState-JnGm6qtZ.mjs.map
