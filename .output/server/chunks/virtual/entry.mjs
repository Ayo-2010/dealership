import { defineProdDiagnostics } from 'nostics';
import { ansiFormatter } from 'nostics/formatters/ansi';
import { shallowReactive, reactive, effectScope, hasInjectionContext, getCurrentInstance, inject, getCurrentScope, toRef, ref, watchEffect, onScopeDispose, isRef, toValue, defineComponent, resolveComponent, shallowRef, h, unref, computed, createApp, provide, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode, createElementBlock, mergeProps, renderSlot, isVNode, customRef, cloneVNode, isReadonly, defineAsyncComponent, useSSRContext, Suspense, isShallow, isReactive, toRaw, watch, nextTick, queuePostFlushCb } from 'vue';
import { F as createHooks, i as createError, G as parseURL, H as decodePath, z as joinURL, I as withQuery, J as isScriptProtocol, K as sanitizeStatusCode, L as parseQuery, M as hasProtocol, O as withTrailingSlash, P as withoutTrailingSlash, $ as $fetch, Q as baseURL, R as klona, S as parse, T as getRequestHeader, U as parseSetCookie, V as isEqual, W as splitCookiesString, X as getResponseHeader, Y as setCookie, Z as getCookie, _ as deleteCookie, a0 as getRequestURL, a1 as defuFn, a2 as defu } from '../_/nitro.mjs';
import { FlatMetaPlugin } from 'unhead/plugins';
import { walkResolver, hasOwn } from 'unhead/utils';
import { START_LOCATION, RouterView, createMemoryHistory, createRouter, isNavigationFailure, NavigationFailureType } from 'vue-router';
import { _api, addAPIProvider, setCustomIconsLoader } from '@iconify/vue';
import colors$1 from 'tailwindcss/colors';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderSlot, ssrRenderTeleport } from 'vue/server-renderer';

