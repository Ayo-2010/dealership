import { B as Breadcrumbs_default } from './Breadcrumbs-RqMNGriD.mjs';
import { _ as _sfc_main } from './NuxtImg-jexAG5NB.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

// app/components/shared/PageHeader.vue?vue&type=script&setup=true&lang.ts
var PageHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PageHeader",
	__ssrInlineRender: true,
	props: {
		title: {},
		eyebrow: {},
		description: {},
		crumbs: { default: () => [] },
		image: {},
		imageAlt: {},
		imageNote: { default: "Illustrative photography" }
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Breadcrumbs = Breadcrumbs_default;
			const _component_NuxtImg = _sfc_main;
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "relative overflow-hidden border-b border-white/10 bg-obsidian",
				"aria-labelledby": "page-heading"
			}, _attrs))}><div class="absolute inset-y-0 right-0 hidden w-1/2 border-l border-white/5 lg:block" aria-hidden="true"></div><div class="shell relative py-10 sm:py-14 lg:py-16">`);
			if (__props.crumbs.length) _push(ssrRenderComponent(_component_Breadcrumbs, {
				items: __props.crumbs,
				tone: "dark"
			}, null, _parent));
			else _push(`<!---->`);
			_push(`<div class="mt-8 grid items-end gap-8 lg:grid-cols-12 lg:gap-12"><div class="${ssrRenderClass(__props.image ? "lg:col-span-7" : "lg:col-span-9")}">`);
			if (__props.eyebrow) _push(`<p class="eyebrow text-gold-light">${ssrInterpolate(__props.eyebrow)}</p>`);
			else _push(`<!---->`);
			_push(`<h1 id="page-heading" class="display-title mt-5 max-w-4xl text-[2.45rem] text-ivory sm:text-5xl lg:text-[3.9rem]">${ssrInterpolate(__props.title)}</h1>`);
			if (__props.description) _push(`<p class="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-white/55">${ssrInterpolate(__props.description)}</p>`);
			else _push(`<!---->`);
			if (_ctx.$slots.actions) {
				_push(`<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">`);
				ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			if (_ctx.$slots.meta) {
				_push(`<div class="mt-8">`);
				ssrRenderSlot(_ctx.$slots, "meta", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
			if (__props.image) {
				_push(`<div class="lg:col-span-5"><div class="relative overflow-hidden bg-charcoal">`);
				_push(ssrRenderComponent(_component_NuxtImg, {
					src: __props.image,
					alt: __props.imageAlt ?? "Illustrative automotive photography",
					width: "1200",
					height: "900",
					loading: "eager",
					sizes: "sm:100vw xxl:42vw",
					class: "aspect-[4/3] w-full object-cover"
				}, null, _parent));
				_push(`<div class="absolute inset-0 bg-obsidian/10" aria-hidden="true"></div><p class="absolute bottom-3 left-3 border border-white/20 bg-obsidian/50 px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-white/70">${ssrInterpolate(__props.imageNote)}</p></div></div>`);
			} else _push(`<!---->`);
			_push(`</div></div></section>`);
		};
	}
});
// app/components/shared/PageHeader.vue
var _sfc_setup = PageHeader_vue_vue_type_script_setup_true_lang_default.setup;
PageHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/PageHeader.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var PageHeader_default = Object.assign(PageHeader_vue_vue_type_script_setup_true_lang_default, { __name: "PageHeader" });

export { PageHeader_default as P };
//# sourceMappingURL=PageHeader-NdL0o5jz.mjs.map
