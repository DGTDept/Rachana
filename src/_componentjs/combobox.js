(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
  })((function () { 'use strict';
  
    /******************************************************************************
    Copyright (c) Microsoft Corporation.
  
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
  
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
  
    function __decorate(decorators, target, key, desc) {
      let c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
  
    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
  
    const appliedClassMixins = new WeakMap();
  
    /** Vefify if the Mixin was previously applyed
     * @private
     * @param {function} mixin      Mixin being applyed
     * @param {object} superClass   Class receiving the new mixin
     * @returns {boolean}
     */
    function wasMixinPreviouslyApplied(mixin, superClass) {
      let klass = superClass;
      while (klass) {
        if (appliedClassMixins.get(klass) === mixin) {
          return true;
        }
        klass = Object.getPrototypeOf(klass);
      }
      return false;
    }
  
    /** Apply each mixin in the chain to make sure they are not applied more than once to the final class.
     * @export
     * @param {function} mixin      Mixin to be applyed
     * @returns {object}            Mixed class with mixin applied
     */
    function dedupeMixin(mixin) {
      return superClass => {
        if (wasMixinPreviouslyApplied(mixin, superClass)) {
          return superClass;
        }
        const mixedClass = mixin(superClass);
        appliedClassMixins.set(mixedClass, mixin);
        return mixedClass;
      };
    }
  
    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$5=window,e$9=t$5.ShadowRoot&&(void 0===t$5.ShadyCSS||t$5.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$7=Symbol(),n$9=new WeakMap;class o$9{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$7)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$9&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$9.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$9.set(s,t));}return t}toString(){return this.cssText}}const r$4=t=>new o$9("string"==typeof t?t:t+"",void 0,s$7),i$5=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$9(n,t,s$7)},S$2=(s,n)=>{e$9?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$5.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$3=e$9?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;
  
    /**
     * @typedef {import('./types').RenderOptions} RenderOptions
     * @typedef {import('./types').ScopedElementsMixin} ScopedElementsMixin
     * @typedef {import('./types').ScopedElementsHost} ScopedElementsHost
     * @typedef {import('./types').ScopedElementsMap} ScopedElementsMap
     * @typedef {import('@lit/reactive-element').CSSResultOrNative} CSSResultOrNative
     */
  
    // @ts-ignore
    const supportsScopedRegistry = !!ShadowRoot.prototype.createElement;
  
    /**
     * @template {import('./types').Constructor<HTMLElement>} T
     * @param {T} superclass
     * @return {T & import('./types').Constructor<ScopedElementsHost>}
     */
    const ScopedElementsMixinImplementation = superclass =>
      /** @type {ScopedElementsHost} */
      class ScopedElementsHost extends superclass {
        /**
         * Obtains the scoped elements definitions map if specified.
         *
         * @returns {ScopedElementsMap}
         */
        static get scopedElements() {
          return {};
        }
  
        /**
         * Obtains the ShadowRoot options.
         *
         * @type {ShadowRootInit}
         */
        static get shadowRootOptions() {
          return this.__shadowRootOptions;
        }
  
        /**
         * Set the shadowRoot options.
         *
         * @param {ShadowRootInit} value
         */
        static set shadowRootOptions(value) {
          this.__shadowRootOptions = value;
        }
  
        /**
         * Obtains the element styles.
         *
         * @returns {CSSResultOrNative[]}
         */
        static get elementStyles() {
          return this.__elementStyles;
        }
  
        static set elementStyles(styles) {
          this.__elementStyles = styles;
        }
  
        // either TS or ESLint will complain here
        // eslint-disable-next-line no-unused-vars
        constructor(..._args) {
          super();
          /** @type {RenderOptions} */
          this.renderOptions = this.renderOptions || undefined;
        }
  
        /**
         * Obtains the CustomElementRegistry associated to the ShadowRoot.
         *
         * @returns {CustomElementRegistry}
         */
        get registry() {
          // @ts-ignore
          return this.constructor.__registry;
        }
  
        /**
         * Set the CustomElementRegistry associated to the ShadowRoot
         *
         * @param {CustomElementRegistry} registry
         */
        set registry(registry) {
          // @ts-ignore
          this.constructor.__registry = registry;
        }
  
        createRenderRoot() {
          const { scopedElements, shadowRootOptions, elementStyles } =
            /** @type {typeof ScopedElementsHost} */ (this.constructor);
  
          const shouldCreateRegistry =
            !this.registry ||
            // @ts-ignore
            (this.registry === this.constructor.__registry &&
              !Object.prototype.hasOwnProperty.call(this.constructor, '__registry'));
  
          /**
           * Create a new registry if:
           * - the registry is not defined
           * - this class doesn't have its own registry *AND* has no shared registry
           */
          if (shouldCreateRegistry) {
            this.registry = supportsScopedRegistry ? new CustomElementRegistry() : customElements;
            for (const [tagName, klass] of Object.entries(scopedElements)) {
              this.defineScopedElement(tagName, klass);
            }
          }
  
          /** @type {ShadowRootInit} */
          const options = {
            mode: 'open',
            ...shadowRootOptions,
            customElements: this.registry,
          };
  
          const createdRoot = this.attachShadow(options);
          if (supportsScopedRegistry) {
            this.renderOptions.creationScope = createdRoot;
          }
  
          if (createdRoot instanceof ShadowRoot) {
            S$2(createdRoot, elementStyles);
            this.renderOptions.renderBefore = this.renderOptions.renderBefore || createdRoot.firstChild;
          }
  
          return createdRoot;
        }
  
        createScopedElement(tagName) {
          const root = supportsScopedRegistry ? this.shadowRoot : document;
          // @ts-ignore polyfill to support createElement on shadowRoot is loaded
          return root.createElement(tagName);
        }
  
        /**
         * Defines a scoped element.
         *
         * @param {string} tagName
         * @param {typeof HTMLElement} klass
         */
        defineScopedElement(tagName, klass) {
          const registeredClass = this.registry.get(tagName);
          if (registeredClass && supportsScopedRegistry === false && registeredClass !== klass) {
            // eslint-disable-next-line no-console
            console.error(
              [
                `You are trying to re-register the "${tagName}" custom element with a different class via ScopedElementsMixin.`,
                'This is only possible with a CustomElementRegistry.',
                'Your browser does not support this feature so you will need to load a polyfill for it.',
                'Load "@webcomponents/scoped-custom-element-registry" before you register ANY web component to the global customElements registry.',
                'e.g. add "<script src="/node_modules/@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js"></script>" as your first script tag.',
                'For more details you can visit https://open-wc.org/docs/development/scoped-elements/',
              ].join('\n'),
            );
          }
          if (!registeredClass) {
            return this.registry.define(tagName, klass);
          }
          return this.registry.get(tagName);
        }
  
        /**
         * @deprecated use the native el.tagName instead
         *
         * @param {string} tagName
         * @returns {string} the tag name
         */
        // eslint-disable-next-line class-methods-use-this
        getScopedTagName(tagName) {
          // @ts-ignore
          return this.constructor.getScopedTagName(tagName);
        }
  
        /**
         * @deprecated use the native el.tagName instead
         *
         * @param {string} tagName
         * @returns {string} the tag name
         */
        // eslint-disable-next-line class-methods-use-this
        static getScopedTagName(tagName) {
          // @ts-ignore
          return this.__registry.get(tagName) ? tagName : undefined;
        }
      };
  
    const ScopedElementsMixin = dedupeMixin(ScopedElementsMixinImplementation);
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var s$6;const e$8=window,r$3=e$8.trustedTypes,h$4=r$3?r$3.emptyScript:"",o$8=e$8.reactiveElementPolyfillSupport,n$8={toAttribute(t,i){switch(i){case Boolean:t=t?h$4:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$3=(t,i)=>i!==t&&(i==i||t==t),l$7={attribute:!0,type:String,converter:n$8,reflect:!1,hasChanged:a$3},d$2="finalized";class u$2 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$7){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$7}static finalize(){if(this.hasOwnProperty(d$2))return !1;this[d$2]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$3(i));}else void 0!==i&&s.push(c$3(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$2(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$7){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$8).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$8;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$3)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}u$2[d$2]=!0,u$2.elementProperties=new Map,u$2.elementStyles=[],u$2.shadowRootOptions={mode:"open"},null==o$8||o$8({ReactiveElement:u$2}),(null!==(s$6=e$8.reactiveElementVersions)&&void 0!==s$6?s$6:e$8.reactiveElementVersions=[]).push("1.6.2");
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t$4;const i$4=window,s$5=i$4.trustedTypes,e$7=s$5?s$5.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$7="$lit$",n$7=`lit$${(Math.random()+"").slice(9)}$`,l$6="?"+n$7,h$3=`<${l$6}>`,r$2=document,u$1=()=>r$2.createComment(""),d$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c$2=Array.isArray,v$1=t=>c$2(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$2="[ \t\n\f\r]",f$2=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_$1=/-->/g,m$1=/>/g,p$1=RegExp(`>|${a$2}(?:([^\\s"'>=/]+)(${a$2}*=${a$2}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g$1=/'/g,$$1=/"/g,y$1=/^(?:script|style|textarea|title)$/i,w$1=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x$1=w$1(1),T$1=Symbol.for("lit-noChange"),A$1=Symbol.for("lit-nothing"),E$1=new WeakMap,C$1=r$2.createTreeWalker(r$2,129,null,!1);function P$1(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$7?e$7.createHTML(i):i}const V$1=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f$2;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f$2?"!--"===c[1]?u=_$1:void 0!==c[1]?u=m$1:void 0!==c[2]?(y$1.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p$1):void 0!==c[3]&&(u=p$1):u===p$1?">"===c[0]?(u=null!=l?l:f$2,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p$1:'"'===c[3]?$$1:g$1):u===$$1||u===g$1?u=p$1:u===_$1||u===m$1?u=f$2:(u=p$1,l=void 0);const w=u===p$1&&t[i+1].startsWith("/>")?" ":"";r+=u===f$2?s+h$3:v>=0?(e.push(d),s.slice(0,v)+o$7+s.slice(v)+n$7+w):s+n$7+(-2===v?(e.push(void 0),i):w);}return [P$1(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N$1{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V$1(t,i);if(this.el=N$1.createElement(a,e),C$1.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C$1.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$7)||i.startsWith(n$7)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$7).split(n$7),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H$1:"?"===i[1]?L$1:"@"===i[1]?z$1:k$1});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y$1.test(h.tagName)){const t=h.textContent.split(n$7),i=t.length-1;if(i>0){h.textContent=s$5?s$5.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u$1()),C$1.nextNode(),v.push({type:2,index:++r});h.append(t[i],u$1());}}}else if(8===h.nodeType)if(h.data===l$6)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$7,t+1));)v.push({type:7,index:r}),t+=n$7.length-1;}r++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S$1(t,i,s=t,e){var o,n,l,h;if(i===T$1)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d$1(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S$1(t,r._$AS(t,i.values),r,e)),i}class M$1{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r$2).importNode(s,!0);C$1.currentNode=o;let n=C$1.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R$1(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z$1(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C$1.nextNode(),l++);}return C$1.currentNode=r$2,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R$1{constructor(t,i,s,e){var o;this.type=2,this._$AH=A$1,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S$1(this,t,i),d$1(t)?t===A$1||null==t||""===t?(this._$AH!==A$1&&this._$AR(),this._$AH=A$1):t!==this._$AH&&t!==T$1&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v$1(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A$1&&d$1(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$2.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N$1.createElement(P$1(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M$1(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E$1.get(t.strings);return void 0===i&&E$1.set(t.strings,i=new N$1(t)),i}T(t){c$2(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R$1(this.k(u$1()),this.k(u$1()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k$1{constructor(t,i,s,e,o){this.type=1,this._$AH=A$1,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A$1;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S$1(this,t,i,0),n=!d$1(t)||t!==this._$AH&&t!==T$1,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S$1(this,e[s+l],i,l),h===T$1&&(h=this._$AH[l]),n||(n=!d$1(h)||h!==this._$AH[l]),h===A$1?t=A$1:t!==A$1&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A$1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H$1 extends k$1{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A$1?void 0:t;}}const I$1=s$5?s$5.emptyScript:"";class L$1 extends k$1{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A$1?this.element.setAttribute(this.name,I$1):this.element.removeAttribute(this.name);}}class z$1 extends k$1{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S$1(this,t,i,0))&&void 0!==s?s:A$1)===T$1)return;const e=this._$AH,o=t===A$1&&e!==A$1||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A$1&&(e===A$1||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z$1{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S$1(this,t);}}const B$1=i$4.litHtmlPolyfillSupport;null==B$1||B$1(N$1,R$1),(null!==(t$4=i$4.litHtmlVersions)&&void 0!==t$4?t$4:i$4.litHtmlVersions=[]).push("2.7.5");
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t$3;const i$3=window,s$4=i$3.trustedTypes,e$6=s$4?s$4.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$6="$lit$",n$6=`lit$${(Math.random()+"").slice(9)}$`,l$5="?"+n$6,h$2=`<${l$5}>`,r$1=document,u=()=>r$1.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c$1=Array.isArray,v=t=>c$1(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$1="[ \t\n\f\r]",f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a$1}(?:([^\\s"'>=/]+)(${a$1}*=${a$1}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r$1.createTreeWalker(r$1,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$6?e$6.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f$1;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f$1?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f$1,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f$1:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f$1?s+h$2:v>=0?(e.push(d),s.slice(0,v)+o$6+s.slice(v)+n$6+w):s+n$6+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$6)||i.startsWith(n$6)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$6).split(n$6),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$6),i=t.length-1;if(i>0){h.textContent=s$4?s$4.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$5)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$6,t+1));)v.push({type:7,index:r}),t+=n$6.length-1;}r++;}}static createElement(t,i){const s=r$1.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r$1).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r$1,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$1.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$4?s$4.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$3.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$3=i$3.litHtmlVersions)&&void 0!==t$3?t$3:i$3.litHtmlVersions=[]).push("2.7.5");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var l$4,o$5;class s$3 extends u$2{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}}s$3.finalized=!0,s$3._$litElement$=!0,null===(l$4=globalThis.litElementHydrateSupport)||void 0===l$4||l$4.call(globalThis,{LitElement:s$3});const n$5=globalThis.litElementPolyfillSupport;null==n$5||n$5({LitElement:s$3});(null!==(o$5=globalThis.litElementVersions)&&void 0!==o$5?o$5:globalThis.litElementVersions=[]).push("3.3.2");
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const i$2=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e$5=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$4(n){return (t,o)=>void 0!==o?e$5(n,t,o):i$2(n,t)}
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function t$2(t){return n$4({...t,state:!0})}
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const o$4=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function i$1(i,n){return o$4({descriptor:o=>{const t={get(){var o,n;return null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==n?n:null},enumerable:!0,configurable:!0};if(n){const n="symbol"==typeof o?Symbol():"__"+o;t.get=function(){var o,t;return void 0===this[n]&&(this[n]=null!==(t=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==t?t:null),this[n]};}return t}})}
  
    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var n$3;null!=(null===(n$3=window.HTMLSlotElement)||void 0===n$3?void 0:n$3.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));
  
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const e$4=o=>void 0===o.strings,f={},s$2=(o,l=f)=>o._$AH=l;
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$3=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const s$1=(i,t)=>{var e,o;const r=i._$AN;if(void 0===r)return !1;for(const i of r)null===(o=(e=i)._$AO)||void 0===o||o.call(e,t,!1),s$1(i,t);return !0},o$3=i=>{let t,e;do{if(void 0===(t=i._$AM))break;e=t._$AN,e.delete(i),i=t;}while(0===(null==e?void 0:e.size))},r=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(void 0===e)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),l$3(t);}};function n$2(i){void 0!==this._$AN?(o$3(this),this._$AM=i,r(this)):this._$AM=i;}function h$1(i,t=!1,e=0){const r=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(t)if(Array.isArray(r))for(let i=e;i<r.length;i++)s$1(r[i],!1),o$3(r[i]);else null!=r&&(s$1(r,!1),o$3(r));else s$1(this,i);}const l$3=i=>{var t,s,o,r;i.type==t$1.CHILD&&(null!==(t=(o=i)._$AP)&&void 0!==t||(o._$AP=h$1),null!==(s=(r=i)._$AQ)&&void 0!==s||(r._$AQ=n$2));};class c extends i{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,e){super._$AT(i,t,e),r(this),this.isConnected=i._$AU;}_$AO(i,t=!0){var e,r;i!==this.isConnected&&(this.isConnected=i,i?null===(e=this.reconnected)||void 0===e||e.call(this):null===(r=this.disconnected)||void 0===r||r.call(this)),t&&(s$1(this,i),o$3(this));}setValue(t){if(e$4(this._$Ct))this._$Ct._$AI(t,this);else {const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}}
  
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const e$2=()=>new o$2;class o$2{}const h=new WeakMap,n$1=e$3(class extends c{render(t){return A$1}update(t,[s]){var e;const o=s!==this.G;return o&&void 0!==this.G&&this.ot(void 0),(o||this.rt!==this.lt)&&(this.G=s,this.ct=null===(e=t.options)||void 0===e?void 0:e.host,this.ot(this.lt=t.element)),A$1}ot(i){var t;if("function"==typeof this.G){const s=null!==(t=this.ct)&&void 0!==t?t:globalThis;let e=h.get(s);void 0===e&&(e=new WeakMap,h.set(s,e)),void 0!==e.get(this.G)&&this.G.call(this.ct,void 0),e.set(this.G,i),void 0!==i&&this.G.call(this.ct,i);}else this.G.value=i;}get rt(){var i,t,s;return "function"==typeof this.G?null===(t=h.get(null!==(i=this.ct)&&void 0!==i?i:globalThis))||void 0===t?void 0:t.get(this.G):null===(s=this.G)||void 0===s?void 0:s.value}disconnected(){this.rt===this.lt&&this.ot(void 0);}reconnected(){this.ot(this.lt);}});
  
    var top = 'top';
    var bottom = 'bottom';
    var right = 'right';
    var left = 'left';
    var auto = 'auto';
    var basePlacements = [top, bottom, right, left];
    var start = 'start';
    var end = 'end';
    var clippingParents = 'clippingParents';
    var viewport = 'viewport';
    var popper = 'popper';
    var reference = 'reference';
    var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []); // modifiers that need to read the DOM
  
    var beforeRead = 'beforeRead';
    var read = 'read';
    var afterRead = 'afterRead'; // pure-logic modifiers
  
    var beforeMain = 'beforeMain';
    var main = 'main';
    var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)
  
    var beforeWrite = 'beforeWrite';
    var write = 'write';
    var afterWrite = 'afterWrite';
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
  
    function getNodeName(element) {
      return element ? (element.nodeName || '').toLowerCase() : null;
    }
  
    function getWindow(node) {
      if (node == null) {
        return window;
      }
  
      if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }
  
      return node;
    }
  
    function isElement$1(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }
  
    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }
  
    function isShadowRoot(node) {
      // IE 11 has no ShadowRoot
      if (typeof ShadowRoot === 'undefined') {
        return false;
      }
  
      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }
  
    // and applies them to the HTMLElements such as popper and arrow
  
    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function (name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name]; // arrow is optional + virtual elements
  
        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]
  
  
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (name) {
          var value = attributes[name];
  
          if (value === false) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value === true ? '' : value);
          }
        });
      });
    }
  
    function effect$2(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: {
          position: 'absolute'
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;
  
      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }
  
      return function () {
        Object.keys(state.elements).forEach(function (name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them
  
          var style = styleProperties.reduce(function (style, property) {
            style[property] = '';
            return style;
          }, {}); // arrow is optional + virtual elements
  
          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }
  
          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function (attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    } // eslint-disable-next-line import/no-unused-modules
  
  
    var applyStyles$1 = {
      name: 'applyStyles',
      enabled: true,
      phase: 'write',
      fn: applyStyles,
      effect: effect$2,
      requires: ['computeStyles']
    };
  
    function getBasePlacement(placement) {
      return placement.split('-')[0];
    }
  
    var max = Math.max;
    var min = Math.min;
    var round = Math.round;
  
    function getUAString() {
      var uaData = navigator.userAgentData;
  
      if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
        return uaData.brands.map(function (item) {
          return item.brand + "/" + item.version;
        }).join(' ');
      }
  
      return navigator.userAgent;
    }
  
    function isLayoutViewport() {
      return !/^((?!chrome|android).)*safari/i.test(getUAString());
    }
  
    function getBoundingClientRect(element, includeScale, isFixedStrategy) {
      if (includeScale === void 0) {
        includeScale = false;
      }
  
      if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
      }
  
      var clientRect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;
  
      if (includeScale && isHTMLElement(element)) {
        scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
        scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
      }
  
      var _ref = isElement$1(element) ? getWindow(element) : window,
          visualViewport = _ref.visualViewport;
  
      var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
      var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
      var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
      var width = clientRect.width / scaleX;
      var height = clientRect.height / scaleY;
      return {
        width: width,
        height: height,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        x: x,
        y: y
      };
    }
  
    // means it doesn't take into account transforms.
  
    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
      // Fixes https://github.com/popperjs/popper-core/issues/1223
  
      var width = element.offsetWidth;
      var height = element.offsetHeight;
  
      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }
  
      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }
  
      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height
      };
    }
  
    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method
  
      if (parent.contains(child)) {
        return true;
      } // then fallback to custom implementation with Shadow DOM support
      else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;
  
          do {
            if (next && parent.isSameNode(next)) {
              return true;
            } // $FlowFixMe[prop-missing]: need a better way to handle this...
  
  
            next = next.parentNode || next.host;
          } while (next);
        } // Give up, the result is false
  
  
      return false;
    }
  
    function getComputedStyle$1(element) {
      return getWindow(element).getComputedStyle(element);
    }
  
    function isTableElement(element) {
      return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
    }
  
    function getDocumentElement(element) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
      element.document) || window.document).documentElement;
    }
  
    function getParentNode(element) {
      if (getNodeName(element) === 'html') {
        return element;
      }
  
      return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || ( // DOM Element detected
        isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element) // fallback
  
      );
    }
  
    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle$1(element).position === 'fixed') {
        return null;
      }
  
      return element.offsetParent;
    } // `.offsetParent` reports `null` for fixed elements, while absolute elements
    // return the containing block
  
  
    function getContainingBlock(element) {
      var isFirefox = /firefox/i.test(getUAString());
      var isIE = /Trident/i.test(getUAString());
  
      if (isIE && isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = getComputedStyle$1(element);
  
        if (elementCss.position === 'fixed') {
          return null;
        }
      }
  
      var currentNode = getParentNode(element);
  
      if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
      }
  
      while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  
        if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }
  
      return null;
    } // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.
  
  
    function getOffsetParent(element) {
      var window = getWindow(element);
      var offsetParent = getTrueOffsetParent(element);
  
      while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
        offsetParent = getTrueOffsetParent(offsetParent);
      }
  
      if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
        return window;
      }
  
      return offsetParent || getContainingBlock(element) || window;
    }
  
    function getMainAxisFromPlacement(placement) {
      return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
    }
  
    function within(min$1, value, max$1) {
      return max(min$1, min(value, max$1));
    }
    function withinMaxClamp(min, value, max) {
      var v = within(min, value, max);
      return v > max ? max : v;
    }
  
    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }
  
    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }
  
    function expandToHashMap(value, keys) {
      return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }
  
    var toPaddingObject = function toPaddingObject(padding, state) {
      padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    };
  
    function arrow(_ref) {
      var _state$modifiersData$;
  
      var state = _ref.state,
          name = _ref.name,
          options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? 'height' : 'width';
  
      if (!arrowElement || !popperOffsets) {
        return;
      }
  
      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === 'y' ? top : left;
      var maxProp = axis === 'y' ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
      var startDiff = popperOffsets[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
      // outside of the popper bounds
  
      var min = paddingObject[minProp];
      var max = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset = within(min, center, max); // Prevents breaking syntax highlighting...
  
      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }
  
    function effect$1(_ref2) {
      var state = _ref2.state,
          options = _ref2.options;
      var _options$element = options.element,
          arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
  
      if (arrowElement == null) {
        return;
      } // CSS selector
  
  
      if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);
  
        if (!arrowElement) {
          return;
        }
      }
  
      if (!contains(state.elements.popper, arrowElement)) {
        return;
      }
  
      state.elements.arrow = arrowElement;
    } // eslint-disable-next-line import/no-unused-modules
  
  
    var arrow$1 = {
      name: 'arrow',
      enabled: true,
      phase: 'main',
      fn: arrow,
      effect: effect$1,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    };
  
    function getVariation(placement) {
      return placement.split('-')[1];
    }
  
    var unsetSides = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.
  
    function roundOffsetsByDPR(_ref, win) {
      var x = _ref.x,
          y = _ref.y;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round(x * dpr) / dpr || 0,
        y: round(y * dpr) / dpr || 0
      };
    }
  
    function mapToStyles(_ref2) {
      var _Object$assign2;
  
      var popper = _ref2.popper,
          popperRect = _ref2.popperRect,
          placement = _ref2.placement,
          variation = _ref2.variation,
          offsets = _ref2.offsets,
          position = _ref2.position,
          gpuAcceleration = _ref2.gpuAcceleration,
          adaptive = _ref2.adaptive,
          roundOffsets = _ref2.roundOffsets,
          isFixed = _ref2.isFixed;
      var _offsets$x = offsets.x,
          x = _offsets$x === void 0 ? 0 : _offsets$x,
          _offsets$y = offsets.y,
          y = _offsets$y === void 0 ? 0 : _offsets$y;
  
      var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
        x: x,
        y: y
      }) : {
        x: x,
        y: y
      };
  
      x = _ref3.x;
      y = _ref3.y;
      var hasX = offsets.hasOwnProperty('x');
      var hasY = offsets.hasOwnProperty('y');
      var sideX = left;
      var sideY = top;
      var win = window;
  
      if (adaptive) {
        var offsetParent = getOffsetParent(popper);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';
  
        if (offsetParent === getWindow(popper)) {
          offsetParent = getDocumentElement(popper);
  
          if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
            heightProp = 'scrollHeight';
            widthProp = 'scrollWidth';
          }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it
  
  
        offsetParent = offsetParent;
  
        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom;
          var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
          offsetParent[heightProp];
          y -= offsetY - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }
  
        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right;
          var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
          offsetParent[widthProp];
          x -= offsetX - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }
  
      var commonStyles = Object.assign({
        position: position
      }, adaptive && unsetSides);
  
      var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x: x,
        y: y
      }, getWindow(popper)) : {
        x: x,
        y: y
      };
  
      x = _ref4.x;
      y = _ref4.y;
  
      if (gpuAcceleration) {
        var _Object$assign;
  
        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }
  
      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
    }
  
    function computeStyles(_ref5) {
      var state = _ref5.state,
          options = _ref5.options;
      var _options$gpuAccelerat = options.gpuAcceleration,
          gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
          _options$adaptive = options.adaptive,
          adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
          _options$roundOffsets = options.roundOffsets,
          roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration,
        isFixed: state.options.strategy === 'fixed'
      };
  
      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive: adaptive,
          roundOffsets: roundOffsets
        })));
      }
  
      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: 'absolute',
          adaptive: false,
          roundOffsets: roundOffsets
        })));
      }
  
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules
  
  
    var computeStyles$1 = {
      name: 'computeStyles',
      enabled: true,
      phase: 'beforeWrite',
      fn: computeStyles,
      data: {}
    };
  
    var passive = {
      passive: true
    };
  
    function effect(_ref) {
      var state = _ref.state,
          instance = _ref.instance,
          options = _ref.options;
      var _options$scroll = options.scroll,
          scroll = _options$scroll === void 0 ? true : _options$scroll,
          _options$resize = options.resize,
          resize = _options$resize === void 0 ? true : _options$resize;
      var window = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', instance.update, passive);
        });
      }
  
      if (resize) {
        window.addEventListener('resize', instance.update, passive);
      }
  
      return function () {
        if (scroll) {
          scrollParents.forEach(function (scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
          });
        }
  
        if (resize) {
          window.removeEventListener('resize', instance.update, passive);
        }
      };
    } // eslint-disable-next-line import/no-unused-modules
  
  
    var eventListeners = {
      name: 'eventListeners',
      enabled: true,
      phase: 'write',
      fn: function fn() {},
      effect: effect,
      data: {}
    };
  
    var hash$1 = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash$1[matched];
      });
    }
  
    var hash = {
      start: 'end',
      end: 'start'
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function (matched) {
        return hash[matched];
      });
    }
  
    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }
  
    function getWindowScrollBarX(element) {
      // If <html> has a CSS width greater than the viewport, then this will be
      // incorrect for RTL.
      // Popper 1 is broken in this case and never had a bug report so let's assume
      // it's not an issue. I don't think anyone ever specifies width on <html>
      // anyway.
      // Browsers where the left scrollbar doesn't cause an issue report `0` for
      // this (e.g. Edge 2019, IE11, Safari)
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }
  
    function getViewportRect(element, strategy) {
      var win = getWindow(element);
      var html = getDocumentElement(element);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0;
  
      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        var layoutViewport = isLayoutViewport();
  
        if (layoutViewport || !layoutViewport && strategy === 'fixed') {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }
  
      return {
        width: width,
        height: height,
        x: x + getWindowScrollBarX(element),
        y: y
      };
    }
  
    // of the `<html>` and `<body>` rect bounds if horizontally scrollable
  
    function getDocumentRect(element) {
      var _element$ownerDocumen;
  
      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;
  
      if (getComputedStyle$1(body || html).direction === 'rtl') {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
      }
  
      return {
        width: width,
        height: height,
        x: x,
        y: y
      };
    }
  
    function isScrollParent(element) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle$1(element),
          overflow = _getComputedStyle.overflow,
          overflowX = _getComputedStyle.overflowX,
          overflowY = _getComputedStyle.overflowY;
  
      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }
  
    function getScrollParent(node) {
      if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe[incompatible-return]: assume body is always available
        return node.ownerDocument.body;
      }
  
      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }
  
      return getScrollParent(getParentNode(node));
    }
  
    /*
    given a DOM element, return the list of all scroll parents, up the list of ancesors
    until we get to the top window object. This list is what we attach scroll listeners
    to, because if any of these parent elements scroll, we'll need to re-calculate the
    reference element's position.
    */
  
    function listScrollParents(element, list) {
      var _element$ownerDocumen;
  
      if (list === void 0) {
        list = [];
      }
  
      var scrollParent = getScrollParent(element);
      var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win = getWindow(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)));
    }
  
    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }
  
    function getInnerBoundingClientRect(element, strategy) {
      var rect = getBoundingClientRect(element, false, strategy === 'fixed');
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }
  
    function getClientRectFromMixedType(element, clippingParent, strategy) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`
  
  
    function getClippingParents(element) {
      var clippingParents = listScrollParents(getParentNode(element));
      var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  
      if (!isElement$1(clipperElement)) {
        return [];
      } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414
  
  
      return clippingParents.filter(function (clippingParent) {
        return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
      });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents
  
  
    function getClippingRect(element, boundary, rootBoundary, strategy) {
      var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
      var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents[0];
      var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent, strategy);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent, strategy));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }
  
    function computeOffsets(_ref) {
      var reference = _ref.reference,
          element = _ref.element,
          placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference.x + reference.width / 2 - element.width / 2;
      var commonY = reference.y + reference.height / 2 - element.height / 2;
      var offsets;
  
      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference.y - element.height
          };
          break;
  
        case bottom:
          offsets = {
            x: commonX,
            y: reference.y + reference.height
          };
          break;
  
        case right:
          offsets = {
            x: reference.x + reference.width,
            y: commonY
          };
          break;
  
        case left:
          offsets = {
            x: reference.x - element.width,
            y: commonY
          };
          break;
  
        default:
          offsets = {
            x: reference.x,
            y: reference.y
          };
      }
  
      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  
      if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';
  
        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
            break;
  
          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
            break;
        }
      }
  
      return offsets;
    }
  
    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }
  
      var _options = options,
          _options$placement = _options.placement,
          placement = _options$placement === void 0 ? state.placement : _options$placement,
          _options$strategy = _options.strategy,
          strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
          _options$boundary = _options.boundary,
          boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
          _options$rootBoundary = _options.rootBoundary,
          rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
          _options$elementConte = _options.elementContext,
          elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
          _options$altBoundary = _options.altBoundary,
          altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
          _options$padding = _options.padding,
          padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
      // 0 or negative = within the clipping rect
  
      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element
  
      if (elementContext === popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
          overflowOffsets[key] += offset[axis] * multiply;
        });
      }
  
      return overflowOffsets;
    }
  
    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }
  
      var _options = options,
          placement = _options.placement,
          boundary = _options.boundary,
          rootBoundary = _options.rootBoundary,
          padding = _options.padding,
          flipVariations = _options.flipVariations,
          _options$allowedAutoP = _options.allowedAutoPlacements,
          allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
        return getVariation(placement) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function (placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
      });
  
      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;
      } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...
  
  
      var overflows = allowedPlacements.reduce(function (acc, placement) {
        acc[placement] = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding
        })[getBasePlacement(placement)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
      });
    }
  
    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }
  
      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }
  
    function flip(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;
  
      if (state.modifiersData[name]._skip) {
        return;
      }
  
      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
          specifiedFallbackPlacements = options.fallbackPlacements,
          padding = options.padding,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          _options$flipVariatio = options.flipVariations,
          flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
          allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
        return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding,
          flipVariations: flipVariations,
          allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements[0];
  
      for (var i = 0; i < placements.length; i++) {
        var placement = placements[i];
  
        var _basePlacement = getBasePlacement(placement);
  
        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          altBoundary: altBoundary,
          padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
  
        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }
  
        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];
  
        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }
  
        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }
  
        if (checks.every(function (check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }
  
        checksMap.set(placement, checks);
      }
  
      if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;
  
        var _loop = function _loop(_i) {
          var fittingPlacement = placements.find(function (placement) {
            var checks = checksMap.get(placement);
  
            if (checks) {
              return checks.slice(0, _i).every(function (check) {
                return check;
              });
            }
          });
  
          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };
  
        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);
  
          if (_ret === "break") break;
        }
      }
  
      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    } // eslint-disable-next-line import/no-unused-modules
  
  
    var flip$1 = {
      name: 'flip',
      enabled: true,
      phase: 'main',
      fn: flip,
      requiresIfExists: ['offset'],
      data: {
        _skip: false
      }
    };
  
    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }
  
      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }
  
    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
      });
    }
  
    function hide(_ref) {
      var state = _ref.state,
          name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: 'reference'
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped
      });
    } // eslint-disable-next-line import/no-unused-modules
  
  
    var hide$1 = {
      name: 'hide',
      enabled: true,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: hide
    };
  
    function distanceAndSkiddingToXY(placement, rects, offset) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  
      var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
        placement: placement
      })) : offset,
          skidding = _ref[0],
          distance = _ref[1];
  
      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }
  
    function offset(_ref2) {
      var state = _ref2.state,
          options = _ref2.options,
          name = _ref2.name;
      var _options$offset = options.offset,
          offset = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement],
          x = _data$state$placement.x,
          y = _data$state$placement.y;
  
      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }
  
      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules
  
  
    var offset$1 = {
      name: 'offset',
      enabled: true,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: offset
    };
  
    function popperOffsets(_ref) {
      var state = _ref.state,
          name = _ref.name;
      // Offsets are the actual position the popper needs to have to be
      // properly positioned near its reference element
      // This is the most basic placement, and will be adjusted by
      // the modifiers in the next step
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules
  
  
    var popperOffsets$1 = {
      name: 'popperOffsets',
      enabled: true,
      phase: 'read',
      fn: popperOffsets,
      data: {}
    };
  
    function getAltAxis(axis) {
      return axis === 'x' ? 'y' : 'x';
    }
  
    function preventOverflow(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;
      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          padding = options.padding,
          _options$tether = options.tether,
          tether = _options$tether === void 0 ? true : _options$tether,
          _options$tetherOffset = options.tetherOffset,
          tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
        mainAxis: tetherOffsetValue,
        altAxis: tetherOffsetValue
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, tetherOffsetValue);
      var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
      var data = {
        x: 0,
        y: 0
      };
  
      if (!popperOffsets) {
        return;
      }
  
      if (checkMainAxis) {
        var _offsetModifierState$;
  
        var mainSide = mainAxis === 'y' ? top : left;
        var altSide = mainAxis === 'y' ? bottom : right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset = popperOffsets[mainAxis];
        var min$1 = offset + overflow[mainSide];
        var max$1 = offset - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds
  
        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)
  
        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
        var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset + maxOffset - offsetModifierValue;
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
      }
  
      if (checkAltAxis) {
        var _offsetModifierState$2;
  
        var _mainSide = mainAxis === 'x' ? top : left;
  
        var _altSide = mainAxis === 'x' ? bottom : right;
  
        var _offset = popperOffsets[altAxis];
  
        var _len = altAxis === 'y' ? 'height' : 'width';
  
        var _min = _offset + overflow[_mainSide];
  
        var _max = _offset - overflow[_altSide];
  
        var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
  
        var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
  
        var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
  
        var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
  
        var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
  
        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }
  
      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules
  
  
    var preventOverflow$1 = {
      name: 'preventOverflow',
      enabled: true,
      phase: 'main',
      fn: preventOverflow,
      requiresIfExists: ['offset']
    };
  
    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
  
    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }
  
    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = round(rect.width) / element.offsetWidth || 1;
      var scaleY = round(rect.height) / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    } // Returns the composite rect of an element relative to its offsetParent.
    // Composite means it takes into account transforms as well as layout.
  
  
    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }
  
      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };
  
      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }
  
        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent, true);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }
  
      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }
  
    function order(modifiers) {
      var map = new Map();
      var visited = new Set();
      var result = [];
      modifiers.forEach(function (modifier) {
        map.set(modifier.name, modifier);
      }); // On visiting object, check for its dependencies and visit them recursively
  
      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function (dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);
  
            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }
  
      modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
          // check for visited object
          sort(modifier);
        }
      });
      return result;
    }
  
    function orderModifiers(modifiers) {
      // order based on dependencies
      var orderedModifiers = order(modifiers); // order based on phase
  
      return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(orderedModifiers.filter(function (modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }
  
    function debounce(fn) {
      var pending;
      return function () {
        if (!pending) {
          pending = new Promise(function (resolve) {
            Promise.resolve().then(function () {
              pending = undefined;
              resolve(fn());
            });
          });
        }
  
        return pending;
      };
    }
  
    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function (merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged;
      }, {}); // IE11 does not support Object.values
  
      return Object.keys(merged).map(function (key) {
        return merged[key];
      });
    }
  
    var DEFAULT_OPTIONS = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    };
  
    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return !args.some(function (element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
      });
    }
  
    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }
  
      var _generatorOptions = generatorOptions,
          _generatorOptions$def = _generatorOptions.defaultModifiers,
          defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
          _generatorOptions$def2 = _generatorOptions.defaultOptions,
          defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper(reference, popper, options) {
        if (options === void 0) {
          options = defaultOptions;
        }
  
        var state = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference,
            popper: popper
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state: state,
          setOptions: function setOptions(setOptionsAction) {
            var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions, state.options, options);
            state.scrollParents = {
              reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
              popper: listScrollParents(popper)
            }; // Orders the modifiers based on their dependencies and `phase`
            // properties
  
            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers
  
            state.orderedModifiers = orderedModifiers.filter(function (m) {
              return m.enabled;
            });
            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }
  
            var _state$elements = state.elements,
                reference = _state$elements.reference,
                popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
            // anymore
  
            if (!areValidElements(reference, popper)) {
              return;
            } // Store the reference and popper rects to be read by modifiers
  
  
            state.rects = {
              reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
              popper: getLayoutRect(popper)
            }; // Modifiers have the ability to reset the current update cycle. The
            // most common use case for this is the `flip` modifier changing the
            // placement, which then needs to re-run all the modifiers, because the
            // logic was previously ran for the previous placement and is therefore
            // stale/incorrect
  
            state.reset = false;
            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
            // is filled with the initial data specified by the modifier. This means
            // it doesn't persist and is fresh on each update.
            // To ensure persistent data, use `${name}#persistent`
  
            state.orderedModifiers.forEach(function (modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });
  
            for (var index = 0; index < state.orderedModifiers.length; index++) {
              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }
  
              var _state$orderedModifie = state.orderedModifiers[index],
                  fn = _state$orderedModifie.fn,
                  _state$orderedModifie2 = _state$orderedModifie.options,
                  _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                  name = _state$orderedModifie.name;
  
              if (typeof fn === 'function') {
                state = fn({
                  state: state,
                  options: _options,
                  name: name,
                  instance: instance
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function () {
            return new Promise(function (resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };
  
        if (!areValidElements(reference, popper)) {
          return instance;
        }
  
        instance.setOptions(options).then(function (state) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state);
          }
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.
  
        function runModifierEffects() {
          state.orderedModifiers.forEach(function (_ref) {
            var name = _ref.name,
                _ref$options = _ref.options,
                options = _ref$options === void 0 ? {} : _ref$options,
                effect = _ref.effect;
  
            if (typeof effect === 'function') {
              var cleanupFn = effect({
                state: state,
                name: name,
                instance: instance,
                options: options
              });
  
              var noopFn = function noopFn() {};
  
              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }
  
        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function (fn) {
            return fn();
          });
          effectCleanupFns = [];
        }
  
        return instance;
      };
    }
    var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules
  
    var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
    var createPopper$1 = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers$1
    }); // eslint-disable-next-line import/no-unused-modules
  
    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers
    }); // eslint-disable-next-line import/no-unused-modules
  
    var Popper = /*#__PURE__*/Object.freeze({
      __proto__: null,
      popperGenerator: popperGenerator,
      detectOverflow: detectOverflow,
      createPopperBase: createPopper$2,
      createPopper: createPopper,
      createPopperLite: createPopper$1,
      top: top,
      bottom: bottom,
      right: right,
      left: left,
      auto: auto,
      basePlacements: basePlacements,
      start: start,
      end: end,
      clippingParents: clippingParents,
      viewport: viewport,
      popper: popper,
      reference: reference,
      variationPlacements: variationPlacements,
      placements: placements,
      beforeRead: beforeRead,
      read: read,
      afterRead: afterRead,
      beforeMain: beforeMain,
      main: main,
      afterMain: afterMain,
      beforeWrite: beforeWrite,
      write: write,
      afterWrite: afterWrite,
      modifierPhases: modifierPhases,
      applyStyles: applyStyles$1,
      arrow: arrow$1,
      computeStyles: computeStyles$1,
      eventListeners: eventListeners,
      flip: flip$1,
      hide: hide$1,
      offset: offset$1,
      popperOffsets: popperOffsets$1,
      preventOverflow: preventOverflow$1
    });
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/data.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    /**
     * Constants
     */
  
    const elementMap = new Map();
  
    var Data = {
      set(element, key, instance) {
        if (!elementMap.has(element)) {
          elementMap.set(element, new Map());
        }
  
        const instanceMap = elementMap.get(element);
  
        // make it clear we only want one instance per element
        // can be removed later when multiple key/instances are fine to be used
        if (!instanceMap.has(key) && instanceMap.size !== 0) {
          // eslint-disable-next-line no-console
          console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
          return
        }
  
        instanceMap.set(key, instance);
      },
  
      get(element, key) {
        if (elementMap.has(element)) {
          return elementMap.get(element).get(key) || null
        }
  
        return null
      },
  
      remove(element, key) {
        if (!elementMap.has(element)) {
          return
        }
  
        const instanceMap = elementMap.get(element);
  
        instanceMap.delete(key);
  
        // free up element references if there are no instances left for an element
        if (instanceMap.size === 0) {
          elementMap.delete(element);
        }
      }
    };
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/index.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    const MILLISECONDS_MULTIPLIER = 1000;
    const TRANSITION_END = 'transitionend';
  
    /**
     * Properly escape IDs selectors to handle weird IDs
     * @param {string} selector
     * @returns {string}
     */
    const parseSelector = selector => {
      if (selector && window.CSS && window.CSS.escape) {
        // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
        selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
      }
  
      return selector
    };
  
    // Shout-out Angus Croll (https://goo.gl/pxwQGp)
    const toType = object => {
      if (object === null || object === undefined) {
        return `${object}`
      }
  
      return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase()
    };
  
    const getTransitionDurationFromElement = element => {
      if (!element) {
        return 0
      }
  
      // Get transition-duration of the element
      let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
  
      const floatTransitionDuration = Number.parseFloat(transitionDuration);
      const floatTransitionDelay = Number.parseFloat(transitionDelay);
  
      // Return 0 if element or transition duration is not found
      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0
      }
  
      // If multiple durations are defined, take the first
      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
  
      return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
    };
  
    const triggerTransitionEnd = element => {
      element.dispatchEvent(new Event(TRANSITION_END));
    };
  
    const isElement = object => {
      if (!object || typeof object !== 'object') {
        return false
      }
  
      if (typeof object.jquery !== 'undefined') {
        object = object[0];
      }
  
      return typeof object.nodeType !== 'undefined'
    };
  
    const getElement = object => {
      // it's a jQuery object or a node element
      if (isElement(object)) {
        return object.jquery ? object[0] : object
      }
  
      if (typeof object === 'string' && object.length > 0) {
        return document.querySelector(parseSelector(object))
      }
  
      return null
    };
  
    const isVisible = element => {
      if (!isElement(element) || element.getClientRects().length === 0) {
        return false
      }
  
      const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
      // Handle `details` element as its content may falsie appear visible when it is closed
      const closedDetails = element.closest('details:not([open])');
  
      if (!closedDetails) {
        return elementIsVisible
      }
  
      if (closedDetails !== element) {
        const summary = element.closest('summary');
        if (summary && summary.parentNode !== closedDetails) {
          return false
        }
  
        if (summary === null) {
          return false
        }
      }
  
      return elementIsVisible
    };
  
    const isDisabled = element => {
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        return true
      }
  
      if (element.classList.contains('disabled')) {
        return true
      }
  
      if (typeof element.disabled !== 'undefined') {
        return element.disabled
      }
  
      return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false'
    };
  
    const noop = () => {};
  
    const getjQuery = () => {
      if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
        return window.jQuery
      }
  
      return null
    };
  
    const DOMContentLoadedCallbacks = [];
  
    const onDOMContentLoaded = callback => {
      if (document.readyState === 'loading') {
        // add listener on the first call when the document is in loading state
        if (!DOMContentLoadedCallbacks.length) {
          document.addEventListener('DOMContentLoaded', () => {
            for (const callback of DOMContentLoadedCallbacks) {
              callback();
            }
          });
        }
  
        DOMContentLoadedCallbacks.push(callback);
      } else {
        callback();
      }
    };
  
    const isRTL = () => document.documentElement.dir === 'rtl';
  
    const defineJQueryPlugin = plugin => {
      onDOMContentLoaded(() => {
        const $ = getjQuery();
        /* istanbul ignore if */
        if ($) {
          const name = plugin.NAME;
          const JQUERY_NO_CONFLICT = $.fn[name];
          $.fn[name] = plugin.jQueryInterface;
          $.fn[name].Constructor = plugin;
          $.fn[name].noConflict = () => {
            $.fn[name] = JQUERY_NO_CONFLICT;
            return plugin.jQueryInterface
          };
        }
      });
    };
  
    const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
      return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue
    };
  
    const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
      if (!waitForTransition) {
        execute(callback);
        return
      }
  
      const durationPadding = 5;
      const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  
      let called = false;
  
      const handler = ({ target }) => {
        if (target !== transitionElement) {
          return
        }
  
        called = true;
        transitionElement.removeEventListener(TRANSITION_END, handler);
        execute(callback);
      };
  
      transitionElement.addEventListener(TRANSITION_END, handler);
      setTimeout(() => {
        if (!called) {
          triggerTransitionEnd(transitionElement);
        }
      }, emulatedDuration);
    };
  
    /**
     * Return the previous/next element of a list.
     *
     * @param {array} list    The list of elements
     * @param activeElement   The active element
     * @param shouldGetNext   Choose to get next or previous element
     * @param isCycleAllowed
     * @return {Element|elem} The proper element
     */
    const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
      const listLength = list.length;
      let index = list.indexOf(activeElement);
  
      // if the element does not exist in the list return an element
      // depending on the direction and if cycle is allowed
      if (index === -1) {
        return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0]
      }
  
      index += shouldGetNext ? 1 : -1;
  
      if (isCycleAllowed) {
        index = (index + listLength) % listLength;
      }
  
      return list[Math.max(0, Math.min(index, listLength - 1))]
    };
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/event-handler.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    /**
     * Constants
     */
  
    const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
    const stripNameRegex = /\..*/;
    const stripUidRegex = /::\d+$/;
    const eventRegistry = {}; // Events storage
    let uidEvent = 1;
    const customEvents = {
      mouseenter: 'mouseover',
      mouseleave: 'mouseout'
    };
  
    const nativeEvents = new Set([
      'click',
      'dblclick',
      'mouseup',
      'mousedown',
      'contextmenu',
      'mousewheel',
      'DOMMouseScroll',
      'mouseover',
      'mouseout',
      'mousemove',
      'selectstart',
      'selectend',
      'keydown',
      'keypress',
      'keyup',
      'orientationchange',
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel',
      'pointerdown',
      'pointermove',
      'pointerup',
      'pointerleave',
      'pointercancel',
      'gesturestart',
      'gesturechange',
      'gestureend',
      'focus',
      'blur',
      'change',
      'reset',
      'select',
      'submit',
      'focusin',
      'focusout',
      'load',
      'unload',
      'beforeunload',
      'resize',
      'move',
      'DOMContentLoaded',
      'readystatechange',
      'error',
      'abort',
      'scroll'
    ]);
  
    /**
     * Private methods
     */
  
    function makeEventUid(element, uid) {
      return (uid && `${uid}::${uidEvent++}`) || element.uidEvent || uidEvent++
    }
  
    function getElementEvents(element) {
      const uid = makeEventUid(element);
  
      element.uidEvent = uid;
      eventRegistry[uid] = eventRegistry[uid] || {};
  
      return eventRegistry[uid]
    }
  
    function bootstrapHandler(element, fn) {
      return function handler(event) {
        hydrateObj(event, { delegateTarget: element });
  
        if (handler.oneOff) {
          EventHandler.off(element, event.type, fn);
        }
  
        return fn.apply(element, [event])
      }
    }
  
    function bootstrapDelegationHandler(element, selector, fn) {
      return function handler(event) {
        const domElements = element.querySelectorAll(selector);
  
        for (let { target } = event; target && target !== this; target = target.parentNode) {
          for (const domElement of domElements) {
            if (domElement !== target) {
              continue
            }
  
            hydrateObj(event, { delegateTarget: target });
  
            if (handler.oneOff) {
              EventHandler.off(element, event.type, selector, fn);
            }
  
            return fn.apply(target, [event])
          }
        }
      }
    }
  
    function findHandler(events, callable, delegationSelector = null) {
      return Object.values(events)
        .find(event => event.callable === callable && event.delegationSelector === delegationSelector)
    }
  
    function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
      const isDelegated = typeof handler === 'string';
      // TODO: tooltip passes `false` instead of selector, so we need to check
      const callable = isDelegated ? delegationFunction : (handler || delegationFunction);
      let typeEvent = getTypeEvent(originalTypeEvent);
  
      if (!nativeEvents.has(typeEvent)) {
        typeEvent = originalTypeEvent;
      }
  
      return [isDelegated, callable, typeEvent]
    }
  
    function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return
      }
  
      let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
  
      // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
      // this prevents the handler from being dispatched the same way as mouseover or mouseout does
      if (originalTypeEvent in customEvents) {
        const wrapFunction = fn => {
          return function (event) {
            if (!event.relatedTarget || (event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget))) {
              return fn.call(this, event)
            }
          }
        };
  
        callable = wrapFunction(callable);
      }
  
      const events = getElementEvents(element);
      const handlers = events[typeEvent] || (events[typeEvent] = {});
      const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
  
      if (previousFunction) {
        previousFunction.oneOff = previousFunction.oneOff && oneOff;
  
        return
      }
  
      const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
      const fn = isDelegated ?
        bootstrapDelegationHandler(element, handler, callable) :
        bootstrapHandler(element, callable);
  
      fn.delegationSelector = isDelegated ? handler : null;
      fn.callable = callable;
      fn.oneOff = oneOff;
      fn.uidEvent = uid;
      handlers[uid] = fn;
  
      element.addEventListener(typeEvent, fn, isDelegated);
    }
  
    function removeHandler(element, events, typeEvent, handler, delegationSelector) {
      const fn = findHandler(events[typeEvent], handler, delegationSelector);
  
      if (!fn) {
        return
      }
  
      element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
      delete events[typeEvent][fn.uidEvent];
    }
  
    function removeNamespacedHandlers(element, events, typeEvent, namespace) {
      const storeElementEvent = events[typeEvent] || {};
  
      for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
        if (handlerKey.includes(namespace)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    }
  
    function getTypeEvent(event) {
      // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
      event = event.replace(stripNameRegex, '');
      return customEvents[event] || event
    }
  
    const EventHandler = {
      on(element, event, handler, delegationFunction) {
        addHandler(element, event, handler, delegationFunction, false);
      },
  
      one(element, event, handler, delegationFunction) {
        addHandler(element, event, handler, delegationFunction, true);
      },
  
      off(element, originalTypeEvent, handler, delegationFunction) {
        if (typeof originalTypeEvent !== 'string' || !element) {
          return
        }
  
        const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
        const inNamespace = typeEvent !== originalTypeEvent;
        const events = getElementEvents(element);
        const storeElementEvent = events[typeEvent] || {};
        const isNamespace = originalTypeEvent.startsWith('.');
  
        if (typeof callable !== 'undefined') {
          // Simplest case: handler is passed, remove that listener ONLY.
          if (!Object.keys(storeElementEvent).length) {
            return
          }
  
          removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
          return
        }
  
        if (isNamespace) {
          for (const elementEvent of Object.keys(events)) {
            removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
          }
        }
  
        for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
          const handlerKey = keyHandlers.replace(stripUidRegex, '');
  
          if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
            removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
          }
        }
      },
  
      trigger(element, event, args) {
        if (typeof event !== 'string' || !element) {
          return null
        }
  
        const $ = getjQuery();
        const typeEvent = getTypeEvent(event);
        const inNamespace = event !== typeEvent;
  
        let jQueryEvent = null;
        let bubbles = true;
        let nativeDispatch = true;
        let defaultPrevented = false;
  
        if (inNamespace && $) {
          jQueryEvent = $.Event(event, args);
  
          $(element).trigger(jQueryEvent);
          bubbles = !jQueryEvent.isPropagationStopped();
          nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
          defaultPrevented = jQueryEvent.isDefaultPrevented();
        }
  
        const evt = hydrateObj(new Event(event, { bubbles, cancelable: true }), args);
  
        if (defaultPrevented) {
          evt.preventDefault();
        }
  
        if (nativeDispatch) {
          element.dispatchEvent(evt);
        }
  
        if (evt.defaultPrevented && jQueryEvent) {
          jQueryEvent.preventDefault();
        }
  
        return evt
      }
    };
  
    function hydrateObj(obj, meta = {}) {
      for (const [key, value] of Object.entries(meta)) {
        try {
          obj[key] = value;
        } catch {
          Object.defineProperty(obj, key, {
            configurable: true,
            get() {
              return value
            }
          });
        }
      }
  
      return obj
    }
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/manipulator.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    function normalizeData(value) {
      if (value === 'true') {
        return true
      }
  
      if (value === 'false') {
        return false
      }
  
      if (value === Number(value).toString()) {
        return Number(value)
      }
  
      if (value === '' || value === 'null') {
        return null
      }
  
      if (typeof value !== 'string') {
        return value
      }
  
      try {
        return JSON.parse(decodeURIComponent(value))
      } catch {
        return value
      }
    }
  
    function normalizeDataKey(key) {
      return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`)
    }
  
    const Manipulator = {
      setDataAttribute(element, key, value) {
        element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
      },
  
      removeDataAttribute(element, key) {
        element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
      },
  
      getDataAttributes(element) {
        if (!element) {
          return {}
        }
  
        const attributes = {};
        const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
  
        for (const key of bsKeys) {
          let pureKey = key.replace(/^bs/, '');
          pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
          attributes[pureKey] = normalizeData(element.dataset[key]);
        }
  
        return attributes
      },
  
      getDataAttribute(element, key) {
        return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`))
      }
    };
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/config.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    /**
     * Class definition
     */
  
    class Config {
      // Getters
      static get Default() {
        return {}
      }
  
      static get DefaultType() {
        return {}
      }
  
      static get NAME() {
        throw new Error('You have to implement the static method "NAME", for each component!')
      }
  
      _getConfig(config) {
        config = this._mergeConfigObj(config);
        config = this._configAfterMerge(config);
        this._typeCheckConfig(config);
        return config
      }
  
      _configAfterMerge(config) {
        return config
      }
  
      _mergeConfigObj(config, element) {
        const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse
  
        return {
          ...this.constructor.Default,
          ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
          ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
          ...(typeof config === 'object' ? config : {})
        }
      }
  
      _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
        for (const [property, expectedTypes] of Object.entries(configTypes)) {
          const value = config[property];
          const valueType = isElement(value) ? 'element' : toType(value);
  
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new TypeError(
              `${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
            )
          }
        }
      }
    }
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap base-component.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    /**
     * Constants
     */
  
    const VERSION = '5.3.0';
  
    /**
     * Class definition
     */
  
    class BaseComponent extends Config {
      constructor(element, config) {
        super();
  
        element = getElement(element);
        if (!element) {
          return
        }
  
        this._element = element;
        this._config = this._getConfig(config);
  
        Data.set(this._element, this.constructor.DATA_KEY, this);
      }
  
      // Public
      dispose() {
        Data.remove(this._element, this.constructor.DATA_KEY);
        EventHandler.off(this._element, this.constructor.EVENT_KEY);
  
        for (const propertyName of Object.getOwnPropertyNames(this)) {
          this[propertyName] = null;
        }
      }
  
      _queueCallback(callback, element, isAnimated = true) {
        executeAfterTransition(callback, element, isAnimated);
      }
  
      _getConfig(config) {
        config = this._mergeConfigObj(config, this._element);
        config = this._configAfterMerge(config);
        this._typeCheckConfig(config);
        return config
      }
  
      // Static
      static getInstance(element) {
        return Data.get(getElement(element), this.DATA_KEY)
      }
  
      static getOrCreateInstance(element, config = {}) {
        return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null)
      }
  
      static get VERSION() {
        return VERSION
      }
  
      static get DATA_KEY() {
        return `bs.${this.NAME}`
      }
  
      static get EVENT_KEY() {
        return `.${this.DATA_KEY}`
      }
  
      static eventName(name) {
        return `${name}${this.EVENT_KEY}`
      }
    }
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/selector-engine.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    const getSelector = element => {
      let selector = element.getAttribute('data-bs-target');
  
      if (!selector || selector === '#') {
        let hrefAttribute = element.getAttribute('href');
  
        // The only valid content that could double as a selector are IDs or classes,
        // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
        // `document.querySelector` will rightfully complain it is invalid.
        // See https://github.com/twbs/bootstrap/issues/32273
        if (!hrefAttribute || (!hrefAttribute.includes('#') && !hrefAttribute.startsWith('.'))) {
          return null
        }
  
        // Just in case some CMS puts out a full URL with the anchor appended
        if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
          hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
        }
  
        selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
      }
  
      return parseSelector(selector)
    };
  
    const SelectorEngine = {
      find(selector, element = document.documentElement) {
        return [].concat(...Element.prototype.querySelectorAll.call(element, selector))
      },
  
      findOne(selector, element = document.documentElement) {
        return Element.prototype.querySelector.call(element, selector)
      },
  
      children(element, selector) {
        return [].concat(...element.children).filter(child => child.matches(selector))
      },
  
      parents(element, selector) {
        const parents = [];
        let ancestor = element.parentNode.closest(selector);
  
        while (ancestor) {
          parents.push(ancestor);
          ancestor = ancestor.parentNode.closest(selector);
        }
  
        return parents
      },
  
      prev(element, selector) {
        let previous = element.previousElementSibling;
  
        while (previous) {
          if (previous.matches(selector)) {
            return [previous]
          }
  
          previous = previous.previousElementSibling;
        }
  
        return []
      },
      // TODO: this is now unused; remove later along with prev()
      next(element, selector) {
        let next = element.nextElementSibling;
  
        while (next) {
          if (next.matches(selector)) {
            return [next]
          }
  
          next = next.nextElementSibling;
        }
  
        return []
      },
  
      focusableChildren(element) {
        const focusables = [
          'a',
          'button',
          'input',
          'textarea',
          'select',
          'details',
          '[tabindex]',
          '[contenteditable="true"]'
        ].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
  
        return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el))
      },
  
      getSelectorFromElement(element) {
        const selector = getSelector(element);
  
        if (selector) {
          return SelectorEngine.findOne(selector) ? selector : null
        }
  
        return null
      },
  
      getElementFromSelector(element) {
        const selector = getSelector(element);
  
        return selector ? SelectorEngine.findOne(selector) : null
      },
  
      getMultipleElementsFromSelector(element) {
        const selector = getSelector(element);
  
        return selector ? SelectorEngine.find(selector) : []
      }
    };
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap dropdown.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    /**
     * Constants
     */
  
    const NAME = 'dropdown';
    const DATA_KEY = 'bs.dropdown';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
  
    const ESCAPE_KEY = 'Escape';
    const TAB_KEY = 'Tab';
    const ARROW_UP_KEY = 'ArrowUp';
    const ARROW_DOWN_KEY = 'ArrowDown';
    const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button
  
    const EVENT_HIDE = `hide${EVENT_KEY}`;
    const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
    const EVENT_SHOW = `show${EVENT_KEY}`;
    const EVENT_SHOWN = `shown${EVENT_KEY}`;
    const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
    const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
    const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
  
    const CLASS_NAME_SHOW = 'show';
    const CLASS_NAME_DROPUP = 'dropup';
    const CLASS_NAME_DROPEND = 'dropend';
    const CLASS_NAME_DROPSTART = 'dropstart';
    const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
    const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
  
    const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
    const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
    const SELECTOR_MENU = '.dropdown-menu';
    const SELECTOR_NAVBAR = '.navbar';
    const SELECTOR_NAVBAR_NAV = '.navbar-nav';
    const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  
    const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
    const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
    const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
    const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
    const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
    const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
    const PLACEMENT_TOPCENTER = 'top';
    const PLACEMENT_BOTTOMCENTER = 'bottom';
  
    const Default = {
      autoClose: true,
      boundary: 'clippingParents',
      display: 'dynamic',
      offset: [0, 2],
      popperConfig: null,
      reference: 'toggle'
    };
  
    const DefaultType = {
      autoClose: '(boolean|string)',
      boundary: '(string|element)',
      display: 'string',
      offset: '(array|string|function)',
      popperConfig: '(null|object|function)',
      reference: '(string|element|object)'
    };
  
    /**
     * Class definition
     */
  
    class Dropdown extends BaseComponent {
      constructor(element, config) {
        super(element, config);
  
        this._popper = null;
        this._parent = this._element.parentNode; // dropdown wrapper
        // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
        this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] ||
          SelectorEngine.prev(this._element, SELECTOR_MENU)[0] ||
          SelectorEngine.findOne(SELECTOR_MENU, this._parent);
        this._inNavbar = this._detectNavbar();
      }
  
      // Getters
      static get Default() {
        return Default
      }
  
      static get DefaultType() {
        return DefaultType
      }
  
      static get NAME() {
        return NAME
      }
  
      // Public
      toggle() {
        return this._isShown() ? this.hide() : this.show()
      }
  
      show() {
        if (isDisabled(this._element) || this._isShown()) {
          return
        }
  
        const relatedTarget = {
          relatedTarget: this._element
        };
  
        const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, relatedTarget);
  
        if (showEvent.defaultPrevented) {
          return
        }
  
        this._createPopper();
  
        // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
          for (const element of [].concat(...document.body.children)) {
            EventHandler.on(element, 'mouseover', noop);
          }
        }
  
        this._element.focus();
        this._element.setAttribute('aria-expanded', true);
  
        this._menu.classList.add(CLASS_NAME_SHOW);
        this._element.classList.add(CLASS_NAME_SHOW);
        EventHandler.trigger(this._element, EVENT_SHOWN, relatedTarget);
      }
  
      hide() {
        if (isDisabled(this._element) || !this._isShown()) {
          return
        }
  
        const relatedTarget = {
          relatedTarget: this._element
        };
  
        this._completeHide(relatedTarget);
      }
  
      dispose() {
        if (this._popper) {
          this._popper.destroy();
        }
  
        super.dispose();
      }
  
      update() {
        this._inNavbar = this._detectNavbar();
        if (this._popper) {
          this._popper.update();
        }
      }
  
      // Private
      _completeHide(relatedTarget) {
        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE, relatedTarget);
        if (hideEvent.defaultPrevented) {
          return
        }
  
        // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          for (const element of [].concat(...document.body.children)) {
            EventHandler.off(element, 'mouseover', noop);
          }
        }
  
        if (this._popper) {
          this._popper.destroy();
        }
  
        this._menu.classList.remove(CLASS_NAME_SHOW);
        this._element.classList.remove(CLASS_NAME_SHOW);
        this._element.setAttribute('aria-expanded', 'false');
        Manipulator.removeDataAttribute(this._menu, 'popper');
        EventHandler.trigger(this._element, EVENT_HIDDEN, relatedTarget);
      }
  
      _getConfig(config) {
        config = super._getConfig(config);
  
        if (typeof config.reference === 'object' && !isElement(config.reference) &&
          typeof config.reference.getBoundingClientRect !== 'function'
        ) {
          // Popper virtual elements require a getBoundingClientRect method
          throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
        }
  
        return config
      }
  
      _createPopper() {
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)')
        }
  
        let referenceElement = this._element;
  
        if (this._config.reference === 'parent') {
          referenceElement = this._parent;
        } else if (isElement(this._config.reference)) {
          referenceElement = getElement(this._config.reference);
        } else if (typeof this._config.reference === 'object') {
          referenceElement = this._config.reference;
        }
  
        const popperConfig = this._getPopperConfig();
        this._popper = createPopper(referenceElement, this._menu, popperConfig);
      }
  
      _isShown() {
        return this._menu.classList.contains(CLASS_NAME_SHOW)
      }
  
      _getPlacement() {
        const parentDropdown = this._parent;
  
        if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
          return PLACEMENT_RIGHT
        }
  
        if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
          return PLACEMENT_LEFT
        }
  
        if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
          return PLACEMENT_TOPCENTER
        }
  
        if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
          return PLACEMENT_BOTTOMCENTER
        }
  
        // We need to trim the value because custom properties can also include spaces
        const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
  
        if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
          return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP
        }
  
        return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM
      }
  
      _detectNavbar() {
        return this._element.closest(SELECTOR_NAVBAR) !== null
      }
  
      _getOffset() {
        const { offset } = this._config;
  
        if (typeof offset === 'string') {
          return offset.split(',').map(value => Number.parseInt(value, 10))
        }
  
        if (typeof offset === 'function') {
          return popperData => offset(popperData, this._element)
        }
  
        return offset
      }
  
      _getPopperConfig() {
        const defaultBsPopperConfig = {
          placement: this._getPlacement(),
          modifiers: [{
            name: 'preventOverflow',
            options: {
              boundary: this._config.boundary
            }
          },
          {
            name: 'offset',
            options: {
              offset: this._getOffset()
            }
          }]
        };
  
        // Disable Popper if we have a static display or Dropdown is in Navbar
        if (this._inNavbar || this._config.display === 'static') {
          Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
          defaultBsPopperConfig.modifiers = [{
            name: 'applyStyles',
            enabled: false
          }];
        }
  
        return {
          ...defaultBsPopperConfig,
          ...execute(this._config.popperConfig, [defaultBsPopperConfig])
        }
      }
  
      _selectMenuItem({ key, target }) {
        const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
  
        if (!items.length) {
          return
        }
  
        // if target isn't included in items (e.g. when expanding the dropdown)
        // allow cycling to get the last item in case key equals ARROW_UP_KEY
        getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
      }
  
      // Static
      static jQueryInterface(config) {
        return this.each(function () {
          const data = Dropdown.getOrCreateInstance(this, config);
  
          if (typeof config !== 'string') {
            return
          }
  
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }
  
          data[config]();
        })
      }
  
      static clearMenus(event) {
        if (event.button === RIGHT_MOUSE_BUTTON || (event.type === 'keyup' && event.key !== TAB_KEY)) {
          return
        }
  
        const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
  
        for (const toggle of openToggles) {
          const context = Dropdown.getInstance(toggle);
          if (!context || context._config.autoClose === false) {
            continue
          }
  
          const composedPath = event.composedPath();
          const isMenuTarget = composedPath.includes(context._menu);
          if (
            composedPath.includes(context._element) ||
            (context._config.autoClose === 'inside' && !isMenuTarget) ||
            (context._config.autoClose === 'outside' && isMenuTarget)
          ) {
            continue
          }
  
          // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
          if (context._menu.contains(event.target) && ((event.type === 'keyup' && event.key === TAB_KEY) || /input|select|option|textarea|form/i.test(event.target.tagName))) {
            continue
          }
  
          const relatedTarget = { relatedTarget: context._element };
  
          if (event.type === 'click') {
            relatedTarget.clickEvent = event;
          }
  
          context._completeHide(relatedTarget);
        }
      }
  
      static dataApiKeydownHandler(event) {
        // If not an UP | DOWN | ESCAPE key => not a dropdown command
        // If input/textarea && if key is other than ESCAPE => not a dropdown command
  
        const isInput = /input|textarea/i.test(event.target.tagName);
        const isEscapeEvent = event.key === ESCAPE_KEY;
        const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);
  
        if (!isUpOrDownEvent && !isEscapeEvent) {
          return
        }
  
        if (isInput && !isEscapeEvent) {
          return
        }
  
        event.preventDefault();
  
        // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
        const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ?
          this :
          (SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE)[0] ||
            SelectorEngine.next(this, SELECTOR_DATA_TOGGLE)[0] ||
            SelectorEngine.findOne(SELECTOR_DATA_TOGGLE, event.delegateTarget.parentNode));
  
        const instance = Dropdown.getOrCreateInstance(getToggleButton);
  
        if (isUpOrDownEvent) {
          event.stopPropagation();
          instance.show();
          instance._selectMenuItem(event);
          return
        }
  
        if (instance._isShown()) { // else is escape and we check if it is shown
          event.stopPropagation();
          instance.hide();
          getToggleButton.focus();
        }
      }
    }
  
    /**
     * Data API implementation
     */
  
    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
    EventHandler.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
    EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
    EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
      event.preventDefault();
      Dropdown.getOrCreateInstance(this).toggle();
    });
  
    /**
     * jQuery
     */
  
    defineJQueryPlugin(Dropdown);
  
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const assign = (target, ...args) => Object.assign(target, ...args);
    const keys = (obj) => Object.keys(obj);
  
    /* eslint-disable @typescript-eslint/no-explicit-any */
    function _isObject(item) {
        return item && typeof item === "object" && item.constructor === Object;
    }
    const mergeDeep = (target, source) => {
        if (_isObject(target) && _isObject(source)) {
            keys(source).forEach(key => {
                if (_isObject(source[key])) {
                    if (!target[key] || !_isObject(target[key])) {
                        target[key] = source[key];
                    }
                    mergeDeep(target[key], source[key]);
                }
                else {
                    assign(target, { [key]: source[key] });
                }
            });
        }
        return target;
    };
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");
  
    var css_248z$1 = i$5`@charset "UTF-8";:root{--cgds-blue:#1f69ff;--cgds-purple:#5925dc;--cgds-pink:#d63384;--cgds-red:#d7260f;--cgds-yellow:#f79009;--cgds-green:#0a8217;--cgds-cyan:#0f71bb;--cgds-white:#fff;--cgds-gray:#344054;--cgds-gray-dark:#000;--cgds-gray-100:#f7f7f9;--cgds-gray-200:#e4e7ec;--cgds-gray-300:#d0d5dd;--cgds-gray-400:#98a2b3;--cgds-gray-500:#667085;--cgds-gray-600:#344054;--cgds-gray-700:#1d2939;--cgds-gray-800:#000;--cgds-gray-900:#000;--cgds-primary:#5925dc;--cgds-secondary:#1f69ff;--cgds-success:#0a8217;--cgds-info:#0f71bb;--cgds-warning:#f79009;--cgds-danger:#d7260f;--cgds-light:#f7f7f9;--cgds-dark:#000;--cgds-primary-rgb:89,37,220;--cgds-secondary-rgb:31,105,255;--cgds-success-rgb:10,130,23;--cgds-info-rgb:15,113,187;--cgds-warning-rgb:247,144,9;--cgds-danger-rgb:215,38,15;--cgds-light-rgb:247,247,249;--cgds-dark-rgb:0,0,0;--cgds-white-rgb:255,255,255;--cgds-black-rgb:0,0,0;--cgds-body-color-rgb:29,41,57;--cgds-body-bg-rgb:255,255,255;--cgds-font-sans-serif:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--cgds-font-monospace:SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--cgds-gradient:linear-gradient(180deg,hsla(0,0%,100%,.15),hsla(0,0%,100%,0));--cgds-body-font-family:var(--cgds-font-sans-serif);--cgds-body-font-size:1rem;--cgds-body-font-weight:400;--cgds-body-line-height:2;--cgds-body-color:#1d2939;--cgds-body-bg:#fff;--cgds-gutter-x:1.5rem}@media (min-width:992px){:root{--section-padding:3rem 1.5rem;--section-padding-xs:1rem 1.5rem;--section-padding-sm:1.5rem 1.5rem;--section-padding-lg:9rem 1.5rem;--section-padding-xl:18rem 1.5rem}}*,:after,:before{box-sizing:border-box}@media (prefers-reduced-motion:no-preference){:root{scroll-behavior:smooth}}body{-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);background-color:var(--cgds-body-bg);color:var(--cgds-body-color);font-family:var(--cgds-body-font-family);font-size:var(--cgds-body-font-size);font-weight:var(--cgds-body-font-weight);line-height:var(--cgds-body-line-height);margin:0;text-align:var(--cgds-body-text-align)}hr{background-color:currentColor;border:0;color:inherit;margin:1rem 0;opacity:.25}hr:not([size]){height:1px}.h1,.h2,.h3,.h4,.h5,.h6,.cgds.footer .footer-header .title,h1,h2,h3,h4,h5,h6{font-weight:700;line-height:1.2;margin-bottom:.5rem;margin-top:0}.h1,h1{font-size:calc(1.375rem + 1.5vw)}@media (min-width:1200px){.h1,h1{font-size:2.5rem}}.h2,h2{font-size:calc(1.325rem + .9vw)}@media (min-width:1200px){.h2,h2{font-size:2rem}}.h3,.cgds.footer .footer-header .title,h3{font-size:calc(1.275rem + .3vw)}@media (min-width:1200px){.h3,.cgds.footer .footer-header .title,h3{font-size:1.5rem}}.h4,h4{font-size:1.125rem}.h5,.h6,h5,h6{font-size:1rem}p{margin-bottom:1.5rem;margin-top:0}abbr[data-bs-original-title],abbr[title]{cursor:help;text-decoration:underline dotted;text-decoration-skip-ink:none}address{font-style:normal;line-height:inherit;margin-bottom:1rem}ol,ul{padding-left:2rem}dl,ol,ul{margin-bottom:1rem;margin-top:0}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}dt{font-weight:700}dd{margin-bottom:.5rem;margin-left:0}blockquote{margin:0 0 1rem}b,strong{font-weight:bolder}.small,small{font-size:.875em}.mark,mark{background-color:#fcf8e3;padding:.2em}sub,sup{font-size:.75em;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}a{color:#0f71bb;text-decoration:underline}a:hover{color:#0c5a96}a:not([href]):not([class]),a:not([href]):not([class]):hover{color:inherit;text-decoration:none}code,kbd,pre,samp{direction:ltr;font-family:var(--cgds-font-monospace);font-size:1em;unicode-bidi:bidi-override}pre{display:block;font-size:.875em;margin-bottom:1rem;margin-top:0;overflow:auto}pre code{color:inherit;font-size:inherit;word-break:normal}code{word-wrap:break-word;color:#d63384;font-size:.875em}a>code{color:inherit}kbd{background-color:#000;border-radius:.2rem;color:#fff;font-size:.875em;padding:.2rem .4rem}kbd kbd{font-size:1em;font-weight:700;padding:0}figure{margin:0 0 1rem}img,svg{vertical-align:middle}table{border-collapse:collapse;caption-side:bottom}caption{color:#667085;padding-bottom:1rem;padding-top:1rem;text-align:left}th{text-align:inherit;text-align:-webkit-match-parent}tbody,td,tfoot,th,thead,tr{border:0 solid;border-color:inherit}label{display:inline-block}button{border-radius:0}button:focus:not(:focus-visible){outline:0}button,input,optgroup,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit;margin:0}button,select{text-transform:none}[role=button]{cursor:pointer}select{word-wrap:normal}select:disabled{opacity:1}[list]::-webkit-calendar-picker-indicator{display:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled),button:not(:disabled){cursor:pointer}::-moz-focus-inner{border-style:none;padding:0}textarea{resize:vertical}fieldset{border:0;margin:0;min-width:0;padding:0}legend{float:left;font-size:calc(1.275rem + .3vw);line-height:inherit;margin-bottom:.5rem;padding:0;width:100%}@media (min-width:1200px){legend{font-size:1.5rem}}legend+*{clear:left}::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-fields-wrapper,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-text,::-webkit-datetime-edit-year-field{padding:0}::-webkit-inner-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-color-swatch-wrapper{padding:0}::file-selector-button{font:inherit}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}output{display:inline-block}iframe{border:0}summary{cursor:pointer;display:list-item}progress{vertical-align:baseline}[hidden]{display:none!important}.h1,h1{line-height:1.2}.h2,h2{line-height:1.25}.h3,.cgds.footer .footer-header .title,h3{line-height:1.33}.h4,h4{line-height:1.78}.h5,.h6,h5,h6{line-height:1.2}.lead{font-size:1.25rem;font-weight:300}.display-0{font-size:calc(1.475rem + 2.7vw);font-weight:700;line-height:1.2}@media (min-width:1200px){.display-0{font-size:3.5rem}}.display-1{font-size:calc(1.375rem + 1.5vw);font-weight:700;line-height:1.2}@media (min-width:1200px){.display-1{font-size:2.5rem}}.display-2{font-size:calc(1.325rem + .9vw);font-weight:700;line-height:1.2}@media (min-width:1200px){.display-2{font-size:2rem}}.display-3{font-size:calc(1.275rem + .3vw);font-weight:700;line-height:1.2}@media (min-width:1200px){.display-3{font-size:1.5rem}}.display-4{font-size:1.125rem;font-weight:700;line-height:1.2}.display-5,.display-6{font-size:1rem;font-weight:700;line-height:1.2}.list-inline,.list-unstyled{list-style:none;padding-left:0}.list-inline-item{display:inline-block}.list-inline-item:not(:last-child){margin-right:.5rem}.initialism{font-size:.875em;text-transform:uppercase}.blockquote{font-size:1.25rem;margin-bottom:1rem}.blockquote>:last-child{margin-bottom:0}.blockquote-footer{color:#344054;font-size:.875em;margin-bottom:1rem;margin-top:-1rem}.blockquote-footer:before{content:"— "}p+p{margin-top:1.5rem}a{text-underline-offset:.25rem}a[target=_blank]:after{content:"\\f1c5";display:inline-block;font-family:bootstrap-icons;padding-left:.25rem;text-decoration-line:none}.img-fluid,.img-thumbnail{height:auto;max-width:100%}.img-thumbnail{background-color:#fff;border:1px solid #d0d5dd;border-radius:.3125rem;padding:.25rem}.figure{display:inline-block}.figure-img{line-height:1;margin-bottom:.5rem}.figure-caption{color:#344054;font-size:.875em}.section{padding:var(--section-padding)}.section-xs{padding:var(--section-padding-xs)}.section-sm{padding:var(--section-padding-sm)}.section-md{padding:var(--section-padding)}.section-lg{padding:var(--section-padding-lg)}.section-xl{padding:var(--section-padding-xl)}.container,.container-fluid,.container-lg,.container-md,.container-sm,.container-xl,.container-xxl{margin-left:auto;margin-right:auto;padding-left:var(--cgds-gutter-x,.75rem);padding-right:var(--cgds-gutter-x,.75rem);width:100%}@media (min-width:576px){.container,.container-sm{max-width:540px}}@media (min-width:768px){.container,.container-md,.container-sm{max-width:720px}}@media (min-width:992px){.container,.container-lg,.container-md,.container-sm{max-width:960px}}@media (min-width:1200px){.container,.container-lg,.container-md,.container-sm,.container-xl{max-width:1140px}}@media (min-width:1400px){.container,.container-lg,.container-md,.container-sm,.container-xl,.container-xxl{max-width:1320px}}.row{--cgds-gutter-x:1.5rem;--cgds-gutter-y:0;display:flex;flex-wrap:wrap;margin-left:calc(var(--cgds-gutter-x)*-.5);margin-right:calc(var(--cgds-gutter-x)*-.5);margin-top:calc(var(--cgds-gutter-y)*-1)}.row>*{flex-shrink:0;margin-top:var(--cgds-gutter-y);max-width:100%;padding-left:calc(var(--cgds-gutter-x)*.5);padding-right:calc(var(--cgds-gutter-x)*.5);width:100%}.col{flex:1 0 0%}.row-cols-auto>*{flex:0 0 auto;width:auto}.row-cols-1>*{flex:0 0 auto;width:100%}.row-cols-2>*{flex:0 0 auto;width:50%}.row-cols-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-4>*{flex:0 0 auto;width:25%}.row-cols-5>*{flex:0 0 auto;width:20%}.row-cols-6>*{flex:0 0 auto;width:16.6666666667%}.col-auto{flex:0 0 auto;width:auto}.col-1{flex:0 0 auto;width:8.33333333%}.col-2{flex:0 0 auto;width:16.66666667%}.col-3{flex:0 0 auto;width:25%}.col-4{flex:0 0 auto;width:33.33333333%}.col-5{flex:0 0 auto;width:41.66666667%}.col-6{flex:0 0 auto;width:50%}.col-7{flex:0 0 auto;width:58.33333333%}.col-8{flex:0 0 auto;width:66.66666667%}.col-9{flex:0 0 auto;width:75%}.col-10{flex:0 0 auto;width:83.33333333%}.col-11{flex:0 0 auto;width:91.66666667%}.col-12{flex:0 0 auto;width:100%}.offset-1{margin-left:8.33333333%}.offset-2{margin-left:16.66666667%}.offset-3{margin-left:25%}.offset-4{margin-left:33.33333333%}.offset-5{margin-left:41.66666667%}.offset-6{margin-left:50%}.offset-7{margin-left:58.33333333%}.offset-8{margin-left:66.66666667%}.offset-9{margin-left:75%}.offset-10{margin-left:83.33333333%}.offset-11{margin-left:91.66666667%}.g-0,.gx-0{--cgds-gutter-x:0}.g-0,.gy-0{--cgds-gutter-y:0}.g-1,.gx-1{--cgds-gutter-x:0.25rem}.g-1,.gy-1{--cgds-gutter-y:0.25rem}.g-2,.gx-2{--cgds-gutter-x:0.5rem}.g-2,.gy-2{--cgds-gutter-y:0.5rem}.g-3,.gx-3{--cgds-gutter-x:1rem}.g-3,.gy-3{--cgds-gutter-y:1rem}.g-4,.gx-4{--cgds-gutter-x:1.5rem}.g-4,.gy-4{--cgds-gutter-y:1.5rem}.g-5,.gx-5{--cgds-gutter-x:2rem}.g-5,.gy-5{--cgds-gutter-y:2rem}.g-6,.gx-6{--cgds-gutter-x:2.5rem}.g-6,.gy-6{--cgds-gutter-y:2.5rem}.g-7,.gx-7{--cgds-gutter-x:3rem}.g-7,.gy-7{--cgds-gutter-y:3rem}.g-8,.gx-8{--cgds-gutter-x:3.5rem}.g-8,.gy-8{--cgds-gutter-y:3.5rem}@media (min-width:576px){.col-sm{flex:1 0 0%}.row-cols-sm-auto>*{flex:0 0 auto;width:auto}.row-cols-sm-1>*{flex:0 0 auto;width:100%}.row-cols-sm-2>*{flex:0 0 auto;width:50%}.row-cols-sm-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-sm-4>*{flex:0 0 auto;width:25%}.row-cols-sm-5>*{flex:0 0 auto;width:20%}.row-cols-sm-6>*{flex:0 0 auto;width:16.6666666667%}.col-sm-auto{flex:0 0 auto;width:auto}.col-sm-1{flex:0 0 auto;width:8.33333333%}.col-sm-2{flex:0 0 auto;width:16.66666667%}.col-sm-3{flex:0 0 auto;width:25%}.col-sm-4{flex:0 0 auto;width:33.33333333%}.col-sm-5{flex:0 0 auto;width:41.66666667%}.col-sm-6{flex:0 0 auto;width:50%}.col-sm-7{flex:0 0 auto;width:58.33333333%}.col-sm-8{flex:0 0 auto;width:66.66666667%}.col-sm-9{flex:0 0 auto;width:75%}.col-sm-10{flex:0 0 auto;width:83.33333333%}.col-sm-11{flex:0 0 auto;width:91.66666667%}.col-sm-12{flex:0 0 auto;width:100%}.offset-sm-0{margin-left:0}.offset-sm-1{margin-left:8.33333333%}.offset-sm-2{margin-left:16.66666667%}.offset-sm-3{margin-left:25%}.offset-sm-4{margin-left:33.33333333%}.offset-sm-5{margin-left:41.66666667%}.offset-sm-6{margin-left:50%}.offset-sm-7{margin-left:58.33333333%}.offset-sm-8{margin-left:66.66666667%}.offset-sm-9{margin-left:75%}.offset-sm-10{margin-left:83.33333333%}.offset-sm-11{margin-left:91.66666667%}.g-sm-0,.gx-sm-0{--cgds-gutter-x:0}.g-sm-0,.gy-sm-0{--cgds-gutter-y:0}.g-sm-1,.gx-sm-1{--cgds-gutter-x:0.25rem}.g-sm-1,.gy-sm-1{--cgds-gutter-y:0.25rem}.g-sm-2,.gx-sm-2{--cgds-gutter-x:0.5rem}.g-sm-2,.gy-sm-2{--cgds-gutter-y:0.5rem}.g-sm-3,.gx-sm-3{--cgds-gutter-x:1rem}.g-sm-3,.gy-sm-3{--cgds-gutter-y:1rem}.g-sm-4,.gx-sm-4{--cgds-gutter-x:1.5rem}.g-sm-4,.gy-sm-4{--cgds-gutter-y:1.5rem}.g-sm-5,.gx-sm-5{--cgds-gutter-x:2rem}.g-sm-5,.gy-sm-5{--cgds-gutter-y:2rem}.g-sm-6,.gx-sm-6{--cgds-gutter-x:2.5rem}.g-sm-6,.gy-sm-6{--cgds-gutter-y:2.5rem}.g-sm-7,.gx-sm-7{--cgds-gutter-x:3rem}.g-sm-7,.gy-sm-7{--cgds-gutter-y:3rem}.g-sm-8,.gx-sm-8{--cgds-gutter-x:3.5rem}.g-sm-8,.gy-sm-8{--cgds-gutter-y:3.5rem}}@media (min-width:768px){.col-md{flex:1 0 0%}.row-cols-md-auto>*{flex:0 0 auto;width:auto}.row-cols-md-1>*{flex:0 0 auto;width:100%}.row-cols-md-2>*{flex:0 0 auto;width:50%}.row-cols-md-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-md-4>*{flex:0 0 auto;width:25%}.row-cols-md-5>*{flex:0 0 auto;width:20%}.row-cols-md-6>*{flex:0 0 auto;width:16.6666666667%}.col-md-auto{flex:0 0 auto;width:auto}.col-md-1{flex:0 0 auto;width:8.33333333%}.col-md-2{flex:0 0 auto;width:16.66666667%}.col-md-3{flex:0 0 auto;width:25%}.col-md-4{flex:0 0 auto;width:33.33333333%}.col-md-5{flex:0 0 auto;width:41.66666667%}.col-md-6{flex:0 0 auto;width:50%}.col-md-7{flex:0 0 auto;width:58.33333333%}.col-md-8{flex:0 0 auto;width:66.66666667%}.col-md-9{flex:0 0 auto;width:75%}.col-md-10{flex:0 0 auto;width:83.33333333%}.col-md-11{flex:0 0 auto;width:91.66666667%}.col-md-12{flex:0 0 auto;width:100%}.offset-md-0{margin-left:0}.offset-md-1{margin-left:8.33333333%}.offset-md-2{margin-left:16.66666667%}.offset-md-3{margin-left:25%}.offset-md-4{margin-left:33.33333333%}.offset-md-5{margin-left:41.66666667%}.offset-md-6{margin-left:50%}.offset-md-7{margin-left:58.33333333%}.offset-md-8{margin-left:66.66666667%}.offset-md-9{margin-left:75%}.offset-md-10{margin-left:83.33333333%}.offset-md-11{margin-left:91.66666667%}.g-md-0,.gx-md-0{--cgds-gutter-x:0}.g-md-0,.gy-md-0{--cgds-gutter-y:0}.g-md-1,.gx-md-1{--cgds-gutter-x:0.25rem}.g-md-1,.gy-md-1{--cgds-gutter-y:0.25rem}.g-md-2,.gx-md-2{--cgds-gutter-x:0.5rem}.g-md-2,.gy-md-2{--cgds-gutter-y:0.5rem}.g-md-3,.gx-md-3{--cgds-gutter-x:1rem}.g-md-3,.gy-md-3{--cgds-gutter-y:1rem}.g-md-4,.gx-md-4{--cgds-gutter-x:1.5rem}.g-md-4,.gy-md-4{--cgds-gutter-y:1.5rem}.g-md-5,.gx-md-5{--cgds-gutter-x:2rem}.g-md-5,.gy-md-5{--cgds-gutter-y:2rem}.g-md-6,.gx-md-6{--cgds-gutter-x:2.5rem}.g-md-6,.gy-md-6{--cgds-gutter-y:2.5rem}.g-md-7,.gx-md-7{--cgds-gutter-x:3rem}.g-md-7,.gy-md-7{--cgds-gutter-y:3rem}.g-md-8,.gx-md-8{--cgds-gutter-x:3.5rem}.g-md-8,.gy-md-8{--cgds-gutter-y:3.5rem}}@media (min-width:992px){.col-lg{flex:1 0 0%}.row-cols-lg-auto>*{flex:0 0 auto;width:auto}.row-cols-lg-1>*{flex:0 0 auto;width:100%}.row-cols-lg-2>*{flex:0 0 auto;width:50%}.row-cols-lg-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-lg-4>*{flex:0 0 auto;width:25%}.row-cols-lg-5>*{flex:0 0 auto;width:20%}.row-cols-lg-6>*{flex:0 0 auto;width:16.6666666667%}.col-lg-auto{flex:0 0 auto;width:auto}.col-lg-1{flex:0 0 auto;width:8.33333333%}.col-lg-2{flex:0 0 auto;width:16.66666667%}.col-lg-3{flex:0 0 auto;width:25%}.col-lg-4{flex:0 0 auto;width:33.33333333%}.col-lg-5{flex:0 0 auto;width:41.66666667%}.col-lg-6{flex:0 0 auto;width:50%}.col-lg-7{flex:0 0 auto;width:58.33333333%}.col-lg-8{flex:0 0 auto;width:66.66666667%}.col-lg-9{flex:0 0 auto;width:75%}.col-lg-10{flex:0 0 auto;width:83.33333333%}.col-lg-11{flex:0 0 auto;width:91.66666667%}.col-lg-12{flex:0 0 auto;width:100%}.offset-lg-0{margin-left:0}.offset-lg-1{margin-left:8.33333333%}.offset-lg-2{margin-left:16.66666667%}.offset-lg-3{margin-left:25%}.offset-lg-4{margin-left:33.33333333%}.offset-lg-5{margin-left:41.66666667%}.offset-lg-6{margin-left:50%}.offset-lg-7{margin-left:58.33333333%}.offset-lg-8{margin-left:66.66666667%}.offset-lg-9{margin-left:75%}.offset-lg-10{margin-left:83.33333333%}.offset-lg-11{margin-left:91.66666667%}.g-lg-0,.gx-lg-0{--cgds-gutter-x:0}.g-lg-0,.gy-lg-0{--cgds-gutter-y:0}.g-lg-1,.gx-lg-1{--cgds-gutter-x:0.25rem}.g-lg-1,.gy-lg-1{--cgds-gutter-y:0.25rem}.g-lg-2,.gx-lg-2{--cgds-gutter-x:0.5rem}.g-lg-2,.gy-lg-2{--cgds-gutter-y:0.5rem}.g-lg-3,.gx-lg-3{--cgds-gutter-x:1rem}.g-lg-3,.gy-lg-3{--cgds-gutter-y:1rem}.g-lg-4,.gx-lg-4{--cgds-gutter-x:1.5rem}.g-lg-4,.gy-lg-4{--cgds-gutter-y:1.5rem}.g-lg-5,.gx-lg-5{--cgds-gutter-x:2rem}.g-lg-5,.gy-lg-5{--cgds-gutter-y:2rem}.g-lg-6,.gx-lg-6{--cgds-gutter-x:2.5rem}.g-lg-6,.gy-lg-6{--cgds-gutter-y:2.5rem}.g-lg-7,.gx-lg-7{--cgds-gutter-x:3rem}.g-lg-7,.gy-lg-7{--cgds-gutter-y:3rem}.g-lg-8,.gx-lg-8{--cgds-gutter-x:3.5rem}.g-lg-8,.gy-lg-8{--cgds-gutter-y:3.5rem}}@media (min-width:1200px){.col-xl{flex:1 0 0%}.row-cols-xl-auto>*{flex:0 0 auto;width:auto}.row-cols-xl-1>*{flex:0 0 auto;width:100%}.row-cols-xl-2>*{flex:0 0 auto;width:50%}.row-cols-xl-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-xl-4>*{flex:0 0 auto;width:25%}.row-cols-xl-5>*{flex:0 0 auto;width:20%}.row-cols-xl-6>*{flex:0 0 auto;width:16.6666666667%}.col-xl-auto{flex:0 0 auto;width:auto}.col-xl-1{flex:0 0 auto;width:8.33333333%}.col-xl-2{flex:0 0 auto;width:16.66666667%}.col-xl-3{flex:0 0 auto;width:25%}.col-xl-4{flex:0 0 auto;width:33.33333333%}.col-xl-5{flex:0 0 auto;width:41.66666667%}.col-xl-6{flex:0 0 auto;width:50%}.col-xl-7{flex:0 0 auto;width:58.33333333%}.col-xl-8{flex:0 0 auto;width:66.66666667%}.col-xl-9{flex:0 0 auto;width:75%}.col-xl-10{flex:0 0 auto;width:83.33333333%}.col-xl-11{flex:0 0 auto;width:91.66666667%}.col-xl-12{flex:0 0 auto;width:100%}.offset-xl-0{margin-left:0}.offset-xl-1{margin-left:8.33333333%}.offset-xl-2{margin-left:16.66666667%}.offset-xl-3{margin-left:25%}.offset-xl-4{margin-left:33.33333333%}.offset-xl-5{margin-left:41.66666667%}.offset-xl-6{margin-left:50%}.offset-xl-7{margin-left:58.33333333%}.offset-xl-8{margin-left:66.66666667%}.offset-xl-9{margin-left:75%}.offset-xl-10{margin-left:83.33333333%}.offset-xl-11{margin-left:91.66666667%}.g-xl-0,.gx-xl-0{--cgds-gutter-x:0}.g-xl-0,.gy-xl-0{--cgds-gutter-y:0}.g-xl-1,.gx-xl-1{--cgds-gutter-x:0.25rem}.g-xl-1,.gy-xl-1{--cgds-gutter-y:0.25rem}.g-xl-2,.gx-xl-2{--cgds-gutter-x:0.5rem}.g-xl-2,.gy-xl-2{--cgds-gutter-y:0.5rem}.g-xl-3,.gx-xl-3{--cgds-gutter-x:1rem}.g-xl-3,.gy-xl-3{--cgds-gutter-y:1rem}.g-xl-4,.gx-xl-4{--cgds-gutter-x:1.5rem}.g-xl-4,.gy-xl-4{--cgds-gutter-y:1.5rem}.g-xl-5,.gx-xl-5{--cgds-gutter-x:2rem}.g-xl-5,.gy-xl-5{--cgds-gutter-y:2rem}.g-xl-6,.gx-xl-6{--cgds-gutter-x:2.5rem}.g-xl-6,.gy-xl-6{--cgds-gutter-y:2.5rem}.g-xl-7,.gx-xl-7{--cgds-gutter-x:3rem}.g-xl-7,.gy-xl-7{--cgds-gutter-y:3rem}.g-xl-8,.gx-xl-8{--cgds-gutter-x:3.5rem}.g-xl-8,.gy-xl-8{--cgds-gutter-y:3.5rem}}@media (min-width:1400px){.col-xxl{flex:1 0 0%}.row-cols-xxl-auto>*{flex:0 0 auto;width:auto}.row-cols-xxl-1>*{flex:0 0 auto;width:100%}.row-cols-xxl-2>*{flex:0 0 auto;width:50%}.row-cols-xxl-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-xxl-4>*{flex:0 0 auto;width:25%}.row-cols-xxl-5>*{flex:0 0 auto;width:20%}.row-cols-xxl-6>*{flex:0 0 auto;width:16.6666666667%}.col-xxl-auto{flex:0 0 auto;width:auto}.col-xxl-1{flex:0 0 auto;width:8.33333333%}.col-xxl-2{flex:0 0 auto;width:16.66666667%}.col-xxl-3{flex:0 0 auto;width:25%}.col-xxl-4{flex:0 0 auto;width:33.33333333%}.col-xxl-5{flex:0 0 auto;width:41.66666667%}.col-xxl-6{flex:0 0 auto;width:50%}.col-xxl-7{flex:0 0 auto;width:58.33333333%}.col-xxl-8{flex:0 0 auto;width:66.66666667%}.col-xxl-9{flex:0 0 auto;width:75%}.col-xxl-10{flex:0 0 auto;width:83.33333333%}.col-xxl-11{flex:0 0 auto;width:91.66666667%}.col-xxl-12{flex:0 0 auto;width:100%}.offset-xxl-0{margin-left:0}.offset-xxl-1{margin-left:8.33333333%}.offset-xxl-2{margin-left:16.66666667%}.offset-xxl-3{margin-left:25%}.offset-xxl-4{margin-left:33.33333333%}.offset-xxl-5{margin-left:41.66666667%}.offset-xxl-6{margin-left:50%}.offset-xxl-7{margin-left:58.33333333%}.offset-xxl-8{margin-left:66.66666667%}.offset-xxl-9{margin-left:75%}.offset-xxl-10{margin-left:83.33333333%}.offset-xxl-11{margin-left:91.66666667%}.g-xxl-0,.gx-xxl-0{--cgds-gutter-x:0}.g-xxl-0,.gy-xxl-0{--cgds-gutter-y:0}.g-xxl-1,.gx-xxl-1{--cgds-gutter-x:0.25rem}.g-xxl-1,.gy-xxl-1{--cgds-gutter-y:0.25rem}.g-xxl-2,.gx-xxl-2{--cgds-gutter-x:0.5rem}.g-xxl-2,.gy-xxl-2{--cgds-gutter-y:0.5rem}.g-xxl-3,.gx-xxl-3{--cgds-gutter-x:1rem}.g-xxl-3,.gy-xxl-3{--cgds-gutter-y:1rem}.g-xxl-4,.gx-xxl-4{--cgds-gutter-x:1.5rem}.g-xxl-4,.gy-xxl-4{--cgds-gutter-y:1.5rem}.g-xxl-5,.gx-xxl-5{--cgds-gutter-x:2rem}.g-xxl-5,.gy-xxl-5{--cgds-gutter-y:2rem}.g-xxl-6,.gx-xxl-6{--cgds-gutter-x:2.5rem}.g-xxl-6,.gy-xxl-6{--cgds-gutter-y:2.5rem}.g-xxl-7,.gx-xxl-7{--cgds-gutter-x:3rem}.g-xxl-7,.gy-xxl-7{--cgds-gutter-y:3rem}.g-xxl-8,.gx-xxl-8{--cgds-gutter-x:3.5rem}.g-xxl-8,.gy-xxl-8{--cgds-gutter-y:3.5rem}}.table{--cgds-table-bg:transparent;--cgds-table-accent-bg:transparent;--cgds-table-striped-color:#1d2939;--cgds-table-striped-bg:rgba(0,0,0,.05);--cgds-table-active-color:#1d2939;--cgds-table-active-bg:rgba(0,0,0,.1);--cgds-table-hover-color:#1d2939;--cgds-table-hover-bg:rgba(0,0,0,.075);border-color:#98a2b3;color:#1d2939;margin-bottom:1rem;vertical-align:top;width:100%}.table>:not(caption)>*>*{background-color:var(--cgds-table-bg);border-bottom-width:1px;box-shadow:inset 0 0 0 9999px var(--cgds-table-accent-bg);padding:1rem}.table>tbody{vertical-align:inherit}.table>thead{vertical-align:bottom}.table>:not(:first-child){border-top:2px solid}.caption-top{caption-side:top}.table-sm>:not(caption)>*>*{padding:.5rem}.table-bordered>:not(caption)>*{border-width:1px 0}.table-bordered>:not(caption)>*>*{border-width:0 1px}.table-borderless>:not(caption)>*>*{border-bottom-width:0}.table-borderless>:not(:first-child){border-top-width:0}.table-striped>tbody>tr:nth-of-type(odd)>*{--cgds-table-accent-bg:var(--cgds-table-striped-bg);color:var(--cgds-table-striped-color)}.table-active{--cgds-table-accent-bg:var(--cgds-table-active-bg);color:var(--cgds-table-active-color)}.table-hover>tbody>tr:hover>*{--cgds-table-accent-bg:var(--cgds-table-hover-bg);color:var(--cgds-table-hover-color)}.table-danger,.table-info,.table-primary,.table-secondary,.table-success,.table-warning{--cgds-table-bg:#000;--cgds-table-striped-bg:#0d0d0d;--cgds-table-striped-color:#fff;--cgds-table-active-bg:#1a1a1a;--cgds-table-active-color:#fff;--cgds-table-hover-bg:#131313;--cgds-table-hover-color:#fff;border-color:#1a1a1a;color:#fff}.table-light{--cgds-table-bg:#f7f7f9;--cgds-table-striped-bg:#ebebed;--cgds-table-striped-color:#000;--cgds-table-active-bg:#dedee0;--cgds-table-active-color:#000;--cgds-table-hover-bg:#e4e4e6;--cgds-table-hover-color:#000;border-color:#dedee0;color:#000}.table-dark{--cgds-table-bg:#000;--cgds-table-striped-bg:#0d0d0d;--cgds-table-striped-color:#fff;--cgds-table-active-bg:#1a1a1a;--cgds-table-active-color:#fff;--cgds-table-hover-bg:#131313;--cgds-table-hover-color:#fff;border-color:#1a1a1a;color:#fff}.table-responsive{-webkit-overflow-scrolling:touch;overflow-x:auto}@media (max-width:575.98px){.table-responsive-sm{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:767.98px){.table-responsive-md{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:991.98px){.table-responsive-lg{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:1199.98px){.table-responsive-xl{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:1399.98px){.table-responsive-xxl{-webkit-overflow-scrolling:touch;overflow-x:auto}}.cgds.table{font-size:1rem}.form-label{font-weight:700;margin-bottom:.5rem}.col-form-label{font-size:inherit;font-weight:700;line-height:2;margin-bottom:0;padding-bottom:calc(.4375rem + 1px);padding-top:calc(.4375rem + 1px)}.col-form-label-lg{font-size:1.25rem;padding-bottom:calc(.5rem + 1px);padding-top:calc(.5rem + 1px)}.col-form-label-sm{font-size:.875rem;padding-bottom:calc(.25rem + 1px);padding-top:calc(.25rem + 1px)}.form-label{margin-bottom:0}.form-text{color:#667085;font-size:1rem;font-weight:300}.form-control{appearance:none;background-clip:padding-box;background-color:#fff;border:1px solid #98a2b3;border-radius:.3125rem;color:#1d2939;display:block;font-size:1rem;font-weight:400;line-height:2;padding:.4375rem 1rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:100%}@media (prefers-reduced-motion:reduce){.form-control{transition:none}}.form-control[type=file]{overflow:hidden}.form-control[type=file]:not(:disabled):not([readonly]){cursor:pointer}.form-control:focus{background-color:#fff;border-color:#87b8dd;box-shadow:0 0 0 .125rem rgba(15,113,187,.25);color:#1d2939;outline:0}.form-control::-webkit-date-and-time-value{height:2em}.form-control::placeholder{color:#98a2b3;opacity:1}.form-control:disabled,.form-control[readonly]{background-color:#e4e7ec;opacity:1}.form-control::file-selector-button{background-color:#e4e7ec;border:0 solid;border-color:inherit;border-inline-end-width:1px;border-radius:0;color:#1d2939;margin:-.4375rem -1rem;margin-inline-end:1rem;padding:.4375rem 1rem;pointer-events:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.form-control::file-selector-button{transition:none}}.form-control:hover:not(:disabled):not([readonly])::file-selector-button{background-color:#d9dbe0}.form-control::-webkit-file-upload-button{background-color:#e4e7ec;border:0 solid;border-color:inherit;border-inline-end-width:1px;border-radius:0;color:#1d2939;margin:-.4375rem -1rem;margin-inline-end:1rem;padding:.4375rem 1rem;pointer-events:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.form-control::-webkit-file-upload-button{transition:none}}.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button{background-color:#d9dbe0}.form-control-plaintext{background-color:transparent;border:solid transparent;border-width:1px 0;color:#1d2939;display:block;line-height:2;margin-bottom:0;padding:.4375rem 0;width:100%}.form-control-plaintext.form-control-lg,.form-control-plaintext.form-control-sm{padding-left:0;padding-right:0}.form-control-sm{border-radius:.2rem;font-size:.875rem;min-height:calc(2em + .5rem + 2px);padding:.25rem .5rem}.form-control-sm::file-selector-button{margin:-.25rem -.5rem;margin-inline-end:.5rem;padding:.25rem .5rem}.form-control-sm::-webkit-file-upload-button{margin:-.25rem -.5rem;margin-inline-end:.5rem;padding:.25rem .5rem}.form-control-lg{border-radius:.3rem;font-size:1.25rem;min-height:calc(2em + 1rem + 2px);padding:.5rem 1rem}.form-control-lg::file-selector-button{margin:-.5rem -1rem;margin-inline-end:1rem;padding:.5rem 1rem}.form-control-lg::-webkit-file-upload-button{margin:-.5rem -1rem;margin-inline-end:1rem;padding:.5rem 1rem}textarea.form-control{min-height:calc(2em + .875rem + 2px)}textarea.form-control-sm{min-height:calc(2em + .5rem + 2px)}textarea.form-control-lg{min-height:calc(2em + 1rem + 2px)}.form-control-color{height:auto;padding:.4375rem;width:3rem}.form-control-color:not(:disabled):not([readonly]){cursor:pointer}.form-control-color::-moz-color-swatch{border-radius:.3125rem;height:2em}.form-control-color::-webkit-color-swatch{border-radius:.3125rem;height:2em}.cgds.combobox .form-control-icon,.cgds.combobox .form-control-icon-validate,.cgds.form-control-group .form-control-icon,.cgds.form-control-group .form-control-icon-validate{align-items:center;display:flex;font-size:1rem;height:3rem;justify-content:center;position:absolute;width:3rem;z-index:4}.cgds.combobox,.cgds.form-control-group{align-items:stretch;display:flex;flex-wrap:wrap;position:relative;width:100%}.cgds.combobox>.form-control,.cgds.form-control-group>.form-control{padding-left:3rem}.cgds.combobox>.form-control:focus,.cgds.form-control-group>.form-control:focus{z-index:3}.cgds.combobox .form-control-icon-validate,.cgds.form-control-group .form-control-icon-validate{left:inherit;right:0}.form-select{-moz-padding-start:calc(1rem - 3px);appearance:none;background-color:#fff;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E");background-position:right 1rem center;background-repeat:no-repeat;background-size:16px 12px;border:1px solid #98a2b3;border-radius:.3125rem;color:#1d2939;display:block;font-size:1rem;font-weight:400;line-height:2;padding:.4375rem 3rem .4375rem 1rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:100%}@media (prefers-reduced-motion:reduce){.form-select{transition:none}}.form-select:focus{border-color:#87b8dd;box-shadow:0 0 0 .125rem rgba(15,113,187,.25);outline:0}.form-select[multiple],.form-select[size]:not([size="1"]){background-image:none;padding-right:1rem}.form-select:disabled{background-color:#e4e7ec}.form-select:-moz-focusring{color:transparent;text-shadow:0 0 0 #1d2939}.form-select-sm{border-radius:.2rem;font-size:.875rem;padding-bottom:.25rem;padding-left:.5rem;padding-top:.25rem}.form-select-lg{border-radius:.3rem;font-size:1.25rem;padding-bottom:.5rem;padding-left:1rem;padding-top:.5rem}.form-check{display:block;margin-bottom:.125rem;min-height:2rem;padding-left:1.625em}.form-check .form-check-input{float:left;margin-left:-1.625em}.form-check-input{color-adjust:exact;appearance:none;background-color:#fff;background-position:50%;background-repeat:no-repeat;background-size:contain;border:1px solid rgba(0,0,0,.25);height:1.125em;margin-top:.4375em;vertical-align:top;width:1.125em}.form-check-input[type=checkbox]{border-radius:.25em}.form-check-input[type=radio]{border-radius:50%}.form-check-input:active{filter:brightness(90%)}.form-check-input:focus{border-color:#87b8dd;box-shadow:0 0 0 .125rem rgba(15,113,187,.25);outline:0}.form-check-input:checked{background-color:#0f71bb;border-color:#0f71bb}.form-check-input:checked[type=checkbox]{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23fff' viewBox='0 0 16 16'%3E%3Cpath d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E")}.form-check-input:checked[type=radio]{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='2' fill='%23fff'/%3E%3C/svg%3E")}.form-check-input[type=checkbox]:indeterminate{background-color:#0f71bb;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3E%3C/svg%3E");border-color:#0f71bb}.form-check-input:disabled{filter:none;opacity:.5;pointer-events:none}.form-check-input:disabled~.form-check-label,.form-check-input[disabled]~.form-check-label{opacity:.5}.form-switch{padding-left:2.5em}.form-switch .form-check-input{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='rgba(0, 0, 0, 0.25)'/%3E%3C/svg%3E");background-position:0;border-radius:2em;margin-left:-2.5em;transition:background-position .15s ease-in-out;width:2em}@media (prefers-reduced-motion:reduce){.form-switch .form-check-input{transition:none}}.form-switch .form-check-input:focus{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%2387b8dd'/%3E%3C/svg%3E")}.form-switch .form-check-input:checked{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E");background-position:100%}.form-check-inline{display:inline-block;margin-right:1rem}.btn-check{clip:rect(0,0,0,0);pointer-events:none;position:absolute}.btn-check:disabled+.btn,.btn-check[disabled]+.btn{filter:none;opacity:.65;pointer-events:none}.form-range{appearance:none;background-color:transparent;height:1.25rem;padding:0;width:100%}.form-range:focus{outline:0}.form-range:focus::-webkit-slider-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .125rem rgba(15,113,187,.25)}.form-range:focus::-moz-range-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .125rem rgba(15,113,187,.25)}.form-range::-moz-focus-outer{border:0}.form-range::-webkit-slider-thumb{appearance:none;background-color:#0f71bb;border:0;border-radius:1rem;height:1rem;margin-top:-.25rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:1rem}@media (prefers-reduced-motion:reduce){.form-range::-webkit-slider-thumb{transition:none}}.form-range::-webkit-slider-thumb:active{background-color:#b7d4eb}.form-range::-webkit-slider-runnable-track{background-color:#d0d5dd;border-color:transparent;border-radius:1rem;color:transparent;cursor:pointer;height:.5rem;width:100%}.form-range::-moz-range-thumb{appearance:none;background-color:#0f71bb;border:0;border-radius:1rem;height:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:1rem}@media (prefers-reduced-motion:reduce){.form-range::-moz-range-thumb{transition:none}}.form-range::-moz-range-thumb:active{background-color:#b7d4eb}.form-range::-moz-range-track{background-color:#d0d5dd;border-color:transparent;border-radius:1rem;color:transparent;cursor:pointer;height:.5rem;width:100%}.form-range:disabled{pointer-events:none}.form-range:disabled::-webkit-slider-thumb{background-color:#667085}.form-range:disabled::-moz-range-thumb{background-color:#667085}.form-floating{position:relative}.form-floating>.form-control,.form-floating>.form-select{height:calc(3.5rem + 2px);line-height:1.25}.form-floating>label{border:1px solid transparent;height:100%;left:0;padding:1rem;pointer-events:none;position:absolute;top:0;transform-origin:0 0;transition:opacity .1s ease-in-out,transform .1s ease-in-out}@media (prefers-reduced-motion:reduce){.form-floating>label{transition:none}}.form-floating>.form-control{padding:1rem}.form-floating>.form-control::placeholder{color:transparent}.form-floating>.form-control:focus,.form-floating>.form-control:not(:placeholder-shown){padding-bottom:.625rem;padding-top:1.625rem}.form-floating>.form-control:-webkit-autofill{padding-bottom:.625rem;padding-top:1.625rem}.form-floating>.form-select{padding-bottom:.625rem;padding-top:1.625rem}.form-floating>.form-control:focus~label,.form-floating>.form-control:not(:placeholder-shown)~label,.form-floating>.form-select~label{opacity:.65;transform:scale(.85) translateY(-.5rem) translateX(.15rem)}.form-floating>.form-control:-webkit-autofill~label{opacity:.65;transform:scale(.85) translateY(-.5rem) translateX(.15rem)}.input-group{align-items:stretch;display:flex;flex-wrap:wrap;position:relative;width:100%}.input-group>.form-control,.input-group>.form-select{flex:1 1 auto;min-width:0;position:relative;width:1%}.input-group>.form-control:focus,.input-group>.form-select:focus{z-index:3}.input-group .btn{position:relative;z-index:2}.input-group .btn:focus{z-index:3}.input-group-text{align-items:center;background-color:#e4e7ec;border:1px solid #98a2b3;border-radius:.3125rem;color:#1d2939;display:flex;font-size:1rem;font-weight:400;line-height:2;padding:.4375rem 1rem;text-align:center;white-space:nowrap}.input-group-lg>.btn,.input-group-lg>.form-control,.input-group-lg>.form-select,.input-group-lg>.input-group-text{border-radius:.3rem;font-size:1.25rem;padding:.5rem 1rem}.input-group-sm>.btn,.input-group-sm>.form-control,.input-group-sm>.form-select,.input-group-sm>.input-group-text{border-radius:.2rem;font-size:.875rem;padding:.25rem .5rem}.input-group-lg>.form-select,.input-group-sm>.form-select{padding-right:4rem}.input-group.has-validation>.dropdown-toggle:nth-last-child(n+4),.input-group.has-validation>:nth-last-child(n+3):not(.dropdown-toggle):not(.dropdown-menu),.input-group:not(.has-validation)>.dropdown-toggle:nth-last-child(n+3),.input-group:not(.has-validation)>:not(:last-child):not(.dropdown-toggle):not(.dropdown-menu){border-bottom-right-radius:0;border-top-right-radius:0}.input-group>:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback){border-bottom-left-radius:0;border-top-left-radius:0;margin-left:-1px}.cgds.input-group .input-group-text .form-check-input{margin-top:0}.cgds.input-group[variant=quantity-toggle] input::-webkit-inner-spin-button,.cgds.input-group[variant=quantity-toggle] input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.valid-feedback{color:#0a8217;display:none;font-size:1rem;width:100%}.valid-tooltip{background-color:#0a8217;border-radius:.3125rem;color:#fff;display:none;font-size:.875rem;margin-top:.1rem;max-width:100%;padding:.5rem 1rem;position:absolute;top:100%;z-index:5}.is-valid~.valid-feedback,.is-valid~.valid-tooltip,.was-validated :valid~.valid-feedback,.was-validated :valid~.valid-tooltip{display:block}.form-control.is-valid,.was-validated .form-control:valid{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%230A8217'%3E%3Cpath d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/%3E%3C/svg%3E");background-position:right calc(.5em + .21875rem) center;background-repeat:no-repeat;background-size:calc(1em + .4375rem) calc(1em + .4375rem);border-color:#0a8217;padding-right:calc(2em + .875rem)}.form-control.is-valid:focus,.was-validated .form-control:valid:focus{border-color:#0a8217;box-shadow:0 0 0 .125rem rgba(10,130,23,.25)}.was-validated textarea.form-control:valid,textarea.form-control.is-valid{background-position:top calc(.5em + .21875rem) right calc(.5em + .21875rem);padding-right:calc(2em + .875rem)}.form-select.is-valid,.was-validated .form-select:valid{border-color:#0a8217}.form-select.is-valid:not([multiple]):not([size]),.form-select.is-valid:not([multiple])[size="1"],.was-validated .form-select:valid:not([multiple]):not([size]),.was-validated .form-select:valid:not([multiple])[size="1"]{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E"),url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%230A8217'%3E%3Cpath d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/%3E%3C/svg%3E");background-position:right 1rem center,center right 3rem;background-size:16px 12px,calc(1em + .4375rem) calc(1em + .4375rem);padding-right:5.5rem}.form-select.is-valid:focus,.was-validated .form-select:valid:focus{border-color:#0a8217;box-shadow:0 0 0 .125rem rgba(10,130,23,.25)}.form-check-input.is-valid,.was-validated .form-check-input:valid{border-color:#0a8217}.form-check-input.is-valid:checked,.was-validated .form-check-input:valid:checked{background-color:#0a8217}.form-check-input.is-valid:focus,.was-validated .form-check-input:valid:focus{box-shadow:0 0 0 .125rem rgba(10,130,23,.25)}.form-check-input.is-valid~.form-check-label,.was-validated .form-check-input:valid~.form-check-label{color:#0a8217}.form-check-inline .form-check-input~.valid-feedback{margin-left:.5em}.input-group .form-control.is-valid,.input-group .form-select.is-valid,.was-validated .input-group .form-control:valid,.was-validated .input-group .form-select:valid{z-index:1}.input-group .form-control.is-valid:focus,.input-group .form-select.is-valid:focus,.was-validated .input-group .form-control:valid:focus,.was-validated .input-group .form-select:valid:focus{z-index:3}.invalid-feedback{color:#d7260f;display:none;font-size:1rem;width:100%}.invalid-tooltip{background-color:#d7260f;border-radius:.3125rem;color:#fff;display:none;font-size:.875rem;margin-top:.1rem;max-width:100%;padding:.5rem 1rem;position:absolute;top:100%;z-index:5}.is-invalid~.invalid-feedback,.is-invalid~.invalid-tooltip,.was-validated :invalid~.invalid-feedback,.was-validated :invalid~.invalid-tooltip{display:block}.form-control.is-invalid,.was-validated .form-control:invalid{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23D7260F'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/%3E%3Cpath d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z'/%3E%3C/svg%3E");background-position:right calc(.5em + .21875rem) center;background-repeat:no-repeat;background-size:calc(1em + .4375rem) calc(1em + .4375rem);border-color:#d7260f;padding-right:calc(2em + .875rem)}.form-control.is-invalid:focus,.was-validated .form-control:invalid:focus{border-color:#d7260f;box-shadow:0 0 0 .125rem rgba(215,38,15,.25)}.was-validated textarea.form-control:invalid,textarea.form-control.is-invalid{background-position:top calc(.5em + .21875rem) right calc(.5em + .21875rem);padding-right:calc(2em + .875rem)}.form-select.is-invalid,.was-validated .form-select:invalid{border-color:#d7260f}.form-select.is-invalid:not([multiple]):not([size]),.form-select.is-invalid:not([multiple])[size="1"],.was-validated .form-select:invalid:not([multiple]):not([size]),.was-validated .form-select:invalid:not([multiple])[size="1"]{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E"),url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23D7260F'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/%3E%3Cpath d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z'/%3E%3C/svg%3E");background-position:right 1rem center,center right 3rem;background-size:16px 12px,calc(1em + .4375rem) calc(1em + .4375rem);padding-right:5.5rem}.form-select.is-invalid:focus,.was-validated .form-select:invalid:focus{border-color:#d7260f;box-shadow:0 0 0 .125rem rgba(215,38,15,.25)}.form-check-input.is-invalid,.was-validated .form-check-input:invalid{border-color:#d7260f}.form-check-input.is-invalid:checked,.was-validated .form-check-input:invalid:checked{background-color:#d7260f}.form-check-input.is-invalid:focus,.was-validated .form-check-input:invalid:focus{box-shadow:0 0 0 .125rem rgba(215,38,15,.25)}.form-check-input.is-invalid~.form-check-label,.was-validated .form-check-input:invalid~.form-check-label{color:#d7260f}.form-check-inline .form-check-input~.invalid-feedback{margin-left:.5em}.input-group .form-control.is-invalid,.input-group .form-select.is-invalid,.was-validated .input-group .form-control:invalid,.was-validated .input-group .form-select:invalid{z-index:2}.input-group .form-control.is-invalid:focus,.input-group .form-select.is-invalid:focus,.was-validated .input-group .form-control:invalid:focus,.was-validated .input-group .form-select:invalid:focus{z-index:3}.footer-list-styling ul,.cgds.footer .footer-contact-links ul,.cgds.footer .footer-items ul,.cgds.footer .footer-mandatory-links ul{margin:0;padding:0}.footer-list-styling ul li,.cgds.footer .footer-contact-links ul li,.cgds.footer .footer-items ul li,.cgds.footer .footer-mandatory-links ul li{font-size:1rem;line-height:1.5;list-style-type:none}.footer-list-styling ul li+li,.cgds.footer .footer-contact-links ul li+li,.cgds.footer .footer-items ul li+li,.cgds.footer .footer-mandatory-links ul li+li{margin-top:1rem}.footer-list-styling ul li a,.cgds.footer .footer-contact-links ul li a,.cgds.footer .footer-items ul li a,.cgds.footer .footer-mandatory-links ul li a{color:#d0d5dd;text-decoration:none}.footer-list-styling ul li a:hover,.cgds.footer,.cgds.footer .footer-contact-links ul li a:hover,.cgds.footer .footer-items ul li a:hover,.cgds.footer .footer-mandatory-links ul li a:hover{color:#f7f7f9}.cgds.footer{height:auto}.cgds.footer .footer-top{background-color:#000;padding:3rem 0 1.5rem}.cgds.footer .footer-header{margin-bottom:1.5rem}.cgds.footer .footer-header .title{margin-bottom:1rem}.cgds.footer .footer-header .description{color:#98a2b3}@media (max-width:575.98px){.cgds.footer .footer-items>div[class*=col]+div[class*=col]{margin-top:2rem}}.cgds.footer .footer-items .title{font-weight:700}.cgds.footer .footer-items .links{margin-top:1rem}.cgds.footer .footer-contact-links{margin-top:2rem}@media (min-width:992px){.cgds.footer .footer-contact-links ul li{display:inline-block}.cgds.footer .footer-contact-links ul li+li{margin-left:1rem}}.cgds.footer .footer-bottom{background-color:#000;border-top:1px solid #000;padding:1.5rem 0}@media (min-width:992px){.cgds.footer .footer-mandatory-links ul li{display:inline-block}.cgds.footer .footer-mandatory-links ul li+li{margin-left:1rem}}@media (max-width:991.98px){.cgds.footer .footer-copyrights{margin-top:1rem}}.btn{background-color:transparent;border:1px solid transparent;border-radius:.3125rem;color:#1d2939;cursor:pointer;display:inline-block;font-size:1rem;font-weight:400;line-height:2;padding:.4375rem 1rem;text-align:center;text-decoration:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;user-select:none;vertical-align:middle}@media (prefers-reduced-motion:reduce){.btn{transition:none}}.btn:hover{color:#1d2939}.btn-check:focus+.btn,.btn:focus{box-shadow:0 0 0 .125rem rgba(15,113,187,.25);outline:0}.btn.disabled,.btn:disabled,fieldset:disabled .btn{opacity:.65;pointer-events:none}.btn-primary{background-color:#5925dc;border-color:#5925dc;color:#fff}.btn-check:focus+.btn-primary,.btn-primary:focus,.btn-primary:hover{background-color:#4c1fbb;border-color:#471eb0;color:#fff}.btn-check:focus+.btn-primary,.btn-primary:focus{box-shadow:0 0 0 .125rem rgba(114,70,225,.5)}.btn-check:active+.btn-primary,.btn-check:checked+.btn-primary,.btn-primary.active,.btn-primary:active,.show>.btn-primary.dropdown-toggle{background-color:#471eb0;border-color:#431ca5;color:#fff}.btn-check:active+.btn-primary:focus,.btn-check:checked+.btn-primary:focus,.btn-primary.active:focus,.btn-primary:active:focus,.show>.btn-primary.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(114,70,225,.5)}.btn-primary.disabled,.btn-primary:disabled{background-color:#5925dc;border-color:#5925dc;color:#fff}.btn-secondary{background-color:#1f69ff;border-color:#1f69ff;color:#fff}.btn-check:focus+.btn-secondary,.btn-secondary:focus,.btn-secondary:hover{background-color:#1a59d9;border-color:#1954cc;color:#fff}.btn-check:focus+.btn-secondary,.btn-secondary:focus{box-shadow:0 0 0 .125rem rgba(65,128,255,.5)}.btn-check:active+.btn-secondary,.btn-check:checked+.btn-secondary,.btn-secondary.active,.btn-secondary:active,.show>.btn-secondary.dropdown-toggle{background-color:#1954cc;border-color:#174fbf;color:#fff}.btn-check:active+.btn-secondary:focus,.btn-check:checked+.btn-secondary:focus,.btn-secondary.active:focus,.btn-secondary:active:focus,.show>.btn-secondary.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(65,128,255,.5)}.btn-secondary.disabled,.btn-secondary:disabled{background-color:#1f69ff;border-color:#1f69ff;color:#fff}.btn-success{background-color:#0a8217;border-color:#0a8217;color:#fff}.btn-check:focus+.btn-success,.btn-success:focus,.btn-success:hover{background-color:#096f14;border-color:#086812;color:#fff}.btn-check:focus+.btn-success,.btn-success:focus{box-shadow:0 0 0 .125rem rgba(47,149,58,.5)}.btn-check:active+.btn-success,.btn-check:checked+.btn-success,.btn-success.active,.btn-success:active,.show>.btn-success.dropdown-toggle{background-color:#086812;border-color:#086211;color:#fff}.btn-check:active+.btn-success:focus,.btn-check:checked+.btn-success:focus,.btn-success.active:focus,.btn-success:active:focus,.show>.btn-success.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(47,149,58,.5)}.btn-success.disabled,.btn-success:disabled{background-color:#0a8217;border-color:#0a8217;color:#fff}.btn-info{background-color:#0f71bb;border-color:#0f71bb;color:#fff}.btn-check:focus+.btn-info,.btn-info:focus,.btn-info:hover{background-color:#0d609f;border-color:#0c5a96;color:#fff}.btn-check:focus+.btn-info,.btn-info:focus{box-shadow:0 0 0 .125rem rgba(51,134,197,.5)}.btn-check:active+.btn-info,.btn-check:checked+.btn-info,.btn-info.active,.btn-info:active,.show>.btn-info.dropdown-toggle{background-color:#0c5a96;border-color:#0b558c;color:#fff}.btn-check:active+.btn-info:focus,.btn-check:checked+.btn-info:focus,.btn-info.active:focus,.btn-info:active:focus,.show>.btn-info.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(51,134,197,.5)}.btn-info.disabled,.btn-info:disabled{background-color:#0f71bb;border-color:#0f71bb;color:#fff}.btn-warning{background-color:#f79009;border-color:#f79009;color:#000}.btn-check:focus+.btn-warning,.btn-warning:focus,.btn-warning:hover{background-color:#f8a12e;border-color:#f89b22;color:#000}.btn-check:focus+.btn-warning,.btn-warning:focus{box-shadow:0 0 0 .125rem rgba(210,122,8,.5)}.btn-check:active+.btn-warning,.btn-check:checked+.btn-warning,.btn-warning.active,.btn-warning:active,.show>.btn-warning.dropdown-toggle{background-color:#f9a63a;border-color:#f89b22;color:#000}.btn-check:active+.btn-warning:focus,.btn-check:checked+.btn-warning:focus,.btn-warning.active:focus,.btn-warning:active:focus,.show>.btn-warning.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(210,122,8,.5)}.btn-warning.disabled,.btn-warning:disabled{background-color:#f79009;border-color:#f79009;color:#000}.btn-danger{background-color:#d7260f;border-color:#d7260f;color:#fff}.btn-check:focus+.btn-danger,.btn-danger:focus,.btn-danger:hover{background-color:#b7200d;border-color:#ac1e0c;color:#fff}.btn-check:focus+.btn-danger,.btn-danger:focus{box-shadow:0 0 0 .125rem rgba(221,71,51,.5)}.btn-check:active+.btn-danger,.btn-check:checked+.btn-danger,.btn-danger.active,.btn-danger:active,.show>.btn-danger.dropdown-toggle{background-color:#ac1e0c;border-color:#a11d0b;color:#fff}.btn-check:active+.btn-danger:focus,.btn-check:checked+.btn-danger:focus,.btn-danger.active:focus,.btn-danger:active:focus,.show>.btn-danger.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(221,71,51,.5)}.btn-danger.disabled,.btn-danger:disabled{background-color:#d7260f;border-color:#d7260f;color:#fff}.btn-light{background-color:#f7f7f9;border-color:#f7f7f9;color:#000}.btn-check:focus+.btn-light,.btn-light:focus,.btn-light:hover{background-color:#f8f8fa;border-color:#f8f8fa;color:#000}.btn-check:focus+.btn-light,.btn-light:focus{box-shadow:0 0 0 .125rem hsla(240,2%,83%,.5)}.btn-check:active+.btn-light,.btn-check:checked+.btn-light,.btn-light.active,.btn-light:active,.show>.btn-light.dropdown-toggle{background-color:#f9f9fa;border-color:#f8f8fa;color:#000}.btn-check:active+.btn-light:focus,.btn-check:checked+.btn-light:focus,.btn-light.active:focus,.btn-light:active:focus,.show>.btn-light.dropdown-toggle:focus{box-shadow:0 0 0 .125rem hsla(240,2%,83%,.5)}.btn-light.disabled,.btn-light:disabled{background-color:#f7f7f9;border-color:#f7f7f9;color:#000}.btn-check:focus+.btn-dark,.btn-dark,.btn-dark:focus,.btn-dark:hover{background-color:#000;border-color:#000;color:#fff}.btn-check:focus+.btn-dark,.btn-dark:focus{box-shadow:0 0 0 .125rem rgba(38,38,38,.5)}.btn-check:active+.btn-dark,.btn-check:checked+.btn-dark,.btn-dark.active,.btn-dark:active,.show>.btn-dark.dropdown-toggle{background-color:#000;border-color:#000;color:#fff}.btn-check:active+.btn-dark:focus,.btn-check:checked+.btn-dark:focus,.btn-dark.active:focus,.btn-dark:active:focus,.show>.btn-dark.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(38,38,38,.5)}.btn-dark.disabled,.btn-dark:disabled{background-color:#000;border-color:#000;color:#fff}.btn-outline-primary{border-color:#5925dc;color:#5925dc}.btn-outline-primary:hover{background-color:#5925dc;border-color:#5925dc;color:#fff}.btn-check:focus+.btn-outline-primary,.btn-outline-primary:focus{box-shadow:0 0 0 .125rem rgba(89,37,220,.5)}.btn-check:active+.btn-outline-primary,.btn-check:checked+.btn-outline-primary,.btn-outline-primary.active,.btn-outline-primary.dropdown-toggle.show,.btn-outline-primary:active{background-color:#5925dc;border-color:#5925dc;color:#fff}.btn-check:active+.btn-outline-primary:focus,.btn-check:checked+.btn-outline-primary:focus,.btn-outline-primary.active:focus,.btn-outline-primary.dropdown-toggle.show:focus,.btn-outline-primary:active:focus{box-shadow:0 0 0 .125rem rgba(89,37,220,.5)}.btn-outline-primary.disabled,.btn-outline-primary:disabled{background-color:transparent;color:#5925dc}.btn-outline-secondary{border-color:#1f69ff;color:#1f69ff}.btn-outline-secondary:hover{background-color:#1f69ff;border-color:#1f69ff;color:#fff}.btn-check:focus+.btn-outline-secondary,.btn-outline-secondary:focus{box-shadow:0 0 0 .125rem rgba(31,105,255,.5)}.btn-check:active+.btn-outline-secondary,.btn-check:checked+.btn-outline-secondary,.btn-outline-secondary.active,.btn-outline-secondary.dropdown-toggle.show,.btn-outline-secondary:active{background-color:#1f69ff;border-color:#1f69ff;color:#fff}.btn-check:active+.btn-outline-secondary:focus,.btn-check:checked+.btn-outline-secondary:focus,.btn-outline-secondary.active:focus,.btn-outline-secondary.dropdown-toggle.show:focus,.btn-outline-secondary:active:focus{box-shadow:0 0 0 .125rem rgba(31,105,255,.5)}.btn-outline-secondary.disabled,.btn-outline-secondary:disabled{background-color:transparent;color:#1f69ff}.btn-outline-success{border-color:#0a8217;color:#0a8217}.btn-outline-success:hover{background-color:#0a8217;border-color:#0a8217;color:#fff}.btn-check:focus+.btn-outline-success,.btn-outline-success:focus{box-shadow:0 0 0 .125rem rgba(10,130,23,.5)}.btn-check:active+.btn-outline-success,.btn-check:checked+.btn-outline-success,.btn-outline-success.active,.btn-outline-success.dropdown-toggle.show,.btn-outline-success:active{background-color:#0a8217;border-color:#0a8217;color:#fff}.btn-check:active+.btn-outline-success:focus,.btn-check:checked+.btn-outline-success:focus,.btn-outline-success.active:focus,.btn-outline-success.dropdown-toggle.show:focus,.btn-outline-success:active:focus{box-shadow:0 0 0 .125rem rgba(10,130,23,.5)}.btn-outline-success.disabled,.btn-outline-success:disabled{background-color:transparent;color:#0a8217}.btn-outline-info{border-color:#0f71bb;color:#0f71bb}.btn-outline-info:hover{background-color:#0f71bb;border-color:#0f71bb;color:#fff}.btn-check:focus+.btn-outline-info,.btn-outline-info:focus{box-shadow:0 0 0 .125rem rgba(15,113,187,.5)}.btn-check:active+.btn-outline-info,.btn-check:checked+.btn-outline-info,.btn-outline-info.active,.btn-outline-info.dropdown-toggle.show,.btn-outline-info:active{background-color:#0f71bb;border-color:#0f71bb;color:#fff}.btn-check:active+.btn-outline-info:focus,.btn-check:checked+.btn-outline-info:focus,.btn-outline-info.active:focus,.btn-outline-info.dropdown-toggle.show:focus,.btn-outline-info:active:focus{box-shadow:0 0 0 .125rem rgba(15,113,187,.5)}.btn-outline-info.disabled,.btn-outline-info:disabled{background-color:transparent;color:#0f71bb}.btn-outline-warning{border-color:#f79009;color:#f79009}.btn-outline-warning:hover{background-color:#f79009;border-color:#f79009;color:#000}.btn-check:focus+.btn-outline-warning,.btn-outline-warning:focus{box-shadow:0 0 0 .125rem rgba(247,144,9,.5)}.btn-check:active+.btn-outline-warning,.btn-check:checked+.btn-outline-warning,.btn-outline-warning.active,.btn-outline-warning.dropdown-toggle.show,.btn-outline-warning:active{background-color:#f79009;border-color:#f79009;color:#000}.btn-check:active+.btn-outline-warning:focus,.btn-check:checked+.btn-outline-warning:focus,.btn-outline-warning.active:focus,.btn-outline-warning.dropdown-toggle.show:focus,.btn-outline-warning:active:focus{box-shadow:0 0 0 .125rem rgba(247,144,9,.5)}.btn-outline-warning.disabled,.btn-outline-warning:disabled{background-color:transparent;color:#f79009}.btn-outline-danger{border-color:#d7260f;color:#d7260f}.btn-outline-danger:hover{background-color:#d7260f;border-color:#d7260f;color:#fff}.btn-check:focus+.btn-outline-danger,.btn-outline-danger:focus{box-shadow:0 0 0 .125rem rgba(215,38,15,.5)}.btn-check:active+.btn-outline-danger,.btn-check:checked+.btn-outline-danger,.btn-outline-danger.active,.btn-outline-danger.dropdown-toggle.show,.btn-outline-danger:active{background-color:#d7260f;border-color:#d7260f;color:#fff}.btn-check:active+.btn-outline-danger:focus,.btn-check:checked+.btn-outline-danger:focus,.btn-outline-danger.active:focus,.btn-outline-danger.dropdown-toggle.show:focus,.btn-outline-danger:active:focus{box-shadow:0 0 0 .125rem rgba(215,38,15,.5)}.btn-outline-danger.disabled,.btn-outline-danger:disabled{background-color:transparent;color:#d7260f}.btn-outline-light{border-color:#f7f7f9;color:#f7f7f9}.btn-outline-light:hover{background-color:#f7f7f9;border-color:#f7f7f9;color:#000}.btn-check:focus+.btn-outline-light,.btn-outline-light:focus{box-shadow:0 0 0 .125rem rgba(247,247,249,.5)}.btn-check:active+.btn-outline-light,.btn-check:checked+.btn-outline-light,.btn-outline-light.active,.btn-outline-light.dropdown-toggle.show,.btn-outline-light:active{background-color:#f7f7f9;border-color:#f7f7f9;color:#000}.btn-check:active+.btn-outline-light:focus,.btn-check:checked+.btn-outline-light:focus,.btn-outline-light.active:focus,.btn-outline-light.dropdown-toggle.show:focus,.btn-outline-light:active:focus{box-shadow:0 0 0 .125rem rgba(247,247,249,.5)}.btn-outline-light.disabled,.btn-outline-light:disabled{background-color:transparent;color:#f7f7f9}.btn-outline-dark{border-color:#000;color:#000}.btn-outline-dark:hover{background-color:#000;border-color:#000;color:#fff}.btn-check:focus+.btn-outline-dark,.btn-outline-dark:focus{box-shadow:0 0 0 .125rem rgba(0,0,0,.5)}.btn-check:active+.btn-outline-dark,.btn-check:checked+.btn-outline-dark,.btn-outline-dark.active,.btn-outline-dark.dropdown-toggle.show,.btn-outline-dark:active{background-color:#000;border-color:#000;color:#fff}.btn-check:active+.btn-outline-dark:focus,.btn-check:checked+.btn-outline-dark:focus,.btn-outline-dark.active:focus,.btn-outline-dark.dropdown-toggle.show:focus,.btn-outline-dark:active:focus{box-shadow:0 0 0 .125rem rgba(0,0,0,.5)}.btn-outline-dark.disabled,.btn-outline-dark:disabled{background-color:transparent;color:#000}.btn-link{color:#0f71bb;font-weight:400;text-decoration:underline}.btn-link:hover{color:#0c5a96}.btn-link.disabled,.btn-link:disabled{color:#344054}.btn-group-lg>.btn,.btn-lg{border-radius:.3rem;font-size:1.25rem;padding:.5rem 1rem}.btn-group-sm>.btn,.btn-sm{border-radius:.2rem;font-size:.875rem;padding:.25rem .5rem}.btn-group,.btn-group-vertical{display:inline-flex;position:relative;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{flex:1 1 auto;position:relative}.btn-group-vertical>.btn-check:checked+.btn,.btn-group-vertical>.btn-check:focus+.btn,.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:hover,.btn-group>.btn-check:checked+.btn,.btn-group>.btn-check:focus+.btn,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus,.btn-group>.btn:hover{z-index:1}.btn-toolbar{display:flex;flex-wrap:wrap;justify-content:flex-start}.btn-toolbar .input-group{width:auto}.btn-group>.btn-group:not(:first-child),.btn-group>.btn:not(:first-child){margin-left:-1px}.btn-group>.btn-group:not(:last-child)>.btn,.btn-group>.btn:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn-group:not(:first-child)>.btn,.btn-group>.btn:nth-child(n+3),.btn-group>:not(.btn-check)+.btn{border-bottom-left-radius:0;border-top-left-radius:0}.dropdown-toggle-split{padding-left:.75rem;padding-right:.75rem}.dropdown-toggle-split:after,.dropend .dropdown-toggle-split:after,.dropup .dropdown-toggle-split:after{margin-left:0}.dropstart .dropdown-toggle-split:before{margin-right:0}.btn-group-sm>.btn+.dropdown-toggle-split,.btn-sm+.dropdown-toggle-split{padding-left:.375rem;padding-right:.375rem}.btn-group-lg>.btn+.dropdown-toggle-split,.btn-lg+.dropdown-toggle-split{padding-left:.75rem;padding-right:.75rem}.btn-group-vertical{align-items:flex-start;flex-direction:column;justify-content:center}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group{width:100%}.btn-group-vertical>.btn-group:not(:first-child),.btn-group-vertical>.btn:not(:first-child){margin-top:-1px}.btn-group-vertical>.btn-group:not(:last-child)>.btn,.btn-group-vertical>.btn:not(:last-child):not(.dropdown-toggle){border-bottom-left-radius:0;border-bottom-right-radius:0}.btn-group-vertical>.btn-group:not(:first-child)>.btn,.btn-group-vertical>.btn~.btn{border-top-left-radius:0;border-top-right-radius:0}.fade{transition:opacity .15s linear}@media (prefers-reduced-motion:reduce){.fade{transition:none}}.fade:not(.show){opacity:0}.collapse:not(.show){display:none}.collapsing{height:0;overflow:hidden;transition:height .35s ease}@media (prefers-reduced-motion:reduce){.collapsing{transition:none}}.collapsing.collapse-horizontal{height:auto;transition:width .35s ease;width:0}@media (prefers-reduced-motion:reduce){.collapsing.collapse-horizontal{transition:none}}.cgds.datepicker{border-color:#98a2b3;font-size:1rem;max-width:24rem;width:24rem}.cgds.datepicker>.datepicker-header{border:none;color:#5925dc;padding:1.5rem 1.5rem 0}.cgds.datepicker>.datepicker-header button{background-color:transparent;border:none;color:#5925dc;font-weight:700}.cgds.datepicker>.datepicker-header i{font-size:1.25rem}.cgds.datepicker>.datepicker-body{padding:0 1.5rem 1.5rem}.cgds.datepicker td{height:48px;padding:0;width:48px}.cgds.datepicker .monthpicker,.cgds.datepicker .yearpicker{align-content:space-between;display:grid;grid-template-columns:repeat(3,48px);grid-template-rows:repeat(4,48px);justify-content:space-between;padding:1rem 1rem 0}.cgds.datepicker .month,.cgds.datepicker .year{background-color:transparent;border:0;cursor:pointer;padding:0}.cgds.datepicker .month.active,.cgds.datepicker .year.active{background-color:#ece6fb;color:#5925dc}.dropdown,.dropend,.dropstart,.dropup{position:relative}.dropdown-toggle{white-space:nowrap}.dropdown-toggle:after{border-bottom:0;border-left:.3em solid transparent;border-right:.3em solid transparent;border-top:.3em solid;content:"";display:inline-block;margin-left:.255em;vertical-align:.255em}.dropdown-toggle:empty:after{margin-left:0}.dropdown-menu{background-clip:padding-box;background-color:#fff;border:1px solid rgba(0,0,0,.15);border-radius:.3125rem;color:#1d2939;display:none;font-size:1rem;list-style:none;margin:0;min-width:10rem;padding:.5rem 0;position:absolute;text-align:left;z-index:1000}.dropdown-menu[data-bs-popper]{left:0;margin-top:.125rem;top:100%}.dropdown-menu-start{--bs-position:start}.dropdown-menu-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-end{--bs-position:end}.dropdown-menu-end[data-bs-popper]{left:auto;right:0}@media (min-width:576px){.dropdown-menu-sm-start{--bs-position:start}.dropdown-menu-sm-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-sm-end{--bs-position:end}.dropdown-menu-sm-end[data-bs-popper]{left:auto;right:0}}@media (min-width:768px){.dropdown-menu-md-start{--bs-position:start}.dropdown-menu-md-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-md-end{--bs-position:end}.dropdown-menu-md-end[data-bs-popper]{left:auto;right:0}}@media (min-width:992px){.dropdown-menu-lg-start{--bs-position:start}.dropdown-menu-lg-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-lg-end{--bs-position:end}.dropdown-menu-lg-end[data-bs-popper]{left:auto;right:0}}@media (min-width:1200px){.dropdown-menu-xl-start{--bs-position:start}.dropdown-menu-xl-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-xl-end{--bs-position:end}.dropdown-menu-xl-end[data-bs-popper]{left:auto;right:0}}@media (min-width:1400px){.dropdown-menu-xxl-start{--bs-position:start}.dropdown-menu-xxl-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-xxl-end{--bs-position:end}.dropdown-menu-xxl-end[data-bs-popper]{left:auto;right:0}}.dropup .dropdown-menu[data-bs-popper]{bottom:100%;margin-bottom:.125rem;margin-top:0;top:auto}.dropup .dropdown-toggle:after{border-bottom:.3em solid;border-left:.3em solid transparent;border-right:.3em solid transparent;border-top:0;content:"";display:inline-block;margin-left:.255em;vertical-align:.255em}.dropup .dropdown-toggle:empty:after{margin-left:0}.dropend .dropdown-menu[data-bs-popper]{left:100%;margin-left:.125rem;margin-top:0;right:auto;top:0}.dropend .dropdown-toggle:after{border-bottom:.3em solid transparent;border-left:.3em solid;border-right:0;border-top:.3em solid transparent;content:"";display:inline-block;margin-left:.255em;vertical-align:.255em}.dropend .dropdown-toggle:empty:after{margin-left:0}.dropend .dropdown-toggle:after{vertical-align:0}.dropstart .dropdown-menu[data-bs-popper]{left:auto;margin-right:.125rem;margin-top:0;right:100%;top:0}.dropstart .dropdown-toggle:after{content:"";display:inline-block;display:none;margin-left:.255em;vertical-align:.255em}.dropstart .dropdown-toggle:before{border-bottom:.3em solid transparent;border-right:.3em solid;border-top:.3em solid transparent;content:"";display:inline-block;margin-right:.255em;vertical-align:.255em}.dropstart .dropdown-toggle:empty:after{margin-left:0}.dropstart .dropdown-toggle:before{vertical-align:0}.dropdown-divider{border-top:1px solid rgba(0,0,0,.15);height:0;margin:.5rem 0;overflow:hidden}.dropdown-item{background-color:transparent;border:0;clear:both;color:#000;display:block;font-weight:400;padding:.25rem 1rem;text-align:inherit;text-decoration:none;white-space:nowrap;width:100%}.dropdown-item:focus,.dropdown-item:hover{background-color:#e4e7ec;color:#000}.dropdown-item.active,.dropdown-item:active{background-color:#0f71bb;color:#fff;text-decoration:none}.dropdown-item.disabled,.dropdown-item:disabled{background-color:transparent;color:#667085;pointer-events:none}.dropdown-menu.show{display:block}.dropdown-header{color:#344054;display:block;font-size:.875rem;margin-bottom:0;padding:.5rem 1rem;white-space:nowrap}.dropdown-item-text{color:#000;display:block;padding:.25rem 1rem}.dropdown-menu-dark{background-color:#000;border-color:rgba(0,0,0,.15);color:#d0d5dd}.dropdown-menu-dark .dropdown-item{color:#d0d5dd}.dropdown-menu-dark .dropdown-item:focus,.dropdown-menu-dark .dropdown-item:hover{background-color:hsla(0,0%,100%,.15);color:#fff}.dropdown-menu-dark .dropdown-item.active,.dropdown-menu-dark .dropdown-item:active{background-color:#0f71bb;color:#fff}.dropdown-menu-dark .dropdown-item.disabled,.dropdown-menu-dark .dropdown-item:disabled{color:#667085}.dropdown-menu-dark .dropdown-divider{border-color:rgba(0,0,0,.15)}.dropdown-menu-dark .dropdown-item-text{color:#d0d5dd}.dropdown-menu-dark .dropdown-header{color:#667085}.cgds.dropdown .dropdown-toggle{align-items:center;display:flex;gap:.5rem;justify-content:space-between}.cgds.dropdown .dropdown-toggle:after{content:none}.cgds.dropdown-menu{border:1px solid #98a2b3;padding:0}.cgds.dropdown-menu li a.dropdown-item{padding:1rem}.cgds.dropdown-menu li a.dropdown-item.active,.cgds.dropdown-menu li a.dropdown-item:hover{background-color:#004ff0;color:#fff}.cgds.fileupload-list{list-style-type:none;margin-top:1rem;padding:0}.cgds.fileupload-list .fileupload-list-item+.fileupload-list-item{margin-top:.5rem}.cgds.fileupload-list .fileupload-list-item i:first-child{color:#0a8217}.cgds.fileupload-list .fileupload-list-item i:last-child{color:#d7260f}.cgds.fileupload-list .fileupload-list-item .filename{color:#0f71bb;text-decoration:underline;text-underline-offset:.25rem}.nav{display:flex;flex-wrap:wrap;list-style:none;margin-bottom:0;padding-left:0}.nav-link{color:#0f71bb;display:block;padding:.5rem 1rem;text-decoration:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out}@media (prefers-reduced-motion:reduce){.nav-link{transition:none}}.nav-link:focus,.nav-link:hover{color:#0c5a96}.nav-link.disabled{color:#344054;cursor:default;pointer-events:none}.nav-tabs{border-bottom:1px solid transparent}.nav-tabs .nav-link{background:none;border:1px solid transparent;border-top-left-radius:.3125rem;border-top-right-radius:.3125rem;margin-bottom:-1px}.nav-tabs .nav-link:focus,.nav-tabs .nav-link:hover{border-color:#e4e7ec #e4e7ec transparent;isolation:isolate}.nav-tabs .nav-link.disabled{background-color:transparent;border-color:transparent;color:#344054}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{background-color:#fff;border-color:#d0d5dd #d0d5dd #fff;color:#1d2939}.nav-tabs .dropdown-menu{border-top-left-radius:0;border-top-right-radius:0;margin-top:-1px}.nav-pills .nav-link{background:none;border:0;border-radius:.3125rem}.nav-pills .nav-link.active,.nav-pills .show>.nav-link{background-color:#0f71bb;color:#fff}.nav-fill .nav-item,.nav-fill>.nav-link{flex:1 1 auto;text-align:center}.nav-justified .nav-item,.nav-justified>.nav-link{flex-basis:0;flex-grow:1;text-align:center}.nav-fill .nav-item .nav-link,.nav-justified .nav-item .nav-link{width:100%}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.navbar{align-items:center;display:flex;flex-wrap:wrap;justify-content:space-between;padding-bottom:2rem;padding-top:2rem;position:relative}.navbar>.container,.navbar>.container-fluid,.navbar>.container-lg,.navbar>.container-md,.navbar>.container-sm,.navbar>.container-xl,.navbar>.container-xxl{align-items:center;display:flex;flex-wrap:inherit;justify-content:space-between}.navbar-brand{font-size:1.25rem;margin-right:1rem;padding-bottom:.25rem;padding-top:.25rem;text-decoration:none;white-space:nowrap}.navbar-nav{display:flex;flex-direction:column;list-style:none;margin-bottom:0;padding-left:0}.navbar-nav .nav-link{padding-left:0;padding-right:0}.navbar-nav .dropdown-menu{position:static}.navbar-text{padding-bottom:.5rem;padding-top:.5rem}.navbar-collapse{align-items:center;flex-basis:100%;flex-grow:1}.navbar-toggler{background-color:transparent;border:1px solid transparent;border-radius:.3125rem;font-size:1.25rem;line-height:1;padding:.25rem .75rem;transition:box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.navbar-toggler{transition:none}}.navbar-toggler:hover{text-decoration:none}.navbar-toggler:focus{box-shadow:0 0 0 .125rem;outline:0;text-decoration:none}.navbar-toggler-icon{background-position:50%;background-repeat:no-repeat;background-size:100%;display:inline-block;height:1.5em;vertical-align:middle;width:1.5em}.navbar-nav-scroll{max-height:var(--cgds-scroll-height,75vh);overflow-y:auto}@media (min-width:576px){.navbar-expand-sm{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-sm .navbar-nav{flex-direction:row}.navbar-expand-sm .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-sm .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand-sm .navbar-nav-scroll{overflow:visible}.navbar-expand-sm .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-sm .navbar-toggler,.navbar-expand-sm .offcanvas-header{display:none}.navbar-expand-sm .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand-sm .offcanvas-bottom,.navbar-expand-sm .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand-sm .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}}@media (min-width:768px){.navbar-expand-md{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-md .navbar-nav{flex-direction:row}.navbar-expand-md .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-md .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand-md .navbar-nav-scroll{overflow:visible}.navbar-expand-md .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-md .navbar-toggler,.navbar-expand-md .offcanvas-header{display:none}.navbar-expand-md .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand-md .offcanvas-bottom,.navbar-expand-md .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand-md .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}}@media (min-width:992px){.navbar-expand-lg{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-lg .navbar-nav{flex-direction:row}.navbar-expand-lg .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-lg .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand-lg .navbar-nav-scroll{overflow:visible}.navbar-expand-lg .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-lg .navbar-toggler,.navbar-expand-lg .offcanvas-header{display:none}.navbar-expand-lg .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand-lg .offcanvas-bottom,.navbar-expand-lg .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand-lg .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}}@media (min-width:1200px){.navbar-expand-xl{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-xl .navbar-nav{flex-direction:row}.navbar-expand-xl .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-xl .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand-xl .navbar-nav-scroll{overflow:visible}.navbar-expand-xl .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-xl .navbar-toggler,.navbar-expand-xl .offcanvas-header{display:none}.navbar-expand-xl .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand-xl .offcanvas-bottom,.navbar-expand-xl .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand-xl .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}}@media (min-width:1400px){.navbar-expand-xxl{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-xxl .navbar-nav{flex-direction:row}.navbar-expand-xxl .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-xxl .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand-xxl .navbar-nav-scroll{overflow:visible}.navbar-expand-xxl .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-xxl .navbar-toggler,.navbar-expand-xxl .offcanvas-header{display:none}.navbar-expand-xxl .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand-xxl .offcanvas-bottom,.navbar-expand-xxl .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand-xxl .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}}.navbar-expand{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand .navbar-nav{flex-direction:row}.navbar-expand .navbar-nav .dropdown-menu{position:absolute}.navbar-expand .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand .navbar-nav-scroll{overflow:visible}.navbar-expand .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand .navbar-toggler,.navbar-expand .offcanvas-header{display:none}.navbar-expand .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand .offcanvas-bottom,.navbar-expand .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}.navbar-light .navbar-brand,.navbar-light .navbar-brand:focus,.navbar-light .navbar-brand:hover{color:rgba(0,0,0,.9)}.navbar-light .navbar-nav .nav-link{color:rgba(0,0,0,.55)}.navbar-light .navbar-nav .nav-link:focus,.navbar-light .navbar-nav .nav-link:hover{color:rgba(0,0,0,.7)}.navbar-light .navbar-nav .nav-link.disabled{color:rgba(0,0,0,.3)}.navbar-light .navbar-nav .nav-link.active,.navbar-light .navbar-nav .show>.nav-link{color:rgba(0,0,0,.9)}.navbar-light .navbar-toggler{border-color:rgba(0,0,0,.1);color:rgba(0,0,0,.55)}.navbar-light .navbar-toggler-icon{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(0, 0, 0, 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")}.navbar-light .navbar-text{color:rgba(0,0,0,.55)}.navbar-light .navbar-text a,.navbar-light .navbar-text a:focus,.navbar-light .navbar-text a:hover{color:rgba(0,0,0,.9)}.navbar-dark .navbar-brand,.navbar-dark .navbar-brand:focus,.navbar-dark .navbar-brand:hover{color:#fff}.navbar-dark .navbar-nav .nav-link{color:hsla(0,0%,100%,.55)}.navbar-dark .navbar-nav .nav-link:focus,.navbar-dark .navbar-nav .nav-link:hover{color:hsla(0,0%,100%,.75)}.navbar-dark .navbar-nav .nav-link.disabled{color:hsla(0,0%,100%,.25)}.navbar-dark .navbar-nav .nav-link.active,.navbar-dark .navbar-nav .show>.nav-link{color:#fff}.navbar-dark .navbar-toggler{border-color:hsla(0,0%,100%,.1);color:hsla(0,0%,100%,.55)}.navbar-dark .navbar-toggler-icon{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255, 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")}.navbar-dark .navbar-text{color:hsla(0,0%,100%,.55)}.navbar-dark .navbar-text a,.navbar-dark .navbar-text a:focus,.navbar-dark .navbar-text a:hover{color:#fff}.cgds.navbar{align-items:stretch;min-height:80px;padding:0 2rem}@media (max-width:991.98px){.cgds.navbar{overflow-x:scroll;padding:0 1rem}}.cgds.navbar a.navbar-brand{align-items:center;display:flex;padding-bottom:.125rem}.cgds.navbar .navbar-collapse{align-items:stretch}.cgds.navbar .nav-item.has-megamenu{position:static}.cgds.navbar .nav-item a.nav-link{align-items:center;border-bottom:.125rem solid transparent;color:#344054;display:flex;min-height:100%}.cgds.navbar .nav-item a.nav-link.active,.cgds.navbar .nav-item a.nav-link:hover{border-color:#5925dc;color:#5925dc}.cgds.navbar .nav-item a.nav-link.dropdown-toggle{gap:.75rem}.cgds.navbar .nav-item a.nav-link.dropdown-toggle.show{border-bottom:.125rem solid #5925dc;color:#5925dc}.cgds.navbar .dropdown-menu{background-color:#fff;border:1px solid rgba(0,0,0,.1);border-radius:0 0 5px 5px;box-shadow:0 .5rem 1rem rgba(0,0,0,.15);margin-top:0}.cgds.navbar .dropdown-menu.megamenu{left:0;right:0;width:100%}.card{word-wrap:break-word;background-clip:border-box;background-color:#fff;border:1px solid #98a2b3;border-radius:.3125rem;display:flex;flex-direction:column;min-width:0;position:relative}.card>hr{margin-left:0;margin-right:0}.card>.list-group{border-bottom:inherit;border-top:inherit}.card>.list-group:first-child{border-top-left-radius:calc(.3125rem - 1px);border-top-right-radius:calc(.3125rem - 1px);border-top-width:0}.card>.list-group:last-child{border-bottom-left-radius:calc(.3125rem - 1px);border-bottom-right-radius:calc(.3125rem - 1px);border-bottom-width:0}.card>.card-header+.list-group,.card>.list-group+.card-footer{border-top:0}.card-body{flex:1 1 auto;padding:1.5rem}.card-title{margin-bottom:.5rem}.card-subtitle{margin-top:-.25rem}.card-subtitle,.card-text:last-child{margin-bottom:0}.card-link+.card-link{margin-left:1.5rem}.card-header{background-color:rgba(0,0,0,.03);border-bottom:1px solid #98a2b3;margin-bottom:0;padding:.75rem 1.5rem}.card-header:first-child{border-radius:calc(.3125rem - 1px) calc(.3125rem - 1px) 0 0}.card-footer{background-color:rgba(0,0,0,.03);border-top:1px solid #98a2b3;padding:.75rem 1.5rem}.card-footer:last-child{border-radius:0 0 calc(.3125rem - 1px) calc(.3125rem - 1px)}.card-header-tabs{border-bottom:0;margin-bottom:-.75rem}.card-header-pills,.card-header-tabs{margin-left:-.75rem;margin-right:-.75rem}.card-img-overlay{border-radius:calc(.3125rem - 1px);bottom:0;left:0;padding:1rem;position:absolute;right:0;top:0}.card-img,.card-img-bottom,.card-img-top{width:100%}.card-img,.card-img-top{border-top-left-radius:calc(.3125rem - 1px);border-top-right-radius:calc(.3125rem - 1px)}.card-img,.card-img-bottom{border-bottom-left-radius:calc(.3125rem - 1px);border-bottom-right-radius:calc(.3125rem - 1px)}.card-group>.card{margin-bottom:.75rem}@media (min-width:576px){.card-group{display:flex;flex-flow:row wrap}.card-group>.card{flex:1 0 0%;margin-bottom:0}.card-group>.card+.card{border-left:0;margin-left:0}.card-group>.card:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.card-group>.card:not(:last-child) .card-header,.card-group>.card:not(:last-child) .card-img-top{border-top-right-radius:0}.card-group>.card:not(:last-child) .card-footer,.card-group>.card:not(:last-child) .card-img-bottom{border-bottom-right-radius:0}.card-group>.card:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.card-group>.card:not(:first-child) .card-header,.card-group>.card:not(:first-child) .card-img-top{border-top-left-radius:0}.card-group>.card:not(:first-child) .card-footer,.card-group>.card:not(:first-child) .card-img-bottom{border-bottom-left-radius:0}}.cgds.card a:not(.btn){font-weight:700}.cgds.card[variant*=card-action]{transition-duration:.3s;transition-property:box-shadow,border-color;transition-timing-function:ease-in-out}.cgds.card[variant*=card-action] .card-body{display:flex;flex-direction:column;gap:1rem}.cgds.card[variant*=card-action] .card-body i{font-size:1.5rem;margin-right:1rem}.cgds.card[variant*=card-action] .card-body>*{margin-bottom:0}.cgds.card[variant*=card-action].is-active,.cgds.card[variant*=card-action]:hover{border-color:transparent;box-shadow:0 .5rem 1rem rgba(0,0,0,.15),inset 0 0 0 2.1px #0f71bb}.cgds.card[variant*=card-action] .card-subtitle{align-items:center;display:flex;justify-content:space-between}.cgds.card[variant*=card-action] .card-subtitle div{align-items:center;display:flex}.cgds.card[variant*=card-action] .card-input input.form-check-input{margin-top:0;min-height:1.5rem;min-width:1.5rem}.cgds.card[variant=card-action-quantity-toggle] .card-body{display:flex;flex-direction:column;gap:2rem}.cgds.card[variant=card-action-quantity-toggle] div:not([class]){align-items:center;display:flex;justify-content:space-between}.cgds.card[variant=card-action-quantity-toggle] div:not([class]) .btn,.cgds.card[variant=card-action-quantity-toggle] div:not([class]) .input-group{margin-top:0}.cgds.card[variant=card-action-quantity-toggle] div:not([class]) .input-group .btn i{margin-right:0}.cgds.card[variant=card-action-quantity-toggle] div:not([class]) .input-group button,.cgds.card[variant=card-action-quantity-toggle] div:not([class]) .input-group input{margin-top:0}.cgds.card[variant=card-action-quantity-toggle] div:not([class]) .card-unit{flex-basis:150%}@media (max-width:500px){.cgds.card[variant=card-action-quantity-toggle] div:not([class]):last-child{display:block}.cgds.card[variant=card-action-quantity-toggle] div:not([class]):last-child div.card-unit{margin-bottom:1rem}}.accordion-button{align-items:center;background-color:#fff;border:0;border-radius:0;color:#1d2939;display:flex;font-size:1rem;overflow-anchor:none;padding:1rem 1.5rem;position:relative;text-align:left;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,border-radius .15s ease;width:100%}@media (prefers-reduced-motion:reduce){.accordion-button{transition:none}}.accordion-button:not(.collapsed){background-color:none;box-shadow:inset 0 -1px 0 #98a2b3;color:#5925dc}.accordion-button:not(.collapsed):after{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%235925DC'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");transform:rotate(-180deg)}.accordion-button:after{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%231D2939'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-size:1.25rem;content:"";flex-shrink:0;height:1.25rem;margin-left:auto;transition:transform .2s ease-in-out;width:1.25rem}@media (prefers-reduced-motion:reduce){.accordion-button:after{transition:none}}.accordion-button:hover{z-index:2}.accordion-button:focus{border-color:#87b8dd;box-shadow:0 0 0 .125rem rgba(15,113,187,.25);outline:0;z-index:3}.accordion-header{margin-bottom:0}.accordion-item{background-color:#fff;border:1px solid #98a2b3}.accordion-item:first-of-type{border-top-left-radius:.3125rem;border-top-right-radius:.3125rem}.accordion-item:first-of-type .accordion-button{border-top-left-radius:calc(.3125rem - 1px);border-top-right-radius:calc(.3125rem - 1px)}.accordion-item:not(:first-of-type){border-top:0}.accordion-item:last-of-type{border-bottom-left-radius:.3125rem;border-bottom-right-radius:.3125rem}.accordion-item:last-of-type .accordion-button.collapsed{border-bottom-left-radius:calc(.3125rem - 1px);border-bottom-right-radius:calc(.3125rem - 1px)}.accordion-item:last-of-type .accordion-collapse{border-bottom-left-radius:.3125rem;border-bottom-right-radius:.3125rem}.accordion-body{padding:1rem 1.5rem}.accordion-flush .accordion-collapse{border-width:0}.accordion-flush .accordion-item{border-left:0;border-radius:0;border-right:0}.accordion-flush .accordion-item:first-child{border-top:0}.accordion-flush .accordion-item:last-child{border-bottom:0}.accordion-flush .accordion-item .accordion-button{border-radius:0}.cgds.accordion .accordion-button{line-height:2rem}.cgds.accordion .accordion-button:not(.collapsed){box-shadow:none;font-weight:700}.cgds.accordion .accordion-body{line-height:2rem;padding-bottom:1.5rem;padding-top:0}.breadcrumb{display:flex;flex-wrap:wrap;list-style:none;margin-bottom:1rem;padding:0}.breadcrumb-item+.breadcrumb-item{padding-left:.5rem}.breadcrumb-item+.breadcrumb-item:before{color:#344054;content:var(--cgds-breadcrumb-divider,"/");float:left;padding-right:.5rem}.breadcrumb-item.active{color:#344054}.pagination{display:flex;list-style:none;padding-left:0}.page-link{background-color:#fff;border:1px solid #98a2b3;color:#0f71bb;display:block;position:relative;text-decoration:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.page-link{transition:none}}.page-link:hover{border-color:#d0d5dd;z-index:2}.page-link:focus,.page-link:hover{background-color:#e4e7ec;color:#0c5a96}.page-link:focus{box-shadow:0 0 0 .125rem rgba(15,113,187,.25);outline:0;z-index:3}.page-item:not(:first-child) .page-link{margin-left:-1px}.page-item.active .page-link{background-color:#0f71bb;border-color:#0f71bb;color:#fff;z-index:3}.page-item.disabled .page-link{background-color:#fff;border-color:#98a2b3;color:#344054;pointer-events:none}.page-link{padding:.5rem 1rem}.page-item:first-child .page-link{border-bottom-left-radius:.3125rem;border-top-left-radius:.3125rem}.page-item:last-child .page-link{border-bottom-right-radius:.3125rem;border-top-right-radius:.3125rem}.pagination-lg .page-link{font-size:1.25rem;padding:.75rem 1.5rem}.pagination-lg .page-item:first-child .page-link{border-bottom-left-radius:.3rem;border-top-left-radius:.3rem}.pagination-lg .page-item:last-child .page-link{border-bottom-right-radius:.3rem;border-top-right-radius:.3rem}.pagination-sm .page-link{font-size:.875rem;padding:.25rem .5rem}.pagination-sm .page-item:first-child .page-link{border-bottom-left-radius:.2rem;border-top-left-radius:.2rem}.pagination-sm .page-item:last-child .page-link{border-bottom-right-radius:.2rem;border-top-right-radius:.2rem}.list-group{border-radius:.3125rem;display:flex;flex-direction:column;margin-bottom:0;padding-left:0}.list-group-numbered{counter-reset:section;list-style-type:none}.list-group-numbered>li:before{content:counters(section,".") ". ";counter-increment:section}.list-group-item-action{color:#1d2939;text-align:inherit;width:100%}.list-group-item-action:focus,.list-group-item-action:hover{background-color:#f7f7f9;color:#1d2939;text-decoration:none;z-index:1}.list-group-item-action:active{background-color:#e4e7ec;color:#1d2939}.list-group-item{background-color:#fff;border:1px solid rgba(0,0,0,.125);color:#000;display:block;padding:.5rem 1rem;position:relative;text-decoration:none}.list-group-item:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.list-group-item:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.list-group-item.disabled,.list-group-item:disabled{background-color:#fff;color:#344054;pointer-events:none}.list-group-item.active{background-color:#0f71bb;border-color:#0f71bb;color:#fff;z-index:2}.list-group-item+.list-group-item{border-top-width:0}.list-group-item+.list-group-item.active{border-top-width:1px;margin-top:-1px}.list-group-horizontal{flex-direction:row}.list-group-horizontal>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal>.list-group-item.active{margin-top:0}.list-group-horizontal>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}@media (min-width:576px){.list-group-horizontal-sm{flex-direction:row}.list-group-horizontal-sm>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal-sm>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal-sm>.list-group-item.active{margin-top:0}.list-group-horizontal-sm>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal-sm>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}}@media (min-width:768px){.list-group-horizontal-md{flex-direction:row}.list-group-horizontal-md>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal-md>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal-md>.list-group-item.active{margin-top:0}.list-group-horizontal-md>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal-md>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}}@media (min-width:992px){.list-group-horizontal-lg{flex-direction:row}.list-group-horizontal-lg>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal-lg>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal-lg>.list-group-item.active{margin-top:0}.list-group-horizontal-lg>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal-lg>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}}@media (min-width:1200px){.list-group-horizontal-xl{flex-direction:row}.list-group-horizontal-xl>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal-xl>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal-xl>.list-group-item.active{margin-top:0}.list-group-horizontal-xl>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal-xl>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}}@media (min-width:1400px){.list-group-horizontal-xxl{flex-direction:row}.list-group-horizontal-xxl>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal-xxl>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal-xxl>.list-group-item.active{margin-top:0}.list-group-horizontal-xxl>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal-xxl>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}}.list-group-flush{border-radius:0}.list-group-flush>.list-group-item{border-width:0 0 1px}.list-group-flush>.list-group-item:last-child{border-bottom-width:0}.list-group-item-primary{background-color:#ded3f8;color:#351684}.list-group-item-primary.list-group-item-action:focus,.list-group-item-primary.list-group-item-action:hover{background-color:#c8bedf;color:#351684}.list-group-item-primary.list-group-item-action.active{background-color:#351684;border-color:#351684;color:#fff}.list-group-item-secondary{background-color:#d2e1ff;color:#133f99}.list-group-item-secondary.list-group-item-action:focus,.list-group-item-secondary.list-group-item-action:hover{background-color:#bdcbe6;color:#133f99}.list-group-item-secondary.list-group-item-action.active{background-color:#133f99;border-color:#133f99;color:#fff}.list-group-item-success{background-color:#cee6d1;color:#064e0e}.list-group-item-success.list-group-item-action:focus,.list-group-item-success.list-group-item-action:hover{background-color:#b9cfbc;color:#064e0e}.list-group-item-success.list-group-item-action.active{background-color:#064e0e;border-color:#064e0e;color:#fff}.list-group-item-info{background-color:#cfe3f1;color:#094470}.list-group-item-info.list-group-item-action:focus,.list-group-item-info.list-group-item-action:hover{background-color:#baccd9;color:#094470}.list-group-item-info.list-group-item-action.active{background-color:#094470;border-color:#094470;color:#fff}.list-group-item-warning{background-color:#fde9ce;color:#945605}.list-group-item-warning.list-group-item-action:focus,.list-group-item-warning.list-group-item-action:hover{background-color:#e4d2b9;color:#945605}.list-group-item-warning.list-group-item-action.active{background-color:#945605;border-color:#945605;color:#fff}.list-group-item-danger{background-color:#f7d4cf;color:#811709}.list-group-item-danger.list-group-item-action:focus,.list-group-item-danger.list-group-item-action:hover{background-color:#debfba;color:#811709}.list-group-item-danger.list-group-item-action.active{background-color:#811709;border-color:#811709;color:#fff}.list-group-item-light{background-color:#fdfdfe;color:#636364}.list-group-item-light.list-group-item-action:focus,.list-group-item-light.list-group-item-action:hover{background-color:#e4e4e5;color:#636364}.list-group-item-light.list-group-item-action.active{background-color:#636364;border-color:#636364;color:#fff}.list-group-item-dark{background-color:#ccc;color:#000}.list-group-item-dark.list-group-item-action:focus,.list-group-item-dark.list-group-item-action:hover{background-color:#b8b8b8;color:#000}.list-group-item-dark.list-group-item-action.active{background-color:#000;border-color:#000;color:#fff}.badge{border-radius:.3125rem;color:#fff;display:inline-block;font-size:.875em;font-weight:700;line-height:1;padding:.285em .571em;text-align:center;vertical-align:baseline;white-space:nowrap}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.cgds.badge{font-size:min(.875em,2rem);line-height:1.145;padding:.285em .571em}.cgds.badge i.left{padding-right:.43em}.cgds.badge i.right{padding-left:.43em}.cgds.badge-light.bg-primary{--cgds-bg-opacity:0.1;border:1px solid var(--cgds-primary);color:var(--cgds-primary)}.cgds.badge-light.bg-secondary{--cgds-bg-opacity:0.1;border:1px solid var(--cgds-secondary);color:var(--cgds-secondary)}.cgds.badge-light.bg-success{--cgds-bg-opacity:0.1;border:1px solid var(--cgds-success);color:var(--cgds-success)}.cgds.badge-light.bg-info{--cgds-bg-opacity:0.1;border:1px solid var(--cgds-info);color:var(--cgds-info)}.cgds.badge-light.bg-warning{--cgds-bg-opacity:0.1;border:1px solid var(--cgds-warning);color:var(--cgds-warning)}.cgds.badge-light.bg-danger{--cgds-bg-opacity:0.1;border:1px solid var(--cgds-danger);color:var(--cgds-danger)}.cgds.badge-light.bg-light{--cgds-bg-opacity:0.1;border:1px solid var(--cgds-gray-500);color:var(--cgds-gray-500)}.cgds.badge-light.bg-dark{--cgds-bg-opacity:0.1;border:1px solid var(--cgds-dark);color:var(--cgds-dark)}.alert{border:1px solid transparent;border-radius:.3125rem;margin-bottom:1rem;padding:1rem;position:relative}.alert-heading{color:inherit}.alert-link{font-weight:700}.alert-dismissible{padding-right:3rem}.alert-dismissible .btn-close{padding:1.25rem 1rem;position:absolute;right:0;top:0;z-index:2}.alert-primary{background-color:#ded3f8;border-color:#cdbef5;color:#351684}.alert-primary .alert-link{color:#2a126a}.alert-secondary{background-color:#d2e1ff;border-color:#bcd2ff;color:#133f99}.alert-secondary .alert-link{color:#0f327a}.alert-success{background-color:#cee6d1;border-color:#b6dab9;color:#064e0e}.alert-success .alert-link{color:#053e0b}.alert-info{background-color:#cfe3f1;border-color:#b7d4eb;color:#094470}.alert-info .alert-link{color:#07365a}.alert-warning{background-color:#fde9ce;border-color:#fddeb5;color:#945605}.alert-warning .alert-link{color:#764504}.alert-danger{background-color:#f7d4cf;border-color:#f3beb7;color:#811709}.alert-danger .alert-link{color:#671207}.alert-light{background-color:#fdfdfe;border-color:#fdfdfd;color:#636364}.alert-light .alert-link{color:#4f4f50}.alert-dark{background-color:#ccc;border-color:#b3b3b3;color:#000}.alert-dark .alert-link{color:#000}.alert-primary{background-color:#ece6fb;border-color:#7e55e4;color:#344054}.alert-primary .alert-link{color:#2a3343}.alert-primary i{color:#491db6}.alert-secondary{background-color:#ebf1ff;border-color:#70a0ff;color:#344054}.alert-secondary .alert-link{color:#2a3343}.alert-secondary i{color:#004ff0}.alert-success{background-color:#e7f6e9;border-color:#58be62;color:#344054}.alert-success .alert-link{color:#2a3343}.alert-success i{color:#0a8217}.alert-info{background-color:#e2eff8;border-color:#58a1d4;color:#344054}.alert-info .alert-link{color:#2a3343}.alert-info i{color:#0f71bb}.alert-warning{background-color:#fffaeb;border-color:#fec84b;color:#344054}.alert-warning .alert-link{color:#2a3343}.alert-warning i{color:#f79009}.alert-danger{background-color:#fff4f3;border-color:#fb7463;color:#344054}.alert-danger .alert-link{color:#2a3343}.alert-danger i{color:#d7260f}.alert-light{background-color:#f7f7f9;border-color:#98a2b3;color:#344054}.alert-light .alert-link{color:#2a3343}.alert-dark,.alert-light i{color:#344054}.alert-dark{background-color:#f7f7f9;border-color:#98a2b3}.alert-dark .alert-link{color:#2a3343}.alert-dark i{color:#344054}@keyframes progress-bar-stripes{0%{background-position-x:1rem}}.progress{background-color:#e4e7ec;border-radius:.3125rem;font-size:.75rem;height:1rem}.progress,.progress-bar{display:flex;overflow:hidden}.progress-bar{background-color:#5925dc;color:#fff;flex-direction:column;justify-content:center;text-align:center;transition:width .6s ease;white-space:nowrap}@media (prefers-reduced-motion:reduce){.progress-bar{transition:none}}.progress-bar-striped{background-image:linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);background-size:1rem 1rem}.progress-bar-animated{animation:progress-bar-stripes 1s linear infinite}@media (prefers-reduced-motion:reduce){.progress-bar-animated{animation:none}}.btn-close{background:transparent url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2398A2B3'%3E%3Cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E") 50%/1em auto no-repeat;border:0;border-radius:.3125rem;box-sizing:content-box;color:#98a2b3;height:1em;opacity:1;padding:.25em;width:1em}.btn-close:hover{color:#98a2b3;opacity:1;text-decoration:none}.btn-close:focus{box-shadow:0 0 0 .125rem rgba(15,113,187,.25);opacity:1;outline:0}.btn-close.disabled,.btn-close:disabled{opacity:.25;pointer-events:none;user-select:none}.btn-close-white{filter:invert(1) grayscale(100%) brightness(200%)}.btn-close:hover{background:transparent url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23344054'%3E%3Cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E") 50%/1em auto no-repeat}.cgds.sidenav{font-size:1rem;list-style:none;width:auto}.cgds.sidenav .sidenav-item+.sidenav-item{margin-top:1rem}.cgds.sidenav .sidenav-item .cgds.btn{align-items:center;background:0;border:0;border-left:.125rem solid #5925dc;border-radius:0;color:#5925dc;display:flex;font-size:inherit;gap:1rem;line-height:1.5;padding-bottom:.5rem;padding-left:1rem;padding-top:.5rem;text-align:initial;width:100%}.cgds.sidenav .sidenav-item .cgds.btn i.bi-chevron-down{transform:rotate(180deg);transition:all .3s ease-in-out}.cgds.sidenav .sidenav-item .cgds.btn.collapsed,.cgds.sidenav .sidenav-item .cgds.btn.inactive{border-color:transparent;color:inherit}.cgds.sidenav .sidenav-item .cgds.btn.collapsed i,.cgds.sidenav .sidenav-item .cgds.btn.inactive i{transform:rotate(0deg)}.cgds.sidenav .sidenav-item .cgds.btn.active,.cgds.sidenav .sidenav-item .cgds.btn:hover{border-left-color:#5925dc;color:#5925dc;font-weight:700}.cgds.sidenav .sidenav-item .collapse,.cgds.sidenav .sidenav-item .collapse.show,.cgds.sidenav .sidenav-item .collapsing{margin-top:1rem}.cgds.sidenav .sidenav-item .collapse a.nav-link,.cgds.sidenav .sidenav-item .collapse.show a.nav-link,.cgds.sidenav .sidenav-item .collapsing a.nav-link{color:inherit;font-size:inherit;padding:.5rem 0 .5rem 4.125rem}.cgds.sidenav .sidenav-item .collapse a.nav-link+a.nav-link,.cgds.sidenav .sidenav-item .collapse.show a.nav-link+a.nav-link,.cgds.sidenav .sidenav-item .collapsing a.nav-link+a.nav-link{margin-top:1rem}.cgds.sidenav .sidenav-item .collapse a.nav-link.active,.cgds.sidenav .sidenav-item .collapse a.nav-link:hover,.cgds.sidenav .sidenav-item .collapse.show a.nav-link.active,.cgds.sidenav .sidenav-item .collapse.show a.nav-link:hover,.cgds.sidenav .sidenav-item .collapsing a.nav-link.active,.cgds.sidenav .sidenav-item .collapsing a.nav-link:hover{color:#5925dc}.cgds.sidenav .sidenav-item .collapse a.nav-link.disabled,.cgds.sidenav .sidenav-item .collapse.show a.nav-link.disabled,.cgds.sidenav .sidenav-item .collapsing a.nav-link.disabled{color:#344054}.cgds.stepper{display:flex;flex-wrap:wrap;font-size:1rem;min-height:calc(1rem*2rem)}.cgds.stepper:not(:last-child){margin-bottom:1.5rem}.cgds.stepper .stepper-item{flex-basis:0;flex-grow:1;margin-top:0;position:relative}.cgds.stepper .stepper-item:not(:first-child){flex-basis:1em;flex-grow:1;flex-shrink:1}.cgds.stepper .stepper-item:not(:first-child):before{content:" ";position:absolute}.cgds.stepper .stepper-item.is-clickable{cursor:pointer}.cgds.stepper .stepper-item.is-clickable:hover .stepper-marker{background-color:#491db6;border-color:#491db6}.cgds.stepper .stepper-item.is-clickable:hover .stepper-detail,.cgds.stepper .stepper-item.is-clickable:hover .stepper-detail>*{color:#491db6;transition:all .5s ease}.cgds.stepper .stepper-item:before{background:linear-gradient(270deg,#d0d5dd 50%,#5925dc 0);background-position:100% 100%;background-size:200% 100%}.cgds.stepper .stepper-item:before .stepper-marker{color:#fff}.cgds.stepper .stepper-item.is-active:before{background-position:0 100%}.cgds.stepper .stepper-item.is-active .stepper-marker{background-color:#fff;border-color:#5925dc;color:#5925dc}.cgds.stepper .stepper-item.is-completed:before{background-position:0 100%}.cgds.stepper .stepper-item.is-completed .stepper-marker{background-color:#5925dc;border-color:#5925dc;color:#fff}.cgds.stepper .stepper-item>.stepper-marker{align-items:center;background:#98a2b3;border:.25rem solid #fff;border-radius:50%;color:#fff;display:flex;font-weight:700;justify-content:center;z-index:1}.cgds.stepper .stepper-item>.stepper-detail{text-align:center}.cgds.stepper .stepper-item:not(:first-child):before{bottom:0;height:.25rem;left:-50%;top:1rem;width:100%}.cgds.stepper .stepper-item .stepper-marker{height:2rem;left:calc(50% - 1rem);position:absolute;width:2rem}.cgds.stepper .stepper-item .stepper-marker .icon *{font-size:1rem}.cgds.stepper .stepper-item .stepper-detail{margin-left:.5rem;margin-right:.5rem;margin-top:2rem}.cgds.stepper.is-small{font-size:.875rem;min-height:calc(.875rem*2rem)}.cgds.stepper.is-small .stepper-item:not(:first-child):before{bottom:0;height:.25rem;left:-50%;top:.875rem;width:100%}.cgds.stepper.is-small .stepper-item .stepper-marker{height:1.75rem;left:calc(50% - .875rem);position:absolute;width:1.75rem}.cgds.stepper.is-small .stepper-item .stepper-marker .icon *{font-size:.875rem}.cgds.stepper.is-small .stepper-item .stepper-detail{margin-left:.5rem;margin-right:.5rem;margin-top:1.75rem}.cgds.stepper.is-large{font-size:1.25rem;min-height:calc(1.25rem*2rem)}.cgds.stepper.is-large .stepper-item:not(:first-child):before{bottom:0;height:.25rem;left:-50%;top:1.25rem;width:100%}.cgds.stepper.is-large .stepper-item .stepper-marker{height:2.5rem;left:calc(50% - 1.25rem);position:absolute;width:2.5rem}.cgds.stepper.is-large .stepper-item .stepper-marker .icon *{font-size:1.25rem}.cgds.stepper.is-large .stepper-item .stepper-detail{margin-left:.5rem;margin-right:.5rem;margin-top:2.5rem}.toast{background-clip:padding-box;background-color:hsla(0,0%,100%,.85);border:1px solid rgba(0,0,0,.1);border-radius:.3125rem;box-shadow:0 .5rem 1rem rgba(0,0,0,.15);font-size:1rem;max-width:100%;pointer-events:auto;width:350px}.toast.showing{opacity:0}.toast:not(.show){display:none}.toast-container{max-width:100%;pointer-events:none;width:max-content}.toast-container>:not(:last-child){margin-bottom:.75rem}.toast-header{align-items:center;background-clip:padding-box;background-color:hsla(0,0%,100%,.85);border-bottom:1px solid rgba(0,0,0,.05);border-top-left-radius:calc(.3125rem - 1px);border-top-right-radius:calc(.3125rem - 1px);color:#344054;display:flex;padding:.5rem .75rem}.toast-header .btn-close{margin-left:.75rem;margin-right:-.375rem}.toast-body{word-wrap:break-word;padding:.75rem}.cgds.toast{border-color:#344054;border-left:5px solid;border-radius:0 .3125rem .3125rem 0;font-size:1rem}.cgds.toast .toast-header{border-bottom:0;padding:1rem 1rem .5rem}.cgds.toast .toast-header .btn-close{margin:0}.cgds.toast .toast-body{padding:0 1rem 1rem}.cgds.toast .toast-body button{margin-top:2rem}.cgds.is-primary{border-color:#5925dc}.cgds.is-primary .toast-header{color:#5925dc}.cgds.is-secondary{border-color:#1f69ff}.cgds.is-secondary .toast-header{color:#1f69ff}.cgds.is-success{border-color:#0a8217}.cgds.is-success .toast-header{color:#0a8217}.cgds.is-info{border-color:#0f71bb}.cgds.is-info .toast-header{color:#0f71bb}.cgds.is-warning{border-color:#f79009}.cgds.is-warning .toast-header{color:#f79009}.cgds.is-danger{border-color:#d7260f}.cgds.is-danger .toast-header{color:#d7260f}.cgds.is-light{border-color:#f7f7f9}.cgds.is-light .toast-header{color:#f7f7f9}.cgds.is-dark{border-color:#000}.cgds.is-dark .toast-header{color:#000}.modal{display:none;height:100%;left:0;outline:0;overflow-x:hidden;overflow-y:auto;position:fixed;top:0;width:100%;z-index:1055}.modal-dialog{margin:.5rem;pointer-events:none;position:relative;width:auto}.modal.fade .modal-dialog{transform:translateY(-50px);transition:transform .3s ease-out}@media (prefers-reduced-motion:reduce){.modal.fade .modal-dialog{transition:none}}.modal.show .modal-dialog{transform:none}.modal.modal-static .modal-dialog{transform:scale(1.02)}.modal-dialog-scrollable{height:calc(100% - 1rem)}.modal-dialog-scrollable .modal-content{max-height:100%;overflow:hidden}.modal-dialog-scrollable .modal-body{overflow-y:auto}.modal-dialog-centered{align-items:center;display:flex;min-height:calc(100% - 1rem)}.modal-content{background-clip:padding-box;background-color:#fff;border:1px solid #98a2b3;border-radius:.3rem;display:flex;flex-direction:column;outline:0;pointer-events:auto;position:relative;width:100%}.modal-backdrop{background-color:#000;height:100vh;left:0;position:fixed;top:0;width:100vw;z-index:1050}.modal-backdrop.fade{opacity:0}.modal-backdrop.show{opacity:.5}.modal-header{align-items:center;border-bottom:1px solid #98a2b3;border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px);display:flex;flex-shrink:0;justify-content:space-between;padding:1.5rem}.modal-header .btn-close{margin:-.75rem -.75rem -.75rem auto;padding:.75rem}.modal-title{line-height:2;margin-bottom:0}.modal-body{flex:1 1 auto;padding:1.5rem;position:relative}.modal-footer{align-items:center;border-bottom-left-radius:calc(.3rem - 1px);border-bottom-right-radius:calc(.3rem - 1px);border-top:1px solid transparent;display:flex;flex-shrink:0;flex-wrap:wrap;justify-content:flex-end;padding:1.25rem}.modal-footer>*{margin:.25rem}@media (min-width:576px){.modal-dialog{margin:1.75rem auto;max-width:500px}.modal-dialog-scrollable{height:calc(100% - 3.5rem)}.modal-dialog-centered{min-height:calc(100% - 3.5rem)}.modal-sm{max-width:300px}}@media (min-width:992px){.modal-lg,.modal-xl{max-width:800px}}@media (min-width:1200px){.modal-xl{max-width:1140px}}.modal-fullscreen{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen .modal-header{border-radius:0}.modal-fullscreen .modal-body{overflow-y:auto}.modal-fullscreen .modal-footer{border-radius:0}@media (max-width:575.98px){.modal-fullscreen-sm-down{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen-sm-down .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen-sm-down .modal-header{border-radius:0}.modal-fullscreen-sm-down .modal-body{overflow-y:auto}.modal-fullscreen-sm-down .modal-footer{border-radius:0}}@media (max-width:767.98px){.modal-fullscreen-md-down{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen-md-down .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen-md-down .modal-header{border-radius:0}.modal-fullscreen-md-down .modal-body{overflow-y:auto}.modal-fullscreen-md-down .modal-footer{border-radius:0}}@media (max-width:991.98px){.modal-fullscreen-lg-down{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen-lg-down .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen-lg-down .modal-header{border-radius:0}.modal-fullscreen-lg-down .modal-body{overflow-y:auto}.modal-fullscreen-lg-down .modal-footer{border-radius:0}}@media (max-width:1199.98px){.modal-fullscreen-xl-down{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen-xl-down .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen-xl-down .modal-header{border-radius:0}.modal-fullscreen-xl-down .modal-body{overflow-y:auto}.modal-fullscreen-xl-down .modal-footer{border-radius:0}}@media (max-width:1399.98px){.modal-fullscreen-xxl-down{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen-xxl-down .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen-xxl-down .modal-header{border-radius:0}.modal-fullscreen-xxl-down .modal-body{overflow-y:auto}.modal-fullscreen-xxl-down .modal-footer{border-radius:0}}.cgds.modal .modal-footer{padding-top:0}.cgds.modal button.btn-close{font-size:.75rem}.cgds.modal[variant=centered-align-icon] .modal-content{text-align:center}.cgds.modal[variant=centered-align-icon] .modal-header{align-items:flex-start;border-bottom:0;padding-bottom:0}.cgds.modal[variant=centered-align-icon] .modal-title{display:flex;flex-flow:column;flex-grow:1;justify-content:center}.cgds.modal[variant=centered-align-icon] .modal-footer{justify-content:center}.cgds.nav-tabs{border-bottom:none;gap:2rem}.cgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link{background-color:#fff;border:1px solid #98a2b3;border-radius:.3125rem;color:#1d2939;min-width:11.875rem;padding:.75rem}.cgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link .tabs-info-label{display:flex;justify-content:flex-end;text-align:right}.cgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link .tabs-info-label.has-icon{justify-content:space-between}.cgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link .tabs-info-count{text-align:right}.cgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link.active,.cgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link:hover{border-color:#5925dc;color:#5925dc;font-weight:700}.cgds.nav-tabs[variant=tabs-basic-toggle]{gap:0}.cgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item+li.nav-item{margin-left:-2px}.cgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link{background-color:#fff;border:1px solid #98a2b3;border-radius:0;color:#1d2939;padding:.5rem 1.5rem}.cgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link i.left,.cgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link span.left{margin-right:1rem}.cgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link i.right,.cgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link span.right{margin-left:1rem}.cgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link.active,.cgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link:hover{background-color:#0f71bb;color:#fff}.cgds.nav-tabs:not([variant=tabs-basic-toggle]):not([variant=tabs-info-toggle]) li.nav-item button.nav-link{background-color:transparent;border:none;color:#1d2939;padding-left:0;padding-right:0;padding-top:0}.cgds.nav-tabs:not([variant=tabs-basic-toggle]):not([variant=tabs-info-toggle]) li.nav-item button.nav-link.active{background-color:transparent;border-bottom:.125rem solid #0f71bb;font-weight:700}.cgds.tab-content{padding-bottom:1rem;padding-top:1rem}.tooltip{word-wrap:break-word;display:block;font-family:var(--cgds-font-sans-serif);font-size:.875rem;font-style:normal;font-weight:400;letter-spacing:normal;line-break:auto;line-height:2;margin:0;opacity:0;position:absolute;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;white-space:normal;word-break:normal;word-spacing:normal;z-index:1080}.tooltip.show{opacity:1}.tooltip .tooltip-arrow{display:block;height:.4rem;position:absolute;width:.8rem}.tooltip .tooltip-arrow:before{border-color:transparent;border-style:solid;content:"";position:absolute}.bs-tooltip-auto[data-popper-placement^=top],.bs-tooltip-top{padding:.4rem 0}.bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow,.bs-tooltip-top .tooltip-arrow{bottom:0}.bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow:before,.bs-tooltip-top .tooltip-arrow:before{border-top-color:#344054;border-width:.4rem .4rem 0;top:-1px}.bs-tooltip-auto[data-popper-placement^=right],.bs-tooltip-end{padding:0 .4rem}.bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow,.bs-tooltip-end .tooltip-arrow{height:.8rem;left:0;width:.4rem}.bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow:before,.bs-tooltip-end .tooltip-arrow:before{border-right-color:#344054;border-width:.4rem .4rem .4rem 0;right:-1px}.bs-tooltip-auto[data-popper-placement^=bottom],.bs-tooltip-bottom{padding:.4rem 0}.bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow,.bs-tooltip-bottom .tooltip-arrow{top:0}.bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow:before,.bs-tooltip-bottom .tooltip-arrow:before{border-bottom-color:#344054;border-width:0 .4rem .4rem;bottom:-1px}.bs-tooltip-auto[data-popper-placement^=left],.bs-tooltip-start{padding:0 .4rem}.bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow,.bs-tooltip-start .tooltip-arrow{height:.8rem;right:0;width:.4rem}.bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow:before,.bs-tooltip-start .tooltip-arrow:before{border-left-color:#344054;border-width:.4rem 0 .4rem .4rem;left:-1px}.tooltip-inner{background-color:#344054;border-radius:.3125rem;color:#fff;max-width:200px;padding:.5rem 1rem;text-align:center}.cgds.tooltip .tooltip-inner{display:flex;gap:2rem;text-align:left}.popover{word-wrap:break-word;background-clip:padding-box;background-color:#fff;border:1px solid rgba(0,0,0,.2);border-radius:.3rem;display:block;font-family:var(--cgds-font-sans-serif);font-size:.875rem;font-style:normal;font-weight:400;left:0;letter-spacing:normal;line-break:auto;line-height:2;max-width:276px;position:absolute;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;top:0;white-space:normal;word-break:normal;word-spacing:normal;z-index:1070}.popover .popover-arrow{display:block;height:.5rem;position:absolute;width:1rem}.popover .popover-arrow:after,.popover .popover-arrow:before{border-color:transparent;border-style:solid;content:"";display:block;position:absolute}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow,.bs-popover-top>.popover-arrow{bottom:calc(-.5rem - 1px)}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow:before,.bs-popover-top>.popover-arrow:before{border-top-color:rgba(0,0,0,.25);border-width:.5rem .5rem 0;bottom:0}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow:after,.bs-popover-top>.popover-arrow:after{border-top-color:#fff;border-width:.5rem .5rem 0;bottom:1px}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow,.bs-popover-end>.popover-arrow{height:1rem;left:calc(-.5rem - 1px);width:.5rem}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow:before,.bs-popover-end>.popover-arrow:before{border-right-color:rgba(0,0,0,.25);border-width:.5rem .5rem .5rem 0;left:0}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow:after,.bs-popover-end>.popover-arrow:after{border-right-color:#fff;border-width:.5rem .5rem .5rem 0;left:1px}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow,.bs-popover-bottom>.popover-arrow{top:calc(-.5rem - 1px)}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow:before,.bs-popover-bottom>.popover-arrow:before{border-bottom-color:rgba(0,0,0,.25);border-width:0 .5rem .5rem;top:0}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow:after,.bs-popover-bottom>.popover-arrow:after{border-bottom-color:#fff;border-width:0 .5rem .5rem;top:1px}.bs-popover-auto[data-popper-placement^=bottom] .popover-header:before,.bs-popover-bottom .popover-header:before{border-bottom:1px solid #f0f0f0;content:"";display:block;left:50%;margin-left:-.5rem;position:absolute;top:0;width:1rem}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow,.bs-popover-start>.popover-arrow{height:1rem;right:calc(-.5rem - 1px);width:.5rem}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow:before,.bs-popover-start>.popover-arrow:before{border-left-color:rgba(0,0,0,.25);border-width:.5rem 0 .5rem .5rem;right:0}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow:after,.bs-popover-start>.popover-arrow:after{border-left-color:#fff;border-width:.5rem 0 .5rem .5rem;right:1px}.popover-header{background-color:#f0f0f0;border-bottom:1px solid rgba(0,0,0,.2);border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px);font-size:1rem;margin-bottom:0;padding:.5rem 1rem}.popover-header:empty{display:none}.popover-body{color:#1d2939;padding:1rem}.carousel{position:relative}.carousel.pointer-event{touch-action:pan-y}.carousel-inner{overflow:hidden;position:relative;width:100%}.carousel-inner:after{clear:both;content:"";display:block}.carousel-item{backface-visibility:hidden;display:none;float:left;margin-right:-100%;position:relative;transition:transform .6s ease-in-out;width:100%}@media (prefers-reduced-motion:reduce){.carousel-item{transition:none}}.carousel-item-next,.carousel-item-prev,.carousel-item.active{display:block}.active.carousel-item-end,.carousel-item-next:not(.carousel-item-start){transform:translateX(100%)}.active.carousel-item-start,.carousel-item-prev:not(.carousel-item-end){transform:translateX(-100%)}.carousel-fade .carousel-item{opacity:0;transform:none;transition-property:opacity}.carousel-fade .carousel-item-next.carousel-item-start,.carousel-fade .carousel-item-prev.carousel-item-end,.carousel-fade .carousel-item.active{opacity:1;z-index:1}.carousel-fade .active.carousel-item-end,.carousel-fade .active.carousel-item-start{opacity:0;transition:opacity 0s .6s;z-index:0}@media (prefers-reduced-motion:reduce){.carousel-fade .active.carousel-item-end,.carousel-fade .active.carousel-item-start{transition:none}}.carousel-control-next,.carousel-control-prev{align-items:center;background:none;border:0;bottom:0;color:#fff;display:flex;justify-content:center;opacity:.5;padding:0;position:absolute;text-align:center;top:0;transition:opacity .15s ease;width:15%;z-index:1}@media (prefers-reduced-motion:reduce){.carousel-control-next,.carousel-control-prev{transition:none}}.carousel-control-next:focus,.carousel-control-next:hover,.carousel-control-prev:focus,.carousel-control-prev:hover{color:#fff;opacity:.9;outline:0;text-decoration:none}.carousel-control-prev{left:0}.carousel-control-next{right:0}.carousel-control-next-icon,.carousel-control-prev-icon{background-position:50%;background-repeat:no-repeat;background-size:100% 100%;display:inline-block;height:2rem;width:2rem}.carousel-control-prev-icon{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3E%3Cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E")}.carousel-control-next-icon{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3E%3Cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")}.carousel-indicators{bottom:0;display:flex;justify-content:center;left:0;list-style:none;margin-bottom:1rem;margin-left:15%;margin-right:15%;padding:0;position:absolute;right:0;z-index:2}.carousel-indicators [data-bs-target]{background-clip:padding-box;background-color:#fff;border:0;border-bottom:10px solid transparent;border-top:10px solid transparent;box-sizing:content-box;cursor:pointer;flex:0 1 auto;height:3px;margin-left:3px;margin-right:3px;opacity:.5;padding:0;text-indent:-999px;transition:opacity .6s ease;width:30px}@media (prefers-reduced-motion:reduce){.carousel-indicators [data-bs-target]{transition:none}}.carousel-indicators .active{opacity:1}.carousel-caption{bottom:1.25rem;color:#fff;left:15%;padding-bottom:1.25rem;padding-top:1.25rem;position:absolute;right:15%;text-align:center}.carousel-dark .carousel-control-next-icon,.carousel-dark .carousel-control-prev-icon{filter:invert(1) grayscale(100)}.carousel-dark .carousel-indicators [data-bs-target]{background-color:#000}.carousel-dark .carousel-caption{color:#000}@keyframes spinner-border{to{transform:rotate(1turn)}}.spinner-border{animation:spinner-border .75s linear infinite;border:.25em solid;border-radius:50%;border-right:.25em solid transparent;display:inline-block;height:2rem;vertical-align:-.125em;width:2rem}.spinner-border-sm{border-width:.2em;height:1rem;width:1rem}@keyframes spinner-grow{0%{transform:scale(0)}50%{opacity:1;transform:none}}.spinner-grow{animation:spinner-grow .75s linear infinite;background-color:currentColor;border-radius:50%;display:inline-block;height:2rem;opacity:0;vertical-align:-.125em;width:2rem}.spinner-grow-sm{height:1rem;width:1rem}@media (prefers-reduced-motion:reduce){.spinner-border,.spinner-grow{animation-duration:1.5s}}.offcanvas{background-clip:padding-box;background-color:#fff;bottom:0;display:flex;flex-direction:column;max-width:100%;outline:0;position:fixed;transition:transform .3s ease-in-out;visibility:hidden;z-index:1045}@media (prefers-reduced-motion:reduce){.offcanvas{transition:none}}.offcanvas-backdrop{background-color:#000;height:100vh;left:0;position:fixed;top:0;width:100vw;z-index:1040}.offcanvas-backdrop.fade{opacity:0}.offcanvas-backdrop.show{opacity:.5}.offcanvas-header{align-items:center;display:flex;justify-content:space-between;padding:1.5rem}.offcanvas-header .btn-close{margin-bottom:-.75rem;margin-right:-.75rem;margin-top:-.75rem;padding:.75rem}.offcanvas-title{line-height:2;margin-bottom:0}.offcanvas-body{flex-grow:1;overflow-y:auto;padding:1.5rem}.offcanvas-start{border-right:1px solid #98a2b3;left:0;top:0;transform:translateX(-100%);width:400px}.offcanvas-end{border-left:1px solid #98a2b3;right:0;top:0;transform:translateX(100%);width:400px}.offcanvas-top{border-bottom:1px solid #98a2b3;top:0;transform:translateY(-100%)}.offcanvas-bottom,.offcanvas-top{height:30vh;left:0;max-height:100%;right:0}.offcanvas-bottom{border-top:1px solid #98a2b3;transform:translateY(100%)}.offcanvas.show{transform:none}.placeholder{background-color:currentColor;cursor:wait;display:inline-block;min-height:1em;opacity:.5;vertical-align:middle}.placeholder.btn:before{content:"";display:inline-block}.placeholder-xs{min-height:.6em}.placeholder-sm{min-height:.8em}.placeholder-lg{min-height:1.2em}.placeholder-glow .placeholder{animation:placeholder-glow 2s ease-in-out infinite}@keyframes placeholder-glow{50%{opacity:.2}}.placeholder-wave{animation:placeholder-wave 2s linear infinite;mask-image:linear-gradient(130deg,#000 55%,rgba(0,0,0,.8) 75%,#000 95%);mask-size:200% 100%}@keyframes placeholder-wave{to{mask-position:-200% 0}}.cgds.combobox{justify-content:flex-end}.cgds.combobox>.form-control{padding-left:1rem;padding-right:3rem}.cgds.combobox>.dropdown-menu{min-width:100%}.clearfix:after{clear:both;content:"";display:block}.link-primary{color:#5925dc}.link-primary:focus,.link-primary:hover{color:#471eb0}.link-secondary{color:#1f69ff}.link-secondary:focus,.link-secondary:hover{color:#1954cc}.link-success{color:#0a8217}.link-success:focus,.link-success:hover{color:#086812}.link-info{color:#0f71bb}.link-info:focus,.link-info:hover{color:#0c5a96}.link-warning{color:#f79009}.link-warning:focus,.link-warning:hover{color:#f9a63a}.link-danger{color:#d7260f}.link-danger:focus,.link-danger:hover{color:#ac1e0c}.link-light{color:#f7f7f9}.link-light:focus,.link-light:hover{color:#f9f9fa}.link-dark,.link-dark:focus,.link-dark:hover{color:#000}.ratio{position:relative;width:100%}.ratio:before{content:"";display:block;padding-top:var(--cgds-aspect-ratio)}.ratio>*{height:100%;left:0;position:absolute;top:0;width:100%}.ratio-1x1{--cgds-aspect-ratio:100%}.ratio-4x3{--cgds-aspect-ratio:75%}.ratio-16x9{--cgds-aspect-ratio:56.25%}.ratio-21x9{--cgds-aspect-ratio:42.8571428571%}.fixed-top{top:0}.fixed-bottom,.fixed-top{left:0;position:fixed;right:0;z-index:1030}.fixed-bottom{bottom:0}.sticky-top{position:sticky;top:0;z-index:1020}@media (min-width:576px){.sticky-sm-top{position:sticky;top:0;z-index:1020}}@media (min-width:768px){.sticky-md-top{position:sticky;top:0;z-index:1020}}@media (min-width:992px){.sticky-lg-top{position:sticky;top:0;z-index:1020}}@media (min-width:1200px){.sticky-xl-top{position:sticky;top:0;z-index:1020}}@media (min-width:1400px){.sticky-xxl-top{position:sticky;top:0;z-index:1020}}.hstack{align-items:center;flex-direction:row}.hstack,.vstack{align-self:stretch;display:flex}.vstack{flex:1 1 auto;flex-direction:column}.visually-hidden,.visually-hidden-focusable:not(:focus):not(:focus-within){clip:rect(0,0,0,0)!important;border:0!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}.stretched-link:after{bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:1}.text-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vr{align-self:stretch;background-color:currentColor;display:inline-block;min-height:1em;opacity:.25;width:1px}.align-baseline{vertical-align:baseline!important}.align-top{vertical-align:top!important}.align-middle{vertical-align:middle!important}.align-bottom{vertical-align:bottom!important}.align-text-bottom{vertical-align:text-bottom!important}.align-text-top{vertical-align:text-top!important}.float-start{float:left!important}.float-end{float:right!important}.float-none{float:none!important}.opacity-0{opacity:0!important}.opacity-25{opacity:.25!important}.opacity-50{opacity:.5!important}.opacity-75{opacity:.75!important}.opacity-100{opacity:1!important}.overflow-auto{overflow:auto!important}.overflow-hidden{overflow:hidden!important}.overflow-visible{overflow:visible!important}.overflow-scroll{overflow:scroll!important}.d-inline{display:inline!important}.d-inline-block{display:inline-block!important}.d-block,.form-text{display:block!important}.d-grid{display:grid!important}.d-table{display:table!important}.d-table-row{display:table-row!important}.d-table-cell{display:table-cell!important}.d-flex{display:flex!important}.d-inline-flex{display:inline-flex!important}.d-none{display:none!important}.shadow{box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important}.shadow-sm{box-shadow:0 .125rem .25rem rgba(0,0,0,.075)!important}.shadow-lg{box-shadow:0 1rem 3rem rgba(0,0,0,.175)!important}.shadow-none{box-shadow:none!important}.position-static{position:static!important}.position-relative{position:relative!important}.position-absolute{position:absolute!important}.position-fixed{position:fixed!important}.position-sticky{position:sticky!important}.top-0{top:0!important}.top-50{top:50%!important}.top-100{top:100%!important}.bottom-0{bottom:0!important}.bottom-50{bottom:50%!important}.bottom-100{bottom:100%!important}.start-0{left:0!important}.start-50{left:50%!important}.start-100{left:100%!important}.end-0{right:0!important}.end-50{right:50%!important}.end-100{right:100%!important}.translate-middle{transform:translate(-50%,-50%)!important}.translate-middle-x{transform:translateX(-50%)!important}.translate-middle-y{transform:translateY(-50%)!important}.border{border:1px solid #98a2b3!important}.border-0{border:0!important}.border-top{border-top:1px solid #98a2b3!important}.border-top-0{border-top:0!important}.border-end{border-right:1px solid #98a2b3!important}.border-end-0{border-right:0!important}.border-bottom{border-bottom:1px solid #98a2b3!important}.border-bottom-0{border-bottom:0!important}.border-start{border-left:1px solid #98a2b3!important}.border-start-0{border-left:0!important}.border-primary{border-color:#5925dc!important}.border-secondary{border-color:#1f69ff!important}.border-success{border-color:#0a8217!important}.border-info{border-color:#0f71bb!important}.border-warning{border-color:#f79009!important}.border-danger{border-color:#d7260f!important}.border-light{border-color:#f7f7f9!important}.border-dark{border-color:#000!important}.border-white{border-color:#fff!important}.border-1{border-width:1px!important}.border-2{border-width:2px!important}.border-3{border-width:3px!important}.border-4{border-width:4px!important}.border-5{border-width:5px!important}.w-25{width:25%!important}.w-50{width:50%!important}.w-75{width:75%!important}.w-100{width:100%!important}.w-auto{width:auto!important}.mw-100{max-width:100%!important}.vw-100{width:100vw!important}.min-vw-100{min-width:100vw!important}.h-25{height:25%!important}.h-50{height:50%!important}.h-75{height:75%!important}.h-100{height:100%!important}.h-auto{height:auto!important}.mh-100{max-height:100%!important}.vh-100{height:100vh!important}.min-vh-100{min-height:100vh!important}.flex-fill{flex:1 1 auto!important}.flex-row{flex-direction:row!important}.flex-column{flex-direction:column!important}.flex-row-reverse{flex-direction:row-reverse!important}.flex-column-reverse{flex-direction:column-reverse!important}.flex-grow-0{flex-grow:0!important}.flex-grow-1{flex-grow:1!important}.flex-shrink-0{flex-shrink:0!important}.flex-shrink-1{flex-shrink:1!important}.flex-wrap{flex-wrap:wrap!important}.flex-nowrap{flex-wrap:nowrap!important}.flex-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-0{gap:0!important}.gap-1{gap:.25rem!important}.gap-2{gap:.5rem!important}.gap-3{gap:1rem!important}.gap-4{gap:1.5rem!important}.gap-5{gap:2rem!important}.gap-6{gap:2.5rem!important}.gap-7{gap:3rem!important}.gap-8{gap:3.5rem!important}.justify-content-start{justify-content:flex-start!important}.justify-content-end{justify-content:flex-end!important}.justify-content-center,.cgds.modal[variant=centered-align-icon] .modal-footer{justify-content:center!important}.justify-content-between{justify-content:space-between!important}.justify-content-around{justify-content:space-around!important}.justify-content-evenly{justify-content:space-evenly!important}.align-items-start{align-items:flex-start!important}.align-items-end{align-items:flex-end!important}.align-items-center{align-items:center!important}.align-items-baseline{align-items:baseline!important}.align-items-stretch{align-items:stretch!important}.align-content-start{align-content:flex-start!important}.align-content-end{align-content:flex-end!important}.align-content-center{align-content:center!important}.align-content-between{align-content:space-between!important}.align-content-around{align-content:space-around!important}.align-content-stretch{align-content:stretch!important}.align-self-auto{align-self:auto!important}.align-self-start,.cgds.alert>i{align-self:flex-start!important}.align-self-end{align-self:flex-end!important}.align-self-center{align-self:center!important}.align-self-baseline{align-self:baseline!important}.align-self-stretch{align-self:stretch!important}.order-first{order:-1!important}.order-0{order:0!important}.order-1{order:1!important}.order-2{order:2!important}.order-3{order:3!important}.order-4{order:4!important}.order-5{order:5!important}.order-last{order:6!important}.m-0{margin:0!important}.m-1{margin:.25rem!important}.m-2{margin:.5rem!important}.m-3{margin:1rem!important}.m-4{margin:1.5rem!important}.m-5{margin:2rem!important}.m-6{margin:2.5rem!important}.m-7{margin:3rem!important}.m-8{margin:3.5rem!important}.m-auto{margin:auto!important}.mx-0{margin-left:0!important;margin-right:0!important}.mx-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-3{margin-left:1rem!important;margin-right:1rem!important}.mx-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-5{margin-left:2rem!important;margin-right:2rem!important}.mx-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-7{margin-left:3rem!important;margin-right:3rem!important}.mx-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-auto{margin-left:auto!important;margin-right:auto!important}.my-0{margin-bottom:0!important;margin-top:0!important}.my-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-0{margin-top:0!important}.mt-1{margin-top:.25rem!important}.mt-2{margin-top:.5rem!important}.mt-3{margin-top:1rem!important}.mt-4{margin-top:1.5rem!important}.mt-5{margin-top:2rem!important}.mt-6{margin-top:2.5rem!important}.mt-7{margin-top:3rem!important}.mt-8{margin-top:3.5rem!important}.mt-auto{margin-top:auto!important}.me-0{margin-right:0!important}.me-1{margin-right:.25rem!important}.me-2{margin-right:.5rem!important}.me-3{margin-right:1rem!important}.me-4{margin-right:1.5rem!important}.me-5{margin-right:2rem!important}.me-6{margin-right:2.5rem!important}.me-7{margin-right:3rem!important}.me-8{margin-right:3.5rem!important}.me-auto{margin-right:auto!important}.mb-0{margin-bottom:0!important}.mb-1{margin-bottom:.25rem!important}.mb-2{margin-bottom:.5rem!important}.mb-3{margin-bottom:1rem!important}.mb-4{margin-bottom:1.5rem!important}.mb-5{margin-bottom:2rem!important}.mb-6{margin-bottom:2.5rem!important}.mb-7{margin-bottom:3rem!important}.mb-8{margin-bottom:3.5rem!important}.mb-auto{margin-bottom:auto!important}.ms-0{margin-left:0!important}.ms-1{margin-left:.25rem!important}.ms-2{margin-left:.5rem!important}.ms-3{margin-left:1rem!important}.ms-4{margin-left:1.5rem!important}.ms-5{margin-left:2rem!important}.ms-6{margin-left:2.5rem!important}.ms-7{margin-left:3rem!important}.ms-8{margin-left:3.5rem!important}.ms-auto,.cgds.sidenav .sidenav-item .cgds.btn i.bi-chevron-down{margin-left:auto!important}.p-0{padding:0!important}.p-1{padding:.25rem!important}.p-2{padding:.5rem!important}.p-3{padding:1rem!important}.p-4{padding:1.5rem!important}.p-5{padding:2rem!important}.p-6{padding:2.5rem!important}.p-7{padding:3rem!important}.p-8{padding:3.5rem!important}.px-0{padding-left:0!important;padding-right:0!important}.px-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-3{padding-left:1rem!important;padding-right:1rem!important}.px-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-5{padding-left:2rem!important;padding-right:2rem!important}.px-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-7{padding-left:3rem!important;padding-right:3rem!important}.px-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-0{padding-bottom:0!important;padding-top:0!important}.py-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-0{padding-top:0!important}.pt-1{padding-top:.25rem!important}.pt-2{padding-top:.5rem!important}.pt-3{padding-top:1rem!important}.pt-4{padding-top:1.5rem!important}.pt-5{padding-top:2rem!important}.pt-6{padding-top:2.5rem!important}.pt-7{padding-top:3rem!important}.pt-8{padding-top:3.5rem!important}.pe-0{padding-right:0!important}.pe-1{padding-right:.25rem!important}.pe-2{padding-right:.5rem!important}.pe-3{padding-right:1rem!important}.pe-4{padding-right:1.5rem!important}.pe-5{padding-right:2rem!important}.pe-6{padding-right:2.5rem!important}.pe-7{padding-right:3rem!important}.pe-8{padding-right:3.5rem!important}.pb-0{padding-bottom:0!important}.pb-1{padding-bottom:.25rem!important}.pb-2{padding-bottom:.5rem!important}.pb-3{padding-bottom:1rem!important}.pb-4{padding-bottom:1.5rem!important}.pb-5{padding-bottom:2rem!important}.pb-6{padding-bottom:2.5rem!important}.pb-7{padding-bottom:3rem!important}.pb-8{padding-bottom:3.5rem!important}.ps-0{padding-left:0!important}.ps-1{padding-left:.25rem!important}.ps-2{padding-left:.5rem!important}.ps-3{padding-left:1rem!important}.ps-4{padding-left:1.5rem!important}.ps-5{padding-left:2rem!important}.ps-6{padding-left:2.5rem!important}.ps-7{padding-left:3rem!important}.ps-8{padding-left:3.5rem!important}.font-monospace{font-family:var(--cgds-font-monospace)!important}.fs-0{font-size:calc(1.475rem + 2.7vw)!important}.fs-1{font-size:calc(1.375rem + 1.5vw)!important}.fs-2{font-size:calc(1.325rem + .9vw)!important}.fs-3{font-size:calc(1.275rem + .3vw)!important}.fs-4{font-size:1.125rem!important}.fs-5,.fs-6{font-size:1rem!important}.fst-italic{font-style:italic!important}.fst-normal{font-style:normal!important}.fw-light{font-weight:300!important}.fw-lighter{font-weight:lighter!important}.fw-normal{font-weight:400!important}.fw-bold{font-weight:700!important}.fw-bolder{font-weight:bolder!important}.lh-1{line-height:1!important}.lh-sm{line-height:1.75!important}.lh-base{line-height:2!important}.lh-lg{line-height:2.25!important}.text-start{text-align:left!important}.text-end{text-align:right!important}.text-center{text-align:center!important}.text-decoration-none{text-decoration:none!important}.text-decoration-underline{text-decoration:underline!important}.text-decoration-line-through{text-decoration:line-through!important}.text-lowercase{text-transform:lowercase!important}.text-uppercase{text-transform:uppercase!important}.text-capitalize{text-transform:capitalize!important}.text-wrap{white-space:normal!important}.text-nowrap{white-space:nowrap!important}.text-break{word-wrap:break-word!important;word-break:break-word!important}.text-primary{--cgds-text-opacity:1;color:rgba(var(--cgds-primary-rgb),var(--cgds-text-opacity))!important}.text-secondary{--cgds-text-opacity:1;color:rgba(var(--cgds-secondary-rgb),var(--cgds-text-opacity))!important}.text-success{--cgds-text-opacity:1;color:rgba(var(--cgds-success-rgb),var(--cgds-text-opacity))!important}.text-info{--cgds-text-opacity:1;color:rgba(var(--cgds-info-rgb),var(--cgds-text-opacity))!important}.text-warning{--cgds-text-opacity:1;color:rgba(var(--cgds-warning-rgb),var(--cgds-text-opacity))!important}.text-danger{--cgds-text-opacity:1;color:rgba(var(--cgds-danger-rgb),var(--cgds-text-opacity))!important}.text-light{--cgds-text-opacity:1;color:rgba(var(--cgds-light-rgb),var(--cgds-text-opacity))!important}.text-dark{--cgds-text-opacity:1;color:rgba(var(--cgds-dark-rgb),var(--cgds-text-opacity))!important}.text-black{--cgds-text-opacity:1;color:rgba(var(--cgds-black-rgb),var(--cgds-text-opacity))!important}.text-white{--cgds-text-opacity:1;color:rgba(var(--cgds-white-rgb),var(--cgds-text-opacity))!important}.text-body{--cgds-text-opacity:1;color:rgba(var(--cgds-body-color-rgb),var(--cgds-text-opacity))!important}.text-muted{--cgds-text-opacity:1;color:#667085!important}.text-black-50{--cgds-text-opacity:1;color:rgba(0,0,0,.5)!important}.text-white-50{--cgds-text-opacity:1;color:hsla(0,0%,100%,.5)!important}.text-reset{--cgds-text-opacity:1;color:inherit!important}.text-primary-100{--cgds-text-opacity:1;color:#ece6fb!important}.text-primary-200{--cgds-text-opacity:1;color:#c7b6f3!important}.text-primary-300{--cgds-text-opacity:1;color:#a386ec!important}.text-primary-400{--cgds-text-opacity:1;color:#7e55e4!important}.text-primary-500{--cgds-text-opacity:1;color:#5925dc!important}.text-primary-600{--cgds-text-opacity:1;color:#491db6!important}.text-primary-700{--cgds-text-opacity:1;color:#39178e!important}.text-primary-800{--cgds-text-opacity:1;color:#291167!important}.text-primary-900{--cgds-text-opacity:1;color:#190a3f!important}.text-secondary-100{--cgds-text-opacity:1;color:#ebf1ff!important}.text-secondary-200{--cgds-text-opacity:1;color:#d3e2ff!important}.text-secondary-300{--cgds-text-opacity:1;color:#9bf!important}.text-secondary-400{--cgds-text-opacity:1;color:#70a0ff!important}.text-secondary-500{--cgds-text-opacity:1;color:#1f69ff!important}.text-secondary-600{--cgds-text-opacity:1;color:#004ff0!important}.text-secondary-700{--cgds-text-opacity:1;color:#0040c2!important}.text-secondary-800{--cgds-text-opacity:1;color:#003194!important}.text-secondary-900{--cgds-text-opacity:1;color:#026!important}.text-purple-100{--cgds-text-opacity:1;color:#ece6fb!important}.text-purple-200{--cgds-text-opacity:1;color:#c7b6f3!important}.text-purple-300{--cgds-text-opacity:1;color:#a386ec!important}.text-purple-400{--cgds-text-opacity:1;color:#7e55e4!important}.text-purple-500{--cgds-text-opacity:1;color:#5925dc!important}.text-purple-600{--cgds-text-opacity:1;color:#491db6!important}.text-purple-700{--cgds-text-opacity:1;color:#39178e!important}.text-purple-800{--cgds-text-opacity:1;color:#291167!important}.text-purple-900{--cgds-text-opacity:1;color:#190a3f!important}.text-red-100{--cgds-text-opacity:1;color:#fff4f3!important}.text-red-200{--cgds-text-opacity:1;color:#ffcfc8!important}.text-red-300{--cgds-text-opacity:1;color:#fc9c90!important}.text-red-400{--cgds-text-opacity:1;color:#fb7463!important}.text-red-500{--cgds-text-opacity:1;color:#fa5741!important}.text-red-600{--cgds-text-opacity:1;color:#d7260f!important}.text-red-700{--cgds-text-opacity:1;color:#f8331c!important}.text-red-800{--cgds-text-opacity:1;color:#560f06!important}.text-red-900{--cgds-text-opacity:1;color:#2b0803!important}.text-yellow-100{--cgds-text-opacity:1;color:#fffaeb!important}.text-yellow-200{--cgds-text-opacity:1;color:#fef0c7!important}.text-yellow-300{--cgds-text-opacity:1;color:#fedf89!important}.text-yellow-400{--cgds-text-opacity:1;color:#fec84b!important}.text-yellow-500{--cgds-text-opacity:1;color:#fdb022!important}.text-yellow-600{--cgds-text-opacity:1;color:#f79009!important}.text-yellow-700{--cgds-text-opacity:1;color:#dc6803!important}.text-yellow-800{--cgds-text-opacity:1;color:#633a04!important}.text-yellow-900{--cgds-text-opacity:1;color:#311d02!important}.text-green-100{--cgds-text-opacity:1;color:#e7f6e9!important}.text-green-200{--cgds-text-opacity:1;color:#c4e8c8!important}.text-green-300{--cgds-text-opacity:1;color:#9dd9a3!important}.text-green-400{--cgds-text-opacity:1;color:#58be62!important}.text-green-500{--cgds-text-opacity:1;color:#3bb346!important}.text-green-600{--cgds-text-opacity:1;color:#0a8217!important}.text-green-700{--cgds-text-opacity:1;color:#2da337!important}.text-green-800{--cgds-text-opacity:1;color:#043409!important}.text-green-900{--cgds-text-opacity:1;color:#021a05!important}.text-cyan-100{--cgds-text-opacity:1;color:#e2eff8!important}.text-cyan-200{--cgds-text-opacity:1;color:#b9d8ee!important}.text-cyan-300{--cgds-text-opacity:1;color:#90c1e4!important}.text-cyan-400{--cgds-text-opacity:1;color:#58a1d4!important}.text-cyan-500{--cgds-text-opacity:1;color:#59a1d4!important}.text-cyan-600{--cgds-text-opacity:1;color:#0f71bb!important}.text-cyan-700{--cgds-text-opacity:1;color:#0c5b97!important}.text-cyan-800{--cgds-text-opacity:1;color:#0a4776!important}.text-cyan-900{--cgds-text-opacity:1;color:#08395e!important}.text-opacity-25{--cgds-text-opacity:0.25}.text-opacity-50{--cgds-text-opacity:0.5}.text-opacity-75{--cgds-text-opacity:0.75}.text-opacity-100{--cgds-text-opacity:1}.bg-primary{--cgds-bg-opacity:1;background-color:rgba(var(--cgds-primary-rgb),var(--cgds-bg-opacity))!important}.bg-secondary{--cgds-bg-opacity:1;background-color:rgba(var(--cgds-secondary-rgb),var(--cgds-bg-opacity))!important}.bg-success{--cgds-bg-opacity:1;background-color:rgba(var(--cgds-success-rgb),var(--cgds-bg-opacity))!important}.bg-info{--cgds-bg-opacity:1;background-color:rgba(var(--cgds-info-rgb),var(--cgds-bg-opacity))!important}.bg-warning{--cgds-bg-opacity:1;background-color:rgba(var(--cgds-warning-rgb),var(--cgds-bg-opacity))!important}.bg-danger{--cgds-bg-opacity:1;background-color:rgba(var(--cgds-danger-rgb),var(--cgds-bg-opacity))!important}.bg-light{background-color:rgba(var(--cgds-light-rgb),var(--cgds-bg-opacity))!important}.bg-dark,.bg-light{--cgds-bg-opacity:1}.bg-dark{background-color:rgba(var(--cgds-dark-rgb),var(--cgds-bg-opacity))!important}.bg-black{--cgds-bg-opacity:1;background-color:rgba(var(--cgds-black-rgb),var(--cgds-bg-opacity))!important}.bg-white{background-color:rgba(var(--cgds-white-rgb),var(--cgds-bg-opacity))!important}.bg-body,.bg-white{--cgds-bg-opacity:1}.bg-body{background-color:rgba(var(--cgds-body-bg-rgb),var(--cgds-bg-opacity))!important}.bg-transparent{--cgds-bg-opacity:1;background-color:transparent!important}.bg-primary-100{--cgds-bg-opacity:1;background-color:#ece6fb!important}.bg-primary-200{--cgds-bg-opacity:1;background-color:#c7b6f3!important}.bg-primary-300{--cgds-bg-opacity:1;background-color:#a386ec!important}.bg-primary-400{--cgds-bg-opacity:1;background-color:#7e55e4!important}.bg-primary-500{--cgds-bg-opacity:1;background-color:#5925dc!important}.bg-primary-600{--cgds-bg-opacity:1;background-color:#491db6!important}.bg-primary-700{--cgds-bg-opacity:1;background-color:#39178e!important}.bg-primary-800{--cgds-bg-opacity:1;background-color:#291167!important}.bg-primary-900{--cgds-bg-opacity:1;background-color:#190a3f!important}.bg-secondary-100{--cgds-bg-opacity:1;background-color:#ebf1ff!important}.bg-secondary-200{--cgds-bg-opacity:1;background-color:#d3e2ff!important}.bg-secondary-300{--cgds-bg-opacity:1;background-color:#9bf!important}.bg-secondary-400{--cgds-bg-opacity:1;background-color:#70a0ff!important}.bg-secondary-500{--cgds-bg-opacity:1;background-color:#1f69ff!important}.bg-secondary-600{--cgds-bg-opacity:1;background-color:#004ff0!important}.bg-secondary-700{--cgds-bg-opacity:1;background-color:#0040c2!important}.bg-secondary-800{--cgds-bg-opacity:1;background-color:#003194!important}.bg-secondary-900{--cgds-bg-opacity:1;background-color:#026!important}.bg-purple-100{--cgds-bg-opacity:1;background-color:#ece6fb!important}.bg-purple-200{--cgds-bg-opacity:1;background-color:#c7b6f3!important}.bg-purple-300{--cgds-bg-opacity:1;background-color:#a386ec!important}.bg-purple-400{--cgds-bg-opacity:1;background-color:#7e55e4!important}.bg-purple-500{--cgds-bg-opacity:1;background-color:#5925dc!important}.bg-purple-600{--cgds-bg-opacity:1;background-color:#491db6!important}.bg-purple-700{--cgds-bg-opacity:1;background-color:#39178e!important}.bg-purple-800{--cgds-bg-opacity:1;background-color:#291167!important}.bg-purple-900{--cgds-bg-opacity:1;background-color:#190a3f!important}.bg-red-100{--cgds-bg-opacity:1;background-color:#fff4f3!important}.bg-red-200{--cgds-bg-opacity:1;background-color:#ffcfc8!important}.bg-red-300{--cgds-bg-opacity:1;background-color:#fc9c90!important}.bg-red-400{--cgds-bg-opacity:1;background-color:#fb7463!important}.bg-red-500{--cgds-bg-opacity:1;background-color:#fa5741!important}.bg-red-600{--cgds-bg-opacity:1;background-color:#d7260f!important}.bg-red-700{--cgds-bg-opacity:1;background-color:#f8331c!important}.bg-red-800{--cgds-bg-opacity:1;background-color:#560f06!important}.bg-red-900{--cgds-bg-opacity:1;background-color:#2b0803!important}.bg-yellow-100{--cgds-bg-opacity:1;background-color:#fffaeb!important}.bg-yellow-200{--cgds-bg-opacity:1;background-color:#fef0c7!important}.bg-yellow-300{--cgds-bg-opacity:1;background-color:#fedf89!important}.bg-yellow-400{--cgds-bg-opacity:1;background-color:#fec84b!important}.bg-yellow-500{--cgds-bg-opacity:1;background-color:#fdb022!important}.bg-yellow-600{--cgds-bg-opacity:1;background-color:#f79009!important}.bg-yellow-700{--cgds-bg-opacity:1;background-color:#dc6803!important}.bg-yellow-800{--cgds-bg-opacity:1;background-color:#633a04!important}.bg-yellow-900{--cgds-bg-opacity:1;background-color:#311d02!important}.bg-green-100{--cgds-bg-opacity:1;background-color:#e7f6e9!important}.bg-green-200{--cgds-bg-opacity:1;background-color:#c4e8c8!important}.bg-green-300{--cgds-bg-opacity:1;background-color:#9dd9a3!important}.bg-green-400{--cgds-bg-opacity:1;background-color:#58be62!important}.bg-green-500{--cgds-bg-opacity:1;background-color:#3bb346!important}.bg-green-600{--cgds-bg-opacity:1;background-color:#0a8217!important}.bg-green-700{--cgds-bg-opacity:1;background-color:#2da337!important}.bg-green-800{--cgds-bg-opacity:1;background-color:#043409!important}.bg-green-900{--cgds-bg-opacity:1;background-color:#021a05!important}.bg-cyan-100{--cgds-bg-opacity:1;background-color:#e2eff8!important}.bg-cyan-200{--cgds-bg-opacity:1;background-color:#b9d8ee!important}.bg-cyan-300{--cgds-bg-opacity:1;background-color:#90c1e4!important}.bg-cyan-400{--cgds-bg-opacity:1;background-color:#58a1d4!important}.bg-cyan-500{--cgds-bg-opacity:1;background-color:#59a1d4!important}.bg-cyan-600{--cgds-bg-opacity:1;background-color:#0f71bb!important}.bg-cyan-700{--cgds-bg-opacity:1;background-color:#0c5b97!important}.bg-cyan-800{--cgds-bg-opacity:1;background-color:#0a4776!important}.bg-cyan-900{--cgds-bg-opacity:1;background-color:#08395e!important}.bg-opacity-10{--cgds-bg-opacity:0.1}.bg-opacity-25{--cgds-bg-opacity:0.25}.bg-opacity-50{--cgds-bg-opacity:0.5}.bg-opacity-75{--cgds-bg-opacity:0.75}.bg-opacity-100{--cgds-bg-opacity:1}.bg-gradient{background-image:var(--cgds-gradient)!important}.user-select-all{user-select:all!important}.user-select-auto{user-select:auto!important}.user-select-none{user-select:none!important}.pe-none{pointer-events:none!important}.pe-auto{pointer-events:auto!important}.rounded{border-radius:.3125rem!important}.rounded-0{border-radius:0!important}.rounded-1{border-radius:.2rem!important}.rounded-2{border-radius:.3125rem!important}.rounded-3{border-radius:.3rem!important}.rounded-circle{border-radius:50%!important}.rounded-pill{border-radius:50rem!important}.rounded-top{border-top-left-radius:.3125rem!important}.rounded-end,.rounded-top{border-top-right-radius:.3125rem!important}.rounded-bottom,.rounded-end{border-bottom-right-radius:.3125rem!important}.rounded-bottom,.rounded-start{border-bottom-left-radius:.3125rem!important}.rounded-start{border-top-left-radius:.3125rem!important}.visible{visibility:visible!important}.invisible{visibility:hidden!important}@media (min-width:576px){.float-sm-start{float:left!important}.float-sm-end{float:right!important}.float-sm-none{float:none!important}.d-sm-inline{display:inline!important}.d-sm-inline-block{display:inline-block!important}.d-sm-block{display:block!important}.d-sm-grid{display:grid!important}.d-sm-table{display:table!important}.d-sm-table-row{display:table-row!important}.d-sm-table-cell{display:table-cell!important}.d-sm-flex{display:flex!important}.d-sm-inline-flex{display:inline-flex!important}.d-sm-none{display:none!important}.flex-sm-fill{flex:1 1 auto!important}.flex-sm-row{flex-direction:row!important}.flex-sm-column{flex-direction:column!important}.flex-sm-row-reverse{flex-direction:row-reverse!important}.flex-sm-column-reverse{flex-direction:column-reverse!important}.flex-sm-grow-0{flex-grow:0!important}.flex-sm-grow-1{flex-grow:1!important}.flex-sm-shrink-0{flex-shrink:0!important}.flex-sm-shrink-1{flex-shrink:1!important}.flex-sm-wrap{flex-wrap:wrap!important}.flex-sm-nowrap{flex-wrap:nowrap!important}.flex-sm-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-sm-0{gap:0!important}.gap-sm-1{gap:.25rem!important}.gap-sm-2{gap:.5rem!important}.gap-sm-3{gap:1rem!important}.gap-sm-4{gap:1.5rem!important}.gap-sm-5{gap:2rem!important}.gap-sm-6{gap:2.5rem!important}.gap-sm-7{gap:3rem!important}.gap-sm-8{gap:3.5rem!important}.justify-content-sm-start{justify-content:flex-start!important}.justify-content-sm-end{justify-content:flex-end!important}.justify-content-sm-center{justify-content:center!important}.justify-content-sm-between{justify-content:space-between!important}.justify-content-sm-around{justify-content:space-around!important}.justify-content-sm-evenly{justify-content:space-evenly!important}.align-items-sm-start{align-items:flex-start!important}.align-items-sm-end{align-items:flex-end!important}.align-items-sm-center{align-items:center!important}.align-items-sm-baseline{align-items:baseline!important}.align-items-sm-stretch{align-items:stretch!important}.align-content-sm-start{align-content:flex-start!important}.align-content-sm-end{align-content:flex-end!important}.align-content-sm-center{align-content:center!important}.align-content-sm-between{align-content:space-between!important}.align-content-sm-around{align-content:space-around!important}.align-content-sm-stretch{align-content:stretch!important}.align-self-sm-auto{align-self:auto!important}.align-self-sm-start{align-self:flex-start!important}.align-self-sm-end{align-self:flex-end!important}.align-self-sm-center{align-self:center!important}.align-self-sm-baseline{align-self:baseline!important}.align-self-sm-stretch{align-self:stretch!important}.order-sm-first{order:-1!important}.order-sm-0{order:0!important}.order-sm-1{order:1!important}.order-sm-2{order:2!important}.order-sm-3{order:3!important}.order-sm-4{order:4!important}.order-sm-5{order:5!important}.order-sm-last{order:6!important}.m-sm-0{margin:0!important}.m-sm-1{margin:.25rem!important}.m-sm-2{margin:.5rem!important}.m-sm-3{margin:1rem!important}.m-sm-4{margin:1.5rem!important}.m-sm-5{margin:2rem!important}.m-sm-6{margin:2.5rem!important}.m-sm-7{margin:3rem!important}.m-sm-8{margin:3.5rem!important}.m-sm-auto{margin:auto!important}.mx-sm-0{margin-left:0!important;margin-right:0!important}.mx-sm-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-sm-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-sm-3{margin-left:1rem!important;margin-right:1rem!important}.mx-sm-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-sm-5{margin-left:2rem!important;margin-right:2rem!important}.mx-sm-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-sm-7{margin-left:3rem!important;margin-right:3rem!important}.mx-sm-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-sm-auto{margin-left:auto!important;margin-right:auto!important}.my-sm-0{margin-bottom:0!important;margin-top:0!important}.my-sm-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-sm-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-sm-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-sm-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-sm-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-sm-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-sm-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-sm-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-sm-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-sm-0{margin-top:0!important}.mt-sm-1{margin-top:.25rem!important}.mt-sm-2{margin-top:.5rem!important}.mt-sm-3{margin-top:1rem!important}.mt-sm-4{margin-top:1.5rem!important}.mt-sm-5{margin-top:2rem!important}.mt-sm-6{margin-top:2.5rem!important}.mt-sm-7{margin-top:3rem!important}.mt-sm-8{margin-top:3.5rem!important}.mt-sm-auto{margin-top:auto!important}.me-sm-0{margin-right:0!important}.me-sm-1{margin-right:.25rem!important}.me-sm-2{margin-right:.5rem!important}.me-sm-3{margin-right:1rem!important}.me-sm-4{margin-right:1.5rem!important}.me-sm-5{margin-right:2rem!important}.me-sm-6{margin-right:2.5rem!important}.me-sm-7{margin-right:3rem!important}.me-sm-8{margin-right:3.5rem!important}.me-sm-auto{margin-right:auto!important}.mb-sm-0{margin-bottom:0!important}.mb-sm-1{margin-bottom:.25rem!important}.mb-sm-2{margin-bottom:.5rem!important}.mb-sm-3{margin-bottom:1rem!important}.mb-sm-4{margin-bottom:1.5rem!important}.mb-sm-5{margin-bottom:2rem!important}.mb-sm-6{margin-bottom:2.5rem!important}.mb-sm-7{margin-bottom:3rem!important}.mb-sm-8{margin-bottom:3.5rem!important}.mb-sm-auto{margin-bottom:auto!important}.ms-sm-0{margin-left:0!important}.ms-sm-1{margin-left:.25rem!important}.ms-sm-2{margin-left:.5rem!important}.ms-sm-3{margin-left:1rem!important}.ms-sm-4{margin-left:1.5rem!important}.ms-sm-5{margin-left:2rem!important}.ms-sm-6{margin-left:2.5rem!important}.ms-sm-7{margin-left:3rem!important}.ms-sm-8{margin-left:3.5rem!important}.ms-sm-auto{margin-left:auto!important}.p-sm-0{padding:0!important}.p-sm-1{padding:.25rem!important}.p-sm-2{padding:.5rem!important}.p-sm-3{padding:1rem!important}.p-sm-4{padding:1.5rem!important}.p-sm-5{padding:2rem!important}.p-sm-6{padding:2.5rem!important}.p-sm-7{padding:3rem!important}.p-sm-8{padding:3.5rem!important}.px-sm-0{padding-left:0!important;padding-right:0!important}.px-sm-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-sm-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-sm-3{padding-left:1rem!important;padding-right:1rem!important}.px-sm-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-sm-5{padding-left:2rem!important;padding-right:2rem!important}.px-sm-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-sm-7{padding-left:3rem!important;padding-right:3rem!important}.px-sm-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-sm-0{padding-bottom:0!important;padding-top:0!important}.py-sm-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-sm-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-sm-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-sm-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-sm-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-sm-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-sm-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-sm-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-sm-0{padding-top:0!important}.pt-sm-1{padding-top:.25rem!important}.pt-sm-2{padding-top:.5rem!important}.pt-sm-3{padding-top:1rem!important}.pt-sm-4{padding-top:1.5rem!important}.pt-sm-5{padding-top:2rem!important}.pt-sm-6{padding-top:2.5rem!important}.pt-sm-7{padding-top:3rem!important}.pt-sm-8{padding-top:3.5rem!important}.pe-sm-0{padding-right:0!important}.pe-sm-1{padding-right:.25rem!important}.pe-sm-2{padding-right:.5rem!important}.pe-sm-3{padding-right:1rem!important}.pe-sm-4{padding-right:1.5rem!important}.pe-sm-5{padding-right:2rem!important}.pe-sm-6{padding-right:2.5rem!important}.pe-sm-7{padding-right:3rem!important}.pe-sm-8{padding-right:3.5rem!important}.pb-sm-0{padding-bottom:0!important}.pb-sm-1{padding-bottom:.25rem!important}.pb-sm-2{padding-bottom:.5rem!important}.pb-sm-3{padding-bottom:1rem!important}.pb-sm-4{padding-bottom:1.5rem!important}.pb-sm-5{padding-bottom:2rem!important}.pb-sm-6{padding-bottom:2.5rem!important}.pb-sm-7{padding-bottom:3rem!important}.pb-sm-8{padding-bottom:3.5rem!important}.ps-sm-0{padding-left:0!important}.ps-sm-1{padding-left:.25rem!important}.ps-sm-2{padding-left:.5rem!important}.ps-sm-3{padding-left:1rem!important}.ps-sm-4{padding-left:1.5rem!important}.ps-sm-5{padding-left:2rem!important}.ps-sm-6{padding-left:2.5rem!important}.ps-sm-7{padding-left:3rem!important}.ps-sm-8{padding-left:3.5rem!important}.text-sm-start{text-align:left!important}.text-sm-end{text-align:right!important}.text-sm-center{text-align:center!important}}@media (min-width:768px){.float-md-start{float:left!important}.float-md-end{float:right!important}.float-md-none{float:none!important}.d-md-inline{display:inline!important}.d-md-inline-block{display:inline-block!important}.d-md-block{display:block!important}.d-md-grid{display:grid!important}.d-md-table{display:table!important}.d-md-table-row{display:table-row!important}.d-md-table-cell{display:table-cell!important}.d-md-flex{display:flex!important}.d-md-inline-flex{display:inline-flex!important}.d-md-none{display:none!important}.flex-md-fill{flex:1 1 auto!important}.flex-md-row{flex-direction:row!important}.flex-md-column{flex-direction:column!important}.flex-md-row-reverse{flex-direction:row-reverse!important}.flex-md-column-reverse{flex-direction:column-reverse!important}.flex-md-grow-0{flex-grow:0!important}.flex-md-grow-1{flex-grow:1!important}.flex-md-shrink-0{flex-shrink:0!important}.flex-md-shrink-1{flex-shrink:1!important}.flex-md-wrap{flex-wrap:wrap!important}.flex-md-nowrap{flex-wrap:nowrap!important}.flex-md-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-md-0{gap:0!important}.gap-md-1{gap:.25rem!important}.gap-md-2{gap:.5rem!important}.gap-md-3{gap:1rem!important}.gap-md-4{gap:1.5rem!important}.gap-md-5{gap:2rem!important}.gap-md-6{gap:2.5rem!important}.gap-md-7{gap:3rem!important}.gap-md-8{gap:3.5rem!important}.justify-content-md-start{justify-content:flex-start!important}.justify-content-md-end{justify-content:flex-end!important}.justify-content-md-center{justify-content:center!important}.justify-content-md-between{justify-content:space-between!important}.justify-content-md-around{justify-content:space-around!important}.justify-content-md-evenly{justify-content:space-evenly!important}.align-items-md-start{align-items:flex-start!important}.align-items-md-end{align-items:flex-end!important}.align-items-md-center{align-items:center!important}.align-items-md-baseline{align-items:baseline!important}.align-items-md-stretch{align-items:stretch!important}.align-content-md-start{align-content:flex-start!important}.align-content-md-end{align-content:flex-end!important}.align-content-md-center{align-content:center!important}.align-content-md-between{align-content:space-between!important}.align-content-md-around{align-content:space-around!important}.align-content-md-stretch{align-content:stretch!important}.align-self-md-auto{align-self:auto!important}.align-self-md-start{align-self:flex-start!important}.align-self-md-end{align-self:flex-end!important}.align-self-md-center{align-self:center!important}.align-self-md-baseline{align-self:baseline!important}.align-self-md-stretch{align-self:stretch!important}.order-md-first{order:-1!important}.order-md-0{order:0!important}.order-md-1{order:1!important}.order-md-2{order:2!important}.order-md-3{order:3!important}.order-md-4{order:4!important}.order-md-5{order:5!important}.order-md-last{order:6!important}.m-md-0{margin:0!important}.m-md-1{margin:.25rem!important}.m-md-2{margin:.5rem!important}.m-md-3{margin:1rem!important}.m-md-4{margin:1.5rem!important}.m-md-5{margin:2rem!important}.m-md-6{margin:2.5rem!important}.m-md-7{margin:3rem!important}.m-md-8{margin:3.5rem!important}.m-md-auto{margin:auto!important}.mx-md-0{margin-left:0!important;margin-right:0!important}.mx-md-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-md-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-md-3{margin-left:1rem!important;margin-right:1rem!important}.mx-md-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-md-5{margin-left:2rem!important;margin-right:2rem!important}.mx-md-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-md-7{margin-left:3rem!important;margin-right:3rem!important}.mx-md-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-md-auto{margin-left:auto!important;margin-right:auto!important}.my-md-0{margin-bottom:0!important;margin-top:0!important}.my-md-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-md-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-md-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-md-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-md-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-md-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-md-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-md-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-md-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-md-0{margin-top:0!important}.mt-md-1{margin-top:.25rem!important}.mt-md-2{margin-top:.5rem!important}.mt-md-3{margin-top:1rem!important}.mt-md-4{margin-top:1.5rem!important}.mt-md-5{margin-top:2rem!important}.mt-md-6{margin-top:2.5rem!important}.mt-md-7{margin-top:3rem!important}.mt-md-8{margin-top:3.5rem!important}.mt-md-auto{margin-top:auto!important}.me-md-0{margin-right:0!important}.me-md-1{margin-right:.25rem!important}.me-md-2{margin-right:.5rem!important}.me-md-3{margin-right:1rem!important}.me-md-4{margin-right:1.5rem!important}.me-md-5{margin-right:2rem!important}.me-md-6{margin-right:2.5rem!important}.me-md-7{margin-right:3rem!important}.me-md-8{margin-right:3.5rem!important}.me-md-auto{margin-right:auto!important}.mb-md-0{margin-bottom:0!important}.mb-md-1{margin-bottom:.25rem!important}.mb-md-2{margin-bottom:.5rem!important}.mb-md-3{margin-bottom:1rem!important}.mb-md-4{margin-bottom:1.5rem!important}.mb-md-5{margin-bottom:2rem!important}.mb-md-6{margin-bottom:2.5rem!important}.mb-md-7{margin-bottom:3rem!important}.mb-md-8{margin-bottom:3.5rem!important}.mb-md-auto{margin-bottom:auto!important}.ms-md-0{margin-left:0!important}.ms-md-1{margin-left:.25rem!important}.ms-md-2{margin-left:.5rem!important}.ms-md-3{margin-left:1rem!important}.ms-md-4{margin-left:1.5rem!important}.ms-md-5{margin-left:2rem!important}.ms-md-6{margin-left:2.5rem!important}.ms-md-7{margin-left:3rem!important}.ms-md-8{margin-left:3.5rem!important}.ms-md-auto{margin-left:auto!important}.p-md-0{padding:0!important}.p-md-1{padding:.25rem!important}.p-md-2{padding:.5rem!important}.p-md-3{padding:1rem!important}.p-md-4{padding:1.5rem!important}.p-md-5{padding:2rem!important}.p-md-6{padding:2.5rem!important}.p-md-7{padding:3rem!important}.p-md-8{padding:3.5rem!important}.px-md-0{padding-left:0!important;padding-right:0!important}.px-md-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-md-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-md-3{padding-left:1rem!important;padding-right:1rem!important}.px-md-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-md-5{padding-left:2rem!important;padding-right:2rem!important}.px-md-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-md-7{padding-left:3rem!important;padding-right:3rem!important}.px-md-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-md-0{padding-bottom:0!important;padding-top:0!important}.py-md-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-md-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-md-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-md-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-md-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-md-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-md-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-md-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-md-0{padding-top:0!important}.pt-md-1{padding-top:.25rem!important}.pt-md-2{padding-top:.5rem!important}.pt-md-3{padding-top:1rem!important}.pt-md-4{padding-top:1.5rem!important}.pt-md-5{padding-top:2rem!important}.pt-md-6{padding-top:2.5rem!important}.pt-md-7{padding-top:3rem!important}.pt-md-8{padding-top:3.5rem!important}.pe-md-0{padding-right:0!important}.pe-md-1{padding-right:.25rem!important}.pe-md-2{padding-right:.5rem!important}.pe-md-3{padding-right:1rem!important}.pe-md-4{padding-right:1.5rem!important}.pe-md-5{padding-right:2rem!important}.pe-md-6{padding-right:2.5rem!important}.pe-md-7{padding-right:3rem!important}.pe-md-8{padding-right:3.5rem!important}.pb-md-0{padding-bottom:0!important}.pb-md-1{padding-bottom:.25rem!important}.pb-md-2{padding-bottom:.5rem!important}.pb-md-3{padding-bottom:1rem!important}.pb-md-4{padding-bottom:1.5rem!important}.pb-md-5{padding-bottom:2rem!important}.pb-md-6{padding-bottom:2.5rem!important}.pb-md-7{padding-bottom:3rem!important}.pb-md-8{padding-bottom:3.5rem!important}.ps-md-0{padding-left:0!important}.ps-md-1{padding-left:.25rem!important}.ps-md-2{padding-left:.5rem!important}.ps-md-3{padding-left:1rem!important}.ps-md-4{padding-left:1.5rem!important}.ps-md-5{padding-left:2rem!important}.ps-md-6{padding-left:2.5rem!important}.ps-md-7{padding-left:3rem!important}.ps-md-8{padding-left:3.5rem!important}.text-md-start{text-align:left!important}.text-md-end{text-align:right!important}.text-md-center{text-align:center!important}}@media (min-width:992px){.float-lg-start{float:left!important}.float-lg-end{float:right!important}.float-lg-none{float:none!important}.d-lg-inline{display:inline!important}.d-lg-inline-block{display:inline-block!important}.d-lg-block{display:block!important}.d-lg-grid{display:grid!important}.d-lg-table{display:table!important}.d-lg-table-row{display:table-row!important}.d-lg-table-cell{display:table-cell!important}.d-lg-flex{display:flex!important}.d-lg-inline-flex{display:inline-flex!important}.d-lg-none{display:none!important}.flex-lg-fill{flex:1 1 auto!important}.flex-lg-row{flex-direction:row!important}.flex-lg-column{flex-direction:column!important}.flex-lg-row-reverse{flex-direction:row-reverse!important}.flex-lg-column-reverse{flex-direction:column-reverse!important}.flex-lg-grow-0{flex-grow:0!important}.flex-lg-grow-1{flex-grow:1!important}.flex-lg-shrink-0{flex-shrink:0!important}.flex-lg-shrink-1{flex-shrink:1!important}.flex-lg-wrap{flex-wrap:wrap!important}.flex-lg-nowrap{flex-wrap:nowrap!important}.flex-lg-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-lg-0{gap:0!important}.gap-lg-1{gap:.25rem!important}.gap-lg-2{gap:.5rem!important}.gap-lg-3{gap:1rem!important}.gap-lg-4{gap:1.5rem!important}.gap-lg-5{gap:2rem!important}.gap-lg-6{gap:2.5rem!important}.gap-lg-7{gap:3rem!important}.gap-lg-8{gap:3.5rem!important}.justify-content-lg-start{justify-content:flex-start!important}.justify-content-lg-end{justify-content:flex-end!important}.justify-content-lg-center{justify-content:center!important}.justify-content-lg-between{justify-content:space-between!important}.justify-content-lg-around{justify-content:space-around!important}.justify-content-lg-evenly{justify-content:space-evenly!important}.align-items-lg-start{align-items:flex-start!important}.align-items-lg-end{align-items:flex-end!important}.align-items-lg-center{align-items:center!important}.align-items-lg-baseline{align-items:baseline!important}.align-items-lg-stretch{align-items:stretch!important}.align-content-lg-start{align-content:flex-start!important}.align-content-lg-end{align-content:flex-end!important}.align-content-lg-center{align-content:center!important}.align-content-lg-between{align-content:space-between!important}.align-content-lg-around{align-content:space-around!important}.align-content-lg-stretch{align-content:stretch!important}.align-self-lg-auto{align-self:auto!important}.align-self-lg-start{align-self:flex-start!important}.align-self-lg-end{align-self:flex-end!important}.align-self-lg-center{align-self:center!important}.align-self-lg-baseline{align-self:baseline!important}.align-self-lg-stretch{align-self:stretch!important}.order-lg-first{order:-1!important}.order-lg-0{order:0!important}.order-lg-1{order:1!important}.order-lg-2{order:2!important}.order-lg-3{order:3!important}.order-lg-4{order:4!important}.order-lg-5{order:5!important}.order-lg-last{order:6!important}.m-lg-0{margin:0!important}.m-lg-1{margin:.25rem!important}.m-lg-2{margin:.5rem!important}.m-lg-3{margin:1rem!important}.m-lg-4{margin:1.5rem!important}.m-lg-5{margin:2rem!important}.m-lg-6{margin:2.5rem!important}.m-lg-7{margin:3rem!important}.m-lg-8{margin:3.5rem!important}.m-lg-auto{margin:auto!important}.mx-lg-0{margin-left:0!important;margin-right:0!important}.mx-lg-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-lg-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-lg-3{margin-left:1rem!important;margin-right:1rem!important}.mx-lg-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-lg-5{margin-left:2rem!important;margin-right:2rem!important}.mx-lg-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-lg-7{margin-left:3rem!important;margin-right:3rem!important}.mx-lg-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-lg-auto{margin-left:auto!important;margin-right:auto!important}.my-lg-0{margin-bottom:0!important;margin-top:0!important}.my-lg-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-lg-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-lg-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-lg-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-lg-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-lg-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-lg-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-lg-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-lg-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-lg-0{margin-top:0!important}.mt-lg-1{margin-top:.25rem!important}.mt-lg-2{margin-top:.5rem!important}.mt-lg-3{margin-top:1rem!important}.mt-lg-4{margin-top:1.5rem!important}.mt-lg-5{margin-top:2rem!important}.mt-lg-6{margin-top:2.5rem!important}.mt-lg-7{margin-top:3rem!important}.mt-lg-8{margin-top:3.5rem!important}.mt-lg-auto{margin-top:auto!important}.me-lg-0{margin-right:0!important}.me-lg-1{margin-right:.25rem!important}.me-lg-2{margin-right:.5rem!important}.me-lg-3{margin-right:1rem!important}.me-lg-4{margin-right:1.5rem!important}.me-lg-5{margin-right:2rem!important}.me-lg-6{margin-right:2.5rem!important}.me-lg-7{margin-right:3rem!important}.me-lg-8{margin-right:3.5rem!important}.me-lg-auto{margin-right:auto!important}.mb-lg-0{margin-bottom:0!important}.mb-lg-1{margin-bottom:.25rem!important}.mb-lg-2{margin-bottom:.5rem!important}.mb-lg-3{margin-bottom:1rem!important}.mb-lg-4{margin-bottom:1.5rem!important}.mb-lg-5{margin-bottom:2rem!important}.mb-lg-6{margin-bottom:2.5rem!important}.mb-lg-7{margin-bottom:3rem!important}.mb-lg-8{margin-bottom:3.5rem!important}.mb-lg-auto{margin-bottom:auto!important}.ms-lg-0{margin-left:0!important}.ms-lg-1{margin-left:.25rem!important}.ms-lg-2{margin-left:.5rem!important}.ms-lg-3{margin-left:1rem!important}.ms-lg-4{margin-left:1.5rem!important}.ms-lg-5{margin-left:2rem!important}.ms-lg-6{margin-left:2.5rem!important}.ms-lg-7{margin-left:3rem!important}.ms-lg-8{margin-left:3.5rem!important}.ms-lg-auto{margin-left:auto!important}.p-lg-0{padding:0!important}.p-lg-1{padding:.25rem!important}.p-lg-2{padding:.5rem!important}.p-lg-3{padding:1rem!important}.p-lg-4{padding:1.5rem!important}.p-lg-5{padding:2rem!important}.p-lg-6{padding:2.5rem!important}.p-lg-7{padding:3rem!important}.p-lg-8{padding:3.5rem!important}.px-lg-0{padding-left:0!important;padding-right:0!important}.px-lg-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-lg-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-lg-3{padding-left:1rem!important;padding-right:1rem!important}.px-lg-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-lg-5{padding-left:2rem!important;padding-right:2rem!important}.px-lg-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-lg-7{padding-left:3rem!important;padding-right:3rem!important}.px-lg-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-lg-0{padding-bottom:0!important;padding-top:0!important}.py-lg-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-lg-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-lg-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-lg-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-lg-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-lg-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-lg-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-lg-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-lg-0{padding-top:0!important}.pt-lg-1{padding-top:.25rem!important}.pt-lg-2{padding-top:.5rem!important}.pt-lg-3{padding-top:1rem!important}.pt-lg-4{padding-top:1.5rem!important}.pt-lg-5{padding-top:2rem!important}.pt-lg-6{padding-top:2.5rem!important}.pt-lg-7{padding-top:3rem!important}.pt-lg-8{padding-top:3.5rem!important}.pe-lg-0{padding-right:0!important}.pe-lg-1{padding-right:.25rem!important}.pe-lg-2{padding-right:.5rem!important}.pe-lg-3{padding-right:1rem!important}.pe-lg-4{padding-right:1.5rem!important}.pe-lg-5{padding-right:2rem!important}.pe-lg-6{padding-right:2.5rem!important}.pe-lg-7{padding-right:3rem!important}.pe-lg-8{padding-right:3.5rem!important}.pb-lg-0{padding-bottom:0!important}.pb-lg-1{padding-bottom:.25rem!important}.pb-lg-2{padding-bottom:.5rem!important}.pb-lg-3{padding-bottom:1rem!important}.pb-lg-4{padding-bottom:1.5rem!important}.pb-lg-5{padding-bottom:2rem!important}.pb-lg-6{padding-bottom:2.5rem!important}.pb-lg-7{padding-bottom:3rem!important}.pb-lg-8{padding-bottom:3.5rem!important}.ps-lg-0{padding-left:0!important}.ps-lg-1{padding-left:.25rem!important}.ps-lg-2{padding-left:.5rem!important}.ps-lg-3{padding-left:1rem!important}.ps-lg-4{padding-left:1.5rem!important}.ps-lg-5{padding-left:2rem!important}.ps-lg-6{padding-left:2.5rem!important}.ps-lg-7{padding-left:3rem!important}.ps-lg-8{padding-left:3.5rem!important}.text-lg-start{text-align:left!important}.text-lg-end{text-align:right!important}.text-lg-center{text-align:center!important}}@media (min-width:1200px){.float-xl-start{float:left!important}.float-xl-end{float:right!important}.float-xl-none{float:none!important}.d-xl-inline{display:inline!important}.d-xl-inline-block{display:inline-block!important}.d-xl-block{display:block!important}.d-xl-grid{display:grid!important}.d-xl-table{display:table!important}.d-xl-table-row{display:table-row!important}.d-xl-table-cell{display:table-cell!important}.d-xl-flex{display:flex!important}.d-xl-inline-flex{display:inline-flex!important}.d-xl-none{display:none!important}.flex-xl-fill{flex:1 1 auto!important}.flex-xl-row{flex-direction:row!important}.flex-xl-column{flex-direction:column!important}.flex-xl-row-reverse{flex-direction:row-reverse!important}.flex-xl-column-reverse{flex-direction:column-reverse!important}.flex-xl-grow-0{flex-grow:0!important}.flex-xl-grow-1{flex-grow:1!important}.flex-xl-shrink-0{flex-shrink:0!important}.flex-xl-shrink-1{flex-shrink:1!important}.flex-xl-wrap{flex-wrap:wrap!important}.flex-xl-nowrap{flex-wrap:nowrap!important}.flex-xl-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-xl-0{gap:0!important}.gap-xl-1{gap:.25rem!important}.gap-xl-2{gap:.5rem!important}.gap-xl-3{gap:1rem!important}.gap-xl-4{gap:1.5rem!important}.gap-xl-5{gap:2rem!important}.gap-xl-6{gap:2.5rem!important}.gap-xl-7{gap:3rem!important}.gap-xl-8{gap:3.5rem!important}.justify-content-xl-start{justify-content:flex-start!important}.justify-content-xl-end{justify-content:flex-end!important}.justify-content-xl-center{justify-content:center!important}.justify-content-xl-between{justify-content:space-between!important}.justify-content-xl-around{justify-content:space-around!important}.justify-content-xl-evenly{justify-content:space-evenly!important}.align-items-xl-start{align-items:flex-start!important}.align-items-xl-end{align-items:flex-end!important}.align-items-xl-center{align-items:center!important}.align-items-xl-baseline{align-items:baseline!important}.align-items-xl-stretch{align-items:stretch!important}.align-content-xl-start{align-content:flex-start!important}.align-content-xl-end{align-content:flex-end!important}.align-content-xl-center{align-content:center!important}.align-content-xl-between{align-content:space-between!important}.align-content-xl-around{align-content:space-around!important}.align-content-xl-stretch{align-content:stretch!important}.align-self-xl-auto{align-self:auto!important}.align-self-xl-start{align-self:flex-start!important}.align-self-xl-end{align-self:flex-end!important}.align-self-xl-center{align-self:center!important}.align-self-xl-baseline{align-self:baseline!important}.align-self-xl-stretch{align-self:stretch!important}.order-xl-first{order:-1!important}.order-xl-0{order:0!important}.order-xl-1{order:1!important}.order-xl-2{order:2!important}.order-xl-3{order:3!important}.order-xl-4{order:4!important}.order-xl-5{order:5!important}.order-xl-last{order:6!important}.m-xl-0{margin:0!important}.m-xl-1{margin:.25rem!important}.m-xl-2{margin:.5rem!important}.m-xl-3{margin:1rem!important}.m-xl-4{margin:1.5rem!important}.m-xl-5{margin:2rem!important}.m-xl-6{margin:2.5rem!important}.m-xl-7{margin:3rem!important}.m-xl-8{margin:3.5rem!important}.m-xl-auto{margin:auto!important}.mx-xl-0{margin-left:0!important;margin-right:0!important}.mx-xl-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-xl-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-xl-3{margin-left:1rem!important;margin-right:1rem!important}.mx-xl-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-xl-5{margin-left:2rem!important;margin-right:2rem!important}.mx-xl-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-xl-7{margin-left:3rem!important;margin-right:3rem!important}.mx-xl-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-xl-auto{margin-left:auto!important;margin-right:auto!important}.my-xl-0{margin-bottom:0!important;margin-top:0!important}.my-xl-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-xl-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-xl-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-xl-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-xl-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-xl-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-xl-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-xl-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-xl-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-xl-0{margin-top:0!important}.mt-xl-1{margin-top:.25rem!important}.mt-xl-2{margin-top:.5rem!important}.mt-xl-3{margin-top:1rem!important}.mt-xl-4{margin-top:1.5rem!important}.mt-xl-5{margin-top:2rem!important}.mt-xl-6{margin-top:2.5rem!important}.mt-xl-7{margin-top:3rem!important}.mt-xl-8{margin-top:3.5rem!important}.mt-xl-auto{margin-top:auto!important}.me-xl-0{margin-right:0!important}.me-xl-1{margin-right:.25rem!important}.me-xl-2{margin-right:.5rem!important}.me-xl-3{margin-right:1rem!important}.me-xl-4{margin-right:1.5rem!important}.me-xl-5{margin-right:2rem!important}.me-xl-6{margin-right:2.5rem!important}.me-xl-7{margin-right:3rem!important}.me-xl-8{margin-right:3.5rem!important}.me-xl-auto{margin-right:auto!important}.mb-xl-0{margin-bottom:0!important}.mb-xl-1{margin-bottom:.25rem!important}.mb-xl-2{margin-bottom:.5rem!important}.mb-xl-3{margin-bottom:1rem!important}.mb-xl-4{margin-bottom:1.5rem!important}.mb-xl-5{margin-bottom:2rem!important}.mb-xl-6{margin-bottom:2.5rem!important}.mb-xl-7{margin-bottom:3rem!important}.mb-xl-8{margin-bottom:3.5rem!important}.mb-xl-auto{margin-bottom:auto!important}.ms-xl-0{margin-left:0!important}.ms-xl-1{margin-left:.25rem!important}.ms-xl-2{margin-left:.5rem!important}.ms-xl-3{margin-left:1rem!important}.ms-xl-4{margin-left:1.5rem!important}.ms-xl-5{margin-left:2rem!important}.ms-xl-6{margin-left:2.5rem!important}.ms-xl-7{margin-left:3rem!important}.ms-xl-8{margin-left:3.5rem!important}.ms-xl-auto{margin-left:auto!important}.p-xl-0{padding:0!important}.p-xl-1{padding:.25rem!important}.p-xl-2{padding:.5rem!important}.p-xl-3{padding:1rem!important}.p-xl-4{padding:1.5rem!important}.p-xl-5{padding:2rem!important}.p-xl-6{padding:2.5rem!important}.p-xl-7{padding:3rem!important}.p-xl-8{padding:3.5rem!important}.px-xl-0{padding-left:0!important;padding-right:0!important}.px-xl-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-xl-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-xl-3{padding-left:1rem!important;padding-right:1rem!important}.px-xl-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-xl-5{padding-left:2rem!important;padding-right:2rem!important}.px-xl-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-xl-7{padding-left:3rem!important;padding-right:3rem!important}.px-xl-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-xl-0{padding-bottom:0!important;padding-top:0!important}.py-xl-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-xl-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-xl-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-xl-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-xl-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-xl-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-xl-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-xl-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-xl-0{padding-top:0!important}.pt-xl-1{padding-top:.25rem!important}.pt-xl-2{padding-top:.5rem!important}.pt-xl-3{padding-top:1rem!important}.pt-xl-4{padding-top:1.5rem!important}.pt-xl-5{padding-top:2rem!important}.pt-xl-6{padding-top:2.5rem!important}.pt-xl-7{padding-top:3rem!important}.pt-xl-8{padding-top:3.5rem!important}.pe-xl-0{padding-right:0!important}.pe-xl-1{padding-right:.25rem!important}.pe-xl-2{padding-right:.5rem!important}.pe-xl-3{padding-right:1rem!important}.pe-xl-4{padding-right:1.5rem!important}.pe-xl-5{padding-right:2rem!important}.pe-xl-6{padding-right:2.5rem!important}.pe-xl-7{padding-right:3rem!important}.pe-xl-8{padding-right:3.5rem!important}.pb-xl-0{padding-bottom:0!important}.pb-xl-1{padding-bottom:.25rem!important}.pb-xl-2{padding-bottom:.5rem!important}.pb-xl-3{padding-bottom:1rem!important}.pb-xl-4{padding-bottom:1.5rem!important}.pb-xl-5{padding-bottom:2rem!important}.pb-xl-6{padding-bottom:2.5rem!important}.pb-xl-7{padding-bottom:3rem!important}.pb-xl-8{padding-bottom:3.5rem!important}.ps-xl-0{padding-left:0!important}.ps-xl-1{padding-left:.25rem!important}.ps-xl-2{padding-left:.5rem!important}.ps-xl-3{padding-left:1rem!important}.ps-xl-4{padding-left:1.5rem!important}.ps-xl-5{padding-left:2rem!important}.ps-xl-6{padding-left:2.5rem!important}.ps-xl-7{padding-left:3rem!important}.ps-xl-8{padding-left:3.5rem!important}.text-xl-start{text-align:left!important}.text-xl-end{text-align:right!important}.text-xl-center{text-align:center!important}}@media (min-width:1400px){.float-xxl-start{float:left!important}.float-xxl-end{float:right!important}.float-xxl-none{float:none!important}.d-xxl-inline{display:inline!important}.d-xxl-inline-block{display:inline-block!important}.d-xxl-block{display:block!important}.d-xxl-grid{display:grid!important}.d-xxl-table{display:table!important}.d-xxl-table-row{display:table-row!important}.d-xxl-table-cell{display:table-cell!important}.d-xxl-flex{display:flex!important}.d-xxl-inline-flex{display:inline-flex!important}.d-xxl-none{display:none!important}.flex-xxl-fill{flex:1 1 auto!important}.flex-xxl-row{flex-direction:row!important}.flex-xxl-column{flex-direction:column!important}.flex-xxl-row-reverse{flex-direction:row-reverse!important}.flex-xxl-column-reverse{flex-direction:column-reverse!important}.flex-xxl-grow-0{flex-grow:0!important}.flex-xxl-grow-1{flex-grow:1!important}.flex-xxl-shrink-0{flex-shrink:0!important}.flex-xxl-shrink-1{flex-shrink:1!important}.flex-xxl-wrap{flex-wrap:wrap!important}.flex-xxl-nowrap{flex-wrap:nowrap!important}.flex-xxl-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-xxl-0{gap:0!important}.gap-xxl-1{gap:.25rem!important}.gap-xxl-2{gap:.5rem!important}.gap-xxl-3{gap:1rem!important}.gap-xxl-4{gap:1.5rem!important}.gap-xxl-5{gap:2rem!important}.gap-xxl-6{gap:2.5rem!important}.gap-xxl-7{gap:3rem!important}.gap-xxl-8{gap:3.5rem!important}.justify-content-xxl-start{justify-content:flex-start!important}.justify-content-xxl-end{justify-content:flex-end!important}.justify-content-xxl-center{justify-content:center!important}.justify-content-xxl-between{justify-content:space-between!important}.justify-content-xxl-around{justify-content:space-around!important}.justify-content-xxl-evenly{justify-content:space-evenly!important}.align-items-xxl-start{align-items:flex-start!important}.align-items-xxl-end{align-items:flex-end!important}.align-items-xxl-center{align-items:center!important}.align-items-xxl-baseline{align-items:baseline!important}.align-items-xxl-stretch{align-items:stretch!important}.align-content-xxl-start{align-content:flex-start!important}.align-content-xxl-end{align-content:flex-end!important}.align-content-xxl-center{align-content:center!important}.align-content-xxl-between{align-content:space-between!important}.align-content-xxl-around{align-content:space-around!important}.align-content-xxl-stretch{align-content:stretch!important}.align-self-xxl-auto{align-self:auto!important}.align-self-xxl-start{align-self:flex-start!important}.align-self-xxl-end{align-self:flex-end!important}.align-self-xxl-center{align-self:center!important}.align-self-xxl-baseline{align-self:baseline!important}.align-self-xxl-stretch{align-self:stretch!important}.order-xxl-first{order:-1!important}.order-xxl-0{order:0!important}.order-xxl-1{order:1!important}.order-xxl-2{order:2!important}.order-xxl-3{order:3!important}.order-xxl-4{order:4!important}.order-xxl-5{order:5!important}.order-xxl-last{order:6!important}.m-xxl-0{margin:0!important}.m-xxl-1{margin:.25rem!important}.m-xxl-2{margin:.5rem!important}.m-xxl-3{margin:1rem!important}.m-xxl-4{margin:1.5rem!important}.m-xxl-5{margin:2rem!important}.m-xxl-6{margin:2.5rem!important}.m-xxl-7{margin:3rem!important}.m-xxl-8{margin:3.5rem!important}.m-xxl-auto{margin:auto!important}.mx-xxl-0{margin-left:0!important;margin-right:0!important}.mx-xxl-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-xxl-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-xxl-3{margin-left:1rem!important;margin-right:1rem!important}.mx-xxl-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-xxl-5{margin-left:2rem!important;margin-right:2rem!important}.mx-xxl-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-xxl-7{margin-left:3rem!important;margin-right:3rem!important}.mx-xxl-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-xxl-auto{margin-left:auto!important;margin-right:auto!important}.my-xxl-0{margin-bottom:0!important;margin-top:0!important}.my-xxl-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-xxl-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-xxl-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-xxl-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-xxl-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-xxl-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-xxl-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-xxl-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-xxl-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-xxl-0{margin-top:0!important}.mt-xxl-1{margin-top:.25rem!important}.mt-xxl-2{margin-top:.5rem!important}.mt-xxl-3{margin-top:1rem!important}.mt-xxl-4{margin-top:1.5rem!important}.mt-xxl-5{margin-top:2rem!important}.mt-xxl-6{margin-top:2.5rem!important}.mt-xxl-7{margin-top:3rem!important}.mt-xxl-8{margin-top:3.5rem!important}.mt-xxl-auto{margin-top:auto!important}.me-xxl-0{margin-right:0!important}.me-xxl-1{margin-right:.25rem!important}.me-xxl-2{margin-right:.5rem!important}.me-xxl-3{margin-right:1rem!important}.me-xxl-4{margin-right:1.5rem!important}.me-xxl-5{margin-right:2rem!important}.me-xxl-6{margin-right:2.5rem!important}.me-xxl-7{margin-right:3rem!important}.me-xxl-8{margin-right:3.5rem!important}.me-xxl-auto{margin-right:auto!important}.mb-xxl-0{margin-bottom:0!important}.mb-xxl-1{margin-bottom:.25rem!important}.mb-xxl-2{margin-bottom:.5rem!important}.mb-xxl-3{margin-bottom:1rem!important}.mb-xxl-4{margin-bottom:1.5rem!important}.mb-xxl-5{margin-bottom:2rem!important}.mb-xxl-6{margin-bottom:2.5rem!important}.mb-xxl-7{margin-bottom:3rem!important}.mb-xxl-8{margin-bottom:3.5rem!important}.mb-xxl-auto{margin-bottom:auto!important}.ms-xxl-0{margin-left:0!important}.ms-xxl-1{margin-left:.25rem!important}.ms-xxl-2{margin-left:.5rem!important}.ms-xxl-3{margin-left:1rem!important}.ms-xxl-4{margin-left:1.5rem!important}.ms-xxl-5{margin-left:2rem!important}.ms-xxl-6{margin-left:2.5rem!important}.ms-xxl-7{margin-left:3rem!important}.ms-xxl-8{margin-left:3.5rem!important}.ms-xxl-auto{margin-left:auto!important}.p-xxl-0{padding:0!important}.p-xxl-1{padding:.25rem!important}.p-xxl-2{padding:.5rem!important}.p-xxl-3{padding:1rem!important}.p-xxl-4{padding:1.5rem!important}.p-xxl-5{padding:2rem!important}.p-xxl-6{padding:2.5rem!important}.p-xxl-7{padding:3rem!important}.p-xxl-8{padding:3.5rem!important}.px-xxl-0{padding-left:0!important;padding-right:0!important}.px-xxl-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-xxl-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-xxl-3{padding-left:1rem!important;padding-right:1rem!important}.px-xxl-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-xxl-5{padding-left:2rem!important;padding-right:2rem!important}.px-xxl-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-xxl-7{padding-left:3rem!important;padding-right:3rem!important}.px-xxl-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-xxl-0{padding-bottom:0!important;padding-top:0!important}.py-xxl-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-xxl-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-xxl-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-xxl-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-xxl-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-xxl-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-xxl-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-xxl-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-xxl-0{padding-top:0!important}.pt-xxl-1{padding-top:.25rem!important}.pt-xxl-2{padding-top:.5rem!important}.pt-xxl-3{padding-top:1rem!important}.pt-xxl-4{padding-top:1.5rem!important}.pt-xxl-5{padding-top:2rem!important}.pt-xxl-6{padding-top:2.5rem!important}.pt-xxl-7{padding-top:3rem!important}.pt-xxl-8{padding-top:3.5rem!important}.pe-xxl-0{padding-right:0!important}.pe-xxl-1{padding-right:.25rem!important}.pe-xxl-2{padding-right:.5rem!important}.pe-xxl-3{padding-right:1rem!important}.pe-xxl-4{padding-right:1.5rem!important}.pe-xxl-5{padding-right:2rem!important}.pe-xxl-6{padding-right:2.5rem!important}.pe-xxl-7{padding-right:3rem!important}.pe-xxl-8{padding-right:3.5rem!important}.pb-xxl-0{padding-bottom:0!important}.pb-xxl-1{padding-bottom:.25rem!important}.pb-xxl-2{padding-bottom:.5rem!important}.pb-xxl-3{padding-bottom:1rem!important}.pb-xxl-4{padding-bottom:1.5rem!important}.pb-xxl-5{padding-bottom:2rem!important}.pb-xxl-6{padding-bottom:2.5rem!important}.pb-xxl-7{padding-bottom:3rem!important}.pb-xxl-8{padding-bottom:3.5rem!important}.ps-xxl-0{padding-left:0!important}.ps-xxl-1{padding-left:.25rem!important}.ps-xxl-2{padding-left:.5rem!important}.ps-xxl-3{padding-left:1rem!important}.ps-xxl-4{padding-left:1.5rem!important}.ps-xxl-5{padding-left:2rem!important}.ps-xxl-6{padding-left:2.5rem!important}.ps-xxl-7{padding-left:3rem!important}.ps-xxl-8{padding-left:3.5rem!important}.text-xxl-start{text-align:left!important}.text-xxl-end{text-align:right!important}.text-xxl-center{text-align:center!important}}@media (min-width:1200px){.fs-0{font-size:3.5rem!important}.fs-1{font-size:2.5rem!important}.fs-2{font-size:2rem!important}.fs-3{font-size:1.5rem!important}}@media print{.d-print-inline{display:inline!important}.d-print-inline-block{display:inline-block!important}.d-print-block{display:block!important}.d-print-grid{display:grid!important}.d-print-table{display:table!important}.d-print-table-row{display:table-row!important}.d-print-table-cell{display:table-cell!important}.d-print-flex{display:flex!important}.d-print-inline-flex{display:inline-flex!important}.d-print-none{display:none!important}}:host{--cgds-primary-rgb:89,37,220;--cgds-secondary-rgb:31,105,255;--cgds-success-rgb:10,130,23;--cgds-info-rgb:15,113,187;--cgds-warning-rgb:247,144,9;--cgds-danger-rgb:215,38,15;--cgds-light-rgb:247,247,249;--cgds-dark-rgb:0,0,0;--cgds-primary:#5925dc;--cgds-secondary:#1f69ff;--cgds-success:#0a8217;--cgds-info:#0f71bb;--cgds-warning:#f79009;--cgds-danger:#d7260f;--cgds-light:#f7f7f9;--cgds-dark:#000;--cgds-gray-100:#f7f7f9;--cgds-gray-200:#e4e7ec;--cgds-gray-300:#d0d5dd;--cgds-gray-400:#98a2b3;--cgds-gray-500:#667085;--cgds-gray-600:#344054;--cgds-gray-700:#1d2939;--cgds-gray-800:#000;--cgds-gray-900:#000;--cgds-primary-100:#ece6fb;--cgds-primary-200:#c7b6f3;--cgds-primary-300:#a386ec;--cgds-primary-400:#7e55e4;--cgds-primary-500:#5925dc;--cgds-primary-600:#491db6;--cgds-primary-700:#39178e;--cgds-primary-800:#291167;--cgds-primary-900:#190a3f;--cgds-secondary-100:#ebf1ff;--cgds-secondary-200:#d3e2ff;--cgds-secondary-300:#9bf;--cgds-secondary-400:#70a0ff;--cgds-secondary-500:#1f69ff;--cgds-secondary-600:#004ff0;--cgds-secondary-700:#0040c2;--cgds-secondary-800:#003194;--cgds-secondary-900:#026;--cgds-success-100:#e7f6e9;--cgds-success-200:#c4e8c8;--cgds-success-300:#9dd9a3;--cgds-success-400:#58be62;--cgds-success-500:#3bb346;--cgds-success-600:#0a8217;--cgds-success-700:#2da337;--cgds-success-800:#043409;--cgds-success-900:#021a05;--cgds-info-100:#e2eff8;--cgds-info-200:#b9d8ee;--cgds-info-300:#90c1e4;--cgds-info-400:#58a1d4;--cgds-info-500:#59a1d4;--cgds-info-600:#0f71bb;--cgds-info-700:#0c5b97;--cgds-info-800:#0a4776;--cgds-info-900:#08395e;--cgds-danger-100:#fff4f3;--cgds-danger-200:#ffcfc8;--cgds-danger-300:#fc9c90;--cgds-danger-400:#fb7463;--cgds-danger-500:#fa5741;--cgds-danger-600:#d7260f;--cgds-danger-700:#f8331c;--cgds-danger-800:#560f06;--cgds-danger-900:#2b0803;--cgds-warning-100:#fffaeb;--cgds-warning-200:#fef0c7;--cgds-warning-300:#fedf89;--cgds-warning-400:#fec84b;--cgds-warning-500:#fdb022;--cgds-warning-600:#f79009;--cgds-warning-700:#dc6803;--cgds-warning-800:#633a04;--cgds-warning-900:#311d02;--cgds-light-100:#f7f7f9;--cgds-light-200:#e4e7ec;--cgds-light-300:#d0d5dd;--cgds-light-400:#98a2b3;--cgds-light-500:#667085;--cgds-light-600:#344054;--cgds-light-700:#1d2939;--cgds-light-800:#000;--cgds-light-900:#000;--cgds-dark-100:#f7f7f9;--cgds-dark-200:#e4e7ec;--cgds-dark-300:#d0d5dd;--cgds-dark-400:#98a2b3;--cgds-dark-500:#667085;--cgds-dark-600:#344054;--cgds-dark-700:#1d2939;--cgds-dark-800:#000;--cgds-dark-900:#000;--overlay-background-color:rgba(0,0,0,.5);--zindex-modal:1055;font-family:var(--cgds-body-font-family,"Inter",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-size:var(--cgds-body-font-size,1rem);font-weight:var(--cgds-body-font-weight,400);line-height:var(--cgds-body-line-height,2)}`;
  
    /**
     * @cssprop --cgds-{stateColor} - State colors in hexadecimal value
     * @cssprop --cgds-{stateColor}-rgb - State colors in rgb value
     * @cssprop --cgds-{stateColor}-{weights} - State colors with different weightage in hexadecimal value
     * @cssprop --cgds-gray-{weights} - State colors with different weightage in hexadecimal value
     * @cssprop --overlay-background-color - The drawer and modal component overlay background color
     * @cssprop --zindex-modal - The drawer and modal component z-index value
     */
    class CgdsElement extends s$3 {
        /** Emits a custom event with more convenient defaults. */
        emit(name, options) {
            const event = new CustomEvent(name, Object.assign({ bubbles: true, cancelable: false, composed: true, detail: {} }, options));
            this.dispatchEvent(event);
            return event;
        }
    }
    CgdsElement.styles = css_248z$1;
  
    function genId (componentName = "", elementName = "") {
        return `id-${Math.random().toString().substring(2, 6)}-cgds-${componentName}-${elementName}`;
    }
  
    const ARROW_DOWN$1 = "ArrowDown";
    const ARROW_UP$1 = "ArrowUp";
    const ESC = "Escape";
    /**
     * @event cgds-show - Emitted event when show instance is called
     * @event cgds-after-show - Emitted event when dropdown has been made visible to the user and CSS transitions have completed
     * @event cgds-hide - Emitted event when hide instance is called
     * @event cgds-after-hide - Emitted event when dropdown has hidden to the user and CSS transitions have completed
     * @event cgds-select - Emitted event when a slot item is selected
     */
    class DropdownElement extends CgdsElement {
        constructor() {
            super(...arguments);
            /** @internal */
            this.myDropdown = e$2();
            /** @internal */
            this.bsDropdown = null;
            /** @internal Unique id generated for the dropdown menu */
            this.dropdownMenuId = genId("dropdown-menu", "ul");
            /** @internal Controls auto-flipping of menu */
            this.noFlip = false;
            /** @internal When true, aligns right edge of menu with right edge of button */
            this.menuAlignRight = false;
            /** @internal The drop position of menu relative to the toggle button */
            this.drop = "down";
            /**  Additional configuration to pass to Popper.js. See https://popper.js.org/ for config opts */
            this.popperOpts = {};
            /** @internal */
            this.modifierOpt = [];
            /** When true, dropdown menu shows on first load */
            this.menuIsOpen = false;
            /** Controls the close behaviour of dropdown menu. By default menu auto-closes when CgdsDropdownItem or area outside dropdown is clicked */
            this.close = "default";
            /** Disables the dropdown toggle */
            this.disabled = false;
        }
        connectedCallback() {
            super.connectedCallback();
            if (this.close !== "inside") {
                document.addEventListener("click", (event) => this._handleClickOutOfElement(event, this));
            }
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            document.removeEventListener("click", (event) => this._handleClickOutOfElement(event, this));
        }
        firstUpdated() {
            this.bsDropdown = new Dropdown(this.myDropdown.value, {
                // autoClose not working as bootstrap is using attribute data-bs-toggle="dropdown" to configure autoclose. But it doesnt look into this attribute in the shadow dom
                reference: "toggle",
                popperConfig: (defaultConfig) => {
                    //working
                    this.dropdownConfig = {
                        placement: "bottom-start",
                        modifiers: !this.noFlip
                            ? this.modifierOpt
                            : [
                                ...this.modifierOpt,
                                {
                                    name: "flip",
                                    options: { fallbackPlacements: [] }
                                }
                            ]
                    };
                    switch (this.drop) {
                        case "up":
                            this.dropdownConfig.placement = this.menuAlignRight ? "top-end" : "top-start";
                            break;
                        case "right":
                            this.dropdownConfig.placement = "right-start";
                            break;
                        case "left":
                            this.dropdownConfig.placement = "left-start";
                            break;
                        case "down":
                            this.dropdownConfig.placement = this.menuAlignRight ? "bottom-end" : "bottom-start";
                            break;
                        default:
                            this.dropdownConfig.placement = undefined;
                            break;
                    }
                    return mergeDeep(defaultConfig, mergeDeep(this.dropdownConfig, this.popperOpts));
                }
            });
            this.myDropdown.value.addEventListener("show.bs.dropdown", () => {
                this.menuIsOpen = true;
                this.emit("cgds-show");
            });
            this.myDropdown.value.addEventListener("shown.bs.dropdown", () => {
                this.menuIsOpen = true;
                this.emit("cgds-after-show");
            });
            this.myDropdown.value.addEventListener("hide.bs.dropdown", () => {
                this.menuIsOpen = false;
                this.emit("cgds-hide");
            });
            this.myDropdown.value.addEventListener("hidden.bs.dropdown", () => {
                this.menuIsOpen = false;
                this.emit("cgds-after-hide");
            });
            this.addEventListener("keydown", this._handleKeyboardMenuEvent);
        }
        /** When invoked, opens the dropdown menu */
        showMenu() {
            this.bsDropdown.show();
        }
        /** When invoked, hides the dropdown menu */
        hideMenu() {
            this.bsDropdown.hide();
        }
        toggleMenu() {
            this.bsDropdown.toggle();
        }
        _handleKeyboardMenuEvent(e) {
            switch (e.key) {
                case ARROW_DOWN$1:
                    e.preventDefault();
                    if (!this.menuIsOpen)
                        return this.showMenu();
                    break;
                case ARROW_UP$1:
                    e.preventDefault();
                    if (!this.menuIsOpen)
                        return this.showMenu();
                    break;
                case ESC:
                    return this.hideMenu();
            }
        }
        _handleClickOutOfElement(e, self) {
            if (!e.composedPath().includes(self)) {
                this.hideMenu();
            }
        }
    }
    DropdownElement.styles = CgdsElement.styles;
    __decorate([
        n$4({ type: Boolean, state: true })
    ], DropdownElement.prototype, "noFlip", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true, state: true })
    ], DropdownElement.prototype, "menuAlignRight", void 0);
    __decorate([
        n$4({ type: String, reflect: true, state: true })
    ], DropdownElement.prototype, "drop", void 0);
    __decorate([
        n$4({ type: Object })
    ], DropdownElement.prototype, "popperOpts", void 0);
    __decorate([
        t$2()
    ], DropdownElement.prototype, "dropdownConfig", void 0);
    __decorate([
        t$2()
    ], DropdownElement.prototype, "modifierOpt", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], DropdownElement.prototype, "menuIsOpen", void 0);
    __decorate([
        n$4({ type: String })
    ], DropdownElement.prototype, "close", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], DropdownElement.prototype, "disabled", void 0);
  
    // @defaultValue decorator
    const defaultValue = (propertyName = "value") => (proto, key) => {
        const ctor = proto.constructor;
        const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
        ctor.prototype.attributeChangedCallback = function (name, old, value) {
            var _a;
            const options = ctor.getPropertyOptions(propertyName);
            const attributeName = (typeof options.attribute === "string" ? options.attribute : propertyName).toLowerCase();
            if (name === attributeName) {
                const converter = options.converter || n$8;
                const fromAttribute = typeof converter === "function" ? converter : (_a = converter === null || converter === void 0 ? void 0 : converter.fromAttribute) !== null && _a !== void 0 ? _a : n$8.fromAttribute;
                const newValue = fromAttribute(value, options.type);
                if (this[propertyName] !== newValue) {
                    this[key] = newValue;
                }
            }
            attributeChangedCallback.call(this, name, old, value);
        };
    };
  
    /**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const o$1=e$3(class extends i{constructor(t){var i;if(super(t),t.type!==t$1.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.it){this.it=new Set,void 0!==i.strings&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.nt)||void 0===r?void 0:r.has(t))&&this.it.add(t);return this.render(s)}const e=i.element.classList;this.it.forEach((t=>{t in s||(e.remove(t),this.it.delete(t));}));for(const t in s){const i=!!s[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.it.add(t)):(e.remove(t),this.it.delete(t)));}return T$1}});
  
    /**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const l$2=l=>null!=l?l:A$1;
  
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const l$1=e$3(class extends i{constructor(r){if(super(r),r.type!==t$1.PROPERTY&&r.type!==t$1.ATTRIBUTE&&r.type!==t$1.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!e$4(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i,[t]){if(t===T$1||t===A$1)return t;const o=i.element,l=i.name;if(i.type===t$1.PROPERTY){if(t===o[l])return T$1}else if(i.type===t$1.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(l))return T$1}else if(i.type===t$1.ATTRIBUTE&&o.getAttribute(l)===t+"")return T$1;return s$2(i),t}});
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class e$1 extends i{constructor(i){if(super(i),this.et=A$1,i.type!==t$1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A$1||null==r)return this.ft=void 0,this.et=r;if(r===T$1)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.et)return this.ft;this.et=r;const s=[r];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e$1.directiveName="unsafeHTML",e$1.resultType=1;
  
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class t extends e$1{}t.directiveName="unsafeSVG",t.resultType=2;const o=e$3(t);
  
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const e=Symbol.for(""),l=t=>{if((null==t?void 0:t.r)===e)return null==t?void 0:t._$litStatic$},s=new Map,a=t=>(r,...e)=>{const o=e.length;let i,a;const n=[],u=[];let c,$=0,f=!1;for(;$<o;){for(c=r[$];$<o&&void 0!==(a=e[$],i=l(a));)c+=i+r[++$],f=!0;$!==o&&u.push(a),n.push(c),$++;}if($===o&&n.push(r[o]),f){const t=n.join("$$lit$$");void 0===(r=s.get(t))&&(n.raw=n,s.set(t,r=n)),e=u;}return t(r,...e)},n=a(x$1);
  
    const reportValidityOverloads = new WeakMap();
    class FormSubmitController {
        constructor(host, options) {
            (this.host = host).addController(this);
            this.options = Object.assign({ form: (input) => input.closest("form"), name: (input) => input.name, value: (input) => input.value, defaultValue: (input) => input.defaultValue, disabled: (input) => input.disabled, reportValidity: (input) => {
                    return typeof input.reportValidity === "function" ? input.reportValidity() : true;
                }, setValue: (input, value) => {
                    input.value = value;
                } }, options);
            this.handleFormData = this.handleFormData.bind(this);
            this.handleFormSubmit = this.handleFormSubmit.bind(this);
            this.handleFormReset = this.handleFormReset.bind(this);
            this.reportFormValidity = this.reportFormValidity.bind(this);
        }
        hostConnected() {
            this.form = this.options.form(this.host);
            if (this.form) {
                this.form.addEventListener("formdata", this.handleFormData);
                this.form.addEventListener("submit", this.handleFormSubmit);
                this.form.addEventListener("reset", this.handleFormReset);
                // Overload the form's reportValidity() method so it looks at Shoelace form controls
                if (!reportValidityOverloads.has(this.form)) {
                    reportValidityOverloads.set(this.form, this.form.reportValidity);
                    this.form.reportValidity = () => this.reportFormValidity();
                }
            }
        }
        hostDisconnected() {
            if (this.form) {
                this.form.removeEventListener("formdata", this.handleFormData);
                this.form.removeEventListener("submit", this.handleFormSubmit);
                this.form.removeEventListener("reset", this.handleFormReset);
                // Remove the overload and restore the original method
                if (reportValidityOverloads.has(this.form)) {
                    this.form.reportValidity = reportValidityOverloads.get(this.form);
                    reportValidityOverloads.delete(this.form);
                }
                this.form = undefined;
            }
        }
        handleFormData(event) {
            const disabled = this.options.disabled(this.host);
            const name = this.options.name(this.host);
            const value = this.options.value(this.host);
            if (!disabled && typeof name === "string" && typeof value !== "undefined") {
                if (Array.isArray(value)) {
                    value.forEach(val => {
                        event.formData.append(name, val.toString());
                    });
                }
                else {
                    event.formData.append(name, value.toString());
                }
            }
        }
        handleFormSubmit(event) {
            const disabled = this.options.disabled(this.host);
            const reportValidity = this.options.reportValidity;
            if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }
        handleFormReset() {
            this.options.setValue(this.host, this.options.defaultValue(this.host));
        }
        reportFormValidity() {
            //
            // Shoelace form controls work hard to act like regular form controls. They support the Constraint Validation API
            // and its associated methods such as setCustomValidity() and reportValidity(). However, the HTMLFormElement also
            // has a reportValidity() method that will trigger validation on all child controls. Since we're not yet using
            // ElementInternals, we need to overload this method so it looks for any element with the reportValidity() method.
            //
            // We preserve the original method in a WeakMap, but we don't call it from the overload because that would trigger
            // validations in an unexpected order. When the element disconnects, we revert to the original behavior. This won't
            // be necessary once we can use ElementInternals.
            //
            // Note that we're also honoring the form's novalidate attribute.
            //
            if (this.form && !this.form.noValidate) {
                // This seems sloppy, but checking all elements will cover native inputs, Shoelace inputs, and other custom
                // elements that support the constraint validation API.
                const elements = this.form.querySelectorAll("*");
                for (const element of elements) {
                    if (typeof element.reportValidity === "function") {
                        if (!element.reportValidity()) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        doAction(type, invoker) {
            if (this.form) {
                const button = document.createElement("button");
                button.type = type;
                button.style.position = "absolute";
                button.style.width = "0";
                button.style.height = "0";
                button.style.clipPath = "inset(50%)";
                button.style.overflow = "hidden";
                button.style.whiteSpace = "nowrap";
                // Pass form attributes through to the temporary button
                if (invoker) {
                    ["formaction", "formmethod", "formnovalidate", "formtarget"].forEach(attr => {
                        if (invoker.hasAttribute(attr)) {
                            button.setAttribute(attr, invoker.getAttribute(attr));
                        }
                    });
                }
                this.form.append(button);
                button.click();
                button.remove();
            }
        }
        /** Resets the form, restoring all the control to their default value */
        reset(invoker) {
            this.doAction("reset", invoker);
        }
        /** Submits the form, triggering validation and form data injection. */
        submit(invoker) {
            // Calling form.submit() bypasses the submit event and constraint validation. To prevent this, we can inject a
            // native submit button into the form, "click" it, then remove it to simulate a standard form submission.
            this.doAction("submit", invoker);
        }
    }
  
    // @watch decorator
    //
    // Runs when an observed property changes, e.g. @property or @state, but before the component updates.
    //
    // To wait for an update to complete after a change occurs, use `await this.updateComplete` in the handler. To start
    // watching after the initial update/render, use `{ waitUntilFirstUpdate: true }` or `this.hasUpdated` in the handler.
    //
    // Usage:
    //
    //  @watch('propName')
    //  handlePropChange(oldValue, newValue) {
    //    ...
    //  }
    function watch(propName, options) {
        const resolvedOptions = Object.assign({ waitUntilFirstUpdate: false }, options);
        return (proto, decoratedFnName) => {
            // @ts-expect-error -- update is a protected property
            const { update } = proto;
            if (propName in proto) {
                const propNameKey = propName;
                // @ts-expect-error -- update is a protected property
                proto.update = function (changedProps) {
                    if (changedProps.has(propNameKey)) {
                        const oldValue = changedProps.get(propNameKey);
                        const newValue = this[propNameKey];
                        if (oldValue !== newValue) {
                            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
                                this[decoratedFnName](oldValue, newValue);
                            }
                        }
                    }
                    update.call(this, changedProps);
                };
            }
        };
    }
  
    /**
     * @summary Text inputs allow your users to enter letters, numbers and symbols on a single line.
     *
     * @event cgds-change - Emitted when an alteration to the control's value is committed by the user.
     * @event cgds-input - Emitted when the control receives input and its value changes.
     * @event cgds-focus - Emitted when input is in focus.
     * @event cgds-blur - Emitted when input is not in focus.
     *
     */
    class CgdsInput extends CgdsElement {
        constructor() {
            super(...arguments);
            /**@internal */
            this.formSubmitController = new FormSubmitController(this);
            /** The type of input which works the same as HTMLInputElement*/
            this.type = "text";
            /** The input's label  */
            this.label = "";
            /** The input's hint text below the label */
            this.hintText = "";
            /**The input's placeholder text. */
            this.placeholder = "placeholder";
            /**Autofocus the input */
            this.autofocus = false;
            /**Disables the input. */
            this.disabled = false;
            /**Makes the input a required field. */
            this.required = false;
            /**Makes the input readonly. */
            this.readonly = false;
            /**The input's value attribute. */
            this.value = "";
            /**Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
            this.defaultValue = "";
            /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
            this.hasFeedback = false;
            /**Feedback text for error state when validated */
            this.invalidFeedback = "";
            /**@internal */
            this.invalid = false;
            /**@internal */
            this.valid = false;
            /**@internal */
            this.inputId = genId("input", this.type);
        }
        /** Sets focus on the input. */
        focus(options) {
            this.input.focus(options);
        }
        /** Sets blur on the input. */
        blur() {
            this.input.blur();
        }
        /** Checks for validity and shows the browser's validation message if the control is invalid. */
        reportValidity() {
            return this.input.reportValidity();
        }
        handleInvalid() {
            this.invalid = true;
        }
        handleChange(event) {
            this.value = this.input.value;
            this.emit(event);
        }
        handleFocus() {
            this.emit("cgds-focus");
        }
        handleBlur() {
            this.emit("cgds-blur");
        }
        handleKeyDown(event) {
            const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
            // Pressing enter when focused on an input should submit the form like a native input, but we wait a tick before
            // submitting to allow users to cancel the keydown event if they need to
            if (event.key === "Enter" && !hasModifier) {
                setTimeout(() => {
                    // Prevent submission when enter is click on a submission in an Input Method Editor with isComposing
                    if (!event.defaultPrevented && !event.isComposing) {
                        this.formSubmitController.submit();
                    }
                });
            }
        }
        handleDisabledChange() {
            // Disabled form controls are always valid, so we need to recheck validity when the state changes
            this.input.disabled = this.disabled;
            this.invalid = !this.input.checkValidity();
        }
        handleValueChange() {
            this.invalid = !this.input.checkValidity();
            this.valid = this.input.checkValidity();
            // remove validation for input that is not required, is already dirty and has empty value
            if (!this.required && this.value === "") {
                this.valid = false;
            }
        }
        render() {
            const input = n `
        <input
          class=${o$1({
              "form-control": true,
              "is-invalid": this.hasFeedback && this.invalid,
              "is-valid": this.hasFeedback && this.valid,
              [`${this.inputClasses}`]: this.inputClasses
          })}
          type=${this.type}
          id=${this.inputId}
          name=${l$2(this.name)}
          placeholder=${l$2(this.placeholder)}
          aria-invalid=${this.invalid ? "true" : "false"}
          pattern=${l$2(this.pattern)}
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          .value=${l$1(this.value)}
          minlength=${l$2(this.minlength)}
          maxlength=${l$2(this.maxlength)}
          @input=${() => this.handleChange("cgds-input")}
          @change=${() => this.handleChange("cgds-change")}
          @keydown=${this.handleKeyDown}
          @invalid=${this.handleInvalid}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        />
        ${this.hasFeedback
              ? n `<div id="${this.inputId}-invalid" class="invalid-feedback">${this.invalidFeedback}</div>`
              : ""}
      `;
            // if iconName is defined
            const inputWithIcon = n `
        <div class="cgds form-control-group ${this.inputClasses}">
          <span class="form-control-icon"> ${o(this.icon)} </span>
          ${input}
        </div>
      `;
            // if hintText is defined
            const withHintText = n ` <small id="${this.inputId}Help" class="text-muted form-text">${this.hintText}</small> `;
            // if label is defined
            const withLabel = n ` <label for=${this.inputId} class="form-label">${this.label}</label> `;
            return n `
        <div class="d-flex flex-column w-100">
          ${n `${this.label && withLabel} ${this.hintText && withHintText} ${this.icon ? inputWithIcon : input} `}
        </div>
      `;
        }
    }
    CgdsInput.styles = CgdsElement.styles;
    __decorate([
        i$1("input.form-control")
    ], CgdsInput.prototype, "input", void 0);
    __decorate([
        n$4({ reflect: true })
    ], CgdsInput.prototype, "type", void 0);
    __decorate([
        n$4({ reflect: true })
    ], CgdsInput.prototype, "label", void 0);
    __decorate([
        n$4({ reflect: true })
    ], CgdsInput.prototype, "hintText", void 0);
    __decorate([
        n$4({ reflect: true })
    ], CgdsInput.prototype, "name", void 0);
    __decorate([
        n$4({ reflect: true })
    ], CgdsInput.prototype, "inputClasses", void 0);
    __decorate([
        n$4({ type: String })
    ], CgdsInput.prototype, "icon", void 0);
    __decorate([
        n$4({ type: Number, reflect: true })
    ], CgdsInput.prototype, "minlength", void 0);
    __decorate([
        n$4({ type: Number, reflect: true })
    ], CgdsInput.prototype, "maxlength", void 0);
    __decorate([
        n$4({ type: String, reflect: true })
    ], CgdsInput.prototype, "placeholder", void 0);
    __decorate([
        n$4({ type: String })
    ], CgdsInput.prototype, "pattern", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], CgdsInput.prototype, "autofocus", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], CgdsInput.prototype, "disabled", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], CgdsInput.prototype, "required", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], CgdsInput.prototype, "readonly", void 0);
    __decorate([
        n$4({ reflect: true })
    ], CgdsInput.prototype, "value", void 0);
    __decorate([
        defaultValue()
    ], CgdsInput.prototype, "defaultValue", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], CgdsInput.prototype, "hasFeedback", void 0);
    __decorate([
        n$4({ type: String, reflect: true })
    ], CgdsInput.prototype, "invalidFeedback", void 0);
    __decorate([
        t$2()
    ], CgdsInput.prototype, "invalid", void 0);
    __decorate([
        t$2()
    ], CgdsInput.prototype, "valid", void 0);
    __decorate([
        watch("disabled", { waitUntilFirstUpdate: true })
    ], CgdsInput.prototype, "handleDisabledChange", null);
    __decorate([
        watch("value", { waitUntilFirstUpdate: true })
    ], CgdsInput.prototype, "handleValueChange", null);
  
    var css_248z = i$5`.form-control-icon{bottom:0}`;
  
    const ARROW_DOWN = "ArrowDown";
    const ARROW_UP = "ArrowUp";
    const ENTER = "Enter";
    /**
     * @event cgds-select - Emitted event when a slot item is selected
     */
    class DropdownListElement extends DropdownElement {
        constructor() {
            super(...arguments);
            /** @internal */
            this.nextDropdownItemNo = 0;
            /** @internal */
            this.prevDropdownItemNo = -1;
        }
        connectedCallback() {
            super.connectedCallback();
            this.addEventListener("cgds-hide", this._resetMenu);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.removeEventListener("cgds-hide", this._resetMenu);
        }
        firstUpdated() {
            super.firstUpdated();
            this.addEventListener("keydown", this._handleKeyboardMenuItemsEvent);
        }
        handleSelectSlot(e) {
            const items = this._getActiveMenuItems();
            const currentItemNo = items.indexOf(e.target);
            this.nextDropdownItemNo = currentItemNo + 1;
            this.prevDropdownItemNo = currentItemNo <= 0 ? items.length - 1 : currentItemNo - 1;
            /** Emitted event from CgdsDropdown element when a slot item is selected */
            const selectedItem = e.target;
            if (!selectedItem.disabled) {
                this.emit("cgds-select");
                this.close !== "outside" && this.bsDropdown.hide();
            }
            else
                return;
        }
        _resetMenu() {
            this.nextDropdownItemNo = 0;
            this.prevDropdownItemNo = -1;
            // reset the tabindex
            const items = this._getMenuItems();
            items.forEach(i => {
                i.removeAttribute("tabindex");
            });
        }
        _handleKeyboardMenuItemsEvent(e) {
            const menuItems = this._getActiveMenuItems();
            switch (e.key) {
                case ARROW_DOWN:
                    e.preventDefault();
                    if (this.nextDropdownItemNo === menuItems.length) {
                        return this._setMenuItem(0);
                    }
                    else {
                        return this._setMenuItem(this.nextDropdownItemNo > 0 ? this.nextDropdownItemNo : 0);
                    }
                case ARROW_UP:
                    e.preventDefault();
                    if (this.prevDropdownItemNo < 0) {
                        return this._setMenuItem(menuItems.length - 1, false);
                    }
                    else {
                        return this._setMenuItem(this.prevDropdownItemNo, false);
                    }
                case ENTER:
                    if (menuItems.includes(e.target)) {
                        return this.handleSelectSlot(e);
                    }
                    break;
            }
        }
        _getMenuItems() {
            var _a;
            // for case when default slot is used e.g. dropdown, mainnavdropdown
            if (this.shadowRoot.querySelector("slot#default")) {
                return (_a = this.shadowRoot.querySelector("slot#default")) === null || _a === void 0 ? void 0 : _a.assignedElements({
                    flatten: true
                });
            }
            // for case when there is no slot e.g. combobox
            if (this.menu.hasChildNodes()) {
                const menuItems = this.menu.children;
                return [...menuItems];
            }
        }
        _getActiveMenuItems() {
            return this._getMenuItems().filter(item => !item.disabled);
        }
        _setMenuItem(currentItemIdx, isArrowDown = true) {
            const items = this._getActiveMenuItems();
            if (items.length === 0)
                return;
            const item = items[currentItemIdx];
            this.nextDropdownItemNo = currentItemIdx + 1;
            this.prevDropdownItemNo = currentItemIdx - 1 < 0 ? items.length - 1 : currentItemIdx - 1;
            let activeItem;
            if (item.disabled) {
                return this._setMenuItem(isArrowDown ? this.nextDropdownItemNo : this.prevDropdownItemNo);
            }
            else
                activeItem = item;
            // focus or blur items depending on active or not
            items.forEach(i => {
                i.setAttribute("tabindex", i === activeItem ? "0" : "-1");
                i === activeItem && i.focus();
            });
        }
    }
    DropdownListElement.styles = DropdownElement.styles;
    __decorate([
        i$1("ul.dropdown-menu")
    ], DropdownListElement.prototype, "menu", void 0);
    __decorate([
        t$2()
    ], DropdownListElement.prototype, "nextDropdownItemNo", void 0);
    __decorate([
        t$2()
    ], DropdownListElement.prototype, "prevDropdownItemNo", void 0);
  
    /**
     * @summary ComboBox component is used for users to make one or more selections from a list.
     *
     * @slot icon - slot for form control icon to be displayed on the right of the input box.
     *
     * @event cgds-select - Emitted when the combo box's selected value changes.
     * @event cgds-input -  Emitted when user input is received and its value changes.
     */
    class CgdsComboBox extends ScopedElementsMixin(DropdownListElement) {
        /**@internal */
        static get scopedElements() {
            return {
                "cgds-input": CgdsInput
            };
        }
        constructor() {
            super();
            /** The input's label  */
            this.label = "";
            /** The input's hint text below the label */
            this.hintText = "";
            /**The input's placeholder text. */
            this.placeholder = "placeholder";
            /**Autofocus the input */
            this.autofocus = false;
            /**Disables the input. */
            this.disabled = false;
            /**Makes the input a required field. */
            this.required = false;
            /**Makes the input readonly. */
            this.readonly = false;
            /**The input's value attribute. */
            this.value = "";
            /**Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
            this.defaultValue = "";
            /**The list of items to display in the dropdown. */
            this.menuList = [];
            /**The function used to determine if a menu item should be shown in the menu list, given the user's input value. */
            this.filterFunction = (inputValue, menuItem) => {
                const itemLowerCase = menuItem.toLowerCase();
                const valueLower = inputValue.toLowerCase();
                return itemLowerCase.startsWith(valueLower);
            };
            /**@internal */
            this.filteredMenuList = [];
            /**@internal */
            this.modifierOpt = [
                {
                    name: "offset",
                    options: {
                        offset: [0, 10]
                    }
                }
            ];
        }
        /**@internal */
        handleFilterMenu() {
            this.filteredMenuList = this.menuList.filter(item => this.filterFunction.call(null, this.value, item));
            if (!this.myDropdown || !this.bsDropdown)
                return;
            // To hide dropdown menu when filtered menuList is empty
            if (this.filteredMenuList.length === 0) {
                this.hideMenu();
            }
            else if (this.menuIsOpen) {
                this.showMenu();
            }
        }
        _handleInputChange(e) {
            this.showMenu();
            this.value = e.target.value;
        }
        _handleSelectChange(e) {
            this.value = e.target.innerText;
            this.handleSelectSlot(e);
        }
        render() {
            return x `
        <div class="cgds combobox dropdown">
          <cgds-input
            class="dropdown-toggle w-100"
            label=${this.label}
            hintText=${this.hintText}
            name=${this.name}
            ${n$1(this.myDropdown)}
            @click=${() => (this.filteredMenuList.length > 0 ? this.showMenu() : this.hideMenu())}
            placeholder=${this.placeholder}
            ?autofocus=${this.autofocus}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            .value=${this.value}
            @cgds-input=${this._handleInputChange}
            role="combobox"
            aria-expanded=${this.menuIsOpen}
            aria-autocomplete="list"
            aria-controls=${this.dropdownMenuId}
          >
          </cgds-input>
          <div class="form-control-icon">
            <slot name="icon"></slot>
          </div>
          <ul id=${this.dropdownMenuId} class="dropdown-menu" part="menu" tabindex="-1">
            ${this.filteredMenuList.map(item => x `<button class="dropdown-item" @click=${this._handleSelectChange}>${item}</button>`)}
          </ul>
        </div>
      `;
        }
    }
    CgdsComboBox.styles = [DropdownElement.styles, css_248z];
    __decorate([
        n$4({ reflect: true })
    ], CgdsComboBox.prototype, "label", void 0);
    __decorate([
        n$4({ reflect: true })
    ], CgdsComboBox.prototype, "hintText", void 0);
    __decorate([
        n$4({ reflect: true })
    ], CgdsComboBox.prototype, "name", void 0);
    __decorate([
        n$4({ type: String, reflect: true })
    ], CgdsComboBox.prototype, "placeholder", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], CgdsComboBox.prototype, "autofocus", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], CgdsComboBox.prototype, "disabled", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], CgdsComboBox.prototype, "required", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], CgdsComboBox.prototype, "readonly", void 0);
    __decorate([
        n$4({ reflect: true })
    ], CgdsComboBox.prototype, "value", void 0);
    __decorate([
        defaultValue()
    ], CgdsComboBox.prototype, "defaultValue", void 0);
    __decorate([
        n$4({ type: Array })
    ], CgdsComboBox.prototype, "menuList", void 0);
    __decorate([
        n$4({ type: Function })
    ], CgdsComboBox.prototype, "filterFunction", void 0);
    __decorate([
        t$2()
    ], CgdsComboBox.prototype, "filteredMenuList", void 0);
    __decorate([
        watch("value")
    ], CgdsComboBox.prototype, "handleFilterMenu", null);
  
    customElements.define("cgds-combo-box", CgdsComboBox);
  
  }));
  //# sourceMappingURL=index.umd.js.map