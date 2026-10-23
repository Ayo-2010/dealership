import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

// app/components/shared/LoadingState.vue?vue&type=script&setup=true&lang.ts
var LoadingState_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "LoadingState",
	__ssrInlineRender: true,
	props: {
		count: { default: 6 },
		label: { default: "Loading vehicles" }
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				role: "status",
				"aria-label": __props.label,
				class: "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
			}, _attrs))}><!--[-->`);
			ssrRenderList(__props.count, (index) => {
				_push(`<div class="animate-pulse border border-line bg-white"><div class="aspect-[4/3] bg-line/70"></div><div class="space-y-3 p-5"><div class="h-2.5 w-24 bg-line"></div><div class="h-5 w-3/4 bg-line"></div><div class="h-3 w-1/2 bg-line"></div><div class="mt-6 h-6 w-32 bg-line"></div></div></div>`);
			});
			_push(`<!--]--><span class="sr-only">${ssrInterpolate(__props.label)}…</span></div>`);
		};
	}
});
// app/components/shared/LoadingState.vue
var _sfc_setup = LoadingState_vue_vue_type_script_setup_true_lang_default.setup;
LoadingState_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/LoadingState.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var LoadingState_default = Object.assign(LoadingState_vue_vue_type_script_setup_true_lang_default, { __name: "LoadingState" });

export { LoadingState_default as L };
//# sourceMappingURL=LoadingState-UQOo5w2K.mjs.map
