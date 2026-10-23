import { i as useWhatsApp, a as useSeoMeta, d as dealership, A as AppButton_default, B as BrandWhatsAppIcon_default, D as DemoNotice_default, N as NuxtLink } from '../virtual/entry.mjs';
import { P as PageHeader_default } from './PageHeader-NdL0o5jz.mjs';
import { u as useDemoEnquiry, E as EnquiryResultPanel_default } from './useDemoEnquiry-BkazzJSu.mjs';
import { defineComponent, computed, resolveComponent, withCtx, unref, createTextVNode, createVNode, ref, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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

// app/components/forms/ContactForm.vue?vue&type=script&setup=true&lang.ts
var ContactForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ContactForm",
	__ssrInlineRender: true,
	setup(__props) {
		const { submitting, result, submitError, reset } = useDemoEnquiry();
		const fullName = ref("");
		const phone = ref("");
		const email = ref("");
		const subject = ref("Vehicle availability");
		const message = ref("");
		const errors = ref({});
		const subjects = [
			"Vehicle availability",
			"General enquiry",
			"Test-drive question",
			"Selling or trade-in",
			"Documentation question",
			"Website feedback"
		];
		function prepareAnother() {
			reset();
			nextTick(() => (void 0).getElementById("contact-full-name")?.focus());
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_EnquiryResultPanel = EnquiryResultPanel_default;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_NuxtLink = NuxtLink;
			const _component_AppButton = AppButton_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			if (unref(result)) _push(ssrRenderComponent(_component_EnquiryResultPanel, {
				result: unref(result),
				title: "Your enquiry message is ready",
				onReset: prepareAnother
			}, null, _parent));
			else {
				_push(`<form class="border border-line bg-white p-5 sm:p-7" novalidate aria-labelledby="contact-form-heading"><div class="border-b border-line pb-5"><p class="eyebrow text-gold-dark">Send an enquiry</p><h2 id="contact-form-heading" class="mt-4 font-display text-2xl font-medium tracking-tight text-ink"> Tell us what you need. </h2><p class="mt-2 text-[12px] leading-relaxed text-muted"> Required fields are marked with an asterisk. This demo form prepares a message locally — it does not send or store anything. </p></div>`);
				if (Object.keys(unref(errors)).length) {
					_push(`<div class="mt-5 border border-red-200 bg-red-50 p-3" role="alert"><p class="flex items-start gap-2 text-[12px] font-medium text-red-800">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-0.5 size-4 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` Please check the highlighted fields below. </p></div>`);
				} else _push(`<!---->`);
				_push(`<div class="mt-6 grid gap-5 sm:grid-cols-2"><div><label for="contact-full-name" class="form-label">Full name <span class="text-gold-dark">*</span></label><input id="contact-full-name"${ssrRenderAttr("value", unref(fullName))} type="text" class="form-input" autocomplete="name" placeholder="Your full name"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).fullName))}${ssrRenderAttr("aria-describedby", unref(errors).fullName ? "contact-full-name-error" : void 0)}>`);
				if (unref(errors).fullName) {
					_push(`<p id="contact-full-name-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).fullName)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div><label for="contact-phone" class="form-label">Phone number <span class="text-gold-dark">*</span></label><input id="contact-phone"${ssrRenderAttr("value", unref(phone))} type="tel" class="form-input" autocomplete="tel" inputmode="tel" placeholder="0801 234 5678"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).phone))}${ssrRenderAttr("aria-describedby", unref(errors).phone ? "contact-phone-error" : "contact-phone-hint")}>`);
				if (unref(errors).phone) {
					_push(`<p id="contact-phone-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).phone)}</p>`);
				} else _push(`<p id="contact-phone-hint" class="form-hint">Nigerian mobile number. Used only for this enquiry.</p>`);
				_push(`</div><div><label for="contact-email" class="form-label">Email <span class="normal-case tracking-normal text-muted">(optional)</span></label><input id="contact-email"${ssrRenderAttr("value", unref(email))} type="email" class="form-input" autocomplete="email" placeholder="you@example.com"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).email))}${ssrRenderAttr("aria-describedby", unref(errors).email ? "contact-email-error" : void 0)}>`);
				if (unref(errors).email) {
					_push(`<p id="contact-email-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).email)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div><label for="contact-subject" class="form-label">Subject <span class="text-gold-dark">*</span></label><select id="contact-subject" class="form-select"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).subject))}${ssrRenderAttr("aria-describedby", unref(errors).subject ? "contact-subject-error" : void 0)}><!--[-->`);
				ssrRenderList(subjects, (option) => {
					_push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(unref(subject)) ? ssrLooseContain(unref(subject), option) : ssrLooseEqual(unref(subject), option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
				});
				_push(`<!--]--></select>`);
				if (unref(errors).subject) {
					_push(`<p id="contact-subject-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).subject)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div class="sm:col-span-2"><label for="contact-message" class="form-label">Message <span class="text-gold-dark">*</span></label><textarea id="contact-message" class="form-textarea" rows="5" placeholder="Tell us which vehicle you are interested in, or what you would like to know."${ssrRenderAttr("aria-invalid", Boolean(unref(errors).message))}${ssrRenderAttr("aria-describedby", unref(errors).message ? "contact-message-error" : "contact-message-hint")}>${ssrInterpolate(unref(message))}</textarea>`);
				if (unref(errors).message) {
					_push(`<p id="contact-message-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).message)}</p>`);
				} else _push(`<p id="contact-message-hint" class="form-hint">Specific details help the team respond usefully.</p>`);
				_push(`</div></div>`);
				if (unref(submitError)) {
					_push(`<p class="form-error mt-4" role="alert">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(submitError))}</p>`);
				} else _push(`<!---->`);
				_push(`<div class="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between"><p class="max-w-xs text-[10px] leading-relaxed text-muted"> By preparing a message you agree to the `);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/privacy-policy",
					class: "text-ink underline decoration-gold underline-offset-2"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`privacy policy`);
						else return [createTextVNode("privacy policy")];
					}),
					_: 1
				}, _parent));
				_push(`. No data leaves this page. </p>`);
				_push(ssrRenderComponent(_component_AppButton, {
					type: "submit",
					variant: "dark",
					size: "lg",
					loading: unref(submitting),
					"trailing-icon": "i-lucide-arrow-right"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Prepare enquiry `);
						else return [createTextVNode(" Prepare enquiry ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></form>`);
			}
			_push(`</div>`);
		};
	}
});
// app/components/forms/ContactForm.vue
var _sfc_setup$1 = ContactForm_vue_vue_type_script_setup_true_lang_default.setup;
ContactForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/ContactForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ContactForm_default = Object.assign(ContactForm_vue_vue_type_script_setup_true_lang_default, { __name: "ContactForm" });
// app/pages/contact.vue?vue&type=script&setup=true&lang.ts
var contact_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "contact",
	__ssrInlineRender: true,
	setup(__props) {
		const { generalUrl, phoneHref, emailHref } = useWhatsApp();
		const whatsappHref = computed(() => generalUrl());
		useSeoMeta({
			title: "Contact",
			description: "Contact Vantage Motors by WhatsApp, telephone or email, or prepare a local enquiry message. Placeholder contact details for the demonstration build.",
			ogTitle: "Contact Vantage Motors",
			ogDescription: "Reach the sales team by WhatsApp, telephone or email, or prepare an enquiry on the website."
		});
		const channels = computed(() => [
			{
				label: "WhatsApp",
				value: dealership.contact.whatsapp.display,
				href: whatsappHref.value,
				icon: "i-lucide-message-circle",
				external: true,
				note: "Fastest for vehicle-specific questions."
			},
			{
				label: "Telephone",
				value: dealership.contact.phone.display,
				href: phoneHref,
				icon: "i-lucide-phone",
				external: false,
				note: "Call during showroom hours."
			},
			{
				label: "Email",
				value: dealership.contact.email,
				href: emailHref,
				icon: "i-lucide-mail",
				external: false,
				note: "For longer or document-related enquiries."
			}
		]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHeader = PageHeader_default;
			const _component_AppButton = AppButton_default;
			const _component_BrandWhatsAppIcon = BrandWhatsAppIcon_default;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_DemoNotice = DemoNotice_default;
			const _component_ContactForm = ContactForm_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHeader, {
				title: "Start a conversation.",
				eyebrow: "Contact",
				description: "Ask about a specific vehicle, arrange a viewing or simply tell us what you are looking for. The contact details below are placeholders for this demonstration build.",
				crumbs: [{ label: "Contact" }]
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_AppButton, {
							href: unref(whatsappHref),
							variant: "gold",
							size: "lg"
						}, {
							leading: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_BrandWhatsAppIcon, { class: "size-4 shrink-0" }, null, _parent, _scopeId));
								else return [createVNode(_component_BrandWhatsAppIcon, { class: "size-4 shrink-0" })];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` WhatsApp the team `);
								else return [createTextVNode(" WhatsApp the team ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_AppButton, {
							href: unref(phoneHref),
							variant: "light-outline",
							size: "lg",
							icon: "i-lucide-phone"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Call the showroom `);
								else return [createTextVNode(" Call the showroom ")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_AppButton, {
						href: unref(whatsappHref),
						variant: "gold",
						size: "lg"
					}, {
						leading: withCtx(() => [createVNode(_component_BrandWhatsAppIcon, { class: "size-4 shrink-0" })]),
						default: withCtx(() => [createTextVNode(" WhatsApp the team ")]),
						_: 1
					}, 8, ["href"]), createVNode(_component_AppButton, {
						href: unref(phoneHref),
						variant: "light-outline",
						size: "lg",
						icon: "i-lucide-phone"
					}, {
						default: withCtx(() => [createTextVNode(" Call the showroom ")]),
						_: 1
					}, 8, ["href"])];
				}),
				_: 1
			}, _parent));
			_push(`<section class="section-space bg-ivory" aria-labelledby="contact-details-heading"><div class="shell"><h2 id="contact-details-heading" class="sr-only">Contact details and enquiry form</h2><div class="grid gap-8 lg:grid-cols-12 lg:gap-10"><div class="space-y-6 lg:col-span-5"><div class="border border-line bg-white"><div class="border-b border-line p-5"><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Direct channels</p><p class="mt-2 text-[12px] leading-relaxed text-muted"> These are demonstration contact details. They do not reach a real dealership. </p></div><ul class="divide-y divide-line"><!--[-->`);
			ssrRenderList(unref(channels), (channel) => {
				_push(`<li><a${ssrRenderAttr("href", channel.href)}${ssrRenderAttr("target", channel.external ? "_blank" : void 0)}${ssrRenderAttr("rel", channel.external ? "noopener noreferrer" : void 0)} class="group flex items-start gap-3 p-5 transition-colors hover:bg-ivory"><span class="flex size-9 shrink-0 items-center justify-center border border-line text-gold-dark transition-colors group-hover:border-gold">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: channel.icon,
					class: "size-4",
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</span><span class="min-w-0"><span class="block text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">${ssrInterpolate(channel.label)}</span><span class="mt-1 block break-words text-[13px] font-medium text-ink">${ssrInterpolate(channel.value)}</span><span class="mt-1 block text-[10px] text-muted">${ssrInterpolate(channel.note)}</span></span>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-arrow-up-right",
					class: "ml-auto mt-1 size-3.5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</a></li>`);
			});
			_push(`<!--]--></ul></div><div class="border border-line bg-white p-5"><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Showroom</p><address class="mt-3 not-italic"><p class="text-[13px] leading-relaxed text-ink">${ssrInterpolate(unref(dealership).address.line1)}<br> ${ssrInterpolate(unref(dealership).address.area)}, ${ssrInterpolate(unref(dealership).address.city)}<br> ${ssrInterpolate(unref(dealership).address.state)}, ${ssrInterpolate(unref(dealership).address.country)}</p></address><p class="mt-3 border-t border-line pt-3 text-[10px] leading-relaxed text-muted"> Placeholder address. Confirm the showroom location before travelling. </p></div><div class="border border-line bg-white p-5"><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Opening hours</p><dl class="mt-3 space-y-2"><!--[-->`);
			ssrRenderList(unref(dealership).hours, (entry) => {
				_push(`<div class="flex items-baseline justify-between gap-4"><dt class="text-[11px] text-charcoal/65">${ssrInterpolate(entry.days)}</dt><dd class="text-[11px] font-medium text-ink">${ssrInterpolate(entry.hours)}</dd></div>`);
			});
			_push(`<!--]--></dl></div>`);
			_push(ssrRenderComponent(_component_DemoNotice, null, null, _parent));
			_push(`</div><div class="lg:col-span-7">`);
			_push(ssrRenderComponent(_component_ContactForm, null, null, _parent));
			_push(`</div></div><div class="mt-10">`);
			if (unref(dealership).mapEmbedUrl) _push(`<div class="overflow-hidden border border-line bg-white"><iframe${ssrRenderAttr("src", unref(dealership).mapEmbedUrl)} title="Map showing the Vantage Motors showroom location" width="100%" height="420" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="block w-full"></iframe></div>`);
			else {
				_push(`<div class="border border-line bg-white p-6"><div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div class="flex items-start gap-3"><span class="flex size-9 shrink-0 items-center justify-center border border-line text-muted">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-map",
					class: "size-4",
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</span><div><p class="font-display text-sm font-medium text-ink">Map not configured</p><p class="mt-1 max-w-xl text-[11px] leading-relaxed text-muted"> No map is shown because the showroom address is still a placeholder and no embed URL has been configured. Add a verified address and map embed in the central dealership configuration before launch. </p></div></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/about",
					class: "shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-dark underline-offset-4 hover:text-ink hover:underline"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` About the showroom `);
						else return [createTextVNode(" About the showroom ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			}
			_push(`</div></div></section></div>`);
		};
	}
});
// app/pages/contact.vue
var _sfc_setup = contact_vue_vue_type_script_setup_true_lang_default.setup;
contact_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var contact_default = contact_vue_vue_type_script_setup_true_lang_default;

export { contact_default as default };
//# sourceMappingURL=contact-US7HSO4f.mjs.map
