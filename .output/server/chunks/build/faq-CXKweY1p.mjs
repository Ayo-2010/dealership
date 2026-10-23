import { a as useSeoMeta, N as NuxtLink, A as AppButton_default, d as dealership } from '../virtual/entry.mjs';
import { P as PageHeader_default } from './PageHeader-NdL0o5jz.mjs';
import { defineComponent, ref, computed, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/data/faq.ts
var financingEnabled = dealership.isServiceEnabled("financing");
var deliveryEnabled = dealership.isServiceEnabled("delivery");
var tradeInEnabled = dealership.isServiceEnabled("trade-in");
var warrantyEnabled = dealership.isServiceEnabled("warranty");
/**
* Editable FAQ content. Answers avoid making claims the dealership has not
* confirmed and point visitors to direct verification where appropriate.
*/
var faqSections = [
	{
		title: "Buying a vehicle",
		items: [
			{
				label: "What is the difference between a new and a pre-owned vehicle?",
				content: "A new vehicle has not previously been registered for road use. A pre-owned vehicle has had one or more previous owners and will usually show mileage and a usage history. Each listing states its condition clearly. The dealership can confirm the specific history and documentation for any vehicle you are considering.",
				icon: "i-lucide-car-front"
			},
			{
				label: "Are the listed prices negotiable or fixed?",
				content: "Listed prices are shown in Nigerian naira and are subject to confirmation with the dealership. Any discussion of price should take place directly with the sales team. This website does not process payments or hold a vehicle.",
				icon: "i-lucide-badge-naira"
			},
			{
				label: "How do I know whether a vehicle is still available?",
				content: "Each listing shows an availability state: available, reserved or sold. Availability can change, and a vehicle is not held for you until the dealership confirms it directly. If a listing is reserved, ask the team whether it is still open to enquiries.",
				icon: "i-lucide-circle-check"
			},
			{
				label: "Can I reserve a vehicle through the website?",
				content: "No. This phase of the website does not take reservations or payments. A WhatsApp, telephone or in-person conversation with the dealership is required to discuss holding a vehicle.",
				icon: "i-lucide-lock"
			}
		]
	},
	{
		title: "Viewings and test drives",
		items: [
			{
				label: "How do I book a test drive?",
				content: "Use the test-drive request page to send your preferred vehicle, date and time. The form prepares a request for the team but does not confirm an appointment. The dealership must confirm availability and timing with you directly.",
				icon: "i-lucide-steering-wheel"
			},
			{
				label: "Can I view a vehicle before deciding?",
				content: "Yes — contact the team to arrange a viewing at the showroom or another agreed location. Confirm the vehicle’s availability and the viewing address before travelling.",
				icon: "i-lucide-map-pin"
			},
			{
				label: "Do I need a driver’s licence for a test drive?",
				content: "The dealership will explain its test-drive requirements, including any licence, age or insurance conditions, before the appointment. Requirements can vary by vehicle and insurer.",
				icon: "i-lucide-id-card"
			}
		]
	},
	{
		title: "Documentation and payments",
		items: [
			{
				label: "What documentation is provided with a vehicle?",
				content: dealership.isServiceEnabled("documentation") ? "The dealership can assist with the vehicle paperwork and ownership documents required for your purchase. The exact documents available depend on the vehicle, its history and the applicable registration process. Ask the team to confirm the documentation for your chosen car in writing." : "Documentation arrangements should be confirmed directly with the dealership for the specific vehicle you are considering.",
				icon: "i-lucide-file-text"
			},
			{
				label: "Which payment methods are accepted?",
				content: "Payment arrangements are confirmed directly with the dealership. This website does not collect payments, card details or bank information. Never send money to an account that has not been verified through a direct conversation with the dealership.",
				icon: "i-lucide-credit-card"
			},
			{
				label: "Do you offer financing?",
				content: financingEnabled ? "Financing options may be available through the dealership or a third party. Ask the team for current terms, eligibility requirements and the total cost of credit before committing." : "Financing is not currently offered directly by the dealership. The team can tell you whether any third-party options are available, but this website makes no financing promise.",
				icon: "i-lucide-landmark"
			},
			{
				label: "Is a warranty included?",
				content: warrantyEnabled ? "Warranty cover depends on the individual vehicle and any applicable manufacturer terms. Ask the team to confirm exactly what is covered, for how long and by whom." : "Extended warranty cover is not currently offered by the dealership. Any remaining manufacturer warranty is specific to the vehicle and should be confirmed in writing.",
				icon: "i-lucide-shield-check"
			}
		]
	},
	{
		title: "Selling, trade-ins and delivery",
		items: [
			{
				label: "Can I sell my current car to the dealership?",
				content: tradeInEnabled ? "Yes — use the Sell Your Car page to share your vehicle details. The dealership can review the information and discuss whether a purchase or trade-in arrangement is possible. Submitting an enquiry does not create an offer or guarantee acceptance." : "Trade-in enquiries are not currently available. Contact the dealership directly to discuss your options.",
				icon: "i-lucide-repeat"
			},
			{
				label: "Is delivery available?",
				content: deliveryEnabled ? "Delivery can be discussed with the dealership. Any delivery arrangement, cost and timing should be agreed in writing and is not included in the listed price unless expressly confirmed." : "Vehicle delivery is not currently offered as a standard service. Ask the team whether any arrangement can be made for your location.",
				icon: "i-lucide-truck"
			},
			{
				label: "Can I inspect a vehicle’s history?",
				content: "Ask the dealership which records are available for the specific vehicle. This demonstration website shows illustrative data only and does not provide a vehicle-history report.",
				icon: "i-lucide-history"
			}
		]
	}
];
faqSections.flatMap((section) => section.items);
// app/pages/faq.vue?vue&type=script&setup=true&lang.ts
var faq_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "faq",
	__ssrInlineRender: true,
	setup(__props) {
		const query = ref("");
		const filteredSections = computed(() => {
			const term = query.value.trim().toLowerCase();
			if (!term) return faqSections;
			return faqSections.map((section) => ({
				...section,
				items: section.items.filter((item) => `${item.label} ${item.content}`.toLowerCase().includes(term))
			})).filter((section) => section.items.length > 0);
		});
		const totalResults = computed(() => filteredSections.value.reduce((sum, section) => sum + section.items.length, 0));
		function clearSearch() {
			query.value = "";
		}
		useSeoMeta({
			title: "Frequently asked questions",
			description: "Answers about buying, viewing, test drives, documentation, payment arrangements, selling a car and delivery at Vantage Motors.",
			ogTitle: "Frequently asked questions · Vantage Motors",
			ogDescription: "Practical answers about buying, viewing, test drives, documentation and selling a car."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHeader = PageHeader_default;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_NuxtLink = NuxtLink;
			const _component_AppButton = AppButton_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHeader, {
				title: "Questions, answered plainly.",
				eyebrow: "Frequently asked",
				description: "Practical answers about buying, viewing, documentation and selling. If something is not covered here, ask the team directly.",
				crumbs: [{ label: "FAQ" }]
			}, null, _parent));
			_push(`<section class="section-space bg-ivory" aria-labelledby="faq-heading"><div class="shell"><h2 id="faq-heading" class="sr-only">Frequently asked questions</h2><div class="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14"><aside><div class="lg:sticky lg:top-24"><label for="faq-search" class="form-label">Search the FAQ</label><div class="relative">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-search",
				class: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted",
				"aria-hidden": "true"
			}, null, _parent));
			_push(`<input id="faq-search"${ssrRenderAttr("value", unref(query))} type="search" class="form-input pl-9!" placeholder="Type a question or topic" autocomplete="off"></div><p class="mt-2 text-[10px] text-muted" role="status" aria-live="polite">${ssrInterpolate(unref(totalResults))} ${ssrInterpolate(unref(totalResults) === 1 ? "answer" : "answers")}</p><nav class="mt-6 hidden border-t border-line pt-4 lg:block" aria-label="FAQ sections"><ul class="space-y-2.5"><!--[-->`);
			ssrRenderList(unref(faqSections), (section) => {
				_push(`<li>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
					class: "text-[11px] text-muted transition-colors hover:text-ink"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(section.title)}`);
						else return [createTextVNode(toDisplayString(section.title), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></nav><div class="mt-6 border border-line bg-white p-5"><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Still unsure?</p><p class="mt-2 text-[11px] leading-relaxed text-muted">Ask the team about the specific vehicle or arrangement you have in mind.</p>`);
			_push(ssrRenderComponent(_component_AppButton, {
				to: "/contact",
				variant: "dark",
				size: "sm",
				block: "",
				class: "mt-4"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Contact the team`);
					else return [createTextVNode("Contact the team")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></aside><div>`);
			if (unref(filteredSections).length) {
				_push(`<div class="space-y-10"><!--[-->`);
				ssrRenderList(unref(filteredSections), (section) => {
					_push(`<section${ssrRenderAttr("id", section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}${ssrRenderAttr("aria-labelledby", `faq-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)}><h2${ssrRenderAttr("id", `faq-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)} class="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">${ssrInterpolate(section.title)}</h2><div class="mt-4 divide-y divide-line border-y border-line"><!--[-->`);
					ssrRenderList(section.items, (item, index) => {
						_push(`<details class="group"${ssrIncludeBooleanAttr(index === 0 && !unref(query)) ? " open" : ""}><summary class="flex cursor-pointer list-none items-start justify-between gap-5 py-4 [&amp;::-webkit-details-marker]:hidden"><span class="flex items-start gap-3">`);
						if (item.icon) _push(ssrRenderComponent(_component_UIcon, {
							name: item.icon,
							class: "mt-0.5 size-4 shrink-0 text-gold-dark",
							"aria-hidden": "true"
						}, null, _parent));
						else _push(`<!---->`);
						_push(`<span class="text-[13px] font-medium leading-relaxed text-ink">${ssrInterpolate(item.label)}</span></span><span class="relative mt-1 flex size-5 shrink-0 items-center justify-center border border-line text-muted"><span class="absolute h-px w-2.5 bg-current" aria-hidden="true"></span><span class="absolute h-2.5 w-px bg-current transition-transform duration-200 group-open:scale-y-0" aria-hidden="true"></span></span></summary><div class="pb-5 pl-7 pr-8"><p class="text-[12px] leading-relaxed text-charcoal/70">${ssrInterpolate(item.content)}</p></div></details>`);
					});
					_push(`<!--]--></div></section>`);
				});
				_push(`<!--]--></div>`);
			} else {
				_push(`<div class="border border-line bg-white px-6 py-14 text-center">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-search-x",
					class: "mx-auto size-6 text-gold-dark",
					"aria-hidden": "true"
				}, null, _parent));
				_push(`<p class="mt-3 font-display text-lg font-medium text-ink">No answers match “${ssrInterpolate(unref(query))}”.</p><p class="mt-2 text-[12px] text-muted">Try a broader term, or ask the team directly.</p><div class="mt-5 flex flex-col justify-center gap-2 sm:flex-row">`);
				_push(ssrRenderComponent(_component_AppButton, {
					variant: "outline",
					size: "md",
					onClick: clearSearch
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Clear search`);
						else return [createTextVNode("Clear search")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_AppButton, {
					to: "/contact",
					variant: "dark",
					size: "md"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Ask the team`);
						else return [createTextVNode("Ask the team")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			}
			_push(`<div class="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"><p class="max-w-lg text-[10px] leading-relaxed text-muted"> Answers describe current Phase 1 behaviour. Anything involving payments, documents, availability or appointments must be confirmed directly with the dealership. </p>`);
			_push(ssrRenderComponent(_component_AppButton, {
				to: "/contact",
				variant: "outline",
				size: "md",
				"trailing-icon": "i-lucide-arrow-right"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Contact `);
					else return [createTextVNode(" Contact ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></div></section></div>`);
		};
	}
});
// app/pages/faq.vue
var _sfc_setup = faq_vue_vue_type_script_setup_true_lang_default.setup;
faq_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var faq_default = faq_vue_vue_type_script_setup_true_lang_default;

export { faq_default as default };
//# sourceMappingURL=faq-CXKweY1p.mjs.map
