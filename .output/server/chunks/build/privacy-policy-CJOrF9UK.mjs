import { a as useSeoMeta, d as dealership } from '../virtual/entry.mjs';
import { P as PageHeader_default } from './PageHeader-NdL0o5jz.mjs';
import { defineComponent, resolveComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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

// app/pages/privacy-policy.vue?vue&type=script&setup=true&lang.ts
var lastUpdated = "22 October 2026";
var privacy_policy_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "privacy-policy",
	__ssrInlineRender: true,
	setup(__props) {
		const sections = [
			{
				id: "demo-status",
				label: "Demo status"
			},
			{
				id: "information-collected",
				label: "Information in forms"
			},
			{
				id: "local-storage",
				label: "Local storage & cookies"
			},
			{
				id: "how-information-is-used",
				label: "How information is used"
			},
			{
				id: "sharing",
				label: "Sharing & third parties"
			},
			{
				id: "retention",
				label: "Retention"
			},
			{
				id: "your-rights",
				label: "Your rights"
			},
			{
				id: "security",
				label: "Security"
			},
			{
				id: "children",
				label: "Children"
			},
			{
				id: "changes",
				label: "Changes"
			},
			{
				id: "contact",
				label: "Contact"
			}
		];
		useSeoMeta({
			title: "Privacy policy",
			description: "How this Vantage Motors demonstration website handles information. Forms prepare messages locally and do not transmit or store enquiry data.",
			ogTitle: "Privacy policy · Vantage Motors",
			ogDescription: "How this demonstration website handles information, local storage and prepared enquiry messages."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHeader = PageHeader_default;
			const _component_UIcon = resolveComponent("UIcon");
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHeader, {
				title: "Privacy policy.",
				eyebrow: "Legal",
				description: "How this demonstration website handles information — and what would need to change before a live launch.",
				crumbs: [{ label: "Privacy policy" }]
			}, null, _parent));
			_push(`<section class="section-space bg-ivory" aria-labelledby="privacy-heading"><div class="shell"><h2 id="privacy-heading" class="sr-only">Privacy policy</h2><div class="mb-8 border border-gold/40 bg-gold-50 p-5"><p class="flex items-start gap-2 text-[11px] leading-relaxed text-charcoal">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-triangle-alert",
				class: "mt-0.5 size-4 shrink-0 text-gold-dark",
				"aria-hidden": "true"
			}, null, _parent));
			_push(`<span><strong class="font-semibold">Template draft.</strong> This policy describes the current frontend-only demonstration accurately, but it is not legal advice. Before launch, replace placeholder business details, review the policy against the actual systems you deploy, and obtain professional advice where needed. </span></p></div><div class="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16"><aside><div class="lg:sticky lg:top-24"><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">On this page</p><nav class="mt-3 border-t border-line pt-3" aria-label="Privacy policy sections"><ul class="space-y-2"><!--[-->`);
			ssrRenderList(sections, (section) => {
				_push(`<li><a${ssrRenderAttr("href", `#${section.id}`)} class="text-[11px] text-muted transition-colors hover:text-ink">${ssrInterpolate(section.label)}</a></li>`);
			});
			_push(`<!--]--></ul></nav><p class="mt-5 text-[10px] leading-relaxed text-muted">Last updated: ${ssrInterpolate(lastUpdated)}</p></div></aside><article class="legal-prose"><h2 id="demo-status">1. Demo status</h2><p> This website is a Phase 1 demonstration build for ${ssrInterpolate(unref(dealership).name)}. The business name, address, telephone number, WhatsApp number, email address, social handles and all vehicle listings are placeholders. The site is not connected to a live inventory system, customer database, payment processor or enquiry delivery service. </p><p> The forms on this site do not submit data to a server. They prepare a message locally in your browser and show it to you for review. Nothing is transmitted, stored or added to a customer database unless you choose to send the prepared text yourself through your own WhatsApp or email application. </p><h2 id="information-collected">2. Information entered into forms</h2><p>The contact, test-drive and sell-your-car forms ask for information such as:</p><ul><li>your name and phone number;</li><li>an email address, where you choose to provide one;</li><li>details about a vehicle you are interested in or want to sell;</li><li>a preferred date and time for a test drive;</li><li>any message or notes you add.</li></ul><p> This information stays in the page while you use the form. It is used only to compose the prepared message shown on screen. The demonstration does not persist it in a database, local storage or analytics system. </p><p> When you press a WhatsApp or email button, your device opens the relevant third-party application with the prepared text. From that point, the message is handled under that provider’s terms and privacy policy. The dealership does not receive it until you choose to send it. </p><h2 id="local-storage">3. Local storage and cookies</h2><p>This demonstration uses a small amount of browser storage for interface behaviour:</p><ul><li><strong>Announcement dismissal:</strong> a functional cookie records that you dismissed the announcement bar, so it does not reappear on every page. It expires after seven days.</li><li><strong>Recently viewed vehicles:</strong> the slugs of up to six vehicle pages you viewed are stored in your browser’s local storage. This is used only to show a “recently viewed” section. You can clear it from that section.</li></ul><p> No advertising, profiling or third-party analytics cookies are used in this build. If analytics or marketing tools are added later, this policy and any consent mechanism must be updated before those tools are enabled. </p><h2 id="how-information-is-used">4. How information is used</h2><p>For the demonstration, information entered into forms is used only to:</p><ul><li>validate that the form is complete enough to prepare a useful message;</li><li>generate a preview of the message and, where relevant, a WhatsApp or email link;</li><li>respond to your interactions with the interface, such as clearing errors.</li></ul><p> No automated decision-making, profiling, marketing or sale of personal information takes place. </p><h2 id="sharing">5. Sharing and third-party services</h2><p> The site does not share form data with third parties. It may link to external services, including WhatsApp, social media pages and email applications. Following those links takes you to a third-party service with its own terms and privacy practices. </p><p> Fonts and images are served from this website rather than loaded from third-party font or image networks. If the deployment configuration changes, review any new third-party requests. </p><h2 id="retention">6. Retention</h2><p> Because this demonstration does not transmit or store form submissions, there is no server-side retention period for enquiry data. Browser storage described above remains until it expires or you clear it. </p><p> A live implementation would need a defined retention period for enquiries, a lawful basis for processing, access controls and a process for handling deletion requests. </p><h2 id="your-rights">7. Your rights</h2><p> In a live deployment, applicable Nigerian data-protection law — including the Nigeria Data Protection Act 2023 — may give individuals rights to access, correct or request deletion of their personal data, and to object to or restrict certain processing. Those rights would need to be supported by a real privacy programme and a working contact channel. </p><p> This demonstration holds no submitted enquiry data, so there is no stored record to access or delete. Questions about this draft can be directed to the placeholder contact below. </p><h2 id="security">8. Security</h2><p> The demonstration is a static frontend without a backend, authentication or payment processing. That removes many risks but does not constitute a security programme. A live site would require transport encryption, secure server-side validation, access control, logging, vendor review and incident-response planning. </p><h2 id="children">9. Children</h2><p> The site is intended for adults considering a vehicle purchase. It is not directed at children, and the forms should not be used to submit a child’s personal information. </p><h2 id="changes">10. Changes to this policy</h2><p> This policy will need to be rewritten when real enquiry delivery, analytics, accounts, payments or other data processing is introduced. The “last updated” date should be revised whenever the policy changes. </p><h2 id="contact">11. Contact</h2><p> Placeholder contact for this demonstration: </p><ul><li>Email: <a${ssrRenderAttr("href", `mailto:${unref(dealership).contact.email}`)}>${ssrInterpolate(unref(dealership).contact.email)}</a></li><li>Telephone: <a${ssrRenderAttr("href", `tel:${unref(dealership).contact.phone.e164}`)}>${ssrInterpolate(unref(dealership).contact.phone.display)}</a></li><li>Address: ${ssrInterpolate(unref(dealership).address.display)}</li></ul><p> These details are not monitored and must be replaced with verified contact information before launch. </p></article></div></div></section></div>`);
		};
	}
});
// app/pages/privacy-policy.vue
var _sfc_setup = privacy_policy_vue_vue_type_script_setup_true_lang_default.setup;
privacy_policy_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy-policy.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var privacy_policy_default = privacy_policy_vue_vue_type_script_setup_true_lang_default;

export { privacy_policy_default as default };
//# sourceMappingURL=privacy-policy-CJOrF9UK.mjs.map
