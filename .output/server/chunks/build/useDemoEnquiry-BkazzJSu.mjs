import { A as AppButton_default, B as BrandWhatsAppIcon_default, d as dealership, m as buildWhatsAppUrl, f as formatNaira } from '../virtual/entry.mjs';
import { u as useToast } from './useToast-CFIXcbF3.mjs';
import { ref, defineComponent, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';

// app/components/forms/EnquiryResultPanel.vue?vue&type=script&setup=true&lang.ts
var EnquiryResultPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "EnquiryResultPanel",
	__ssrInlineRender: true,
	props: {
		result: {},
		title: { default: "Message prepared" }
	},
	emits: ["reset"],
	setup(__props, { emit: __emit }) {
		useToast();
		const copying = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			const _component_AppButton = AppButton_default;
			const _component_BrandWhatsAppIcon = BrandWhatsAppIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "border border-gold/40 bg-white",
				"aria-live": "polite"
			}, _attrs))}><div class="flex items-start gap-3 border-b border-line bg-gold-50 p-5"><span class="flex size-9 shrink-0 items-center justify-center border border-gold/40 bg-white">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-check",
				class: "size-4 text-gold-dark",
				"aria-hidden": "true"
			}, null, _parent));
			_push(`</span><div><p class="font-display text-lg font-medium tracking-tight text-ink">${ssrInterpolate(__props.title)}</p><p class="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-dark">Demo result · Nothing sent</p></div></div><div class="p-5"><p class="text-[12px] leading-relaxed text-charcoal/75">${ssrInterpolate(__props.result.notice)}</p><div class="mt-5"><div class="flex items-center justify-between gap-3"><p class="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Prepared message</p><button type="button" class="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-dark transition-colors hover:text-ink"${ssrIncludeBooleanAttr(unref(copying)) ? " disabled" : ""}>`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: unref(copying) ? "i-lucide-loader-circle" : "i-lucide-copy",
				class: ["size-3.5", unref(copying) ? "animate-spin" : ""],
				"aria-hidden": "true"
			}, null, _parent));
			_push(` Copy </button></div><pre class="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-line bg-ivory p-4 font-sans text-[12px] leading-relaxed text-charcoal/80">${ssrInterpolate(__props.result.preparedMessage)}</pre></div><div class="mt-5 grid gap-2 sm:grid-cols-2">`);
			_push(ssrRenderComponent(_component_AppButton, {
				href: __props.result.whatsappUrl,
				variant: "gold",
				size: "md",
				block: ""
			}, {
				leading: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_BrandWhatsAppIcon, { class: "size-4 shrink-0" }, null, _parent, _scopeId));
					else return [createVNode(_component_BrandWhatsAppIcon, { class: "size-4 shrink-0" })];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Send on WhatsApp `);
					else return [createTextVNode(" Send on WhatsApp ")];
				}),
				_: 1
			}, _parent));
			if (__props.result.emailHref) _push(ssrRenderComponent(_component_AppButton, {
				href: __props.result.emailHref,
				variant: "outline",
				size: "md",
				block: "",
				icon: "i-lucide-mail"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Open email draft `);
					else return [createTextVNode(" Open email draft ")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</div><p class="mt-3 text-[10px] leading-relaxed text-muted"> The WhatsApp and email buttons open your own app with the prepared text. Review it before choosing to send. The dealership has not received anything yet. </p><button type="button" class="mt-5 border-t border-line pt-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"> Prepare another message </button></div></div>`);
		};
	}
});
// app/components/forms/EnquiryResultPanel.vue
var _sfc_setup = EnquiryResultPanel_vue_vue_type_script_setup_true_lang_default.setup;
EnquiryResultPanel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/EnquiryResultPanel.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var EnquiryResultPanel_default = Object.assign(EnquiryResultPanel_vue_vue_type_script_setup_true_lang_default, { __name: "EnquiryResultPanel" });
// app/services/enquiryService.ts
function buildPreparedMessage(payload) {
	const intro = `Hello ${dealership.name},`;
	switch (payload.kind) {
		case "contact": return {
			subject: payload.subject,
			body: [
				intro,
				"",
				`Subject: ${payload.subject}`,
				`Name: ${payload.fullName}`,
				`Phone: ${payload.phone}`,
				payload.email ? `Email: ${payload.email}` : null,
				"",
				payload.message,
				"",
				"This message was prepared locally on the demonstration website and has not been sent."
			].filter((line) => line !== null).join("\n")
		};
		case "test-drive": return {
			subject: `Test-drive request — ${payload.vehicleLabel}`,
			body: [
				intro,
				"",
				"I would like to request a test drive.",
				`Vehicle: ${payload.vehicleLabel}`,
				`Name: ${payload.fullName}`,
				`Phone: ${payload.phone}`,
				`Preferred date: ${payload.preferredDate}`,
				`Preferred time: ${payload.preferredTime}`,
				payload.message ? `Notes: ${payload.message}` : null,
				"",
				"I understand this is a request and not a confirmed appointment.",
				"This message was prepared locally on the demonstration website and has not been sent."
			].filter((line) => line !== null).join("\n")
		};
		case "sell-vehicle": return {
			subject: `Vehicle sale / trade-in enquiry — ${payload.make} ${payload.model}`,
			body: [
				intro,
				"",
				"I would like to enquire about selling or trading in my vehicle.",
				`Name: ${payload.fullName}`,
				`Phone: ${payload.phone}`,
				payload.email ? `Email: ${payload.email}` : null,
				`Vehicle: ${payload.year} ${payload.make} ${payload.model}`,
				`Mileage: ${payload.mileage.toLocaleString("en-NG")} km`,
				`Condition: ${payload.condition}`,
				payload.expectedPrice !== void 0 ? `Expected price: ${formatNaira(payload.expectedPrice)}` : null,
				payload.details ? `Additional details: ${payload.details}` : null,
				"",
				"I understand this is an enquiry only and does not represent an offer or guaranteed acceptance.",
				"This message was prepared locally on the demonstration website and has not been sent."
			].filter((line) => line !== null).join("\n")
		};
	}
}
/**
* Phase 1 enquiry service.
*
* IMPORTANT: this implementation never posts to a server, stores data or sends
* an email. It returns an explicit demo result containing a locally prepared
* message that the visitor can review and choose to send themselves.
*/
var DemoEnquiryService = class {
	async submit(payload) {
		const { subject, body } = buildPreparedMessage(payload);
		return {
			status: "demo-prepared",
			preparedMessage: body,
			whatsappUrl: buildWhatsAppUrl(body),
			emailHref: `mailto:${dealership.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
			notice: "Demo only: this message was prepared in your browser. Nothing has been sent, stored or added to a customer database."
		};
	}
};
var enquiryService = new DemoEnquiryService();
// app/composables/useDemoEnquiry.ts
/**
* Shared client-side state for the demonstration enquiry forms. The service
* only prepares a local message; it never transmits or stores form data.
*/
function useDemoEnquiry() {
	const toast = useToast();
	const submitting = ref(false);
	const result = ref(null);
	const submitError = ref("");
	async function submit(payload) {
		if (submitting.value) return;
		submitting.value = true;
		submitError.value = "";
		try {
			result.value = await enquiryService.submit(payload);
		} catch {
			submitError.value = "The local message could not be prepared. Please try again or contact the team directly.";
			toast.add({
				title: "Could not prepare message",
				description: "Nothing was sent. Please try again or use the contact details on this page.",
				icon: "i-lucide-alert-circle",
				color: "error"
			});
		} finally {
			submitting.value = false;
		}
	}
	function reset() {
		result.value = null;
		submitError.value = "";
	}
	return {
		submitting,
		result,
		submitError,
		submit,
		reset
	};
}

export { EnquiryResultPanel_default as E, useDemoEnquiry as u };
//# sourceMappingURL=useDemoEnquiry-BkazzJSu.mjs.map
