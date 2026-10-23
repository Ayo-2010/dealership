import { u as useRoute$1, a as useSeoMeta, W as WhatsAppButton_default, A as AppButton_default, d as dealership, N as NuxtLink, v as vehicleTitle } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './NuxtImg-jexAG5NB.mjs';
import { P as PageHeader_default } from './PageHeader-NdL0o5jz.mjs';
import { a as useVehicles } from './useVehicles-DCwHuUps.mjs';
import { t as todayISODate } from './validation-BW1DElb2.mjs';
import { u as useDemoEnquiry, E as EnquiryResultPanel_default } from './useDemoEnquiry-BkazzJSu.mjs';
import { defineComponent, computed, resolveComponent, withCtx, createTextVNode, createVNode, unref, ref, watch, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
import './useToast-CFIXcbF3.mjs';

// app/components/forms/TestDriveForm.vue?vue&type=script&setup=true&lang.ts
var TestDriveForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TestDriveForm",
	__ssrInlineRender: true,
	props: {
		vehicles: {},
		initialSlug: { default: "" }
	},
	setup(__props) {
		const props = __props;
		const { submitting, result, submitError, reset } = useDemoEnquiry();
		const fullName = ref("");
		const phone = ref("");
		const vehicleSlug = ref("");
		const preferredDate = ref("");
		const preferredTime = ref("");
		const message = ref("");
		const errors = ref({});
		const minDate = todayISODate();
		const timeOptions = [
			"9:00 AM",
			"10:00 AM",
			"11:00 AM",
			"12:00 PM",
			"1:00 PM",
			"2:00 PM",
			"3:00 PM",
			"4:00 PM",
			"5:00 PM"
		];
		const selectableVehicles = computed(() => props.vehicles.filter((vehicle) => vehicle.status !== "sold").sort((a, b) => vehicleTitle(a).localeCompare(vehicleTitle(b), "en")));
		const selectedVehicle = computed(() => selectableVehicles.value.find((vehicle) => vehicle.slug === vehicleSlug.value) ?? null);
		watch(() => [props.vehicles, props.initialSlug], () => {
			if (!props.initialSlug) return;
			const match = selectableVehicles.value.find((vehicle) => vehicle.slug === props.initialSlug);
			if (match) vehicleSlug.value = match.slug;
		}, { immediate: true });
		function prepareAnother() {
			reset();
			nextTick(() => (void 0).getElementById("test-drive-full-name")?.focus());
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_EnquiryResultPanel = EnquiryResultPanel_default;
			const _component_NuxtImg = _sfc_main;
			const _component_NuxtLink = NuxtLink;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_AppButton = AppButton_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			if (unref(result)) _push(ssrRenderComponent(_component_EnquiryResultPanel, {
				result: unref(result),
				title: "Your test-drive request is ready",
				onReset: prepareAnother
			}, null, _parent));
			else {
				_push(`<form class="border border-line bg-white p-5 sm:p-7" novalidate aria-labelledby="test-drive-form-heading"><div class="border-b border-line pb-5"><p class="eyebrow text-gold-dark">Request a test drive</p><h2 id="test-drive-form-heading" class="mt-4 font-display text-2xl font-medium tracking-tight text-ink"> Choose a car and a preferred time. </h2><p class="mt-2 text-[12px] leading-relaxed text-muted"> This is a request, not a confirmed appointment. The team will contact you to confirm availability and timing. </p></div>`);
				if (unref(selectedVehicle)) {
					_push(`<div class="mt-5 flex items-center gap-3 border border-line bg-ivory p-3">`);
					_push(ssrRenderComponent(_component_NuxtImg, {
						src: unref(selectedVehicle).images[0],
						alt: `${unref(vehicleTitle)(unref(selectedVehicle))} — illustrative photograph`,
						width: "160",
						height: "120",
						class: "size-16 shrink-0 object-cover"
					}, null, _parent));
					_push(`<div class="min-w-0"><p class="text-[9px] uppercase tracking-[0.12em] text-muted">Selected vehicle</p><p class="mt-1 truncate font-display text-sm font-medium text-ink">${ssrInterpolate(unref(vehicleTitle)(unref(selectedVehicle)))}</p><p class="mt-0.5 text-[10px] text-muted">${ssrInterpolate(unref(selectedVehicle).stockNumber)} · ${ssrInterpolate(unref(selectedVehicle).status === "reserved" ? "Reserved" : "Available")}</p></div>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/cars/${unref(selectedVehicle).slug}`,
						class: "ml-auto shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-dark hover:text-ink"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` View `);
							else return [createTextVNode(" View ")];
						}),
						_: 1
					}, _parent));
					_push(`</div>`);
				} else _push(`<!---->`);
				if (Object.keys(unref(errors)).length) {
					_push(`<div class="mt-5 border border-red-200 bg-red-50 p-3" role="alert"><p class="flex items-start gap-2 text-[12px] font-medium text-red-800">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-0.5 size-4 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` Please check the highlighted fields below. </p></div>`);
				} else _push(`<!---->`);
				_push(`<div class="mt-6 grid gap-5 sm:grid-cols-2"><div><label for="test-drive-full-name" class="form-label">Full name <span class="text-gold-dark">*</span></label><input id="test-drive-full-name"${ssrRenderAttr("value", unref(fullName))} type="text" class="form-input" autocomplete="name" placeholder="Your full name"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).fullName))}${ssrRenderAttr("aria-describedby", unref(errors).fullName ? "test-drive-full-name-error" : void 0)}>`);
				if (unref(errors).fullName) {
					_push(`<p id="test-drive-full-name-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).fullName)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div><label for="test-drive-phone" class="form-label">Phone number <span class="text-gold-dark">*</span></label><input id="test-drive-phone"${ssrRenderAttr("value", unref(phone))} type="tel" class="form-input" autocomplete="tel" inputmode="tel" placeholder="0801 234 5678"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).phone))}${ssrRenderAttr("aria-describedby", unref(errors).phone ? "test-drive-phone-error" : void 0)}>`);
				if (unref(errors).phone) {
					_push(`<p id="test-drive-phone-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).phone)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div class="sm:col-span-2"><label for="test-drive-vehicleSlug" class="form-label">Vehicle <span class="text-gold-dark">*</span></label><select id="test-drive-vehicleSlug" class="form-select"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).vehicleSlug))}${ssrRenderAttr("aria-describedby", unref(errors).vehicleSlug ? "test-drive-vehicleSlug-error" : void 0)}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(vehicleSlug)) ? ssrLooseContain(unref(vehicleSlug), "") : ssrLooseEqual(unref(vehicleSlug), "")) ? " selected" : ""}>Select a vehicle</option><!--[-->`);
				ssrRenderList(unref(selectableVehicles), (vehicle) => {
					_push(`<option${ssrRenderAttr("value", vehicle.slug)}${ssrIncludeBooleanAttr(Array.isArray(unref(vehicleSlug)) ? ssrLooseContain(unref(vehicleSlug), vehicle.slug) : ssrLooseEqual(unref(vehicleSlug), vehicle.slug)) ? " selected" : ""}>${ssrInterpolate(unref(vehicleTitle)(vehicle))}${ssrInterpolate(vehicle.status === "reserved" ? " — reserved" : "")}</option>`);
				});
				_push(`<!--]--></select>`);
				if (unref(errors).vehicleSlug) {
					_push(`<p id="test-drive-vehicleSlug-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).vehicleSlug)}</p>`);
				} else _push(`<p class="form-hint">Sold vehicles cannot be selected. Reserved vehicles require availability confirmation.</p>`);
				_push(`</div><div><label for="test-drive-preferredDate" class="form-label">Preferred date <span class="text-gold-dark">*</span></label><input id="test-drive-preferredDate"${ssrRenderAttr("value", unref(preferredDate))} type="date" class="form-input"${ssrRenderAttr("min", unref(minDate))}${ssrRenderAttr("aria-invalid", Boolean(unref(errors).preferredDate))}${ssrRenderAttr("aria-describedby", unref(errors).preferredDate ? "test-drive-preferredDate-error" : void 0)}>`);
				if (unref(errors).preferredDate) {
					_push(`<p id="test-drive-preferredDate-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).preferredDate)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div><label for="test-drive-preferredTime" class="form-label">Preferred time <span class="text-gold-dark">*</span></label><select id="test-drive-preferredTime" class="form-select"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).preferredTime))}${ssrRenderAttr("aria-describedby", unref(errors).preferredTime ? "test-drive-preferredTime-error" : void 0)}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(preferredTime)) ? ssrLooseContain(unref(preferredTime), "") : ssrLooseEqual(unref(preferredTime), "")) ? " selected" : ""}>Select a time</option><!--[-->`);
				ssrRenderList(timeOptions, (option) => {
					_push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(unref(preferredTime)) ? ssrLooseContain(unref(preferredTime), option) : ssrLooseEqual(unref(preferredTime), option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
				});
				_push(`<!--]--></select>`);
				if (unref(errors).preferredTime) {
					_push(`<p id="test-drive-preferredTime-error" class="form-error">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(errors).preferredTime)}</p>`);
				} else _push(`<!---->`);
				_push(`</div><div class="sm:col-span-2"><label for="test-drive-message" class="form-label">Notes <span class="normal-case tracking-normal text-muted">(optional)</span></label><textarea id="test-drive-message" class="form-textarea" rows="4" placeholder="Anything the team should know before confirming, such as accessibility needs or a preferred location.">${ssrInterpolate(unref(message))}</textarea></div></div><div class="mt-5 border border-line bg-ivory p-4"><p class="flex items-start gap-2 text-[11px] leading-relaxed text-charcoal/70">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-info",
					class: "mt-0.5 size-3.5 shrink-0 text-gold-dark",
					"aria-hidden": "true"
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(dealership).testDrive.confirmationNotice)}</p></div>`);
				if (unref(submitError)) {
					_push(`<p class="form-error mt-4" role="alert">`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-alert-circle",
						class: "mt-px size-3.5 shrink-0",
						"aria-hidden": "true"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(submitError))}</p>`);
				} else _push(`<!---->`);
				_push(`<div class="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between"><p class="max-w-xs text-[10px] leading-relaxed text-muted"> No appointment is booked by this form. Nothing is sent or stored automatically. </p>`);
				_push(ssrRenderComponent(_component_AppButton, {
					type: "submit",
					variant: "dark",
					size: "lg",
					loading: unref(submitting),
					"trailing-icon": "i-lucide-arrow-right"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Prepare request `);
						else return [createTextVNode(" Prepare request ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></form>`);
			}
			_push(`</div>`);
		};
	}
});
// app/components/forms/TestDriveForm.vue
var _sfc_setup$1 = TestDriveForm_vue_vue_type_script_setup_true_lang_default.setup;
TestDriveForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/TestDriveForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var TestDriveForm_default = Object.assign(TestDriveForm_vue_vue_type_script_setup_true_lang_default, { __name: "TestDriveForm" });
// app/pages/test-drive.vue?vue&type=script&setup=true&lang.ts
var test_drive_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "test-drive",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute$1();
		const { vehicles } = useVehicles();
		const initialSlug = computed(() => typeof route.query.vehicle === "string" ? route.query.vehicle : "");
		const selectedVehicle = computed(() => initialSlug.value ? vehicles.value.find((vehicle) => vehicle.slug === initialSlug.value) ?? null : null);
		const steps = [
			{
				title: "Choose a vehicle and time",
				description: "Pick a listed vehicle and a preferred date and time. Reserved vehicles are still selectable, but availability must be confirmed."
			},
			{
				title: "Review the prepared message",
				description: "The form prepares a request locally. Nothing is sent automatically. You can copy it, open WhatsApp or email it yourself."
			},
			{
				title: "Wait for confirmation",
				description: "A request is not a booking. The team must confirm the vehicle, appointment time, location and any requirements with you directly."
			}
		];
		useSeoMeta({
			title: "Request a test drive",
			description: "Request a test drive at Vantage Motors. Choose a vehicle and preferred time, then prepare a local request. An appointment is only confirmed directly by the dealership.",
			ogTitle: "Request a test drive · Vantage Motors",
			ogDescription: "Choose a vehicle and preferred time, then prepare a test-drive request. Nothing is booked automatically."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHeader = PageHeader_default;
			const _component_WhatsAppButton = WhatsAppButton_default;
			const _component_AppButton = AppButton_default;
			const _component_NuxtLink = NuxtLink;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_TestDriveForm = TestDriveForm_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHeader, {
				title: "Request a test drive.",
				eyebrow: "Behind the wheel",
				description: "Choose a vehicle and a preferred time. The request is prepared locally for you to review and send — the dealership must confirm the appointment directly.",
				crumbs: [{ label: "Test drive" }]
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_WhatsAppButton, {
							label: "Ask about test drives",
							variant: "gold",
							size: "lg"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_AppButton, {
							to: "/cars",
							variant: "light-outline",
							size: "lg",
							"trailing-icon": "i-lucide-arrow-right"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Browse vehicles `);
								else return [createTextVNode(" Browse vehicles ")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_WhatsAppButton, {
						label: "Ask about test drives",
						variant: "gold",
						size: "lg"
					}), createVNode(_component_AppButton, {
						to: "/cars",
						variant: "light-outline",
						size: "lg",
						"trailing-icon": "i-lucide-arrow-right"
					}, {
						default: withCtx(() => [createTextVNode(" Browse vehicles ")]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`<section class="section-space bg-ivory" aria-labelledby="test-drive-heading"><div class="shell grid gap-10 lg:grid-cols-12 lg:gap-12"><div class="lg:col-span-5"><p class="eyebrow text-gold-dark">Before you request</p><h2 id="test-drive-heading" class="section-title mt-4"> A request, not a reservation. </h2><p class="mt-4 max-w-lg text-[13px] leading-relaxed text-muted">${ssrInterpolate(unref(dealership).testDrive.confirmationNotice)}</p><ol class="mt-8 border-y border-line"><!--[-->`);
			ssrRenderList(steps, (step, index) => {
				_push(`<li class="flex gap-4 border-b border-line py-5 last:border-b-0"><span class="font-display text-[10px] tracking-[0.16em] text-gold-dark">${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span><div><h3 class="font-display text-sm font-medium tracking-tight text-ink">${ssrInterpolate(step.title)}</h3><p class="mt-1.5 text-[11px] leading-relaxed text-muted">${ssrInterpolate(step.description)}</p></div></li>`);
			});
			_push(`<!--]--></ol>`);
			if (unref(selectedVehicle)) {
				_push(`<div class="mt-6 border border-gold/40 bg-gold-50 p-4"><p class="text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Vehicle from listing</p><p class="mt-1.5 font-display text-sm font-medium text-ink">${ssrInterpolate(unref(selectedVehicle).year)} ${ssrInterpolate(unref(selectedVehicle).make)} ${ssrInterpolate(unref(selectedVehicle).model)}</p>`);
				if (unref(selectedVehicle).status === "reserved") _push(`<p class="mt-1 text-[10px] leading-relaxed text-amber-800"> This vehicle is currently marked as reserved. The form allows the request, but availability must be confirmed. </p>`);
				else _push(`<!---->`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/cars/${unref(selectedVehicle).slug}`,
					class: "mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink hover:text-gold-dark"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(` View listing `);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-arrow-right",
								class: "size-3",
								"aria-hidden": "true"
							}, null, _parent, _scopeId));
						} else return [createTextVNode(" View listing "), createVNode(_component_UIcon, {
							name: "i-lucide-arrow-right",
							class: "size-3",
							"aria-hidden": "true"
						})];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<div class="mt-6 border border-line bg-white p-5"><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">What to bring</p><p class="mt-2 text-[11px] leading-relaxed text-muted"> The dealership will explain its requirements before the appointment, including any licence, age or insurance conditions. Requirements can vary by vehicle. Ask before travelling. </p>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/faq",
				class: "mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-dark hover:text-ink"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(` Read the FAQ `);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-arrow-right",
							class: "size-3",
							"aria-hidden": "true"
						}, null, _parent, _scopeId));
					} else return [createTextVNode(" Read the FAQ "), createVNode(_component_UIcon, {
						name: "i-lucide-arrow-right",
						class: "size-3",
						"aria-hidden": "true"
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="lg:col-span-7">`);
			if (unref(dealership).testDrive.enabled) _push(ssrRenderComponent(_component_TestDriveForm, {
				vehicles: unref(vehicles),
				"initial-slug": unref(initialSlug)
			}, null, _parent));
			else {
				_push(`<div class="border border-line bg-white p-6"><p class="font-display text-lg font-medium text-ink">Test-drive requests are currently unavailable.</p><p class="mt-2 text-[12px] leading-relaxed text-muted">Please contact the team directly to discuss viewing a vehicle.</p>`);
				_push(ssrRenderComponent(_component_AppButton, {
					to: "/contact",
					variant: "dark",
					size: "md",
					class: "mt-4"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Contact the team`);
						else return [createTextVNode("Contact the team")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			}
			_push(`</div></div></section></div>`);
		};
	}
});
// app/pages/test-drive.vue
var _sfc_setup = test_drive_vue_vue_type_script_setup_true_lang_default.setup;
test_drive_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-drive.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var test_drive_default = test_drive_vue_vue_type_script_setup_true_lang_default;

export { test_drive_default as default };
//# sourceMappingURL=test-drive-DMvxa4Vr.mjs.map