// node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var ansi = (open, close) => (s) => `\x1B[${open}m${s}\x1B[${close}m`;
var colors = {
	red: ansi(31, 39),
	yellow: ansi(33, 39),
	cyan: ansi(36, 39),
	gray: ansi(90, 39),
	bold: ansi(1, 22),
	dim: ansi(2, 22)
};
ansiFormatter(colors);
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
// node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/unctx/dist/index.mjs
function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
var _WeakRef = globalThis.WeakRef || class StrongRef {
	#value;
	constructor(value) {
		this.#value = value;
	}
	deref() {
		return this.#value;
	}
};
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new _WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance() ?? null;
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
			currentInstance = instance;
			isSingleton = true;
		},
		unset: () => {
			currentInstance = void 0;
			isSingleton = false;
		},
		call: (instance, callback) => {
			checkConflict(instance);
			currentInstance = instance;
			try {
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
			}
		},
		async callAsync(instance, callback) {
			currentInstance = instance;
			const onRestore = () => {
				currentInstance = instance;
			};
			const onLeave = () => currentInstance === instance ? onRestore : void 0;
			asyncHandlers.add(onLeave);
			try {
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
var _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
var globalKey = "__unctx__";
var defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
var getContext$1 = (key, opts = {}) => defaultNamespace.get(key, opts);
var asyncHandlersKey = "__unctx_async_handlers__";
var asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
	const restores = [];
	for (const leaveHandler of asyncHandlers) {
		const restore = leaveHandler();
		if (restore) restores.push(restore);
	}
	const restore = () => {
		for (const restore of restores) restore();
	};
	let awaitable = function_();
	if (awaitable && typeof awaitable === "object" && "catch" in awaitable) awaitable = awaitable.catch((error) => {
		restore();
		throw error;
	});
	return [awaitable, restore];
}
// node_modules/nuxt/dist/app/internal/context.js
globalThis.__nuxt_app_ctx__ ||= {};
function getContext(key, opts) {
	return getContext$1(key, opts);
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
var asyncDataDefaults = { "deep": false };
// node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.6.2";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const runHooks = async (hooks, args) => {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		const contextCaller = runHooks;
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	let error;
	for (const plugin of plugins) try {
		await applyPlugin(nuxtApp, plugin);
	} catch (e) {
		if (!nuxtApp.payload.error) throw e;
		error ||= e;
	}
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}
/** @since 3.0.0 */
function defineAppConfig(config) {
	return config;
}
// node_modules/nuxt/dist/app/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError$2 = (error) => {
	if (isNuxtError(error)) return error;
	if (typeof error !== "string" && error?.statusText) error.message ??= error.statusText;
	const nuxtError = createError(error ?? {});
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	Object.defineProperty(nuxtError, "status", {
		get: () => nuxtError.statusCode,
		configurable: true
	});
	Object.defineProperty(nuxtError, "statusText", {
		get: () => nuxtError.statusMessage,
		configurable: true
	});
	return nuxtError;
};
// node_modules/nuxt/dist/app/utils.js
var PROBE_BASE_A = "https://a.invalid/probe/";
var PROBE_BASE_B = "https://b.invalid/probe/";
function parseAnchorURL(value, base = PROBE_BASE_A) {
	try {
		return new URL(value, base);
	} catch {
		return null;
	}
}
function resolvesWithoutBase(value) {
	const resolved = parseAnchorURL(value);
	return !!resolved && resolved.href === parseAnchorURL(value, PROBE_BASE_B)?.href;
}
/** Whether a URL string is a path rooted at the current origin, so carries no protocol. */
function isRootedPath(value) {
	if (value[0] !== "/" || value[1] === "/" || value[1] === "\\") return false;
	return value[1] !== "	" && value[1] !== "\n" && value[1] !== "\r" || !resolvesWithoutBase(value);
}
/** Whether a URL string carries its own protocol or authority. */
function isAbsoluteHref(value) {
	return !!value && !isRootedPath(value) && resolvesWithoutBase(value);
}
/** The script-capable protocol a URL string would navigate to, or `null` when it is safe. */
function getScriptProtocol(value) {
	if (!value || isRootedPath(value)) return null;
	let resolved = parseAnchorURL(value.replace(/[\u0000-\u001F\u007F\s]+/g, ""));
	while (resolved?.protocol === "view-source:") resolved = parseAnchorURL(resolved.pathname);
	if (!resolved) return "";
	return isScriptProtocol(resolved.protocol) ? resolved.protocol : null;
}
/** Returns the value unchanged when safe to use as an anchor `href`, or `null`. */
function sanitizeAnchorHref(value) {
	return getScriptProtocol(value) === null ? value : null;
}
// node_modules/nuxt/dist/app/components/injections.js
var LayoutMetaSymbol = Symbol("layout-meta");
var PageRouteSymbol = Symbol("route");
// node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = (() => {
	return useNuxtApp()?.$router;
});
/**
* Whether the current effect scope is (a descendant of) the component instance's scope.
* A detached scope (e.g. `createSharedComposable`) outlives the component, so the
* per-page route injected there would freeze after navigation (#18903).
*/
function getParentScope(scope) {
	const internal = scope;
	return internal.parent ?? internal.subs?.sub;
}
function isScopeWithinInstance(instance) {
	const instanceScope = instance.scope;
	let scope = getCurrentScope();
	while (scope) {
		if (scope === instanceScope) return true;
		scope = getParentScope(scope);
	}
	return false;
}
/** @since 3.0.0 */
var useRoute$1 = (() => {
	if (hasInjectionContext()) {
		const instance = getCurrentInstance();
		if (!instance || isScopeWithinInstance(instance)) return inject(PageRouteSymbol, useNuxtApp()._route);
	}
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
/**
* A helper that aids in programmatic navigation within your Nuxt application.
*
* Can be called on the server and on the client, within pages, route middleware, plugins, and more.
* @param {RouteLocationRaw | undefined | null} [to] - The route to navigate to. Accepts a route object, string path, `undefined`, or `null`. Defaults to '/'.
* @param {NavigateToOptions} [options] - Optional customization for controlling the behavior of the navigation.
* @returns {Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw} The navigation result, which varies depending on context and options.
* @see https://nuxt.com/docs/4.x/api/utils/navigate-to
* @since 3.0.0
*/
var navigateTo = (to, options) => {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = isAbsoluteHref(toPath);
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const protocol = getScriptProtocol(toPath);
		if (protocol !== null) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedHeader = encodeURL(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			let expectedPath = fullPath;
			if (typeof to === "string" && toPath.includes("?")) {
				const target = router.resolve(to);
				expectedPath = router.resolve({
					path: target.path,
					query: target.query,
					hash: target.hash
				}).fullPath || "/";
			}
			router.afterEach((final) => final.fullPath === expectedPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._scope.stop();
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
/**
* @internal
*/
function resolveRouteObject(to) {
	return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL(url);
	return encodeVueRouterPath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
var ENC_PIPE_RE = /%7C/g;
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_ENC_SLASH_RE = /%252F/gi;
var HASH_RE = /#/g;
var QUESTION_MARK_RE = /\?/g;
/**
* Apply vue-router's own path encoding, which leaves sub-delimiters like `&`
* and `+` literal. This must stay in sync with `encodeVueRouterPath` in
* `unrouting`, which encodes the route records we need to match against.
*/
function encodeVueRouterPath(value) {
	return encodeURI(value).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]").replace(HASH_RE, "%23").replace(QUESTION_MARK_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F");
}
// node_modules/nuxt/dist/app/composables/error.js
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError$2(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
/**
* Show the error page unless the current client is a crawler, in which case the
* bot receives the already server-rendered HTML instead (#32137, #35338).
*
* @internal
*/
var _showErrorUnlessCrawler = async (nuxtApp, error) => {
	await nuxtApp.runWithContext(() => showError(error));
};
/** @since 3.0.0 */
var clearError = async (options = {}) => {
	const nuxtApp = useNuxtApp();
	const error = /* @__PURE__ */ useError();
	nuxtApp.callHook("app:error:cleared", options);
	if (options.redirect) await useRouter().replace(options.redirect);
	error.value = void 0;
};
// node_modules/nuxt/dist/app/diagnostics/head.js
/**
* E6xxx
* Head / unhead runtime diagnostics.
*/
var unheadDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/@unhead/vue/dist/shared/vue.DKb5ZKVl.mjs
var headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function injectHead$1() {
	if (hasInjectionContext()) {
		const instance = inject(headSymbol);
		if (instance) return instance;
	}
	throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
// node_modules/@unhead/vue/dist/shared/vue.D2XR8FqS.mjs
var VueResolver = /* @__PURE__ */ Object.assign((_, value) => isRef(value) ? toValue(value) : value, { _static: true });
// node_modules/@unhead/vue/dist/shared/vue.CXwiCT15.mjs
function useHead$1(input, options = {}) {
	const head = options.head || /* @__PURE__ */ injectHead$1();
	return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
	const scope = getCurrentScope();
	if (scope && !scope.active) return {
		patch() {},
		dispose() {},
		_i: -1
	};
	const deactivated = ref(false);
	if (options.onRendered && scope) {
		const _onRendered = options.onRendered;
		options = {
			...options,
			onRendered: (ctx) => scope.run(() => _onRendered(ctx))
		};
	}
	let entry;
	watchEffect(() => {
		const i = deactivated.value ? {} : walkResolver(input, VueResolver);
		if (entry) entry.patch(i);
		else entry = head.push(i, options);
	});
	if (getCurrentInstance()) ; else if (scope) onScopeDispose(() => entry.dispose());
	return entry;
}
function normalizeSeoMetaInput(input) {
	if (input._flatMeta) return input;
	const meta = {};
	for (const key in input) {
		if (!hasOwn(input, key) || key === "title" || key === "titleTemplate") continue;
		meta[key] = input[key];
	}
	return {
		title: input.title,
		titleTemplate: input.titleTemplate,
		_flatMeta: meta
	};
}
function useSeoMeta$1(input = {}, options = {}) {
	(options.head || /* @__PURE__ */ injectHead$1()).use(FlatMetaPlugin);
	const entry = useHead$1(normalizeSeoMetaInput(input), options);
	const corePatch = entry.patch;
	if (!entry.__patched) {
		entry.patch = (input2) => corePatch(normalizeSeoMetaInput(input2));
		entry.__patched = true;
	}
	return entry;
}
// node_modules/nuxt/dist/head/runtime/composables.js
/**
* Injects the head client from the Nuxt context or Vue inject.
*/
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || useNuxtApp();
	return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
		if (hasInjectionContext()) {
			const head = inject("usehead");
			if (!head) throw unheadDiagnostics.NUXT_E6001();
			return head;
		}
	});
}
function useHead(input, options = {}) {
	return useHead$1(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}
function useSeoMeta(input, options = {}) {
	return useSeoMeta$1(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}
// node_modules/nuxt/dist/app/components/utils.js
var ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
function generateRouteKey$1(route) {
	const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => route.params[r.slice(1)]?.toString() || "");
	return typeof source === "function" ? source(route) : source;
}
/**
* Utility used within router guards
* return true if the route has been changed with a page change during navigation
*/
function isChangingPage(to, from) {
	if (to === from || from === START_LOCATION) return false;
	if (generateRouteKey$1(to) !== generateRouteKey$1(from)) return true;
	if (to.matched.every((comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default)) return false;
	return true;
}
var VALID_TAG_RE = /^[a-z][a-z0-9-]*$/i;
/** Return `tag` if it is a safe HTML tag name, otherwise `fallback`. */
function sanitizeTag(tag, fallback) {
	return tag && VALID_TAG_RE.test(tag) ? tag : fallback;
}

// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch.create({ baseURL: baseURL() });
var $fetch$2 = globalThis.$fetch;
// node_modules/nuxt/dist/app/composables/ssr.js
var $fetch$1 = $fetch$2;
/** @since 3.0.0 */
function useRequestEvent(nuxtApp) {
	nuxtApp ||= useNuxtApp();
	return nuxtApp.ssrContext?.event;
}
/** @since 3.2.0 */
function useRequestFetch() {
	return useRequestEvent()?.$fetch || $fetch$1;
}
// node_modules/nuxt/dist/pages/runtime/router.options.js
var router_options_default = { scrollBehavior(to, from, savedPosition) {
	const nuxtApp = useNuxtApp();
	const router = useRouter();
	const hashScrollBehaviour = router.options?.scrollBehaviorType ?? "auto";
	if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
		if (from.hash && !to.hash) return savedPosition ?? {
			left: 0,
			top: 0
		};
		if (to.hash) return {
			el: to.hash,
			top: _getHashElementScrollMarginTop(to.hash),
			behavior: hashScrollBehaviour
		};
		return false;
	}
	if ((typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop) === false) return false;
	if (from === START_LOCATION) return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
	return new Promise((resolve) => {
		const doScroll = () => {
			requestAnimationFrame(() => {
				if (router.currentRoute.value.fullPath !== to.fullPath) {
					resolve(false);
					return;
				}
				resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
			});
		};
		nuxtApp.hooks.hookOnce("page:loading:end", () => {
			const transitionPromise = nuxtApp["~transitionPromise"];
			if (transitionPromise) transitionPromise.then(doScroll);
			else doScroll();
		});
	});
} };
function _getHashElementScrollMarginTop(hash) {
	const elem = (void 0).getElementById(hash.slice(1));
	if (!elem) return 0;
	return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
	if (savedPosition) return savedPosition;
	if (to.hash) return {
		el: to.hash,
		top: _getHashElementScrollMarginTop(to.hash),
		behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
	};
	return {
		left: 0,
		top: 0
	};
}
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default = {
	hashMode: false,
	scrollBehaviorType: "auto",
	sensitive: false,
	...router_options_default
};
// node_modules/nuxt/dist/app/components/nuxt-link.js
var firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtLink(options) {
	const componentName = options.componentName || "NuxtLink";
	function isHashLinkWithoutHashMode(link) {
		return typeof link === "string" && link.startsWith("#");
	}
	function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
		const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
		if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") return to;
		if (typeof to === "string") return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
		const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
		return {
			...to,
			name: void 0,
			path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
		};
	}
	/**
	* The link state `<NuxtLink>` renders with. Kept separate from `useNuxtLink` so the component
	* does not resolve the `<RouterLink>` link state backing `route`/`isActive`/`isExactActive`,
	* which it never reads.
	*/
	function useLinkTarget(props) {
		const router = useRouter();
		const config = /* @__PURE__ */ useRuntimeConfig();
		const rootedHref = router.options?.history?.createHref ?? ((path) => joinURL(config.app.baseURL, path));
		const hasTarget = computed(() => !!unref(props.target) && unref(props.target) !== "_self");
		const isAbsoluteUrl = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			return typeof path === "string" && isAbsoluteHref(path);
		});
		const isExternal = computed(() => {
			if (unref(props.external)) return true;
			const path = unref(props.to) || unref(props.href) || "";
			if (typeof path === "object") return false;
			return path === "" || isAbsoluteUrl.value;
		});
		const to = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			if (isExternal.value) return path;
			return resolveTrailingSlashBehavior(path, router.resolve, unref(props.trailingSlash));
		});
		const href = computed(() => {
			const effectiveTrailingSlash = unref(props.trailingSlash) ?? options.trailingSlash;
			if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
				const raw = to.value;
				return typeof raw === "string" ? sanitizeAnchorHref(raw) : raw;
			}
			if (isExternal.value) {
				const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
				const href = typeof path === "object" ? router.resolve(path).href : path;
				const safe = typeof href === "string" ? sanitizeAnchorHref(href) : href;
				return safe === null ? null : applyTrailingSlashBehavior(safe, effectiveTrailingSlash);
			}
			if (typeof to.value === "object") return router.resolve(to.value)?.href ?? null;
			return applyTrailingSlashBehavior(isRootedPath(to.value) ? rootedHref(to.value) : router.resolve(to.value).href, effectiveTrailingSlash);
		});
		return {
			to,
			hasTarget,
			isAbsoluteUrl,
			isExternal,
			href,
			async navigate(_e) {
				if (href.value === null) return;
				await navigateTo(href.value, {
					replace: unref(props.replace),
					external: isExternal.value || hasTarget.value
				});
			}
		};
	}
	function useNuxtLink(props) {
		const router = useRouter();
		const target = useLinkTarget(props);
		const builtinRouterLink = resolveComponent("RouterLink");
		const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
		const link = target.isExternal.value ? void 0 : useBuiltinLink?.({
			...props,
			to: target.to,
			viewTransition: unref(props.viewTransition)
		});
		return {
			...target,
			isActive: link?.isActive ?? computed(() => target.to.value === router.currentRoute.value.path),
			isExactActive: link?.isExactActive ?? computed(() => target.to.value === router.currentRoute.value.path),
			route: link?.route ?? computed(() => router.resolve(target.to.value))
		};
	}
	/**
	* Render an internal link as a plain anchor, matching the markup `<RouterLink>` produces
	* for the same location.
	*/
	function renderStaticInternalLink(props, slots, router, rawTo) {
		const route = router.resolve(resolveTrailingSlashBehavior(rawTo, router.resolve, props.trailingSlash));
		const currentRoute = router.currentRoute.value;
		const index = activeRecordIndex(route, currentRoute);
		const isActive = index > -1 && includesParams(currentRoute.params, route.params);
		const isExactActive = index > -1 && index === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.params);
		let dataInternal;
		const routerOptions = router.options;
		const href = sanitizeAnchorHref(route.href);
		return h("a", {
			"aria-current": isExactActive ? props.ariaCurrentValue ?? "page" : null,
			href,
			"class": {
				[getLinkClass(props.activeClass || options.activeClass, routerOptions.linkActiveClass, "router-link-active")]: isActive,
				[getLinkClass(props.exactActiveClass || options.exactActiveClass, routerOptions.linkExactActiveClass, "router-link-exact-active")]: isExactActive
			},
			"rel": props.rel || void 0,
			"data-internal": dataInternal
		}, slots.default?.({
			route,
			href,
			isActive,
			isExactActive,
			navigate: () => navigateTo(route.href, { replace: props.replace })
		}));
	}
	return defineComponent({
		name: componentName,
		props: {
			to: {
				type: [String, Object],
				required: false
			},
			href: {
				type: [String, Object],
				required: false
			},
			target: {
				type: String,
				required: false
			},
			rel: {
				type: String,
				required: false
			},
			noRel: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetchOn: {
				type: [String, Object],
				required: false
			},
			noPrefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			activeClass: {
				type: String,
				required: false
			},
			exactActiveClass: {
				type: String,
				required: false
			},
			prefetchedClass: {
				type: String,
				required: false
			},
			replace: {
				type: Boolean,
				default: void 0,
				required: false
			},
			ariaCurrentValue: {
				type: String,
				required: false
			},
			external: {
				type: Boolean,
				default: void 0,
				required: false
			},
			custom: {
				type: Boolean,
				default: void 0,
				required: false
			},
			trailingSlash: {
				type: String,
				required: false
			}
		},
		useLink: useNuxtLink,
		setup(props, { slots }) {
			const router = useRouter();
			if (!props.custom) {
				const rawTo = props.to || props.href || "";
				if (!(props.external || typeof rawTo === "string" && (rawTo === "" || isAbsoluteHref(rawTo))) && !isHashLinkWithoutHashMode(rawTo) && (!props.target || props.target === "_self")) return () => renderStaticInternalLink(props, slots, router, rawTo);
			}
			const routerLinkComponent = resolveComponent("RouterLink");
			const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useLinkTarget(props);
			const prefetched = shallowRef(false);
			const el = void 0;
			const elRef = void 0;
			function shouldPrefetch(mode) {
				return false;
			}
			async function prefetch(nuxtApp = useNuxtApp()) {}
			return () => {
				const target = props.target || null;
				const rel = firstNonUndefined(props.noRel ? "" : props.rel, options.externalRelAttribute, isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : "") || null;
				const getCustomSlotProps = (routerLinkSlotProps) => ({
					navigate,
					get route() {
						if (!href.value) return;
						const url = new URL(href.value, "http://localhost");
						return {
							path: url.pathname,
							fullPath: url.pathname,
							get query() {
								return parseQuery(url.search);
							},
							hash: url.hash,
							params: {},
							name: void 0,
							matched: [],
							redirectedFrom: void 0,
							meta: {},
							href: href.value
						};
					},
					rel,
					target,
					isExternal: isExternal.value || hasTarget.value,
					isActive: false,
					isExactActive: false,
					...routerLinkSlotProps,
					href: typeof routerLinkSlotProps?.href === "string" ? sanitizeAnchorHref(routerLinkSlotProps.href) : href.value,
					prefetch,
					prefetched: prefetched.value,
					shouldPrefetch
				});
				if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
					const routerLinkProps = {
						ref: elRef,
						to: to.value,
						activeClass: props.activeClass || options.activeClass,
						exactActiveClass: props.exactActiveClass || options.exactActiveClass,
						replace: props.replace,
						ariaCurrentValue: props.ariaCurrentValue,
						custom: props.custom
					};
					if (!props.custom) routerLinkProps.rel = props.rel || void 0;
					return h(routerLinkComponent, routerLinkProps, props.custom && slots.default ? { default: (slotProps) => slots.default(getCustomSlotProps(slotProps)) } : slots.default);
				}
				if (props.custom) {
					if (!slots.default) return null;
					return slots.default(getCustomSlotProps());
				}
				return h("a", {
					ref: el,
					href: href.value || null,
					rel,
					target,
					onClick: async (event) => {
						if (isExternal.value || hasTarget.value) return;
						event.preventDefault();
						try {
							const encodedHref = encodeRoutePath(href.value ?? "");
							return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
						} finally {}
					}
				}, slots.default?.());
			};
		}
	});
}
var NuxtLink = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function isSameRouteRecord(a, b) {
	return (a.aliasOf || a) === (b.aliasOf || b);
}
function getOriginalPath(record) {
	return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
function isEquivalentArray(a, b) {
	return Array.isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isSameParamValue(a, b) {
	return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : (a && a.valueOf()) === (b && b.valueOf());
}
function isSameRouteLocationParams(a, b) {
	if (Object.keys(a).length !== Object.keys(b).length) return false;
	for (const key in a) if (!isSameParamValue(a[key], b[key])) return false;
	return true;
}
function includesParams(outer, inner) {
	for (const key in inner) {
		const innerValue = inner[key];
		const outerValue = outer[key];
		if (typeof innerValue === "string") {
			if (innerValue !== outerValue) return false;
		} else if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
	}
	return true;
}
function activeRecordIndex(route, currentRoute) {
	const { matched } = route;
	const { length } = matched;
	const routeMatched = matched[length - 1];
	const currentMatched = currentRoute.matched;
	if (!routeMatched || !currentMatched.length) return -1;
	const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
	if (index > -1) return index;
	const parentRecordPath = getOriginalPath(matched[length - 2]);
	return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
}
/** Resolve an active-link class, falling back from the per-link value to the router-wide one. */
function getLinkClass(propClass, globalClass, defaultClass) {
	return propClass ?? globalClass ?? defaultClass;
}
function applyTrailingSlashBehavior(to, trailingSlash) {
	if (trailingSlash !== "append" && trailingSlash !== "remove") return to;
	const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
	if (hasProtocol(to) && !to.startsWith("http")) return to;
	return normalizeFn(to, true);
}
// app/config/dealership.ts
var dealership = {
	name: "Vantage Motors",
	shortName: "Vantage",
	legalName: "Vantage Motors (placeholder business name)",
	tagline: "Exceptional Cars. Exceptional Confidence.",
	description: "A curated selection of brand-new and pre-owned vehicles, presented with transparent listed prices and straightforward enquiries.",
	/** Update this before launch. `.example` domains are reserved for documentation. */
	url: "https://vantagemotors.example",
	logo: {
		primary: "/images/branding/vantage-logo.svg",
		light: "/images/branding/vantage-logo-light.svg",
		mark: "/images/branding/vantage-mark.svg"
	},
	contact: {
		whatsapp: {
			/** International format, digits only. Used to build wa.me links. */
			international: "2348012345678",
			/** Human-readable placeholder. */
			display: "+234 801 234 5678"
		},
		phone: {
			/** E.164 format for `tel:` links. */
			e164: "+2348012345678",
			display: "+234 801 234 5678"
		},
		email: "hello@vantagemotors.example"
	},
	address: {
		line1: "12 Example Close",
		area: "Victoria Island",
		city: "Lagos",
		state: "Lagos",
		postalCode: "101241",
		country: "Nigeria",
		/** Display-ready placeholder address. */
		get display() {
			return "12 Example Close, Victoria Island, Lagos, Nigeria";
		},
		isPlaceholder: true
	},
	hours: [
		{
			days: "Monday – Friday",
			hours: "9:00 AM – 6:00 PM"
		},
		{
			days: "Saturday",
			hours: "10:00 AM – 4:00 PM"
		},
		{
			days: "Sunday",
			hours: "Closed"
		},
		{
			days: "Public holidays",
			hours: "By appointment"
		}
	],
	socials: [{
		label: "Instagram",
		handle: "@vantagemotors (placeholder)",
		href: "https://www.instagram.com/",
		placeholder: true
	}, {
		label: "Facebook",
		handle: "Vantage Motors (placeholder)",
		href: "https://www.facebook.com/",
		placeholder: true
	}],
	currency: {
		code: "NGN",
		symbol: "₦",
		locale: "en-NG"
	},
	locale: "en-NG",
	/** Business facts that are not yet verified. */
	facts: {
		yearFounded: null,
		team: [],
		awards: []
	},
	services: [
		{
			key: "curated-selection",
			label: "Curated vehicle selection",
			description: "A focused inventory of new and pre-owned vehicles, chosen for condition, specification and presentation.",
			enabled: true
		},
		{
			key: "transparent-pricing",
			label: "Transparent listed prices",
			description: "Every listing displays its price in Nigerian naira, so you can compare vehicles without guesswork.",
			enabled: true
		},
		{
			key: "responsive-enquiries",
			label: "Responsive customer enquiries",
			description: "Contact the sales team directly by WhatsApp or telephone. Enquiry response times depend on showroom hours and team availability.",
			enabled: true
		},
		{
			key: "documentation",
			label: "Documentation assistance",
			description: "Guidance with the vehicle paperwork and ownership documents required for your purchase. Availability and requirements vary by vehicle.",
			enabled: true
		},
		{
			key: "trade-in",
			label: "Trade-in enquiries",
			description: "Tell us about your current vehicle. The team can review the details and discuss whether a trade-in arrangement is possible.",
			enabled: true
		},
		{
			key: "financing",
			label: "Vehicle financing",
			description: "Financing is not offered directly by this dealership. Ask the team about any third-party options that may be available.",
			enabled: false
		},
		{
			key: "delivery",
			label: "Vehicle delivery",
			description: "Delivery is arranged case by case and is not included in the listed price unless confirmed in writing.",
			enabled: false
		},
		{
			key: "warranty",
			label: "Extended warranty",
			description: "Extended warranty cover is not currently offered by the dealership. Any manufacturer warranty is vehicle-specific.",
			enabled: false
		},
		{
			key: "insurance",
			label: "Insurance",
			description: "The dealership does not currently arrange insurance. Buyers should arrange cover with a licensed insurer.",
			enabled: false
		}
	],
	serviceByKey(key) {
		return dealership.services.find((service) => service.key === key);
	},
	isServiceEnabled(key) {
		return dealership.services.some((service) => service.key === key && service.enabled);
	},
	theme: {
		colors: {
			obsidian: "#111315",
			charcoal: "#1B1E21",
			gold: "#B69A63",
			ivory: "#F5F5F3",
			white: "#FFFFFF",
			ink: "#17191C",
			muted: "#6B7075",
			line: "#E6E5E1"
		},
		radius: "0.25rem"
	},
	/**
	* Frontend demonstration mode. When true, forms prepare a local message and
	* never claim to submit, send or store data.
	*/
	demoMode: true,
	demoNotice: "Demonstration website. Sample inventory, placeholder business details and demo-only form results. No enquiry is transmitted or stored.",
	defaultSort: "recommended",
	inventoryPerPage: 9,
	/** Price threshold used for the "Luxury" category shortcut. */
	luxuryPriceThreshold: 7e7,
	mapEmbedUrl: "",
	testDrive: {
		enabled: true,
		confirmationNotice: "A test-drive request is not a confirmed appointment. The dealership will contact you to confirm availability, timing and location."
	},
	announcement: {
		enabled: true,
		label: "New arrivals",
		text: "Freshly listed vehicles have joined the collection.",
		href: "/new-arrivals",
		linkLabel: "View new arrivals"
	},
	navigation: [
		{
			label: "Home",
			to: "/"
		},
		{
			label: "Browse Cars",
			to: "/cars"
		},
		{
			label: "New Arrivals",
			to: "/new-arrivals"
		},
		{
			label: "Sell Your Car",
			to: "/sell-your-car"
		},
		{
			label: "About Us",
			to: "/about"
		},
		{
			label: "Contact",
			to: "/contact"
		}
	],
	enquiryCta: {
		label: "Enquire Now",
		to: "/contact"
	},
	seo: {
		titleTemplate: "%s · Vantage Motors",
		defaultTitle: "Vantage Motors — Exceptional Cars. Exceptional Confidence.",
		defaultDescription: "Browse brand-new and pre-owned cars in Nigeria. Transparent naira pricing, detailed specifications and direct WhatsApp enquiries.",
		ogImage: "/images/og-vantage-motors.jpg"
	},
	/** Clear, editable policy statements used across the site. */
	policies: {
		priceNotice: "Listed prices are in Nigerian naira and are subject to confirmation with the dealership. They do not include third-party fees unless stated in writing.",
		availabilityNotice: "Availability can change. A listing marked available is not reserved until the dealership confirms it directly.",
		demoInventoryNotice: "All vehicles on this demonstration site are sample listings. They are not real cars currently offered for sale."
	}
};

// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
// app/app.config.ts
var app_config_default = defineAppConfig({ ui: {
	colors: {
		primary: "gold",
		neutral: "stone"
	},
	button: { defaultVariants: { size: "md" } },
	badge: { defaultVariants: { size: "sm" } },
	modal: { slots: {
		overlay: "bg-obsidian/70 backdrop-blur-xs",
		content: "bg-ivory"
	} }
} });
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fapp_config_default = /*@__PURE__*/ defuFn(app_config_default, {
	"nuxt": {},
	"ui": {
		"colors": {
			"primary": "green",
			"secondary": "blue",
			"success": "green",
			"info": "blue",
			"warning": "yellow",
			"error": "red",
			"neutral": "slate"
		},
		"icons": {
			"arrowDown": "i-lucide-arrow-down",
			"arrowLeft": "i-lucide-arrow-left",
			"arrowRight": "i-lucide-arrow-right",
			"arrowUp": "i-lucide-arrow-up",
			"caution": "i-lucide-circle-alert",
			"check": "i-lucide-check",
			"chevronDoubleLeft": "i-lucide-chevrons-left",
			"chevronDoubleRight": "i-lucide-chevrons-right",
			"chevronDown": "i-lucide-chevron-down",
			"chevronLeft": "i-lucide-chevron-left",
			"chevronRight": "i-lucide-chevron-right",
			"chevronUp": "i-lucide-chevron-up",
			"close": "i-lucide-x",
			"copy": "i-lucide-copy",
			"copyCheck": "i-lucide-copy-check",
			"dark": "i-lucide-moon",
			"drag": "i-lucide-grip-vertical",
			"ellipsis": "i-lucide-ellipsis",
			"error": "i-lucide-circle-x",
			"external": "i-lucide-arrow-up-right",
			"eye": "i-lucide-eye",
			"eyeOff": "i-lucide-eye-off",
			"file": "i-lucide-file",
			"folder": "i-lucide-folder",
			"folderOpen": "i-lucide-folder-open",
			"hash": "i-lucide-hash",
			"info": "i-lucide-info",
			"light": "i-lucide-sun",
			"loading": "i-lucide-loader-circle",
			"menu": "i-lucide-menu",
			"minus": "i-lucide-minus",
			"panelClose": "i-lucide-panel-left-close",
			"panelOpen": "i-lucide-panel-left-open",
			"plus": "i-lucide-plus",
			"reload": "i-lucide-rotate-ccw",
			"search": "i-lucide-search",
			"stop": "i-lucide-square",
			"star": "i-lucide-star",
			"success": "i-lucide-circle-check",
			"system": "i-lucide-monitor",
			"tip": "i-lucide-lightbulb",
			"upload": "i-lucide-upload",
			"warning": "i-lucide-triangle-alert"
		},
		"tv": { "twMergeConfig": {} }
	},
	"icon": {
		"provider": "server",
		"class": "",
		"aliases": {},
		"iconifyApiEndpoint": "https://api.iconify.design",
		"localApiEndpoint": "/api/_nuxt_icon",
		"fallbackToApi": true,
		"cssSelectorPrefix": "i-",
		"cssWherePseudo": true,
		"cssLayer": "base",
		"mode": "css",
		"attrs": { "aria-hidden": true },
		"collections": [
			"academicons",
			"akar-icons",
			"ant-design",
			"arcticons",
			"basil",
			"bi",
			"bitcoin-icons",
			"bpmn",
			"brandico",
			"bx",
			"bxl",
			"bxs",
			"bytesize",
			"carbon",
			"catppuccin",
			"cbi",
			"charm",
			"ci",
			"cib",
			"cif",
			"cil",
			"circle-flags",
			"circum",
			"clarity",
			"codex",
			"codicon",
			"covid",
			"cryptocurrency",
			"cryptocurrency-color",
			"cuida",
			"dashicons",
			"devicon",
			"devicon-plain",
			"dinkie-icons",
			"duo-icons",
			"ei",
			"el",
			"emojione",
			"emojione-monotone",
			"emojione-v1",
			"entypo",
			"entypo-social",
			"eos-icons",
			"ep",
			"et",
			"eva",
			"f7",
			"fa",
			"fa-brands",
			"fa-regular",
			"fa-solid",
			"fa6-brands",
			"fa6-regular",
			"fa6-solid",
			"fa7-brands",
			"fa7-regular",
			"fa7-solid",
			"fad",
			"famicons",
			"fe",
			"feather",
			"file-icons",
			"flag",
			"flagpack",
			"flat-color-icons",
			"flat-ui",
			"flowbite",
			"fluent",
			"fluent-color",
			"fluent-emoji",
			"fluent-emoji-flat",
			"fluent-emoji-high-contrast",
			"fluent-mdl2",
			"fontelico",
			"fontisto",
			"formkit",
			"foundation",
			"fxemoji",
			"gala",
			"game-icons",
			"garden",
			"geo",
			"gg",
			"gis",
			"gravity-ui",
			"gridicons",
			"grommet-icons",
			"guidance",
			"healthicons",
			"heroicons",
			"heroicons-outline",
			"heroicons-solid",
			"hugeicons",
			"humbleicons",
			"ic",
			"icomoon-free",
			"icon-park",
			"icon-park-outline",
			"icon-park-solid",
			"icon-park-twotone",
			"iconamoon",
			"iconoir",
			"icons8",
			"il",
			"ion",
			"iwwa",
			"ix",
			"jam",
			"la",
			"lets-icons",
			"line-md",
			"lineicons",
			"logos",
			"ls",
			"lsicon",
			"lucide",
			"lucide-lab",
			"mage",
			"majesticons",
			"maki",
			"map",
			"marketeq",
			"material-icon-theme",
			"material-symbols",
			"material-symbols-light",
			"mdi",
			"mdi-light",
			"medical-icon",
			"memory",
			"meteocons",
			"meteor-icons",
			"mi",
			"mingcute",
			"mono-icons",
			"mynaui",
			"nimbus",
			"nonicons",
			"noto",
			"noto-v1",
			"nrk",
			"octicon",
			"oi",
			"ooui",
			"openmoji",
			"oui",
			"pajamas",
			"pepicons",
			"pepicons-pencil",
			"pepicons-pop",
			"pepicons-print",
			"ph",
			"picon",
			"pixel",
			"pixelarticons",
			"prime",
			"proicons",
			"ps",
			"qlementine-icons",
			"quill",
			"radix-icons",
			"raphael",
			"ri",
			"rivet-icons",
			"roentgen",
			"si",
			"si-glyph",
			"sidekickicons",
			"simple-icons",
			"simple-line-icons",
			"skill-icons",
			"solar",
			"stash",
			"streamline",
			"streamline-block",
			"streamline-color",
			"streamline-cyber",
			"streamline-cyber-color",
			"streamline-emojis",
			"streamline-flex",
			"streamline-flex-color",
			"streamline-freehand",
			"streamline-freehand-color",
			"streamline-kameleon-color",
			"streamline-logos",
			"streamline-pixel",
			"streamline-plump",
			"streamline-plump-color",
			"streamline-sharp",
			"streamline-sharp-color",
			"streamline-stickies-color",
			"streamline-ultimate",
			"streamline-ultimate-color",
			"subway",
			"svg-spinners",
			"system-uicons",
			"tabler",
			"tdesign",
			"teenyicons",
			"temaki",
			"token",
			"token-branded",
			"topcoat",
			"twemoji",
			"typcn",
			"uil",
			"uim",
			"uis",
			"uit",
			"uiw",
			"unjs",
			"vaadin",
			"vs",
			"vscode-icons",
			"websymbol",
			"weui",
			"whh",
			"wi",
			"wpf",
			"zmdi",
			"zondicons"
		],
		"fetchTimeout": 1500
	}
});
// node_modules/nuxt/dist/app/config.js
function useAppConfig() {
	const nuxtApp = useNuxtApp();
	nuxtApp._appConfig ||= klona(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fapp_config_default);
	return nuxtApp._appConfig;
}
// node_modules/nuxt/dist/app/utils/debounce-tick.js
/**
* Debounce an async function so that repeated calls within the same tick are
* collapsed into a single call (plus a trailing call if arguments arrived
* while the debounced call was still pending).
*
* Adapted from https://github.com/unjs/perfect-debounce with the timeout
* replaced by Vue's post-flush callback queue.
*/
function debounceTick(fn, options = {}) {
	let leadingValue;
	let active = false;
	let resolveList = [];
	let currentPromise;
	let trailingArgs;
	const applyFn = (_this, args) => {
		const promise = _applyPromised(fn, _this, args);
		currentPromise = promise;
		promise.finally(() => {
			currentPromise = void 0;
			if (trailingArgs && !active) {
				const args = trailingArgs;
				trailingArgs = void 0;
				applyFn(_this, args);
			}
		});
		return promise;
	};
	return function(...args) {
		trailingArgs = args;
		if (currentPromise) return currentPromise;
		return new Promise((resolve) => {
			const shouldCallNow = options.leading && !active;
			if (!active) {
				active = true;
				queuePostFlushCb(() => {
					active = false;
					const flushArgs = trailingArgs ?? args;
					trailingArgs = void 0;
					const promise = options.leading ? leadingValue : applyFn(this, flushArgs);
					for (const _resolve of resolveList) _resolve(promise);
					resolveList = [];
				});
			}
			if (shouldCallNow) {
				leadingValue = applyFn(this, args);
				resolve(leadingValue);
			} else resolveList.push(resolve);
		});
	};
}
async function _applyPromised(fn, _this, args) {
	return await fn.apply(_this, args);
}
// node_modules/nuxt/dist/app/components/server-placeholder.js
var ServerPlaceholder = defineComponent({
	name: "ServerPlaceholder",
	render() {
		return createElementBlock("div");
	}
});
// node_modules/nuxt/dist/app/components/client-only.js
var clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
	name: "ClientOnly",
	inheritAttrs: false,
	props: [
		"fallback",
		"placeholder",
		"placeholderTag",
		"fallbackTag"
	],
	setup(props, { slots, attrs }) {
		const mounted = shallowRef(false);
		const vm = getCurrentInstance();
		if (vm) vm._nuxtClientOnly = true;
		provide(clientOnlySymbol, true);
		return () => {
			if (mounted.value) {
				const vnodes = slots.default?.();
				if (vnodes && vnodes.length === 1 && true) return [cloneVNode(vnodes[0], attrs)];
				return vnodes;
			}
			const slot = slots.fallback || slots.placeholder;
			if (slot) return h(slot);
			const fallbackStr = props.fallback || props.placeholder || "";
			const fallbackTag = sanitizeTag(props.fallbackTag || props.placeholderTag, "span");
			return createElementBlock(fallbackTag, attrs, fallbackStr);
		};
	}
});
// node_modules/nuxt/dist/app/diagnostics/data.js
/**
* E3xxx
* Data fetching (useFetch / useAsyncData) runtime diagnostics.
*/
var dataDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/composables/asyncData.js
/** @internal */
function _createUseAsyncData(options = {}) {
	{
		function useAsyncData(...args) {
			const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
			if (_isAutoKeyNeeded(args[0], args[1])) args.unshift(autoKey);
			let [_key, _handler, opts = {}] = args;
			const key = isRef(_key) || typeof _key === "function" ? computed(() => toValue(_key)) : { value: _key };
			if (!key.value || typeof key.value !== "string") throw dataDiagnostics.NUXT_E3008();
			if (typeof _handler !== "function") throw dataDiagnostics.NUXT_E3009();
			const shouldFactoryOptionsOverride = typeof options === "function";
			const nuxtApp = useNuxtApp();
			const factoryOptions = shouldFactoryOptionsOverride ? options(opts) : options;
			if (!shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				if (opts[key] !== void 0) continue;
				opts[key] = factoryOptions[key];
			}
			opts.server ??= true;
			opts.default ??= getDefault;
			opts.getCachedData ??= getDefaultCachedData;
			opts.lazy ??= false;
			opts.immediate ??= true;
			opts.deep ??= asyncDataDefaults.deep;
			opts.dedupe ??= "cancel";
			opts.enabled ??= true;
			if (shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				opts[key] = factoryOptions[key];
			}
			nuxtApp._asyncData[key.value];
			function createInitialFetch() {
				const initialFetchOptions = {
					cause: "initial",
					dedupe: opts.dedupe
				};
				const existing = nuxtApp._asyncData[key.value];
				if (!existing?._init) {
					initialFetchOptions.cachedData = opts.getCachedData(key.value, nuxtApp, { cause: "initial" });
					nuxtApp._asyncData[key.value] = buildAsyncData(nuxtApp, key.value, _handler, opts, initialFetchOptions.cachedData);
					nuxtApp._asyncData[key.value]._initialCachedData = initialFetchOptions.cachedData;
				} else if (nuxtApp._asyncDataPromises[key.value]) initialFetchOptions.cachedData = existing._initialCachedData;
				return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
			}
			const initialFetch = createInitialFetch();
			const asyncData = nuxtApp._asyncData[key.value];
			asyncData._deps++;
			const fetchOnServer = opts.server !== false && nuxtApp.payload.serverRendered;
			const isWithinVaporComponent = () => {
				return false;
			};
			if (fetchOnServer && opts.immediate) {
				const promise = initialFetch();
				if (getCurrentInstance() || isWithinVaporComponent()) onServerPrefetch(() => promise);
				else nuxtApp.hook("app:created", async () => {
					await promise;
				});
			}
			const asyncReturn = {
				data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data, !opts.deep),
				pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
				status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
				error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
				refresh: (...args) => {
					if (!nuxtApp._asyncData[key.value]?._init) return createInitialFetch()();
					return nuxtApp._asyncData[key.value].execute(...args);
				},
				execute: (...args) => asyncReturn.refresh(...args),
				clear: () => {
					const entry = nuxtApp._asyncData[key.value];
					if (entry?._abortController) try {
						entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
					} finally {
						entry._abortController = void 0;
					}
					clearNuxtDataByKey(nuxtApp, key.value);
				}
			};
			const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
			Object.assign(asyncDataPromise, asyncReturn);
			Object.defineProperties(asyncDataPromise, {
				then: {
					enumerable: true,
					value: asyncDataPromise.then.bind(asyncDataPromise)
				},
				catch: {
					enumerable: true,
					value: asyncDataPromise.catch.bind(asyncDataPromise)
				},
				finally: {
					enumerable: true,
					value: asyncDataPromise.finally.bind(asyncDataPromise)
				}
			});
			return asyncDataPromise;
		}
		return useAsyncData;
	}
}
var useAsyncData = _createUseAsyncData();
function writableComputedRef(getter, shallow = false) {
	const forwardedRef = computed({
		get() {
			return getter()?.value;
		},
		set(value) {
			const ref = getter();
			if (ref) ref.value = value;
		}
	});
	if (shallow) forwardedRef.__v_isShallow = true;
	return forwardedRef;
}
/** @internal */
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
	if (typeof keyOrFetcher === "string") return false;
	if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) return false;
	if (typeof keyOrFetcher === "function" && typeof fetcher === "function") return false;
	return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
	delete nuxtApp.payload.data[key];
	delete nuxtApp.payload._errors[key];
	if (nuxtApp._asyncData[key]) {
		nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
		nuxtApp._asyncData[key].error.value = void 0;
		nuxtApp._asyncData[key].status.value = "idle";
		nuxtApp._asyncData[key]._initialCachedData = void 0;
	}
	delete nuxtApp._asyncDataPromises[key];
}
function pick(obj, keys) {
	const newObj = {};
	for (const key of keys) newObj[key] = obj[key];
	return newObj;
}
function buildAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
	nuxtApp.payload._errors[key] ??= void 0;
	const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
	const handler = _handler ;
	const _ref = options.deep ? ref : shallowRef;
	const hasCachedData = initialCachedData !== void 0;
	const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
		if (!keys || keys.includes(key)) await asyncData.execute({ cause: "refresh:hook" });
	});
	const asyncData = {
		data: _ref(hasCachedData ? initialCachedData : options.default()),
		pending: computed(() => asyncData.status.value === "pending"),
		error: toRef(nuxtApp.payload._errors, key),
		status: shallowRef("idle"),
		execute: (...args) => {
			const [_opts, newValue = void 0] = args;
			const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
			if (nuxtApp._asyncDataPromises[key]) {
				if ((opts.dedupe ?? options.dedupe) === "defer") return nuxtApp._asyncDataPromises[key];
			}
			{
				const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
				if (cachedData !== void 0) {
					if (options.serialize !== false) nuxtApp.payload.data[key] = cachedData;
					asyncData.data.value = cachedData;
					asyncData.error.value = void 0;
					asyncData.status.value = "success";
					return Promise.resolve(cachedData);
				}
			}
			if (toValue(options.enabled) === false) return Promise.resolve(asyncData.data.value);
			if (asyncData._abortController) asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
			asyncData._abortController = new AbortController();
			asyncData.status.value = "pending";
			const cleanupController = new AbortController();
			const promise = new Promise((resolve, reject) => {
				try {
					const timeout = opts.timeout ?? options.timeout;
					const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
					if (mergedSignal.aborted) {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
						return;
					}
					mergedSignal.addEventListener("abort", () => {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
					}, {
						once: true,
						signal: cleanupController.signal
					});
					const ctx = { signal: mergedSignal };
					let run = () => Promise.resolve(handler(nuxtApp, ctx));
					if (options.middleware?.length) for (let i = options.middleware.length - 1; i >= 0; i--) {
						const middleware = options.middleware[i];
						const next = run;
						run = () => Promise.resolve(middleware(next, ctx));
					}
					return run().then(resolve, reject);
				} catch (err) {
					reject(err);
				}
			}).then(async (_result) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return;
				let result = _result;
				if (options.transform) result = await options.transform(_result);
				if (options.pick) result = pick(result, options.pick);
				if (options.serialize !== false) nuxtApp.payload.data[key] = result;
				asyncData.data.value = result;
				asyncData.error.value = void 0;
				asyncData.status.value = "success";
			}).catch((error) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return nuxtApp._asyncDataPromises[key];
				if (asyncData._abortController?.signal.aborted) return nuxtApp._asyncDataPromises[key];
				if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
					asyncData.status.value = "idle";
					return nuxtApp._asyncDataPromises[key];
				}
				asyncData.error.value = createError$2(error);
				asyncData.data.value = unref(options.default());
				asyncData.status.value = "error";
			}).finally(() => {
				cleanupController.abort();
				if (nuxtApp._asyncDataPromises[key] === promise) delete nuxtApp._asyncDataPromises[key];
			});
			nuxtApp._asyncDataPromises[key] = promise;
			return nuxtApp._asyncDataPromises[key];
		},
		_execute: debounceTick((...args) => asyncData.execute(...args)),
		_default: options.default,
		_deps: 0,
		_init: true,
		_hash: void 0,
		_off: () => {
			unsubRefreshAsyncData();
			if (nuxtApp._asyncData[key] !== asyncData) return;
			if (nuxtApp._asyncData[key]?._init) nuxtApp._asyncData[key]._init = false;
			if (nuxtApp._asyncDataPromises[key]) {
				asyncData._abortController?.abort(new DOMException("AsyncData request cancelled by unmount", "AbortError"));
				delete nuxtApp._asyncDataPromises[key];
				if (asyncData.status.value === "pending") asyncData.status.value = "idle";
			}
			if (!hasCustomGetCachedData) nextTick(() => {
				if (!nuxtApp._asyncData[key]?._init) {
					clearNuxtDataByKey(nuxtApp, key);
					asyncData.execute = () => Promise.resolve();
				}
			});
		}
	};
	return asyncData;
}
var getDefault = () => void 0;
var getDefaultCachedData = (key, nuxtApp, ctx) => {
	if (nuxtApp.isHydrating) return nuxtApp.payload.data[key];
	if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") return nuxtApp.static.data[key];
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
	const list = signals.filter((s) => !!s);
	if (typeof timeout === "number" && timeout >= 0) {
		const timeoutSignal = AbortSignal.timeout?.(timeout);
		if (timeoutSignal) list.push(timeoutSignal);
	}
	if (AbortSignal.any) return AbortSignal.any(list);
	const controller = new AbortController();
	for (const sig of list) if (sig.aborted) {
		const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
		return controller.signal;
	}
	const onAbort = () => {
		const reason = list.find((s) => s.aborted)?.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
	};
	for (const sig of list) sig.addEventListener?.("abort", onAbort, {
		once: true,
		signal: cleanupSignal
	});
	return controller.signal;
}
// node_modules/nuxt/dist/app/diagnostics/state.js
/**
* E7xxx
* Payload / state / cookie runtime diagnostics.
*/
var stateDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/composables/state.js
var useStateKeyPrefix = "$s";
function useState(...args) {
	const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
	if (typeof args[0] !== "string") args.unshift(autoKey);
	const [_key, init] = args;
	if (!_key || typeof _key !== "string") throw stateDiagnostics.NUXT_E7009({ key: _key });
	if (init !== void 0 && typeof init !== "function") throw stateDiagnostics.NUXT_E7007({ type: typeof init });
	const key = useStateKeyPrefix + _key;
	const nuxtApp = useNuxtApp();
	const state = toRef(nuxtApp.payload.state, key);
	if (init) nuxtApp._state[key] ??= { _default: init };
	if (state.value === void 0 && init) {
		const initialValue = init();
		if (isRef(initialValue)) {
			nuxtApp.payload.state[key] = initialValue;
			return state;
		}
		state.value = initialValue;
	}
	return state;
}
// node_modules/nuxt/dist/app/composables/cookie.js
function parseCookieValue(value) {
	if (value === "undefined") return;
	try {
		const parsed = JSON.parse(value);
		if (typeof parsed === "number" && String(parsed) !== value) return value;
		return parsed;
	} catch {
		return value;
	}
}
function resolveExpires(expires) {
	return typeof expires === "function" ? expires() : expires;
}
var CookieDefaults = {
	path: "/",
	watch: true,
	decode: (val) => val ? parseCookieValue(decodeURIComponent(val)) : val,
	encode: (val) => {
		if (typeof val !== "string" || val === "undefined") return encodeURIComponent(JSON.stringify(val));
		try {
			if (typeof JSON.parse(val) !== "string") return encodeURIComponent(JSON.stringify(val));
		} catch {}
		return encodeURIComponent(val);
	},
	refresh: false
};
function useCookie(name, _opts) {
	const opts = {
		...CookieDefaults,
		..._opts
	};
	opts.filter ??= (key) => key === name;
	const nuxtApp = useNuxtApp();
	const jar = readServerCookieJar(nuxtApp);
	const rawValue = opts.filter(name) ? jar[name] : void 0;
	const cookies = { [name]: rawValue === void 0 ? void 0 : opts.decode(rawValue) };
	let delay;
	if (opts.maxAge !== void 0) delay = opts.maxAge * 1e3;
	else if (opts.expires) {
		const expires = resolveExpires(opts.expires);
		if (expires) delay = expires.getTime() - Date.now();
	}
	const hasExpired = delay !== void 0 && delay <= 0;
	const cookie = cookieServerRef(name, klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.()), opts, nuxtApp);
	if (!opts.readonly && rawValue === void 0) {
		const initialValue = cookie.value;
		if (initialValue !== void 0 && initialValue !== null) updateServerCookieJar(nuxtApp, name, opts.encode(initialValue));
	}
	{
		const writeFinalCookieValue = () => {
			const valueIsSame = isEqual(cookie.value, cookies[name]);
			if (opts.readonly || valueIsSame && !opts.refresh) return;
			nuxtApp._cookiesChanged ||= {};
			if (valueIsSame && opts.refresh && !nuxtApp._cookiesChanged[name]) return;
			nuxtApp._cookies ||= {};
			if (name in nuxtApp._cookies) {
				if (isEqual(cookie.value, nuxtApp._cookies[name])) return;
			}
			nuxtApp._cookies[name] = cookie.value;
			const encoded = cookie.value === null || cookie.value === void 0 ? void 0 : opts.encode(cookie.value);
			writeServerCookie(useRequestEvent(nuxtApp), name, encoded, opts);
		};
		const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
		nuxtApp.hooks.hookOnce("app:error", () => {
			unhook();
			return writeFinalCookieValue();
		});
	}
	return cookie;
}
/**
* Cookie jar for the current request, seeded from the incoming `cookie` header.
*
* @see https://github.com/nuxt/nuxt/issues/22631
*/
function readServerCookieJar(nuxtApp) {
	const event = useRequestEvent(nuxtApp);
	const jar = nuxtApp._cookieJar ??= parse(getRequestHeader(event, "cookie") || "", { decode: identity });
	const setCookies = readResponseSetCookies(event);
	for (let i = nuxtApp._appliedSetCookies || 0; i < setCookies.length; i++) {
		const cookie = parseSetCookie(setCookies[i], { decode: false });
		if (!cookie) continue;
		if (cookie.maxAge !== void 0 && cookie.maxAge <= 0 || cookie.expires && cookie.expires.getTime() <= Date.now()) delete jar[cookie.name];
		else jar[cookie.name] = cookie.value;
	}
	nuxtApp._appliedSetCookies = setCookies.length;
	return jar;
}
function updateServerCookieJar(nuxtApp, name, value) {
	const jar = readServerCookieJar(nuxtApp);
	if (value === void 0) delete jar[name];
	else jar[name] = value;
}
function readResponseSetCookies(event) {
	return splitCookiesString(getResponseHeader(event, "set-cookie") ?? []);
}
var identity = (val) => val;
function toSerializeOptions(opts) {
	const { encode: _encode, decode: _decode, expires, ...rest } = opts;
	return {
		...rest,
		expires: resolveExpires(expires),
		encode: identity
	};
}
function writeServerCookie(event, name, value, opts = {}) {
	if (event) {
		const serializeOpts = toSerializeOptions(opts);
		if (value !== void 0) return setCookie(event, name, value, serializeOpts);
		if (getCookie(event, name) !== void 0 || responseSetsCookie(event, name)) return deleteCookie(event, name, serializeOpts);
	}
}
function responseSetsCookie(event, name) {
	for (const raw of readResponseSetCookies(event)) if (parseSetCookie(raw, { decode: false })?.name === name) return true;
	return false;
}
/**
* Custom ref that tracks explicit cookie writes on the server.
*
* This is required for the `refresh` option to ensure the cookie is
* re-written on SSR even when the value remains unchanged.
*/
function cookieServerRef(name, value, opts, nuxtApp) {
	const internalRef = ref(value);
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return internalRef.value;
			},
			set(newValue) {
				nuxtApp._cookiesChanged ||= {};
				nuxtApp._cookiesChanged[name] = true;
				if (!opts.readonly) updateServerCookieJar(nuxtApp, name, newValue === null || newValue === void 0 ? void 0 : opts.encode(newValue));
				internalRef.value = newValue;
				trigger();
			}
		};
	});
}
// node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var foldedMatcher = /* @__PURE__ */ (() => {
	const $0 = {};
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		if (p === "/_nuxt") r.push({ data: $0 });
		else if (p.charCodeAt(p.length - 1) === 47) {
			if (p === "/_nuxt/") r.push({ data: $0 });
		}
		return r.reverse();
	};
})();
var decodeRoutePath = function decodeRoutePath(path) {
	if (!path.includes("%")) return path;
	const queryIndex = path.indexOf("?");
	const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
	try {
		return queryIndex === -1 ? decodeURI(pathname) : decodeURI(pathname) + path.slice(queryIndex);
	} catch {
		return path;
	}
};
var normalizePath = (path, fold) => {
	if (typeof path !== "string") return path;
	const decoded = decodeRoutePath(path);
	return fold ? decoded.toLowerCase() : decoded;
};
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = (path) => defu({}, ...foldedMatcher("", normalizePath(path, true)).map((r) => r.data).reverse());
// node_modules/nuxt/dist/app/composables/manifest.js
function routeRulesMatcher(path) {
	return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default(path);
}
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher(path);
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
// node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
// node_modules/nuxt/dist/app/composables/url.js
/** @since 3.5.0 */
function useRequestURL(opts) {
	return getRequestURL(useRequestEvent(), opts);
}
// node_modules/nuxt-site-config/dist/runtime/app/plugins/0.siteConfig.js
var _0_siteConfig_default = defineNuxtPlugin({
	name: "nuxt-site-config:init",
	enforce: "pre",
	async setup(nuxtApp) {
		const stack = useRequestEvent()?.context?.siteConfig;
		const state = useState("site-config");
		nuxtApp.hooks.hook("app:rendered", () => {
			state.value = stack?.get({
				debug: useRuntimeConfig()["nuxt-site-config"].debug,
				resolveRefs: true
			});
		});
		return { provide: { nuxtSiteConfig: stack } };
	}
});
// node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
// node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$2 = defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		}
		nuxtApp.vueApp.use(head);
	}
});
// node_modules/nuxt/dist/pages/runtime/utils.js
var ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE = /:\w+/g;
var interpolatePath = (route, match) => {
	return match.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
};
var generateRouteKey = (routeProps, override) => {
	const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
	const source = matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
	return typeof source === "function" ? source(routeProps.route) : source;
};
/** @since 3.9.0 */
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
Object.assign(Object.create(null), {});
var pageIslandRoutes = Object.assign(Object.create(null), {});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [defineNuxtRouteMiddleware(async (to) => {
	let __temp, __restore;
	if (!to.meta?.validate) return;
	const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
	if (result === true) return;
	return createError$2({
		fatal: false,
		status: result && (result.status || result.statusCode) || 404,
		statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
		data: { path: to.fullPath }
	});
}), /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {})];
var namedMiddleware = {};
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froutes.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default = [
	{
		name: "cars-slug",
		path: "/cars/:slug()",
		component: () => import('../build/_slug_-nFrZSWmw.mjs')
	},
	{
		name: "about",
		path: "/about",
		component: () => import('../build/about-BR6Fwj8n.mjs')
	},
	{
		name: "cars",
		path: "/cars",
		component: () => import('../build/cars-BA5f3Jus.mjs')
	},
	{
		name: "contact",
		path: "/contact",
		component: () => import('../build/contact-US7HSO4f.mjs')
	},
	{
		name: "faq",
		path: "/faq",
		component: () => import('../build/faq-CXKweY1p.mjs')
	},
	{
		name: "new-arrivals",
		path: "/new-arrivals",
		component: () => import('../build/new-arrivals--mHAQSAm.mjs')
	},
	{
		name: "privacy-policy",
		path: "/privacy-policy",
		component: () => import('../build/privacy-policy-CJOrF9UK.mjs')
	},
	{
		name: "sell-your-car",
		path: "/sell-your-car",
		component: () => import('../build/sell-your-car-BVMGPehC.mjs')
	},
	{
		name: "terms",
		path: "/terms",
		component: () => import('../build/terms-kREX905T.mjs')
	},
	{
		name: "test-drive",
		path: "/test-drive",
		component: () => import('../build/test-drive-DMvxa4Vr.mjs')
	},
	{
		name: "index",
		path: "/",
		component: () => import('../build/pages-BxVUInCj.mjs')
	}
];
// node_modules/nuxt/dist/pages/runtime/plugins/router.js
var plugin$1 = defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	async setup(nuxtApp) {
		let __temp, __restore;
		let routerBase = useRuntimeConfig().app.baseURL;
		const history = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.history?.(routerBase) ?? createMemoryHistory(routerBase);
		const routes = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes ? ([__temp, __restore] = executeAsync(() => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default)), __temp = await __temp, __restore(), __temp) ?? virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default : virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default;
		let startPosition;
		const router = createRouter({
			...virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default,
			scrollBehavior: (to, from, savedPosition) => {
				if (from === START_LOCATION) {
					startPosition = savedPosition;
					return;
				}
				if (virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior) {
					router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
					if ("scrollRestoration" in (void 0).history) {
						const unsub = router.beforeEach(() => {
							unsub();
							(void 0).history.scrollRestoration = "manual";
						});
					}
					return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
				}
			},
			history,
			routes
		});
		nuxtApp.vueApp.use(router);
		const previousRoute = shallowRef(router.currentRoute.value);
		router.afterEach((_to, from) => {
			previousRoute.value = from;
		});
		Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", { get: () => previousRoute.value });
		const initialURL = nuxtApp.ssrContext.url;
		const _route = shallowRef(router.currentRoute.value);
		const syncCurrentRoute = () => {
			_route.value = router.currentRoute.value;
		};
		router.afterEach((to, from) => {
			const lastTo = to.matched.at(-1)?.components?.default;
			const lastFrom = from.matched.at(-1)?.components?.default;
			if (lastTo === lastFrom) {
				if (generateRouteKey({
					route: to,
					Component: { type: lastTo }
				}) === generateRouteKey({
					route: from,
					Component: { type: lastFrom }
				})) syncCurrentRoute();
				return;
			}
			if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) syncCurrentRoute();
		});
		const route = { sync: syncCurrentRoute };
		for (const key in _route.value) Object.defineProperty(route, key, {
			get: () => _route.value[key],
			enumerable: true
		});
		nuxtApp._route = shallowReactive(route);
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		const error = useError();
		const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
		if (!nuxtApp.ssrContext?.islandContext || isServerPage) router.afterEach(async (to, _from, failure) => {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
			if (failure) await nuxtApp.callHook("page:loading:end");
			if (failure?.type === 4) return;
			if (to.redirectedFrom && to.fullPath !== initialURL) await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
		});
		router.onError(async () => {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
			await nuxtApp.callHook("page:loading:end");
		});
		try {
			[__temp, __restore] = executeAsync(() => router.push(initialURL)), __temp = await __temp, __restore();
			[__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
		} catch (error) {
			[__temp, __restore] = executeAsync(() => _showErrorUnlessCrawler(nuxtApp, error)), await __temp, __restore();
		}
		const resolvedInitialRoute = router.currentRoute.value;
		syncCurrentRoute();
		if (nuxtApp.ssrContext?.islandContext && !isServerPage) return { provide: { router } };
		const initialLayout = nuxtApp.payload.state._layout;
		router.beforeEach(async (to, from) => {
			await nuxtApp.callHook("page:loading:start");
			to.meta = reactive(to.meta);
			if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) to.meta.layout = initialLayout;
			nuxtApp._processingMiddleware = true;
			nuxtApp._middlewareTo = to;
			if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
				const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
				for (const component of to.matched) {
					const componentMiddleware = component.meta.middleware;
					if (!componentMiddleware) continue;
					for (const entry of toArray(componentMiddleware)) middlewareEntries.add(entry);
				}
				const routeRules = getRouteRules({ path: to.path });
				if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) if (routeRules.appMiddleware[key]) middlewareEntries.add(key);
				else middlewareEntries.delete(key);
				for (const entry of middlewareEntries) {
					const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await namedMiddleware[entry]?.().then((r) => r.default || r) : entry;
					if (!middleware) throw navigationDiagnostics.NUXT_E2004({
						entry: String(entry),
						validMiddleware: void 0
					});
					try {
						const run = () => nuxtApp.runWithContext(() => middleware(to, from));
						const result = await run();
						if (result === false || result instanceof Error) {
							const error = result || createError$2({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`
							});
							await nuxtApp.runWithContext(() => showError(error));
							return false;
						}
						if (result === true) continue;
						if (result === false) return result;
						if (result) {
							if (isNuxtError(result) && result.fatal) await nuxtApp.runWithContext(() => showError(result));
							return result;
						}
					} catch (err) {
						const error = createError$2(err);
						if (error.fatal) await nuxtApp.runWithContext(() => showError(error));
						return error;
					}
				}
			}
		});
		if (isServerPage) router.beforeResolve((to) => {
			const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
			const actual = to.matched.find((m) => (m.components?.default)?.__nuxt_island)?.components?.default;
			if (!expected || expected !== actual?.__nuxt_island) {
				nuxtApp.ssrContext["~renderResponse"] = {
					statusCode: 400,
					statusMessage: "Invalid island request path"
				};
				return false;
			}
		});
		router.afterEach((to, _from, failure) => {
			if (to.matched.length === 0 && !error.value && !isNavigationFailure(failure, NavigationFailureType.aborted | NavigationFailureType.cancelled)) return nuxtApp.runWithContext(() => showError(createError$2({
				status: 404,
				fatal: false,
				statusText: `Page not found: ${to.fullPath}`,
				data: { path: to.fullPath }
			})));
		});
		nuxtApp.hooks.hookOnce("app:created", async () => {
			try {
				if ("name" in resolvedInitialRoute) resolvedInitialRoute.name = void 0;
				await router.replace({
					...resolvedInitialRoute,
					force: true
				});
				router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
			} catch (error) {
				await _showErrorUnlessCrawler(nuxtApp, error);
			}
		});
		return { provide: { router } };
	}
});
// node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
var plugin = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:revive-payload:server",
	setup() {
		for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
	}
});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fcolor-mode-options.mjs
var preference = "system";
// node_modules/@nuxtjs/color-mode/dist/runtime/plugin.server.js
var plugin_server_default = defineNuxtPlugin((nuxtApp) => {
	const colorMode = nuxtApp.ssrContext?.islandContext ? ref({}).value : useState("color-mode", () => reactive({
		preference,
		value: preference,
		unknown: true,
		forced: false
	})).value;
	const htmlAttrs = {};
	useHead({ htmlAttrs });
	useRouter().afterEach((to) => {
		const forcedColorMode = to.meta.colorMode;
		if (forcedColorMode && forcedColorMode !== "system") {
			htmlAttrs["data-color-mode-forced"] = forcedColorMode;
			colorMode.value = forcedColorMode;
			colorMode.forced = true;
		} else if (forcedColorMode === "system") console.warn("You cannot force the colorMode to system at the page level.");
	});
	nuxtApp.provide("colorMode", colorMode);
});
// node_modules/@nuxt/icon/dist/runtime/plugin.js
var plugin_default = defineNuxtPlugin({
	name: "@nuxt/icon",
	setup() {
		const configs = useRuntimeConfig();
		const options = useAppConfig().icon;
		const requestFetch = useRequestFetch();
		const nativeFetch = requestFetch.native;
		_api.setFetch((input, init) => {
			const nitroFetch = globalThis.$fetch?.native;
			return (nativeFetch || nitroFetch || globalThis.fetch)(input, init);
		});
		const resources = [];
		if (options.provider === "server") {
			const baseURL = configs.app?.baseURL?.replace(/\/$/, "") ?? "";
			resources.push(baseURL + (options.localApiEndpoint || "/api/_nuxt_icon"));
			if (options.fallbackToApi === true || options.fallbackToApi === "client-only") resources.push(options.iconifyApiEndpoint);
		} else if (options.provider === "none") _api.setFetch(() => Promise.resolve(new Response()));
		else resources.push(options.iconifyApiEndpoint);
		async function customIconLoader(icons, prefix) {
			try {
				const data = await requestFetch(resources[0] + "/" + prefix + ".json", { query: { icons: icons.join(",") } });
				if (!data || data.prefix !== prefix || !data.icons) throw new Error("Invalid data" + JSON.stringify(data));
				return data;
			} catch (e) {
				console.error("Failed to load custom icons", e);
				return null;
			}
		}
		addAPIProvider("", { resources });
		for (const prefix of options.customCollections || []) if (prefix) setCustomIconsLoader(customIconLoader, prefix);
	}
});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fcomponents.plugin.mjs
var lazyGlobalComponents = [["Icon", defineAsyncComponent(() => import('../build/components-BzxBmguo.mjs').then((r) => r["default"] || r.default || r))]];
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default = defineNuxtPlugin({
	name: "nuxt:global-components",
	setup(nuxtApp) {
		for (const [name, component] of lazyGlobalComponents) {
			nuxtApp.vueApp.component(name, component);
			nuxtApp.vueApp.component("Lazy" + name, component);
		}
	}
});
// node_modules/@nuxtjs/robots/dist/runtime/app/plugins/robot-meta.server.js
var robot_meta_server_default = defineNuxtPlugin({ setup() {
	const event = useRequestEvent();
	const ctx = event?.context?.robots;
	event?.context?.robotsProduction;
	if (!ctx) return;
	useHead({ meta: [{
		"name": "robots",
		"content": () => ctx.rule || "",
		"data-hint": () => void 0,
		"data-production-content": () => void 0
	}] });
} });
// node_modules/@nuxt/ui/dist/runtime/plugins/colors.js
var shades = [
	50,
	100,
	200,
	300,
	400,
	500,
	600,
	700,
	800,
	900,
	950
];
function getColor(color, shade) {
	if (color in colors$1 && typeof colors$1[color] === "object" && shade in colors$1[color]) return colors$1[color][shade];
	return "";
}
function generateShades(key, value, prefix) {
	const prefixStr = prefix ? `${prefix}-` : "";
	return `${shades.map((shade) => `--ui-color-${key}-${shade}: var(--${prefixStr}color-${value === "neutral" ? "old-neutral" : value}-${shade}, ${getColor(value, shade)});`).join("\n  ")}`;
}
function generateColor(key, shade) {
	return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	_0_siteConfig_default,
	plugin$2,
	plugin$1,
	plugin,
	plugin_server_default,
	plugin_default,
	virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default,
	robot_meta_server_default,
	defineNuxtPlugin(() => {
		const appConfig = useAppConfig();
		useNuxtApp();
		const root = computed(() => {
			const { neutral, ...colors2 } = appConfig.ui.colors;
			const prefix = appConfig.ui.prefix;
			return `@layer theme {
  :root, :host {
  ${Object.entries(appConfig.ui.colors).map(([key, value]) => generateShades(key, value, prefix)).join("\n  ")}
  }
  :root, :host, .light {
  ${Object.keys(colors2).map((key) => generateColor(key, 500)).join("\n  ")}
  }
  .dark {
  ${Object.keys(colors2).map((key) => generateColor(key, 400)).join("\n  ")}
  }
}`;
		});
		useHead({ style: [{
			innerHTML: root,
			tagPriority: "critical",
			id: "nuxt-ui-colors"
		}] });
	})
];
// app/components/layout/AnnouncementBar.vue?vue&type=script&setup=true&lang.ts
var AnnouncementBar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AnnouncementBar",
	__ssrInlineRender: true,
	setup(__props) {
		const dismissed = useCookie("vm-announcement-dismissed", {
			default: () => false,
			maxAge: 604800,
			sameSite: "lax"
		});
		const visible = computed(() => dealership.announcement.enabled && !dismissed.value);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_UIcon = resolveComponent("UIcon");
			if (unref(visible)) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-obsidian text-ivory" }, _attrs))}><div class="shell flex min-h-10 items-center justify-center gap-3 py-2 pr-10 text-center"><span class="hidden shrink-0 border border-gold/40 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-light sm:inline-block">${ssrInterpolate(unref(dealership).announcement.label)}</span><p class="text-[11px] leading-snug text-white/75 sm:text-xs">${ssrInterpolate(unref(dealership).announcement.text)} `);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(dealership).announcement.href,
					class: "ml-1 inline-flex items-center gap-1 font-semibold text-gold-light underline-offset-4 transition-colors hover:text-white hover:underline"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`${ssrInterpolate(unref(dealership).announcement.linkLabel)} `);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-arrow-right",
								class: "size-3",
								"aria-hidden": "true"
							}, null, _parent, _scopeId));
						} else return [createTextVNode(toDisplayString(unref(dealership).announcement.linkLabel) + " ", 1), createVNode(_component_UIcon, {
							name: "i-lucide-arrow-right",
							class: "size-3",
							"aria-hidden": "true"
						})];
					}),
					_: 1
				}, _parent));
				_push(`</p></div><button type="button" class="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center text-white/55 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold" aria-label="Dismiss announcement">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-x",
					class: "size-4",
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</button></div>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/layout/AnnouncementBar.vue
var _sfc_setup$11 = AnnouncementBar_vue_vue_type_script_setup_true_lang_default.setup;
AnnouncementBar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AnnouncementBar.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var AnnouncementBar_default = Object.assign(AnnouncementBar_vue_vue_type_script_setup_true_lang_default, { __name: "AnnouncementBar" });
// app/components/shared/AppLogo.vue?vue&type=script&setup=true&lang.ts
var AppLogo_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppLogo",
	__ssrInlineRender: true,
	props: {
		variant: { default: "primary" },
		compact: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const wordmark = computed(() => {
			const parts = dealership.name.trim().split(/\s+/);
			return {
				primary: parts[0] ?? dealership.name,
				secondary: parts.slice(1).join(" ")
			};
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({
				class: "inline-flex items-center gap-2.5",
				"aria-hidden": "true"
			}, _attrs))}><img${ssrRenderAttr("src", unref(dealership).logo.mark)} alt="" width="36" height="36" class="size-8 shrink-0 sm:size-9" decoding="async">`);
			if (!__props.compact) {
				_push(`<span class="flex flex-col leading-none"><span class="${ssrRenderClass([__props.variant === "light" ? "text-ivory" : "text-ink", "font-display text-[13px] font-semibold uppercase tracking-[0.3em] sm:text-[14px]"])}">${ssrInterpolate(unref(wordmark).primary)}</span>`);
				if (unref(wordmark).secondary) _push(`<span class="mt-1.5 text-[6.5px] font-semibold uppercase tracking-[0.5em] text-gold">${ssrInterpolate(unref(wordmark).secondary)}</span>`);
				else _push(`<!---->`);
				_push(`</span>`);
			} else _push(`<!---->`);
			_push(`</span>`);
		};
	}
});
// app/components/shared/AppLogo.vue
var _sfc_setup$10 = AppLogo_vue_vue_type_script_setup_true_lang_default.setup;
AppLogo_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/AppLogo.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var AppLogo_default = Object.assign(AppLogo_vue_vue_type_script_setup_true_lang_default, { __name: "AppLogo" });
// app/components/shared/AppButton.vue?vue&type=script&setup=true&lang.ts
var AppButton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppButton",
	__ssrInlineRender: true,
	props: {
		to: {},
		href: {},
		type: { default: "button" },
		variant: { default: "gold" },
		size: { default: "md" },
		block: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		icon: {},
		trailingIcon: {}
	},
	setup(__props) {
		const props = __props;
		const NuxtLinkComponent = NuxtLink;
		const isHttpLink = computed(() => Boolean(props.href && /^https?:\/\//.test(props.href)));
		const component = computed(() => {
			if (props.to) return NuxtLinkComponent;
			if (props.href) return "a";
			return "button";
		});
		const sizeClasses = {
			sm: "px-3.5 py-2 text-[10px] gap-1.5",
			md: "px-5 py-2.5 text-[11px] gap-2",
			lg: "px-7 py-3.5 text-xs gap-2.5"
		};
		const variantClasses = {
			gold: "border-gold bg-gold text-obsidian hover:border-gold-light hover:bg-gold-light",
			dark: "border-obsidian bg-obsidian text-white hover:border-charcoal hover:bg-charcoal",
			outline: "border-line bg-transparent text-ink hover:border-ink",
			"light-outline": "border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-obsidian",
			ghost: "border-transparent bg-transparent text-ink hover:text-gold-dark",
			white: "border-white bg-white text-obsidian hover:border-ivory hover:bg-ivory"
		};
		const classes = computed(() => [
			"inline-flex select-none items-center justify-center rounded-[2px] border font-sans font-semibold uppercase tracking-[0.12em] transition-colors duration-200",
			"focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold",
			"disabled:cursor-not-allowed disabled:opacity-50",
			sizeClasses[props.size],
			variantClasses[props.variant],
			props.block ? "w-full" : "",
			props.variant === "ghost" ? "px-0" : ""
		]);
		const linkProps = computed(() => {
			if (props.to) return { to: props.to };
			if (props.href) return {
				href: props.href,
				target: isHttpLink.value ? "_blank" : void 0,
				rel: isHttpLink.value ? "noopener noreferrer" : void 0
			};
			return {
				type: props.type,
				disabled: props.disabled || props.loading
			};
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(component)), mergeProps(unref(linkProps), {
				class: unref(classes),
				"aria-disabled": __props.disabled || __props.loading ? "true" : void 0
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (__props.loading) _push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-loader-circle",
							class: "size-4 shrink-0 animate-spin",
							"aria-hidden": "true"
						}, null, _parent, _scopeId));
						else if (__props.icon) _push(ssrRenderComponent(_component_UIcon, {
							name: __props.icon,
							class: "size-4 shrink-0",
							"aria-hidden": "true"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						ssrRenderSlot(_ctx.$slots, "leading", {}, null, _push, _parent, _scopeId);
						_push(`<span class="truncate"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
						_push(`</span>`);
						if (__props.trailingIcon) _push(ssrRenderComponent(_component_UIcon, {
							name: __props.trailingIcon,
							class: "size-4 shrink-0",
							"aria-hidden": "true"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						ssrRenderSlot(_ctx.$slots, "trailing", {}, null, _push, _parent, _scopeId);
					} else return [
						__props.loading ? (openBlock(), createBlock(_component_UIcon, {
							key: 0,
							name: "i-lucide-loader-circle",
							class: "size-4 shrink-0 animate-spin",
							"aria-hidden": "true"
						})) : __props.icon ? (openBlock(), createBlock(_component_UIcon, {
							key: 1,
							name: __props.icon,
							class: "size-4 shrink-0",
							"aria-hidden": "true"
						}, null, 8, ["name"])) : createCommentVNode("", true),
						renderSlot(_ctx.$slots, "leading"),
						createVNode("span", { class: "truncate" }, [renderSlot(_ctx.$slots, "default")]),
						__props.trailingIcon ? (openBlock(), createBlock(_component_UIcon, {
							key: 2,
							name: __props.trailingIcon,
							class: "size-4 shrink-0",
							"aria-hidden": "true"
						}, null, 8, ["name"])) : createCommentVNode("", true),
						renderSlot(_ctx.$slots, "trailing")
					];
				}),
				_: 3
			}), _parent);
		};
	}
});
// app/components/shared/AppButton.vue
var _sfc_setup$9 = AppButton_vue_vue_type_script_setup_true_lang_default.setup;
AppButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/AppButton.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var AppButton_default = Object.assign(AppButton_vue_vue_type_script_setup_true_lang_default, { __name: "AppButton" });
// \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
// app/components/shared/BrandWhatsAppIcon.vue
var _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<svg${ssrRenderAttrs(mergeProps({
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		focusable: "false"
	}, _attrs))}><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z"></path></svg>`);
}
var _sfc_setup$8 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/BrandWhatsAppIcon.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var BrandWhatsAppIcon_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "BrandWhatsAppIcon" });
// app/utils/currency.ts
var locale = dealership.currency.locale;
var nairaFormatter = new Intl.NumberFormat(locale, {
	style: "currency",
	currency: dealership.currency.code,
	maximumFractionDigits: 0,
	minimumFractionDigits: 0
});
var numberFormatter = new Intl.NumberFormat(locale);
/**
* Formats a numeric NGN amount as ₦18,500,000.
* Falls back to a neutral label if a valid price is unavailable.
*/
function formatNaira(value) {
	if (typeof value !== "number" || !Number.isFinite(value)) return "Price on request";
	return nairaFormatter.format(value).replace(/\u00A0/g, " ");
}
function formatNumber(value) {
	return numberFormatter.format(value);
}
function formatMileage(value) {
	if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return null;
	return `${numberFormatter.format(value)} km`;
}
function formatDate(value) {
	const date = typeof value === "string" ? new Date(value) : value;
	if (Number.isNaN(date.getTime())) return "";
	return new Intl.DateTimeFormat(locale, {
		day: "numeric",
		month: "short",
		year: "numeric"
	}).format(date);
}
/** Converts a price input string into a positive integer, or undefined. */
function parsePriceInput(value) {
	if (value === null || value === void 0 || value === "") return void 0;
	const parsed = typeof value === "number" ? value : Number(String(value).replace(/[^\d.]/g, ""));
	if (!Number.isFinite(parsed) || parsed < 0) return void 0;
	return Math.round(parsed);
}
// app/utils/vehicle.ts
function vehicleTitle(vehicle, options = {}) {
	const { includeYear = true } = options;
	return [
		includeYear ? vehicle.year : null,
		vehicle.make,
		vehicle.model,
		vehicle.trim
	].filter(Boolean).join(" ");
}
function vehicleShortTitle(vehicle) {
	return `${vehicle.make} ${vehicle.model}`;
}
function conditionLabel(condition) {
	return condition === "new" ? "New" : "Pre-owned";
}
function statusLabel(status) {
	switch (status) {
		case "reserved": return "Reserved";
		case "sold": return "Sold";
		default: return "Available";
	}
}
function statusDescription(vehicle) {
	if (vehicle.status === "sold") return "This vehicle has been marked as sold. Similar available vehicles are shown below.";
	if (vehicle.status === "reserved") return "This vehicle is currently marked as reserved. Enquiries are welcome, but availability must be confirmed by the dealership.";
	return "Available for enquiry. Availability is not held until confirmed directly by the dealership.";
}
// app/utils/whatsapp.ts
/**
* Nigerian numbers are stored in international format for WhatsApp links.
* Accepts +234…, 234… or local 0… formats and returns digits only.
*/
function normalizeWhatsAppNumber(value) {
	const digits = value.replace(/\D/g, "");
	if (digits.startsWith("234")) return digits;
	if (digits.startsWith("0")) return `234${digits.slice(1)}`;
	return digits;
}
function buildWhatsAppUrl(message, number = dealership.contact.whatsapp.international) {
	return `https://wa.me/${normalizeWhatsAppNumber(number)}?text=${encodeURIComponent(message)}`;
}
function buildGeneralEnquiryMessage() {
	return `Hello ${dealership.name}, I would like to enquire about a vehicle in your inventory.`;
}
function vehicleListingUrl(vehicle, baseUrl) {
	return `${baseUrl.replace(/\/$/, "")}/cars/${vehicle.slug}`;
}
function buildVehicleEnquiryMessage(vehicle, baseUrl) {
	const listingUrl = vehicleListingUrl(vehicle, baseUrl);
	const identity = `${vehicleTitle(vehicle)} (${vehicle.stockNumber})`;
	if (vehicle.status === "sold") return `Hello ${dealership.name}, I saw that the ${identity} is marked as sold on your website. Could you suggest similar available vehicles? Listing: ${listingUrl}`;
	if (vehicle.status === "reserved") return `Hello ${dealership.name}, I am interested in the ${identity}, currently marked as reserved. Could you confirm whether it is still available? Listing: ${listingUrl}`;
	return `Hello ${dealership.name}, I am interested in the ${identity}, listed at ${formatNaira(vehicle.price)}. Could you share more details? Listing: ${listingUrl}`;
}
function buildVehicleEnquiryUrl(vehicle, baseUrl) {
	return buildWhatsAppUrl(buildVehicleEnquiryMessage(vehicle, baseUrl));
}
// app/composables/useWhatsApp.ts
function useWhatsApp() {
	const requestUrl = useRequestURL();
	const config = useRuntimeConfig();
	const origin = computed(() => requestUrl.origin || String(config.public.siteUrl));
	const phoneHref = `tel:${dealership.contact.phone.e164}`;
	const emailHref = `mailto:${dealership.contact.email}`;
	const whatsappNumber = normalizeWhatsAppNumber(dealership.contact.whatsapp.international);
	function generalMessage() {
		return buildGeneralEnquiryMessage();
	}
	function generalUrl(message) {
		return buildWhatsAppUrl(message ?? generalMessage(), whatsappNumber);
	}
	function vehicleMessage(vehicle) {
		return buildVehicleEnquiryMessage(vehicle, origin.value);
	}
	function vehicleUrl(vehicle) {
		return buildVehicleEnquiryUrl(vehicle, origin.value);
	}
	return {
		config: dealership,
		origin,
		phoneHref,
		emailHref,
		whatsappNumber,
		whatsappDisplay: dealership.contact.whatsapp.display,
		phoneDisplay: dealership.contact.phone.display,
		email: dealership.contact.email,
		generalMessage,
		generalUrl,
		vehicleMessage,
		vehicleUrl
	};
}
// app/components/shared/WhatsAppButton.vue?vue&type=script&setup=true&lang.ts
var WhatsAppButton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "WhatsAppButton",
	__ssrInlineRender: true,
	props: {
		vehicle: {},
		message: {},
		label: { default: "WhatsApp enquiry" },
		variant: { default: "gold" },
		size: { default: "md" },
		block: {
			type: Boolean,
			default: false
		},
		to: {}
	},
	setup(__props) {
		const props = __props;
		const { vehicleUrl, generalUrl } = useWhatsApp();
		const href = computed(() => props.vehicle ? vehicleUrl(props.vehicle) : generalUrl(props.message));
		const accessibleLabel = computed(() => {
			if (props.vehicle) return props.vehicle.status === "sold" ? `Ask about similar vehicles to the ${props.vehicle.make} ${props.vehicle.model} on WhatsApp` : `Enquire about the ${props.vehicle.make} ${props.vehicle.model} on WhatsApp`;
			return props.label;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppButton = AppButton_default;
			const _component_BrandWhatsAppIcon = BrandWhatsAppIcon_default;
			_push(ssrRenderComponent(_component_AppButton, mergeProps({
				href: unref(href),
				variant: __props.variant,
				size: __props.size,
				block: __props.block,
				to: __props.to,
				"aria-label": unref(accessibleLabel)
			}, _attrs), {
				leading: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_BrandWhatsAppIcon, { class: "size-4 shrink-0" }, null, _parent, _scopeId));
					else return [createVNode(_component_BrandWhatsAppIcon, { class: "size-4 shrink-0" })];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, () => {
						_push(`${ssrInterpolate(__props.label)}`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.label), 1)])];
				}),
				_: 3
			}, _parent));
		};
	}
});
// app/components/shared/WhatsAppButton.vue
var _sfc_setup$7 = WhatsAppButton_vue_vue_type_script_setup_true_lang_default.setup;
WhatsAppButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/WhatsAppButton.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var WhatsAppButton_default = Object.assign(WhatsAppButton_vue_vue_type_script_setup_true_lang_default, { __name: "WhatsAppButton" });
// app/components/layout/MobileNavigation.vue?vue&type=script&setup=true&lang.ts
var MobileNavigation_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MobileNavigation",
	__ssrInlineRender: true,
	props: { open: { type: Boolean } },
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const route = useRoute$1();
		ref(null);
		ref(null);
		watch(() => props.open, async (open) => {});
		watch(() => route.fullPath, () => {
			if (props.open) emit("close");
		});
		function close() {
			emit("close");
		}
		const secondaryLinks = [
			{
				label: "Test Drive",
				to: "/test-drive"
			},
			{
				label: "FAQ",
				to: "/faq"
			},
			{
				label: "Privacy Policy",
				to: "/privacy-policy"
			},
			{
				label: "Terms",
				to: "/terms"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_AppLogo = AppLogo_default;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_WhatsAppButton = WhatsAppButton_default;
			const _component_AppButton = AppButton_default;
			ssrRenderTeleport(_push, (_push) => {
				if (__props.open) {
					_push(`<div class="fixed inset-0 z-50 lg:hidden" data-v-e29505cf><button type="button" class="absolute inset-0 h-full w-full cursor-default bg-obsidian/65" tabindex="-1" aria-label="Close menu" data-v-e29505cf></button><div id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Site menu" class="drawer-panel absolute inset-y-0 right-0 flex w-full max-w-[24rem] flex-col bg-ivory shadow-2xl" data-v-e29505cf><div class="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-5" data-v-e29505cf>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/",
						"aria-label": "Vantage Motors home",
						onClick: close
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_AppLogo, null, null, _parent, _scopeId));
							else return [createVNode(_component_AppLogo)];
						}),
						_: 1
					}, _parent));
					_push(`<button type="button" class="flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink" aria-label="Close menu" data-v-e29505cf>`);
					_push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-x",
						class: "size-5",
						"aria-hidden": "true"
					}, null, _parent));
					_push(`</button></div><nav class="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile navigation" data-v-e29505cf><ul class="space-y-1" data-v-e29505cf><!--[-->`);
					ssrRenderList(unref(dealership).navigation, (item, index) => {
						_push(`<li data-v-e29505cf>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: item.to,
							class: "group flex items-center justify-between border-b border-line/80 py-3.5 text-[15px] font-medium tracking-tight text-ink transition-colors hover:text-gold-dark",
							"aria-current": unref(route).path === item.to ? "page" : void 0,
							onClick: close
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<span class="flex items-baseline gap-3" data-v-e29505cf${_scopeId}><span class="font-display text-[9px] tracking-[0.16em] text-gold-dark" data-v-e29505cf${_scopeId}>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span> ${ssrInterpolate(item.label)}</span>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-arrow-up-right",
										class: "size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
										"aria-hidden": "true"
									}, null, _parent, _scopeId));
								} else return [createVNode("span", { class: "flex items-baseline gap-3" }, [createVNode("span", { class: "font-display text-[9px] tracking-[0.16em] text-gold-dark" }, toDisplayString(String(index + 1).padStart(2, "0")), 1), createTextVNode(" " + toDisplayString(item.label), 1)]), createVNode(_component_UIcon, {
									name: "i-lucide-arrow-up-right",
									class: "size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
									"aria-hidden": "true"
								})];
							}),
							_: 2
						}, _parent));
						_push(`</li>`);
					});
					_push(`<!--]--></ul><div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-3" data-v-e29505cf><!--[-->`);
					ssrRenderList(secondaryLinks, (item) => {
						_push(ssrRenderComponent(_component_NuxtLink, {
							key: item.to,
							to: item.to,
							class: "text-[11px] font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink",
							onClick: close
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(item.label)}`);
								else return [createTextVNode(toDisplayString(item.label), 1)];
							}),
							_: 2
						}, _parent));
					});
					_push(`<!--]--></div><div class="mt-8 border border-line bg-white p-5" data-v-e29505cf><p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark" data-v-e29505cf>Speak with the team</p><a${ssrRenderAttr("href", `tel:${unref(dealership).contact.phone.e164}`)} class="mt-3 block font-display text-base font-medium text-ink" data-v-e29505cf>${ssrInterpolate(unref(dealership).contact.phone.display)}</a><a${ssrRenderAttr("href", `mailto:${unref(dealership).contact.email}`)} class="mt-1 block break-all text-xs text-muted hover:text-ink" data-v-e29505cf>${ssrInterpolate(unref(dealership).contact.email)}</a><p class="mt-3 text-[11px] leading-relaxed text-muted" data-v-e29505cf>${ssrInterpolate(unref(dealership).address.display)}</p><div class="mt-5 grid gap-2" data-v-e29505cf>`);
					_push(ssrRenderComponent(_component_WhatsAppButton, {
						label: "WhatsApp the team",
						size: "sm",
						block: ""
					}, null, _parent));
					_push(ssrRenderComponent(_component_AppButton, {
						to: unref(dealership).enquiryCta.to,
						variant: "outline",
						size: "sm",
						block: "",
						onClick: close
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(unref(dealership).enquiryCta.label)}`);
							else return [createTextVNode(toDisplayString(unref(dealership).enquiryCta.label), 1)];
						}),
						_: 1
					}, _parent));
					_push(`</div></div><p class="mt-6 text-[10px] leading-relaxed text-muted" data-v-e29505cf> Demonstration website. Placeholder contact details and sample inventory. </p></nav></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
// app/components/layout/MobileNavigation.vue
var _sfc_setup$6 = MobileNavigation_vue_vue_type_script_setup_true_lang_default.setup;
MobileNavigation_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/MobileNavigation.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var MobileNavigation_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(MobileNavigation_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e29505cf"]]), { __name: "MobileNavigation" });
// app/components/layout/AppHeader.vue?vue&type=script&setup=true&lang.ts
var AppHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppHeader",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute$1();
		const mobileOpen = ref(false);
		function isActive(to) {
			if (to === "/") return route.path === "/";
			return route.path === to || route.path.startsWith(`${to}/`);
		}
		function closeMobile() {
			mobileOpen.value = false;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_AppLogo = AppLogo_default;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_AppButton = AppButton_default;
			const _component_MobileNavigation = MobileNavigation_default;
			_push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-40 border-b border-line bg-ivory" }, _attrs))}><div class="shell flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
				"aria-label": "Vantage Motors home"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_AppLogo, null, null, _parent, _scopeId));
					else return [createVNode(_component_AppLogo)];
				}),
				_: 1
			}, _parent));
			_push(`<nav class="hidden items-center gap-7 lg:flex" aria-label="Main navigation"><!--[-->`);
			ssrRenderList(unref(dealership).navigation, (item) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: item.to,
					to: item.to,
					class: ["relative py-2 text-[12px] font-semibold tracking-[0.035em] transition-colors", isActive(item.to) ? "text-ink" : "text-muted hover:text-ink"],
					"aria-current": isActive(item.to) ? "page" : void 0
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(item.label)} <span class="${ssrRenderClass([isActive(item.to) ? "w-full scale-x-100" : "w-full scale-x-0", "absolute -bottom-0.5 left-0 h-px bg-gold transition-transform duration-200"])}" aria-hidden="true"${_scopeId}></span>`);
						else return [createTextVNode(toDisplayString(item.label) + " ", 1), createVNode("span", {
							class: ["absolute -bottom-0.5 left-0 h-px bg-gold transition-transform duration-200", isActive(item.to) ? "w-full scale-x-100" : "w-full scale-x-0"],
							"aria-hidden": "true"
						}, null, 2)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></nav><div class="flex items-center gap-3"><a${ssrRenderAttr("href", `tel:${unref(dealership).contact.phone.e164}`)} class="hidden items-center gap-2 text-[11px] font-semibold tracking-[0.02em] text-muted transition-colors hover:text-ink xl:flex">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-phone",
				class: "size-3.5 text-gold-dark",
				"aria-hidden": "true"
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(dealership).contact.phone.display)}</a><span class="hidden h-4 w-px bg-line xl:block" aria-hidden="true"></span>`);
			_push(ssrRenderComponent(_component_AppButton, {
				to: unref(dealership).enquiryCta.to,
				variant: "dark",
				size: "sm",
				class: "hidden sm:inline-flex"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(dealership).enquiryCta.label)}`);
					else return [createTextVNode(toDisplayString(unref(dealership).enquiryCta.label), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<button type="button" class="flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink lg:hidden"${ssrRenderAttr("aria-expanded", unref(mobileOpen))} aria-controls="mobile-navigation"${ssrRenderAttr("aria-label", unref(mobileOpen) ? "Close menu" : "Open menu")}><span class="flex w-4 flex-col gap-[5px]" aria-hidden="true"><span class="h-px w-full bg-current"></span><span class="h-px w-full bg-current"></span><span class="h-px w-3/4 bg-current"></span></span></button></div></div>`);
			_push(ssrRenderComponent(_component_MobileNavigation, {
				open: unref(mobileOpen),
				onClose: closeMobile
			}, null, _parent));
			_push(`</header>`);
		};
	}
});
// app/components/layout/AppHeader.vue
var _sfc_setup$5 = AppHeader_vue_vue_type_script_setup_true_lang_default.setup;
AppHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppHeader.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var AppHeader_default = Object.assign(AppHeader_vue_vue_type_script_setup_true_lang_default, { __name: "AppHeader" });
// node_modules/nuxt/dist/app/components/route-provider.js
var defineRouteProvider = (name = "RouteProvider") => defineComponent({
	name,
	props: {
		route: {
			type: Object,
			required: true
		},
		vnode: Object,
		vnodeRef: Object,
		renderKey: String,
		trackRootNodes: Boolean,
		routeRecord: Object
	},
	setup(props) {
		const previousKey = props.renderKey;
		const previousRoute = props.route;
		const route = {};
		for (const key in props.route) Object.defineProperty(route, key, {
			get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
			enumerable: true
		});
		provide(PageRouteSymbol, shallowReactive(route));
		return () => {
			if (!props.vnode) return props.vnode;
			return h(props.vnode, { ref: props.vnodeRef });
		};
	}
});
var RouteProvider = defineRouteProvider();
// node_modules/nuxt/dist/pages/runtime/page.js
var page_default = defineComponent({
	name: "NuxtPage",
	inheritAttrs: false,
	props: {
		name: { type: String },
		transition: {
			type: [Boolean, Object],
			default: void 0
		},
		keepalive: {
			type: [Boolean, Object],
			default: void 0
		},
		route: { type: Object },
		pageKey: {
			type: [Function, String],
			default: null
		}
	},
	setup(props, { attrs, slots, expose }) {
		const nuxtApp = useNuxtApp();
		const pageRef = ref();
		inject(PageRouteSymbol, null);
		expose({ pageRef });
		inject(LayoutMetaSymbol, null);
		nuxtApp.deferHydration();
		return () => {
			return h(RouterView, {
				name: props.name,
				route: props.route,
				...attrs
			}, { default: markStableSlot((routeProps) => {
				return h(Suspense, { suspensible: true }, { default() {
					return h(RouteProvider, {
						vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
						route: routeProps.route,
						vnodeRef: pageRef
					});
				} });
			}) });
		};
	}
});
function markStableSlot(fn) {
	const wrapped = ((routeProps) => {
		const result = fn(routeProps);
		if (Array.isArray(result)) return result;
		if (result == null || !isVNode(result)) return [createCommentVNode()];
		return [result];
	});
	wrapped._n = true;
	return wrapped;
}
function normalizeSlot(slot, data) {
	const slotContent = slot(data);
	return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
// app/components/shared/DemoNotice.vue?vue&type=script&setup=true&lang.ts
var DemoNotice_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DemoNotice",
	__ssrInlineRender: true,
	props: {
		tone: { default: "light" },
		compact: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = resolveComponent("UIcon");
			_push(`<aside${ssrRenderAttrs(mergeProps({
				class: ["flex items-start gap-3 border px-4 py-3 text-[11px] leading-relaxed", __props.tone === "dark" ? "border-white/15 bg-white/5 text-white/65" : "border-gold/30 bg-gold-50 text-charcoal"],
				"aria-label": "Demonstration notice"
			}, _attrs))}>`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-info",
				class: "mt-0.5 size-3.5 shrink-0 text-gold-dark",
				"aria-hidden": "true"
			}, null, _parent));
			_push(`<p><span class="font-semibold text-ink">Demo build.</span> ${ssrInterpolate(__props.compact ? "Sample inventory and placeholder business details." : unref(dealership).demoNotice)}</p></aside>`);
		};
	}
});
// app/components/shared/DemoNotice.vue
var _sfc_setup$4 = DemoNotice_vue_vue_type_script_setup_true_lang_default.setup;
DemoNotice_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/DemoNotice.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var DemoNotice_default = Object.assign(DemoNotice_vue_vue_type_script_setup_true_lang_default, { __name: "DemoNotice" });
// app/components/layout/AppFooter.vue?vue&type=script&setup=true&lang.ts
var AppFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const year = (/* @__PURE__ */ new Date()).getFullYear();
		const exploreLinks = computed(() => [
			{
				label: "Browse all cars",
				to: "/cars"
			},
			{
				label: "New arrivals",
				to: "/new-arrivals"
			},
			{
				label: "SUVs",
				to: "/cars?bodyType=SUV"
			},
			{
				label: "Sedans",
				to: "/cars?bodyType=Sedan"
			},
			{
				label: "Luxury collection",
				to: `/cars?minPrice=${dealership.luxuryPriceThreshold}`
			},
			{
				label: "Sell your car",
				to: "/sell-your-car"
			}
		]);
		const companyLinks = [
			{
				label: "About us",
				to: "/about"
			},
			{
				label: "Contact",
				to: "/contact"
			},
			{
				label: "Test drive",
				to: "/test-drive"
			},
			{
				label: "FAQ",
				to: "/faq"
			},
			{
				label: "Privacy policy",
				to: "/privacy-policy"
			},
			{
				label: "Terms & conditions",
				to: "/terms"
			}
		];
		const socialIcons = {
			Instagram: "i-lucide-instagram",
			Facebook: "i-lucide-facebook"
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_AppLogo = AppLogo_default;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_WhatsAppButton = WhatsAppButton_default;
			const _component_DemoNotice = DemoNotice_default;
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-obsidian text-ivory" }, _attrs))}><div class="shell py-14 md:py-20"><div class="grid gap-12 lg:grid-cols-12 lg:gap-8"><div class="lg:col-span-4">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				"aria-label": "Vantage Motors home",
				class: "inline-block"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_AppLogo, { variant: "light" }, null, _parent, _scopeId));
					else return [createVNode(_component_AppLogo, { variant: "light" })];
				}),
				_: 1
			}, _parent));
			_push(`<p class="mt-6 max-w-sm font-display text-lg font-normal leading-snug tracking-tight text-ivory">${ssrInterpolate(unref(dealership).tagline)}</p><p class="mt-4 max-w-sm text-[13px] leading-relaxed text-white/50">${ssrInterpolate(unref(dealership).description)}</p><div class="mt-6 flex items-center gap-3"><!--[-->`);
			ssrRenderList(unref(dealership).socials, (social) => {
				_push(`<a${ssrRenderAttr("href", social.href)} target="_blank" rel="noopener noreferrer" class="flex size-9 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-gold hover:text-gold-light"${ssrRenderAttr("aria-label", `${social.label} — ${social.handle}`)}>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: socialIcons[social.label] ?? "i-lucide-link",
					class: "size-4",
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</a>`);
			});
			_push(`<!--]--></div></div><div class="lg:col-span-2"><h2 class="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">Explore</h2><ul class="mt-5 space-y-3"><!--[-->`);
			ssrRenderList(unref(exploreLinks), (link) => {
				_push(`<li>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: link.to,
					class: "text-[13px] text-white/55 transition-colors hover:text-white"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(link.label)}`);
						else return [createTextVNode(toDisplayString(link.label), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div><div class="lg:col-span-2"><h2 class="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">Dealership</h2><ul class="mt-5 space-y-3"><!--[-->`);
			ssrRenderList(companyLinks, (link) => {
				_push(`<li>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: link.to,
					class: "text-[13px] text-white/55 transition-colors hover:text-white"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(link.label)}`);
						else return [createTextVNode(toDisplayString(link.label), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div><div class="lg:col-span-4"><h2 class="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">Visit &amp; contact</h2><address class="mt-5 not-italic"><p class="text-[13px] leading-relaxed text-white/55">${ssrInterpolate(unref(dealership).address.line1)}<br> ${ssrInterpolate(unref(dealership).address.area)}, ${ssrInterpolate(unref(dealership).address.city)}<br> ${ssrInterpolate(unref(dealership).address.state)}, ${ssrInterpolate(unref(dealership).address.country)}</p></address><div class="mt-4 space-y-2"><a${ssrRenderAttr("href", `tel:${unref(dealership).contact.phone.e164}`)} class="flex items-center gap-2 text-[13px] text-white/75 transition-colors hover:text-gold-light">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-phone",
				class: "size-3.5 text-gold",
				"aria-hidden": "true"
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(dealership).contact.phone.display)}</a><a${ssrRenderAttr("href", `mailto:${unref(dealership).contact.email}`)} class="flex items-center gap-2 break-all text-[13px] text-white/75 transition-colors hover:text-gold-light">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-lucide-mail",
				class: "size-3.5 shrink-0 text-gold",
				"aria-hidden": "true"
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(dealership).contact.email)}</a></div><div class="mt-5 border-t border-white/10 pt-4"><p class="text-[10px] uppercase tracking-[0.16em] text-white/35">Opening hours</p><ul class="mt-2 space-y-1"><!--[-->`);
			ssrRenderList(unref(dealership).hours, (entry) => {
				_push(`<li class="flex items-baseline justify-between gap-4 text-[11px]"><span class="text-white/45">${ssrInterpolate(entry.days)}</span><span class="text-white/70">${ssrInterpolate(entry.hours)}</span></li>`);
			});
			_push(`<!--]--></ul></div><div class="mt-5">`);
			_push(ssrRenderComponent(_component_WhatsAppButton, {
				label: "WhatsApp the team",
				size: "sm",
				variant: "outline",
				class: "border-white/20! text-white! hover:border-gold! hover:text-gold-light!"
			}, null, _parent));
			_push(`</div></div></div>`);
			_push(ssrRenderComponent(_component_DemoNotice, {
				tone: "dark",
				compact: "",
				class: "mt-12"
			}, null, _parent));
			_push(`<div class="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© ${ssrInterpolate(unref(year))} ${ssrInterpolate(unref(dealership).name)}. Placeholder brand for demonstration.</p><p class="flex flex-wrap items-center gap-x-4 gap-y-1"><span>Prices in Nigerian naira (NGN)</span><span class="hidden h-3 w-px bg-white/15 sm:block" aria-hidden="true"></span><span>Photography: Unsplash &amp; Pexels</span></p></div></div></footer>`);
		};
	}
});
// app/components/layout/AppFooter.vue
var _sfc_setup$3 = AppFooter_vue_vue_type_script_setup_true_lang_default.setup;
AppFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppFooter.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var AppFooter_default = Object.assign(AppFooter_vue_vue_type_script_setup_true_lang_default, { __name: "AppFooter" });
// app/app.vue?vue&type=script&setup=true&lang.ts
var app_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "app",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute$1();
		const runtimeConfig = useRuntimeConfig();
		const siteUrl = String(runtimeConfig.public.siteUrl).replace(/\/$/, "");
		useHead(() => ({
			titleTemplate: (title) => title ? `${title} · ${dealership.name}` : dealership.seo.defaultTitle,
			link: [{
				rel: "canonical",
				href: `${siteUrl}${route.path === "/" ? "" : route.path}`
			}],
			script: [{
				key: "vantage-website-jsonld",
				type: "application/ld+json",
				innerHTML: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebSite",
					name: dealership.name,
					url: siteUrl,
					description: dealership.seo.defaultDescription,
					potentialAction: {
						"@type": "SearchAction",
						target: `${siteUrl}/cars?q={search_term_string}`,
						"query-input": "required name=search_term_string"
					}
				})
			}]
		}));
		useSeoMeta({
			description: dealership.seo.defaultDescription,
			ogType: "website",
			ogSiteName: dealership.name,
			ogImage: `${siteUrl}${dealership.seo.ogImage}`,
			ogImageAlt: "Illustrative automotive photography for Vantage Motors",
			twitterCard: "summary_large_image",
			twitterTitle: dealership.seo.defaultTitle,
			twitterDescription: dealership.seo.defaultDescription,
			twitterImage: `${siteUrl}${dealership.seo.ogImage}`,
			robots: dealership.demoMode ? "noindex, nofollow" : "index, follow"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UApp = resolveComponent("UApp");
			const _component_NuxtRouteAnnouncer = ServerPlaceholder;
			const _component_AnnouncementBar = AnnouncementBar_default;
			const _component_AppHeader = AppHeader_default;
			const _component_NuxtPage = page_default;
			const _component_AppFooter = AppFooter_default;
			_push(ssrRenderComponent(_component_UApp, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<a href="#main-content" class="skip-link"${_scopeId}>Skip to main content</a>`);
						_push(ssrRenderComponent(_component_NuxtRouteAnnouncer, null, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_AnnouncementBar, null, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_AppHeader, null, null, _parent, _scopeId));
						_push(`<main id="main-content"${_scopeId}>`);
						_push(ssrRenderComponent(_component_NuxtPage, null, null, _parent, _scopeId));
						_push(`</main>`);
						_push(ssrRenderComponent(_component_AppFooter, null, null, _parent, _scopeId));
					} else return [
						createVNode("a", {
							href: "#main-content",
							class: "skip-link"
						}, "Skip to main content"),
						createVNode(_component_NuxtRouteAnnouncer),
						createVNode(_component_AnnouncementBar),
						createVNode(_component_AppHeader),
						createVNode("main", { id: "main-content" }, [createVNode(_component_NuxtPage)]),
						createVNode(_component_AppFooter)
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
// app/app.vue
var _sfc_setup$2 = app_vue_vue_type_script_setup_true_lang_default.setup;
app_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = app_vue_vue_type_script_setup_true_lang_default;
// app/error.vue?vue&type=script&setup=true&lang.ts
var error_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "error",
	__ssrInlineRender: true,
	props: { error: {} },
	setup(__props) {
		const props = __props;
		const isNotFound = computed(() => props.error.statusCode === 404);
		useHead({
			title: isNotFound.value ? "Page not found" : "Something went wrong",
			meta: [{
				name: "robots",
				content: "noindex, nofollow"
			}]
		});
		function goHome() {
			clearError({ redirect: "/" });
		}
		function goBack() {
			clearError({ redirect: "/" });
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UApp = resolveComponent("UApp");
			const _component_AnnouncementBar = AnnouncementBar_default;
			const _component_AppHeader = AppHeader_default;
			const _component_AppButton = AppButton_default;
			const _component_NuxtLink = NuxtLink;
			const _component_UIcon = resolveComponent("UIcon");
			const _component_AppFooter = AppFooter_default;
			_push(ssrRenderComponent(_component_UApp, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<a href="#main-content" class="skip-link"${_scopeId}>Skip to main content</a>`);
						_push(ssrRenderComponent(_component_AnnouncementBar, null, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_AppHeader, null, null, _parent, _scopeId));
						_push(`<main id="main-content" class="bg-ivory"${_scopeId}><section class="shell py-20 sm:py-28" aria-labelledby="error-heading"${_scopeId}><div class="grid gap-10 lg:grid-cols-12 lg:items-center"${_scopeId}><div class="lg:col-span-7"${_scopeId}><p class="eyebrow text-gold-dark"${_scopeId}>${ssrInterpolate(unref(isNotFound) ? "404 · Page not found" : "Error")}</p><h1 id="error-heading" class="display-title mt-5 max-w-2xl text-[2.8rem] text-ink sm:text-6xl lg:text-[4.4rem]"${_scopeId}>${ssrInterpolate(unref(isNotFound) ? "This road ends here." : "Something went wrong.")}</h1><p class="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted"${_scopeId}>`);
						if (unref(isNotFound)) _push(`<!--[--> The page you were looking for may have moved, been removed, or the address may be incorrect. The collection is still where you left it. <!--]-->`);
						else _push(`<!--[--> The page could not be displayed. Please try again, or head back to the collection. <!--]-->`);
						_push(`</p><div class="mt-8 flex flex-col gap-3 sm:flex-row"${_scopeId}>`);
						_push(ssrRenderComponent(_component_AppButton, {
							variant: "gold",
							size: "lg",
							onClick: goHome
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Return home `);
								else return [createTextVNode(" Return home ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_AppButton, {
							to: "/cars",
							variant: "dark",
							size: "lg",
							"trailing-icon": "i-lucide-arrow-right"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Browse cars `);
								else return [createTextVNode(" Browse cars ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_AppButton, {
							variant: "outline",
							size: "lg",
							onClick: goBack
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Go back`);
								else return [createTextVNode("Go back")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						if (!unref(isNotFound) && __props.error.statusCode) _push(`<p class="mt-6 text-[10px] uppercase tracking-[0.14em] text-muted"${_scopeId}> Reference: ${ssrInterpolate(__props.error.statusCode)}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="lg:col-span-5"${_scopeId}><div class="border border-line bg-white p-6"${_scopeId}><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark"${_scopeId}>Useful routes</p><ul class="mt-4 divide-y divide-line border-y border-line"${_scopeId}><li${_scopeId}>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/cars",
							class: "group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(` Full inventory `);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-arrow-up-right",
										class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
										"aria-hidden": "true"
									}, null, _parent, _scopeId));
								} else return [createTextVNode(" Full inventory "), createVNode(_component_UIcon, {
									name: "i-lucide-arrow-up-right",
									class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
									"aria-hidden": "true"
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</li><li${_scopeId}>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/new-arrivals",
							class: "group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(` New arrivals `);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-arrow-up-right",
										class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
										"aria-hidden": "true"
									}, null, _parent, _scopeId));
								} else return [createTextVNode(" New arrivals "), createVNode(_component_UIcon, {
									name: "i-lucide-arrow-up-right",
									class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
									"aria-hidden": "true"
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</li><li${_scopeId}>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/contact",
							class: "group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(` Contact the team `);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-arrow-up-right",
										class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
										"aria-hidden": "true"
									}, null, _parent, _scopeId));
								} else return [createTextVNode(" Contact the team "), createVNode(_component_UIcon, {
									name: "i-lucide-arrow-up-right",
									class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
									"aria-hidden": "true"
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</li><li${_scopeId}>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/faq",
							class: "group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(` Frequently asked questions `);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-arrow-up-right",
										class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
										"aria-hidden": "true"
									}, null, _parent, _scopeId));
								} else return [createTextVNode(" Frequently asked questions "), createVNode(_component_UIcon, {
									name: "i-lucide-arrow-up-right",
									class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
									"aria-hidden": "true"
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</li></ul><p class="mt-4 text-[10px] leading-relaxed text-muted"${_scopeId}>${ssrInterpolate(unref(dealership).name)} — demonstration website. Placeholder contact details and sample inventory. </p></div></div></div></section></main>`);
						_push(ssrRenderComponent(_component_AppFooter, null, null, _parent, _scopeId));
					} else return [
						createVNode("a", {
							href: "#main-content",
							class: "skip-link"
						}, "Skip to main content"),
						createVNode(_component_AnnouncementBar),
						createVNode(_component_AppHeader),
						createVNode("main", {
							id: "main-content",
							class: "bg-ivory"
						}, [createVNode("section", {
							class: "shell py-20 sm:py-28",
							"aria-labelledby": "error-heading"
						}, [createVNode("div", { class: "grid gap-10 lg:grid-cols-12 lg:items-center" }, [createVNode("div", { class: "lg:col-span-7" }, [
							createVNode("p", { class: "eyebrow text-gold-dark" }, toDisplayString(unref(isNotFound) ? "404 · Page not found" : "Error"), 1),
							createVNode("h1", {
								id: "error-heading",
								class: "display-title mt-5 max-w-2xl text-[2.8rem] text-ink sm:text-6xl lg:text-[4.4rem]"
							}, toDisplayString(unref(isNotFound) ? "This road ends here." : "Something went wrong."), 1),
							createVNode("p", { class: "mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted" }, [unref(isNotFound) ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(" The page you were looking for may have moved, been removed, or the address may be incorrect. The collection is still where you left it. ")], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [createTextVNode(" The page could not be displayed. Please try again, or head back to the collection. ")], 64))]),
							createVNode("div", { class: "mt-8 flex flex-col gap-3 sm:flex-row" }, [
								createVNode(_component_AppButton, {
									variant: "gold",
									size: "lg",
									onClick: goHome
								}, {
									default: withCtx(() => [createTextVNode(" Return home ")]),
									_: 1
								}),
								createVNode(_component_AppButton, {
									to: "/cars",
									variant: "dark",
									size: "lg",
									"trailing-icon": "i-lucide-arrow-right"
								}, {
									default: withCtx(() => [createTextVNode(" Browse cars ")]),
									_: 1
								}),
								createVNode(_component_AppButton, {
									variant: "outline",
									size: "lg",
									onClick: goBack
								}, {
									default: withCtx(() => [createTextVNode("Go back")]),
									_: 1
								})
							]),
							!unref(isNotFound) && __props.error.statusCode ? (openBlock(), createBlock("p", {
								key: 0,
								class: "mt-6 text-[10px] uppercase tracking-[0.14em] text-muted"
							}, " Reference: " + toDisplayString(__props.error.statusCode), 1)) : createCommentVNode("", true)
						]), createVNode("div", { class: "lg:col-span-5" }, [createVNode("div", { class: "border border-line bg-white p-6" }, [
							createVNode("p", { class: "text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark" }, "Useful routes"),
							createVNode("ul", { class: "mt-4 divide-y divide-line border-y border-line" }, [
								createVNode("li", null, [createVNode(_component_NuxtLink, {
									to: "/cars",
									class: "group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink"
								}, {
									default: withCtx(() => [createTextVNode(" Full inventory "), createVNode(_component_UIcon, {
										name: "i-lucide-arrow-up-right",
										class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
										"aria-hidden": "true"
									})]),
									_: 1
								})]),
								createVNode("li", null, [createVNode(_component_NuxtLink, {
									to: "/new-arrivals",
									class: "group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink"
								}, {
									default: withCtx(() => [createTextVNode(" New arrivals "), createVNode(_component_UIcon, {
										name: "i-lucide-arrow-up-right",
										class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
										"aria-hidden": "true"
									})]),
									_: 1
								})]),
								createVNode("li", null, [createVNode(_component_NuxtLink, {
									to: "/contact",
									class: "group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink"
								}, {
									default: withCtx(() => [createTextVNode(" Contact the team "), createVNode(_component_UIcon, {
										name: "i-lucide-arrow-up-right",
										class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
										"aria-hidden": "true"
									})]),
									_: 1
								})]),
								createVNode("li", null, [createVNode(_component_NuxtLink, {
									to: "/faq",
									class: "group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink"
								}, {
									default: withCtx(() => [createTextVNode(" Frequently asked questions "), createVNode(_component_UIcon, {
										name: "i-lucide-arrow-up-right",
										class: "size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
										"aria-hidden": "true"
									})]),
									_: 1
								})])
							]),
							createVNode("p", { class: "mt-4 text-[10px] leading-relaxed text-muted" }, toDisplayString(unref(dealership).name) + " — demonstration website. Placeholder contact details and sample inventory. ", 1)
						])])])])]),
						createVNode(_component_AppFooter)
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
// app/error.vue
var _sfc_setup$1 = error_vue_vue_type_script_setup_true_lang_default.setup;
error_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var error_default = error_vue_vue_type_script_setup_true_lang_default;
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
// node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute$1());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		function invokeAppErrorHandler(err, target, info) {
			const errorHandler = nuxtApp.vueApp.config.errorHandler;
			if (errorHandler && !errorHandler.__nuxt_default) try {
				errorHandler(err, target, info);
			} catch (handlerError) {
				console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
			}
		}
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(err));
				onServerPrefetch(() => p);
				invokeAppErrorHandler(err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(error_default), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
// node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createError$2(error);
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { AppButton_default as A, BrandWhatsAppIcon_default as B, DemoNotice_default as D, NuxtLink as N, WhatsAppButton_default as W, _plugin_vue_export_helper_default as _, useSeoMeta as a, useAsyncData as b, conditionLabel as c, dealership as d, formatMileage as e, formatNaira as f, createError$2 as g, useRuntimeConfig as h, useWhatsApp as i, useRequestURL as j, useRouter as k, formatDate as l, buildWhatsAppUrl as m, useState as n, formatNumber as o, parsePriceInput as p, vehicleShortTitle as q, statusLabel as r, statusDescription as s, useHead as t, useRoute$1 as u, vehicleTitle as v, useNuxtApp as w, useAppConfig as x, entry as y };
//# sourceMappingURL=entry.mjs.map
