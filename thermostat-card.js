function t(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new o(i,t,n)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,u=globalThis,_=u.trustedTypes,f=_?_.emptyScript:"",g=u.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const o=n?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of n){const n=document.createElement("style"),s=e.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=n;const o=s.fromAttribute(e,t.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){if(void 0!==t){const o=this.constructor;if(!1===n&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,g?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,S=t=>t,k=$.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,M="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,z=`<${C}>`,T=document,P=()=>T.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,N="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,R=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,I=/"/g,q=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,Y=T.createTreeWalker(T,129);function K(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,n=[];let s,o=2===e?"<svg>":3===e?"<math>":"",r=L;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===L?"!--"===l[1]?r=U:void 0!==l[1]?r=R:void 0!==l[2]?(q.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=s??L,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?D:'"'===l[3]?I:j):r===I||r===j?r=D:r===U||r===R?r=L:(r=D,s=void 0);const d=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===L?i+z:c>=0?(n.push(a),i.slice(0,c)+M+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class J{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const r=t.length-1,a=this.parts,[l,c]=X(t,e);if(this.el=J.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=Y.nextNode())&&a.length<r;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(M)){const e=c[o++],i=n.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?nt:tt}),n.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:s}),n.removeAttribute(t));if(q.test(n.tagName)){const t=n.textContent.split(E),e=t.length-1;if(e>0){n.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],P()),Y.nextNode(),a.push({type:2,index:++s});n.append(t[e],P())}}}else if(8===n.nodeType)if(n.data===C)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(E,t+1));)a.push({type:7,index:s}),t+=E.length-1}s++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,n){if(e===F)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,n)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??T).importNode(e,!0);Y.currentNode=n;let s=Y.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Z(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new st(s,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(s=Y.nextNode(),o++)}return Y.currentNode=T,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new G(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new Z(this.O(P()),this.O(P()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,n){const s=this.strings;let o=!1;if(void 0===s)t=Q(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const n=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=Q(this,n[i+r],e,r),a===F&&(a=this._$AH[r]),o||=!O(a)||a!==this._$AH[r],a===V?t=V:t!==V&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}o&&!n&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class nt extends tt{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===F)return;const i=this._$AH,n=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==V&&(i===V||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=$.litHtmlPolyfillSupport;ot?.(J,Z),($.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;let at=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new Z(e.insertBefore(P(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},dt=(t=ht,e,i)=>{const{kind:n,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t,!0,i)}}throw Error("Unsupported decorator location: "+n)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function mt(t){return pt({...t,state:!0,attribute:!1})}let ut=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const _t={},ft=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends ut{constructor(){super(...arguments),this.key=V}render(t,e){return this.key=t,e}update(t,[e,i]){return e!==this.key&&(((t,e=_t)=>{t._$AH=e})(t),this.key=e),i}}),gt=r`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 0;
    container-name: tc;
    container-type: inline-size;
    --tc-heat: #ff8a5c;
    --tc-cool: #6cb4ff;
    --tc-accent: #4ecdc4;
    --tc-green: #5dcaa5;
    --tc-dry: #e6b450;
    --tc-txt: #e8eef6;
    --tc-sub: #8aa0bd;
    --tc-title: #dbe6f3;
    --tc-muted: #3a4a60;
    --tc-surface: color-mix(in srgb, #9fb6d6 6%, transparent);
    --tc-surface-hi: color-mix(in srgb, #9fb6d6 10%, transparent);
    --tc-line: color-mix(in srgb, #9fb6d6 14%, transparent);
    --tc-border: #26425f;
    --tc-btn-bg: color-mix(in srgb, #9fb6d6 12%, transparent);
    --tc-btn-hover: color-mix(in srgb, #9fb6d6 20%, transparent);
    --tc-radius: 18px;
    --tc-tile-radius: 13px;
    --tc-gap: 7px;
    --st: var(--tc-sub);
    --flow-speed: 1.8s;
  }

  :host([light]) {
    --tc-txt: var(--primary-text-color, #1c2733);
    --tc-sub: var(--secondary-text-color, #5b6b7d);
    --tc-title: var(--primary-text-color, #1c2733);
    --tc-border: var(--divider-color, #d5dee8);
    --tc-muted: #c3ced9;
    --tc-surface: color-mix(in srgb, #3c5a80 5%, transparent);
    --tc-surface-hi: color-mix(in srgb, #3c5a80 8%, transparent);
    --tc-line: color-mix(in srgb, #3c5a80 12%, transparent);
    --tc-btn-bg: color-mix(in srgb, #3c5a80 9%, transparent);
    --tc-btn-hover: color-mix(in srgb, #3c5a80 15%, transparent);
    --tc-heat: #f0703c;
    --tc-cool: #3f8fe0;
    --tc-accent: #1fa99f;
    --tc-green: #2fa57e;
    --tc-dry: #c9921f;
  }

  ha-card {
    background: var(--ha-card-background, var(--card-background-color, none));
    border: 1px solid var(--tc-border);
    border-radius: var(--tc-radius);
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.25);
    padding: 12px;
    color: var(--tc-txt);
    overflow: hidden;
    position: relative;
    font-variant-numeric: tabular-nums;
    /* fills the height the dashboard gives (Sections rows / height option) and may
       shrink below its natural size: only .main gives way */
    flex: 1 1 auto;
    /* min-height is set from JS (_fit): header + selectors + a readable setpoint */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--tc-gap);
    transition: border-color 0.6s;
  }
  ha-card.live {
    border-color: color-mix(in srgb, var(--st) 28%, var(--tc-border));
  }
  /* Soft status glow in the top-left corner, breathing while the unit runs. */
  ha-card::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(120% 70% at 0% 0%, color-mix(in srgb, var(--st) 14%, transparent), transparent 62%);
    opacity: 0;
    transition: opacity 0.6s;
  }
  ha-card.live::before {
    opacity: 1;
    animation: breathe 4s ease-in-out infinite;
  }
  @keyframes breathe {
    0%, 100% { opacity: 0.65; }
    50% { opacity: 1; }
  }
  ha-card > * { position: relative; }

  button {
    font-family: inherit;
    color: inherit;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .u {
    font-size: 0.5em;
    font-weight: 600;
    color: var(--tc-sub);
    margin-left: 2px;
  }

  /* ---------- Header ---------- */
  .header,
  .sel-row,
  .modes { flex: none; }
  .header {
    display: flex;
    align-items: center;
    gap: 8px 10px;
  }
  .title-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1 1 0;
    min-width: 0;
  }
  .title-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--st) 14%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    transition: background 0.5s, box-shadow 0.5s;
  }
  .title-icon ha-icon {
    --mdc-icon-size: 22px;
    color: var(--st);
    transition: color 0.5s;
    animation: icon-in 0.45s cubic-bezier(0.3, 1.4, 0.5, 1);
  }
  .title-icon.active { box-shadow: 0 0 18px -4px var(--st); }
  .ic-heat ha-icon { animation: icon-in 0.45s cubic-bezier(0.3, 1.4, 0.5, 1), flicker 1.2s 0.45s ease-in-out infinite; }
  .ic-cool ha-icon { animation: icon-in 0.45s cubic-bezier(0.3, 1.4, 0.5, 1), spin 7s 0.45s linear infinite; }
  .ic-fan_only ha-icon,
  .ic-auto ha-icon,
  .ic-heat_cool ha-icon { animation: icon-in 0.45s cubic-bezier(0.3, 1.4, 0.5, 1), spin calc(var(--flow-speed) * 0.6) 0.45s linear infinite; }
  .ic-dry ha-icon { animation: icon-in 0.45s cubic-bezier(0.3, 1.4, 0.5, 1), bob 1.6s 0.45s ease-in-out infinite; }
  @keyframes icon-in {
    from { transform: scale(0.4) rotate(-40deg); opacity: 0; }
    to { transform: scale(1) rotate(0); opacity: 1; }
  }
  @keyframes flicker {
    0%, 100% { transform: scale(1) rotate(0); }
    30% { transform: scale(1.08) rotate(-3deg); }
    60% { transform: scale(0.95) rotate(2deg); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes bob {
    0%, 100% { transform: translateY(-1px); }
    50% { transform: translateY(2px); }
  }

  .title-text { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
  .name-row { display: flex; align-items: center; gap: 9px; min-width: 0; }
  .name {
    font-size: 15px;
    font-weight: 600;
    color: var(--tc-title);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
  /* current function next to the name: coloured text + live dot, no frame */
  .fn {
    --fc: var(--tc-sub);
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--fc);
    white-space: nowrap;
    transition: color 0.4s;
  }
  .fn .status-dot { background: var(--fc); }
  .fn-txt { display: inline-block; animation: fade-in 0.35s ease; }
  .fn-next {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    font-weight: 600;
    color: var(--tc-sub);
    opacity: 0.75;
    white-space: nowrap;
  }
  .fn-next::before { content: '→'; margin-right: 3px; opacity: 0.7; }
  .fn-next ha-icon { --mdc-icon-size: 13px; }
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(3px); }
    to { opacity: 1; transform: none; }
  }
  .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--st); flex-shrink: 0; }
  .status-dot.live { animation: ping 1.8s ease-out infinite; }
  @keyframes ping {
    0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--fc, var(--st)) 60%, transparent); }
    100% { box-shadow: 0 0 0 6px transparent; }
  }
  .sub {
    display: flex;
    align-items: center;
    min-width: 0;
    font-size: 12.5px;
    line-height: 16px;
    color: var(--tc-sub);
    white-space: nowrap;
    overflow: hidden;
  }
  /* icon and value share one centre line */
  .si { display: inline-flex; align-items: center; gap: 3px; min-width: 0; }
  .sub-v { color: var(--tc-txt); opacity: 0.9; overflow: hidden; text-overflow: ellipsis; }
  .sub-l { margin-right: 2px; }
  .sub-ic { --mdc-icon-size: 15px; display: inline-flex; color: var(--tc-sub); flex-shrink: 0; }
  .sep { margin: 0 7px; opacity: 0.6; }

  /* Header buttons: icon only, no frame; glow when on */
  .header-controls {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
    margin-left: auto;
  }
  .sw,
  .mode-dd {
    --sw: var(--tc-accent);
    height: 42px;
    min-width: 42px;
    padding: 0;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: var(--tc-sub);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    cursor: pointer;
    transition: background 0.25s, color 0.3s, transform 0.12s;
  }
  .sw ha-icon { --mdc-icon-size: 22px; transition: filter 0.3s; }
  .sw:hover:not(:disabled),
  .mode-dd:hover { background: var(--tc-btn-bg); }
  .sw:active:not(:disabled),
  .mode-dd:active { transform: scale(0.88); }
  .sw.on { color: var(--sw); }
  .sw.on ha-icon { filter: drop-shadow(0 0 6px color-mix(in srgb, var(--sw) 70%, transparent)); }
  .sw.pwr ha-icon { --mdc-icon-size: 24px; }
  .sw.pop ha-icon { animation: pop 0.42s cubic-bezier(0.3, 1.6, 0.5, 1); }
  @keyframes pop {
    0% { transform: scale(1); }
    40% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }
  .sw.pending { animation: pulse 1s ease-in-out infinite; }
  .sw.unavailable { opacity: 0.4; cursor: not-allowed; }
  .sw.named { padding: 0 9px 0 11px; gap: 7px; }
  .sw-name { font-size: 10.5px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; white-space: nowrap; }
  .track { width: 26px; height: 15px; border-radius: 8px; background: var(--tc-muted); position: relative; flex-shrink: 0; transition: background 0.25s; }
  .knob { position: absolute; top: 2px; left: 2px; width: 11px; height: 11px; border-radius: 50%; background: #fff; transition: transform 0.25s cubic-bezier(0.3, 1.4, 0.5, 1); }
  .sw.on .track { background: var(--sw); }
  .sw.on .knob { transform: translateX(11px); }

  .mode-dd { padding: 0 4px 0 10px; color: var(--fc); }
  .mode-dd .dd-ic { --mdc-icon-size: 21px; animation: icon-in 0.4s cubic-bezier(0.3, 1.4, 0.5, 1); }
  .is-off .mode-dd { color: var(--tc-sub); }
  .mode-dd.open { background: var(--tc-btn-bg); }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }

  /* ---------- Setpoint: big centred number, bare − / + ---------- */
  /* the only part that gives way to the card height */
  .main {
    flex: 1 1 auto;
    /* below this the setpoint would not be readable: the card stops shrinking */
    min-height: 30px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
  }
  .sp {
    --b0: 44px;
    /* --fit comes from the measured height of .main (see _fit) */
    --b: clamp(30px, var(--fit, var(--b0)), var(--b0));
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    flex: 1 1 0;
    max-width: 340px;
  }
  .sp.sz-small { --b0: 32px; }
  .sp.sz-medium { --b0: 38px; }
  .sp.sz-xlarge { --b0: 54px; }
  .main[data-tight='1'] .sp-label { display: none; }

  /* compact (too little height): − 24 °C + sits in the header, like Bubble */
  ha-card.compact { padding: 9px 12px; gap: 4px; }
  .compact .title-wrap { min-width: 120px; gap: 8px; }
  .compact .title-icon { width: 36px; height: 36px; }
  .compact .title-icon ha-icon { --mdc-icon-size: 20px; }
  .compact .header-controls { gap: 0; }
  .compact .sw,
  .compact .mode-dd { min-width: 34px; height: 36px; }
  .compact .sw ha-icon { --mdc-icon-size: 20px; }
  .compact .mode-dd { padding: 0 0 0 6px; }
  .inline-sp { display: flex; align-items: center; gap: 4px; margin-right: 4px; }
  .inline-sp .sp { --b: 30px; flex: none; max-width: none; gap: 0; }
  .inline-sp .sp-label { display: none; }
  .inline-sp .sp-val { font-size: 21px; min-width: 2.9em; justify-content: center; }
  .inline-sp .sp-val .u { font-size: 0.6em; }
  .compact .sel { height: 42px; }
  .sp-center { display: flex; flex-direction: column; align-items: center; min-width: 0; }
  .sp-label { font-size: 10px; line-height: 12px; font-weight: 700; letter-spacing: 1px; color: var(--tc-sub); }
  .sp-val {
    font-size: calc(var(--b) * 0.9);
    font-weight: 700;
    line-height: 1;
    color: var(--st);
    white-space: nowrap;
    display: inline-flex;
    align-items: baseline;
    overflow: hidden;
    transition: color 0.5s, opacity 0.2s;
  }
  .range .sp-val { font-size: calc(var(--b) * 0.62); }
  .is-off .sp-val { color: var(--tc-txt); opacity: 0.55; }
  .sp-val .u { font-size: 0.45em; font-weight: 500; color: inherit; opacity: 0.6; margin-left: 2px; }
  .sp-val.pending { opacity: 0.55; }
  .roll { display: inline-block; }
  .roll-up { animation: roll-up 0.32s cubic-bezier(0.2, 1.2, 0.4, 1); }
  .roll-down { animation: roll-down 0.32s cubic-bezier(0.2, 1.2, 0.4, 1); }
  @keyframes roll-up {
    from { transform: translateY(55%); opacity: 0; filter: blur(2px); }
    to { transform: none; opacity: 1; filter: none; }
  }
  @keyframes roll-down {
    from { transform: translateY(-55%); opacity: 0; filter: blur(2px); }
    to { transform: none; opacity: 1; filter: none; }
  }
  .step-btn {
    width: var(--b);
    height: var(--b);
    border-radius: 50%;
    background: transparent;
    border: none;
    color: var(--tc-txt);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;
    transition: background 0.2s, transform 0.12s, color 0.2s;
  }
  .step-btn ha-icon { --mdc-icon-size: calc(var(--b) * 0.55); }
  .step-btn:hover:not(:disabled) { background: var(--tc-btn-bg); }
  .step-btn:active:not(:disabled) {
    transform: scale(0.85);
    color: var(--st);
    background: color-mix(in srgb, var(--st) 18%, transparent);
  }
  .step-btn:disabled { opacity: 0.25; cursor: default; }

  /* ---------- Ambient animations ---------- */
  ha-card > .amb { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
  .amb-air { width: 100%; height: 100%; opacity: 0.3; }
  .amb-air path {
    fill: none;
    stroke: var(--st);
    stroke-width: 1.4;
    stroke-linecap: round;
    stroke-dasharray: 18 14;
    vector-effect: non-scaling-stroke;
    opacity: 0.55;
    animation: flow var(--flow-speed) linear infinite;
  }
  .amb-air .p2 { animation-duration: calc(var(--flow-speed) * 1.35); opacity: 0.35; stroke-dasharray: 10 18; }
  .amb-air .p3 { animation-duration: calc(var(--flow-speed) * 1.15); opacity: 0.45; }
  @keyframes flow { to { stroke-dashoffset: -64; } }
  ha-card > :not(.amb) { z-index: 1; }

  .amb-heat::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60%;
    background: radial-gradient(80% 100% at 50% 100%, color-mix(in srgb, var(--st) 12%, transparent), transparent 70%);
    animation: breathe 3.2s ease-in-out infinite;
  }
  .amb-heat span {
    position: absolute;
    bottom: -20px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--st);
    filter: blur(9px);
    opacity: 0;
    animation: rise var(--d, 2.6s) ease-in infinite;
  }
  @keyframes rise {
    0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
    25% { opacity: 0.22; }
    60% { transform: translate(5px, -70px) scale(1); }
    100% { transform: translate(-4px, -140px) scale(0.4); opacity: 0; }
  }
  .amb-dry span {
    position: absolute;
    top: -8px;
    width: 4px;
    height: 7px;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    background: var(--st);
    opacity: 0;
    animation: drop 2.2s ease-in infinite;
  }
  @keyframes drop {
    0% { transform: translateY(0); opacity: 0; }
    15% { opacity: 0.6; }
    100% { transform: translateY(150px); opacity: 0; }
  }

  /* ---------- Selectors: bare text, underline when open ---------- */
  .sel-row {
    --c: var(--cols);
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }
  .sel-row > .sel { flex: 1 1 calc((100% - (var(--c) - 1) * 2px) / var(--c)); }
  .sel {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-width: 0;
    height: 46px;
    padding: 0 6px;
    box-sizing: border-box;
    border-radius: 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    transition: background 0.25s, transform 0.12s;
  }
  .sel:hover:not(:disabled) { background: var(--tc-btn-bg); }
  .sel:active:not(:disabled) { transform: scale(0.97); }
  .sel:disabled { opacity: 0.4; cursor: not-allowed; }
  .sel::after {
    content: '';
    position: absolute;
    left: 30%;
    right: 30%;
    bottom: 3px;
    height: 2px;
    border-radius: 2px;
    background: var(--st);
    transform: scaleX(0);
    transition: transform 0.3s cubic-bezier(0.3, 1.4, 0.5, 1);
  }
  .sel.open::after { transform: scaleX(1); }
  .sel.pending .sel-val { animation: pulse 1s ease-in-out infinite; }
  .sel-ic { --mdc-icon-size: 19px; color: var(--st); flex-shrink: 0; transition: color 0.5s; }
  .sel-txt { display: flex; flex-direction: column; min-width: 0; line-height: 1.15; }
  .sel-name {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    color: var(--tc-sub);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sel-val {
    font-size: 13px;
    font-weight: 600;
    color: var(--tc-txt);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.3s;
  }
  .sel.open .sel-val { color: var(--st); }
  .chev { --mdc-icon-size: 16px; color: var(--tc-sub); flex-shrink: 0; transition: transform 0.3s cubic-bezier(0.3, 1.4, 0.5, 1); }
  .sel.open .chev,
  .mode-dd.open .chev { transform: rotate(180deg); }
  .mode-dd .chev { --mdc-icon-size: 16px; color: inherit; opacity: 0.7; transition: transform 0.3s cubic-bezier(0.3, 1.4, 0.5, 1); }

  /* ---------- Floating dropdown (Bubble-style) ---------- */
  .menu {
    position: fixed;
    inset: auto;
    margin: 0;
    z-index: 1000;
    display: none;
    box-sizing: border-box;
    padding: 8px;
    border: none;
    border-radius: 22px;
    background: var(--ha-card-background, var(--card-background-color, #17222f));
    background-image: linear-gradient(var(--tc-surface-hi), var(--tc-surface-hi));
    color: var(--tc-txt);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px var(--tc-line);
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    /* scroll without a visible bar */
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .menu::-webkit-scrollbar { display: none; width: 0; height: 0; }
  .menu.open { display: block; }
  .menu.anim { animation: menu-in 0.22s cubic-bezier(0.25, 1.25, 0.45, 1); }
  .menu.scrolls {
    -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%);
    mask-image: linear-gradient(to bottom, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%);
  }
  .menu::backdrop { background: transparent; }
  @keyframes menu-in {
    from { opacity: 0; transform: scale(0.92) translateY(-6px); }
    to { opacity: 1; transform: none; }
  }
  .menu.up.anim { animation-name: menu-in-up; }
  @keyframes menu-in-up {
    from { opacity: 0; transform: scale(0.92) translateY(6px); }
    to { opacity: 1; transform: none; }
  }
  .menu-hint {
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 14px;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--tc-sub);
  }
  .mi {
    --oc: var(--st);
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0 14px;
    box-sizing: border-box;
    border: none;
    border-radius: 14px;
    background: transparent;
    color: var(--tc-txt);
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
  }
  .menu.anim .mi { animation: mi-in 0.26s cubic-bezier(0.3, 1.3, 0.5, 1) both; animation-delay: calc(var(--i) * 18ms); }
  @keyframes mi-in {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: none; }
  }
  .mi:hover { background: var(--tc-btn-bg); }
  .mi:active { background: var(--tc-btn-hover); }
  .mi-l { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
  .mi .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--tc-sub);
    opacity: 0.7;
    flex-shrink: 0;
    margin: 0 3px;
    transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  }
  .mi ha-icon { --mdc-icon-size: 20px; color: var(--tc-sub); flex-shrink: 0; }
  .mi.on { color: var(--oc); font-weight: 600; background: color-mix(in srgb, var(--oc) 12%, transparent); }
  .mi.on .dot {
    background: var(--oc);
    opacity: 1;
    transform: scale(1.15);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--oc) 22%, transparent), 0 0 10px var(--oc);
  }
  .mi.on ha-icon { color: var(--oc); filter: drop-shadow(0 0 5px color-mix(in srgb, var(--oc) 60%, transparent)); }

  /* ---------- Mode buttons row (thermostat) ---------- */
  .modes {
    display: grid;
    grid-template-columns: repeat(var(--n), minmax(0, 1fr));
    gap: 2px;
  }
  .mode {
    --mc: var(--tc-accent);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    height: 44px;
    border-radius: 12px;
    border: none;
    background: transparent;
    color: var(--tc-sub);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    transition: background 0.3s, color 0.3s, transform 0.12s;
  }
  .mode ha-icon { --mdc-icon-size: 20px; }
  .mode:hover { background: var(--tc-btn-bg); }
  .mode:active { transform: scale(0.96); }
  .mode.on { color: var(--mc); }
  .mode.on ha-icon { animation: pop 0.42s cubic-bezier(0.3, 1.6, 0.5, 1); filter: drop-shadow(0 0 6px color-mix(in srgb, var(--mc) 60%, transparent)); }
  .mode::after {
    content: '';
    position: absolute;
    left: 35%;
    right: 35%;
    bottom: 4px;
    height: 2px;
    border-radius: 2px;
    background: var(--mc);
    transform: scaleX(0);
    transition: transform 0.3s cubic-bezier(0.3, 1.4, 0.5, 1);
  }
  .mode.on::after { transform: scaleX(1); }
  .live .mode.on.m-heat ha-icon { animation: flicker 1.2s ease-in-out infinite; }
  .live .mode.on.m-fan_only ha-icon { animation: spin 1.4s linear infinite; }

  .tc-error { color: var(--error-color, #f44336); font-size: 0.875rem; padding: 8px 0; }

  button:focus-visible,
  .title-icon:focus-visible { outline: 2px solid var(--tc-accent); outline-offset: 2px; }

  /* ---------- Motion off ---------- */
  /* animations: false in the editor — everything still (no background is rendered) */
  :host([no-anim]) *,
  :host([no-anim]) *::before,
  :host([no-anim]) *::after { animation: none !important; }

  /* Reduced motion (OS setting): no movement, but the background stays visible as a
     still picture — warm glow + soft spots for heat, droplets for dry, airflow lines. */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; }
    ha-card.live::before { opacity: 1; }
    .amb-heat span { opacity: 0.2; transform: translateY(calc(-30px - var(--i, 0) * 6px)); }
    .amb-heat span:nth-child(odd) { transform: translateY(-70px) scale(0.8); opacity: 0.14; }
    .amb-dry span { opacity: 0.45; transform: translateY(40px); }
    .amb-dry span:nth-child(even) { transform: translateY(80px); opacity: 0.3; }
  }

  /* ---------- Responsive (card width) ---------- */
  @container tc (max-width: 459px) {
    /* keep all selectors on one line: drop the chevron, tighten spacing */
    .sel { gap: 5px; padding: 0 3px; }
    .sel .chev { display: none !important; }
    .sel-ic { --mdc-icon-size: 17px; }
    .sel-val { font-size: 12.5px; }
    .sel-name { font-size: 9px; letter-spacing: 0.5px; }
    .fn-next { display: none; }
    .header-controls { gap: 0; margin-right: -4px; }
    .sw, .mode-dd { min-width: 36px; height: 38px; }
    .sw ha-icon { --mdc-icon-size: 20px; }
    .sw.pwr ha-icon { --mdc-icon-size: 22px; }
    .mode-dd { padding: 0 0 0 6px; }
    .mode-dd .chev { --mdc-icon-size: 14px; }
    .title-wrap { gap: 8px; }
    .title-icon { width: 38px; height: 38px; }
    .name-row { gap: 6px; }
  }
  @container tc (max-width: 340px) {
    ha-card { padding: 10px; }
    .mode span { display: none; }
  }
`;console.info("%c THERMOSTAT-CARD %c v1.0.5 ","color:#0b1a2a;background:#4ecdc4;font-weight:700;border-radius:4px 0 0 4px;padding:2px 4px","color:#4ecdc4;background:#16243a;font-weight:700;border-radius:0 4px 4px 0;padding:2px 4px");const bt={heat:"mdi:fire",cool:"mdi:snowflake",auto:"mdi:thermostat-auto",heat_cool:"mdi:sun-snowflake-variant",off:"mdi:power",fan_only:"mdi:fan",dry:"mdi:water-percent"},yt={heat:"var(--tc-heat)",cool:"var(--tc-cool)",auto:"var(--tc-green)",heat_cool:"var(--tc-green)",fan_only:"var(--tc-accent)",dry:"var(--tc-dry)",off:"var(--tc-sub)"},vt={heating:"heat",preheating:"heat",defrosting:"heat",cooling:"cool",drying:"dry",fan:"fan_only"},wt={...bt,auto:"mdi:fan-auto",quiet:"mdi:fan-minus",silent:"mdi:fan-minus",low:"mdi:fan-speed-1",medium:"mdi:fan-speed-2",mid:"mdi:fan-speed-2",middle:"mdi:fan-speed-2",high:"mdi:fan-speed-3",turbo:"mdi:fan-plus",none:"mdi:circle-off-outline",eco:"mdi:leaf",comfort:"mdi:sofa-outline",boost:"mdi:rocket-launch",sleep:"mdi:power-sleep",away:"mdi:home-export-outline",home:"mdi:home-outline",activity:"mdi:run",on:"mdi:arrow-oscillating",vertical:"mdi:arrow-up-down",horizontal:"mdi:arrow-left-right",both:"mdi:arrow-all"},xt={hvac_mode:{attr:"",list:"hvac_modes",service:"set_hvac_mode",field:"hvac_mode",name:"Mode",icon:"mdi:thermostat"},fan_mode:{attr:"fan_mode",list:"fan_modes",service:"set_fan_mode",field:"fan_mode",name:"Fan",icon:"mdi:fan"},preset_mode:{attr:"preset_mode",list:"preset_modes",service:"set_preset_mode",field:"preset_mode",name:"Preset",icon:"mdi:rocket-launch-outline"},swing_mode:{attr:"swing_mode",list:"swing_modes",service:"set_swing_mode",field:"swing_mode",name:"Swing",icon:"mdi:arrow-oscillating"},swing_horizontal_mode:{attr:"swing_horizontal_mode",list:"swing_horizontal_modes",service:"set_swing_horizontal_mode",field:"swing_horizontal_mode",name:"Pos",icon:"mdi:arrow-left-right"}},$t={quiet:3.2,silent:3.2,low:2.6,medium:1.7,mid:1.7,middle:1.7,auto:1.9,high:1.1,turbo:.8,strong:.8},St={current_temperature:"mdi:home-thermometer-outline",humidity:"mdi:water-percent",fan_mode:"mdi:fan",preset_mode:"mdi:tune-variant",target_temperature:"mdi:target"},kt=8e3;window.customCards=window.customCards||[],window.customCards.push({type:"thermostat-card",name:"Thermostat Card",description:"Animated thermostat / AC card with switches, dropdowns and mode buttons",preview:!0});let At=class extends at{constructor(){super(...arguments),this._pending={},this._pendingSel={},this._openSel=null,this._rollDir="up",this._popped=null,this._compact=!1,this._fullMin=0,this._held=!1,this._onDocClick=t=>{if(!this._openSel)return;const e=t.composedPath();Array.from(this.renderRoot.querySelectorAll(".menu, [data-dd]")).some(t=>e.includes(t))||(this._openSel=null)},this._onDocKey=t=>{"Escape"===t.key&&this._openSel&&(this._openSel=null)},this._fitRaf=0,this._fit=()=>{cancelAnimationFrame(this._fitRaf),this._fitRaf=requestAnimationFrame(()=>{const t=this.renderRoot.querySelector("ha-card");if(!t)return;const e=this.renderRoot.querySelector(".main"),i=this._availableHeight();if(this._compact)return this._fullMin&&i>=this._fullMin&&(this._compact=!1),void(t.style.minHeight&&(t.style.minHeight=""));if(!e)return;const n=getComputedStyle(t),s=Array.from(t.children).filter(t=>t!==e&&!t.classList.contains("amb")&&!t.classList.contains("menu")),o=parseFloat(n.rowGap)||0,r=Math.ceil(s.reduce((t,e)=>t+e.offsetHeight,0)+o*s.length+30+parseFloat(n.paddingTop)+parseFloat(n.paddingBottom)+parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth));if(this._fullMin=r,i>0&&i+1<r)return this._compact=!0,void(t.style.minHeight="");const a=`${r}px`;t.style.minHeight!==a&&(t.style.minHeight=a);const l=e.clientHeight;if(!l)return;const c=!e.classList.contains("range"),h=Math.round(Math.max(30,l)),d=parseFloat(e.style.getPropertyValue("--fit"))||0;Math.abs(h-d)>=1&&e.style.setProperty("--fit",`${h}px`),"1"===e.dataset.tight!==c&&(e.dataset.tight=c?"1":"")})},this._menuBound=!1,this._onViewport=()=>{this._openSel&&requestAnimationFrame(()=>this._positionMenu())}}static async getConfigElement(){return await Promise.resolve().then(function(){return Rt}),document.createElement("thermostat-card-editor")}static getStubConfig(t){const e=t?Object.keys(t.states).find(t=>t.startsWith("climate.")):void 0;return{entity:e??"climate.living"}}setConfig(t){if(!t?.entity)throw new Error('thermostat-card: missing "entity"');if(!t.entity.startsWith("climate."))throw new Error('thermostat-card: "entity" must be a climate.* entity');this._config={...t}}getCardSize(){return 3+(this._selects().length?1:0)+(this._showModes()?1:0)}getGridOptions(){return{columns:12,min_columns:6,min_rows:2}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick,!0),document.addEventListener("keydown",this._onDocKey)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick,!0),document.removeEventListener("keydown",this._onDocKey),this._unbindMenu(),this._ro?.disconnect(),this._ro=void 0;for(const t of Object.values(this._pending))t.timer&&clearTimeout(t.timer);this._pending={},this._openSel=null}shouldUpdate(t){if(!this._config)return!1;if(t.size>1||!t.has("hass"))return!0;const e=t.get("hass");return!e||!this.hass||(this._dark(e)!==this._dark(this.hass)||this._tracked().some(t=>e.states[t]!==this.hass.states[t]))}willUpdate(t){if(!t.has("hass")||!this.hass)return;if(this._entity&&this._setLastMode(this._entity.state),this._pendingSel["hvac#hdr"]&&this._pendingSel["hvac#hdr"]===this._entity?.state){const t={...this._pendingSel};delete t["hvac#hdr"],this._pendingSel=t}const e=this._entity?.attributes??{};let i,n;for(const[t,n]of Object.entries(this._pending))n.sent&&Number(e[t])===n.value&&(i=i??{...this._pending},delete i[t]);i&&(this._pending=i);for(const[t,e]of Object.entries(this._pendingSel))this._actualSelValue(t)===e&&(n=n??{...this._pendingSel},delete n[t]);n&&(this._pendingSel=n)}updated(t){t.has("hass")&&this.hass&&this.toggleAttribute("light",!1===this._dark(this.hass)),t.has("_config")&&this.toggleAttribute("no-anim",!1===this._config?.animations),this._observeMain(),this._fit(),t.has("_openSel")?this._syncMenu():this._openSel&&this._positionMenu()}_parentOf(t){const e=t.parentElement??t.getRootNode().host;return e&&e!==document.body&&e!==document.documentElement?e:null}_gridCell(){let t=this;for(let e=0;t&&e<4;e++){const e=this._parentOf(t);if(!e)return null;if(getComputedStyle(e).display.includes("grid"))return t;t=e}return null}_configHeightPx(){const t=this._config?.height;if(null==t||""===t)return;const e=/^(\d+(?:\.\d+)?)(px)?$/.exec(String(t).trim());return e?parseFloat(e[1]):void 0}_availableHeight(){const t=this._configHeightPx();if(t)return t;const e=this._gridCell();if(e&&e!==this){let t=this._parentOf(this);for(;t&&t!==e;)"100%"!==t.style.height&&(t.style.height="100%"),t=this._parentOf(t);const i=e.clientHeight;return i>0?Math.min(i,this.clientHeight||i):this.clientHeight}return this.clientHeight}firstUpdated(){this._ro=new ResizeObserver(this._fit),this._ro.observe(this);const t=this._gridCell();t&&t!==this&&this._ro.observe(t);const e=this.renderRoot.querySelector("ha-card");e&&this._ro.observe(e),this._observeMain()}_observeMain(){const t=this.renderRoot.querySelector(".main");t&&this._ro&&!0!==t.__tcObserved&&(t.__tcObserved=!0,this._ro.observe(t))}_bindMenu(){this._menuBound||(this._menuBound=!0,window.addEventListener("scroll",this._onViewport,!0),window.addEventListener("resize",this._onViewport),window.visualViewport?.addEventListener("resize",this._onViewport))}_unbindMenu(){this._menuBound&&(this._menuBound=!1,window.removeEventListener("scroll",this._onViewport,!0),window.removeEventListener("resize",this._onViewport),window.visualViewport?.removeEventListener("resize",this._onViewport))}get _menuEl(){return this.renderRoot.querySelector(".menu")}_syncMenu(){const t=this._menuEl;if(t)if(this._openSel){if(t.showPopover)try{t.matches(":popover-open")||t.showPopover()}catch{}t.classList.add("open"),this._positionMenu();const e=t.querySelector(".mi.on");e&&(t.scrollTop=Math.max(0,e.offsetTop-t.clientHeight/2+e.offsetHeight/2)),t.classList.remove("anim"),t.offsetWidth,t.classList.add("anim"),this._bindMenu()}else{if(t.classList.remove("open","anim"),t.hidePopover)try{t.matches(":popover-open")&&t.hidePopover()}catch{}this._unbindMenu()}}_positionMenu(){const t=this._openSel,e=this._menuEl;if(!t||!e)return;const i=Array.from(this.renderRoot.querySelectorAll("[data-dd]")).find(e=>e.dataset.dd===t);if(!i)return;const n=i.getBoundingClientRect(),s=window.visualViewport,o=s?.width??window.innerWidth,r=s?.height??window.innerHeight,a=e.querySelectorAll(".mi, .menu-hint").length,l=this._config.menu_max_items??8,c=44*Math.min(a,l)+16,h=n.top+n.height/2>r/2,d=h?n.top-6-16:r-n.bottom-6-16,p=Math.max(44*Math.min(a,2)+16,Math.min(c,d)),m=Math.min(Math.max(n.width,220),300,o-32),u=Math.max(16,Math.min(n.left+n.width/2-m/2,o-m-16)),_=h?n.top-6-p:n.bottom+6;e.style.left=`${u}px`,e.style.top=`${_}px`,e.style.width=`${m}px`,e.style.maxHeight=`${p}px`,e.style.transformOrigin=`${n.left+n.width/2-u}px ${h?"100%":"0%"}`,e.classList.toggle("up",h),e.classList.toggle("scrolls",44*a+16>p+1)}_menuData(){const t=this._openSel;if(!t||!this._entity)return;if("hvac#hdr"===t)return{options:this._onModes(),value:this._shownMode,pick:t=>this._pickMode(t),label:t=>this._modeLabel(t),icon:t=>bt[t],color:t=>this._color(t),hint:"off"===this._mode?"Pornește în":void 0};const e=this._selects().find(e=>e.key===t);return e?{options:e.options,value:e.value,pick:t=>this._choose(e,t),label:t=>this._label(e,t),icon:t=>e.cfg.icons?.[t]??("hvac_mode"===e.cfg.type?bt[t]:wt[t.toLowerCase()]),color:t=>"hvac_mode"===e.cfg.type?this._color(t):"var(--st)"}:void 0}_renderMenu(){const t=this._menuData(),e=!!t&&t.options.length>0&&t.options.every(e=>!!t.icon(e));return B`
      <div class="menu" popover="manual" role="listbox">
        ${t?B`${t.hint?B`<div class="menu-hint">${t.hint}</div>`:V}
            ${t.options.map((i,n)=>{const s=i===t.value;return B`<button
                class="mi ${s?"on":""}"
                role="option"
                aria-selected=${s?"true":"false"}
                style="--i:${Math.min(n,12)};--oc:${t.color(i)}"
                @click=${()=>{t.pick(i)}}
              >
                ${e?B`<ha-icon icon=${t.icon(i)}></ha-icon>`:B`<span class="dot"></span>`}
                <span class="mi-l">${t.label(i)}</span>
              </button>`})}`:V}
      </div>
    `}_dark(t){return t.themes?.darkMode}get _entity(){return this.hass?.states[this._config?.entity]}_st(t){return t?this.hass?.states?.[t]:void 0}_available(t){const e=this._st(t)?.state;return!!e&&"unavailable"!==e&&"unknown"!==e}get _preset(){if(this._config?.preset)return this._config.preset;const t=this._entity?.attributes??{};return t.fan_modes||t.swing_modes?"ac":"thermostat"}_tracked(){const t=[this._config.entity];for(const e of this._config.switches??[])e.entity&&t.push(e.entity);for(const e of this._config.selects??[])e.entity&&t.push(e.entity);return this._config.temperature_entity&&t.push(this._config.temperature_entity),this._config.humidity_entity&&t.push(this._config.humidity_entity),t}get _name(){return this._config?.name??this._entity?.attributes?.friendly_name??this._config?.entity??""}get _unit(){return this._config?.unit??this.hass?.config?.unit_system?.temperature??"°C"}get _step(){return this._config?.step??this._entity?.attributes?.target_temp_step??.5}get _decimals(){return null!=this._config?.decimals?this._config.decimals:Number.isInteger(this._step)?0:1}get _buttonsSize(){return this._config?.buttons_size??"large"}get _mode(){return this._entity?.state??"off"}get _action(){return this._entity?.attributes?.hvac_action}get _activity(){const t=this._mode;if("off"===t||"unavailable"===t)return"off";const e=this._action;return null==e?t:"off"===e?"off":"idle"===e?"idle":vt[e]??t}_color(t){return this._config?.theme?.modes?.[t]??yt[t]??"var(--tc-accent)"}_cap(t){return t?t.charAt(0).toUpperCase()+t.slice(1).replace(/_/g," "):""}_sensorNum(t){const e=this._st(t);if(!e)return;const i=parseFloat(e.state);return Number.isNaN(i)?void 0:{value:i,unit:e.attributes.unit_of_measurement??""}}_fmt(t){return null==t||Number.isNaN(t)?"—":t.toFixed(this._decimals)}_fmtCur(t){const e=this._config?.decimals??1;return null==t||Number.isNaN(t)?"—":t.toFixed(e)}_fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_moreInfo(t){t&&this._fire("hass-more-info",{entityId:t})}_onKey(t){return e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),t())}}_attrNum(t){const e=this._entity?.attributes?.[t];return null==e||""===e?void 0:Number(e)}_shown(t){return this._pending[t]?.value??this._attrNum(t)}_queueTemp(t,e){const i=this._shown(t);if(null==i)return;const n=this._step,s=this._entity.attributes;let o=s.min_temp,r=s.max_temp;"target_temp_low"===t&&(r=Math.min(r??1/0,(this._shown("target_temp_high")??1/0)-n)),"target_temp_high"===t&&(o=Math.max(o??-1/0,(this._shown("target_temp_low")??-1/0)+n));const a=Math.round((i+e)/n)*n,l=parseFloat(Math.min(r??1/0,Math.max(o??-1/0,a)).toFixed(4));if(l===i)return;this._rollDir=e>0?"up":"down";const c=this._pending[t];c?.timer&&clearTimeout(c.timer);const h=()=>{const e=this._pending[t];if(!e||e.value!==l)return;const i={entity_id:this._config.entity};"temperature"===t?i.temperature=l:(i.target_temp_low=this._shown("target_temp_low"),i.target_temp_high=this._shown("target_temp_high")),this.hass.callService("climate","set_temperature",i),this._pending={...this._pending,[t]:{value:l,sent:!0}},window.setTimeout(()=>{const e=this._pending[t];if(e?.sent&&e.value===l){const e={...this._pending};delete e[t],this._pending=e}},kt)},d=this._config.debounce??700,p={value:l,sent:!1};d>0&&(p.timer=window.setTimeout(h,d)),this._pending={...this._pending,[t]:p},d<=0&&h()}_canStep(t,e){const i=this._shown(t);if(null==i)return!1;const n=this._entity?.attributes??{};return e<0?null==n.min_temp||i>n.min_temp:null==n.max_temp||i<n.max_temp}_switches(){return this._config.switches?this._config.switches.filter(t=>"power"===t.type||!!t.entity):(this._entity?.attributes?.hvac_modes??[]).includes("off")?[{type:"power"}]:[]}_switchKey(t,e){return"power"===t.type?"__power":t.entity??`__sw${e}`}_switchOn(t,e){if(e in this._pendingSel)return"on"===this._pendingSel[e];if("power"===t.type)return"off"!==this._mode;const i=this._st(t.entity)?.state;return"on"===i||"open"===i||"heat"===i||"cool"===i||"playing"===i}_toggleSwitch(t,e){if(this._held)return;const i=this._switchOn(t,e);this._pendingSel={...this._pendingSel,[e]:i?"off":"on"},this._popped=e,window.setTimeout(()=>{this._popped===e&&(this._popped=null)},450),window.setTimeout(()=>{if(e in this._pendingSel){const t={...this._pendingSel};delete t[e],this._pendingSel=t}},kt),"power"===t.type?i?this.hass.callService("climate","turn_off",{entity_id:this._config.entity}):this._powerOn():t.entity&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity})}get _lmKey(){return`thermostat-card:last-mode:${this._config.entity}`}_onModes(){return(this._entity?.attributes?.hvac_modes??[]).filter(t=>"off"!==t)}_getLastMode(){if(!this._lastMode)try{this._lastMode=window.localStorage.getItem(this._lmKey)??void 0}catch{}const t=this._onModes();return this._lastMode&&t.includes(this._lastMode)?this._lastMode:void 0}_setLastMode(t){if(t&&"off"!==t&&"unavailable"!==t&&"unknown"!==t&&t!==this._lastMode){this._lastMode=t;try{window.localStorage.setItem(this._lmKey,t)}catch{}}}_powerOn(){const t=this._config.power_on??"last",e="last"===t?this._getLastMode():"turn_on"===t?void 0:t;e?this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:e}):this.hass.callService("climate","turn_on",{entity_id:this._config.entity})}get _shownMode(){const t=this._pendingSel["hvac#hdr"];return t||("off"===this._mode?this._getLastMode():this._mode)}_pickMode(t){this._setLastMode(t),window.setTimeout(()=>this._openSel=null,160),"off"!==this._mode?(this._pendingSel={...this._pendingSel,"hvac#hdr":t},window.setTimeout(()=>{const t={...this._pendingSel};delete t["hvac#hdr"],this._pendingSel=t},3e3),this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})):this.requestUpdate()}_holdStart(t){this._held=!1,clearTimeout(this._holdTimer),this._holdTimer=window.setTimeout(()=>{this._held=!0,this._moreInfo(t)},500)}_holdEnd(){clearTimeout(this._holdTimer),window.setTimeout(()=>this._held=!1,0)}_selects(){if(!this._config||!this._entity)return[];const t=this._entity.attributes;let e=this._config.selects;if(!e){e=("ac"===this._preset?["fan_mode","preset_mode","swing_mode","swing_horizontal_mode"]:["preset_mode"]).filter(e=>Array.isArray(t[xt[e].list])&&t[xt[e].list].length).map(t=>({type:t}))}return e.filter(t=>""!==t.entity).map((e,i)=>{if(e.entity){const t=this._st(e.entity),i=t?.attributes?.options??[];return{key:e.entity,name:e.name??t?.attributes?.friendly_name??e.entity,icon:e.icon??t?.attributes?.icon??"mdi:format-list-bulleted",value:this._pendingSel[e.entity]??t?.state,options:e.options??i,cfg:e,available:this._available(e.entity)}}const n=e.type??"fan_mode",s=xt[n],o=`${n}#${i}`,r="hvac_mode"===n?this._mode:t[s.attr];return{key:o,name:e.name??s.name,icon:e.icon??("hvac_mode"===n?bt[r??""]??s.icon:s.icon),value:this._pendingSel[o]??r,options:e.options??t[s.list]??[],cfg:e,available:this._available(this._config.entity)}})}_actualSelValue(t){if("__power"===t)return"off"!==this._mode?"on":"off";if(t.includes("#")){const e=t.split("#")[0];return"hvac_mode"===e?this._mode:this._entity?.attributes?.[xt[e].attr]}const e=this._st(t)?.state;return e}_label(t,e){return null==e?"—":t.cfg.labels?.[e]??this._cap(e)}_choose(t,e){if(this._pendingSel={...this._pendingSel,[t.key]:e},window.setTimeout(()=>{if(this._pendingSel[t.key]===e){const e={...this._pendingSel};delete e[t.key],this._pendingSel=e}},kt),window.setTimeout(()=>this._openSel=null,160),t.cfg.entity){const i=t.cfg.entity.split(".")[0];return void this.hass.callService("input_select"===i?"input_select":"select","select_option",{entity_id:t.cfg.entity,option:e})}const i=xt[t.cfg.type??"fan_mode"];this.hass.callService("climate",i.service,{entity_id:this._config.entity,[i.field]:e})}_showModes(){return!!this._config&&(!this._config.hide_modes&&!!this._config.modes)}_modes(){const t=this._config?.modes,e=this._entity?.attributes?.hvac_modes??[];return(t??e).map(t=>{const e="string"==typeof t?t:t.name;return{name:e,icon:"string"!=typeof t&&t.icon?t.icon:bt[e]??"mdi:help-circle",label:"string"!=typeof t&&t.label?t.label:this._cap(e)}})}_setMode(t){this._pendingSel={...this._pendingSel,"hvac_mode#row":t},window.setTimeout(()=>{const t={...this._pendingSel};delete t["hvac_mode#row"],this._pendingSel=t},2500),this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}_infoValue(t){const e=this._entity,i=e.attributes;switch(t.type){case"current_temperature":{const t=this._sensorNum(this._config.temperature_entity);return t?`${this._fmtCur(t.value)}${t.unit||this._unit}`:null!=i.current_temperature?`${this._fmtCur(Number(i.current_temperature))}${this._unit}`:"—"}case"target_temperature":return null!=i.temperature?`${this._fmt(Number(i.temperature))}${this._unit}`:"—";case"state":return this._cap(e.state);case"hvac_action":{const t=i.hvac_action;return null==t||t===e.state||"off"===t&&"off"===e.state?this._cap(e.state):`${this._cap(e.state)} · ${this._cap(t)}`}case"humidity":{const t=this._sensorNum(this._config.humidity_entity);if(t)return`${Math.round(t.value)}${t.unit||"%"}`;const e=i.current_humidity??i.humidity;return null!=e?`${e}%`:"—"}case"preset_mode":return this._cap(i.preset_mode??"—");case"fan_mode":return this._cap(i.fan_mode??"—");default:return"—"}}render(){if(!this.hass||!this._config)return V;const t=this._entity;if(!t)return B`<ha-card><div class="tc-error">Entity not found: ${this._config.entity}</div></ha-card>`;const e=this._activity,i=!["off","idle"].includes(e),n="idle"===e?this._color(this._mode):this._color(e),s=String(t.attributes.fan_mode??"").toLowerCase(),o=$t[s]??1.8;return B`
      <ha-card
        class="act-${e} ${i?"live":""} ${"off"===this._mode?"is-off":""} ${this._compact?"compact":""}"
        style="--st:${n};--flow-speed:${o}s;${this._heightCss()}"
      >
        ${this._renderAmbient(e,i)}
        ${this._renderHeader(e,i)} ${this._compact?V:this._renderMain()} ${this._renderSelects()}
        ${this._renderModes()}
        ${this._renderMenu()}
      </ha-card>
    `}_heightCss(){const t=this._config.height;if(null==t||""===t)return"";return`height:${"number"==typeof t||/^\d+(\.\d+)?$/.test(String(t))?`${t}px`:String(t)};flex:none;`}_hasModeDropdown(){const t=this._config;return null!=t.mode_dropdown?t.mode_dropdown&&this._onModes().length>0:this._onModes().length>1}_renderHeader(t,e){const i=this._config,n=this._entity.attributes,s=i.icon??("ac"===this._preset?"mdi:air-conditioner":"mdi:thermostat"),o=e?{heat:"mdi:fire",cool:"mdi:snowflake",fan_only:"mdi:fan",dry:"mdi:water",auto:"mdi:fan",heat_cool:"mdi:fan"}[t]??s:s,r="off"===this._mode,a=this._shownMode,l=[...i.info??[{type:"current_temperature"},...null!=n.current_humidity?[{type:"humidity"}]:[]]];if(i.temperature_entity&&!l.some(t=>"current_temperature"===t.type)&&l.unshift({type:"current_temperature"}),i.humidity_entity&&!l.some(t=>"humidity"===t.type)){const t=l.findIndex(t=>"current_temperature"===t.type);l.splice(t+1,0,{type:"humidity"})}const c=()=>this._moreInfo(i.entity),h=this._switches().map((t,e)=>({s:t,i:e})),d=h.filter(t=>"power"!==t.s.type),p=h.filter(t=>"power"===t.s.type),m="hvac#hdr"===this._openSel;return B`
      <div class="header">
        <div class="title-wrap">
          <div
            class="title-icon ${e?"active":""} ic-${e?t:"still"}"
            role="button"
            tabindex="0"
            @click=${c}
            @keydown=${this._onKey(c)}
          >
            ${ft(o,B`<ha-icon icon=${o}></ha-icon>`)}
          </div>
          <div class="title-text">
            <div class="name-row">
              <span class="name">${this._name}</span>
              <span class="fn ${r?"off":""}" style="--fc:${this._color(r?"off":a??"off")}">
                ${r?B`<span class="status-dot"></span>OFF`:B`<span class="status-dot ${e?"live":""}"></span>${ft(a,B`<span class="fn-txt">${this._modeLabel(a)}</span>`)}`}
              </span>
              ${r&&a?B`<span class="fn-next" title="Pornește în ${this._modeLabel(a)}"
                    ><ha-icon icon=${bt[a]??"mdi:help"}></ha-icon>${this._modeLabel(a)}</span
                  >`:V}
            </div>
            <div class="sub">
              ${l.map((t,e)=>B`${e?B`<span class="sep">·</span>`:V}<span class="si"
                    >${!t.hide_label&&t.label?B`<span class="sub-l">${t.label}</span>`:St[t.type]?B`<ha-icon class="sub-ic" icon=${St[t.type]}></ha-icon>`:V}<span class="sub-v">${this._infoValue(t)}</span></span
                  >`)}
            </div>
          </div>
        </div>
        <div class="header-controls">
          ${this._compact?this._renderInlineSetpoint():V}
          ${d.map(t=>this._renderSwitch(t.s,t.i))}
          ${this._hasModeDropdown()?B`<button
                class="mode-dd ${m?"open":""}"
                data-dd="hvac#hdr"
                style="--fc:${this._color(a??"off")}"
                title="Mod de funcționare"
                aria-expanded=${m?"true":"false"}
                @click=${()=>this._openSel=m?null:"hvac#hdr"}
              >
                ${ft(a,B`<ha-icon class="dd-ic" icon=${bt[a??""]??"mdi:tune-variant"}></ha-icon>`)}
                <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
              </button>`:V}
          ${p.map(t=>this._renderSwitch(t.s,t.i))}
        </div>
      </div>
    `}_modeLabel(t){if(!t)return"—";const e=this._config.modes?.find(e=>"string"!=typeof e&&e.name===t);return e?.label??this._cap(t)}_renderSwitch(t,e){const i=this._switchKey(t,e),n=this._switchOn(t,i),s="power"===t.type?this._config.entity:t.entity,o=this._available(s),r=i in this._pendingSel,a=n?t.icon??("power"===t.type?"mdi:power":"mdi:toggle-switch"):t.icon_off??t.icon??("power"===t.type?"mdi:power":"mdi:toggle-switch-off"),l=t.color??("power"===t.type?this._color(this._shownMode??"cool"):this._config.theme?.switch_on??"var(--tc-accent)"),c=t.name??("power"===t.type?"Power":this._st(t.entity)?.attributes?.friendly_name??t.entity??"");return B`
      <button
        class="sw ${"power"===t.type?"pwr":""} ${n?"on":""} ${t.show_name?"named":""} ${r?"pending":""} ${this._popped===i?"pop":""} ${o?"":"unavailable"}"
        style="--sw:${l}"
        title=${c}
        aria-label=${c}
        aria-pressed=${n?"true":"false"}
        ?disabled=${!o}
        @click=${()=>o&&this._toggleSwitch(t,i)}
        @pointerdown=${()=>this._holdStart(s)}
        @pointerup=${()=>this._holdEnd()}
        @pointerleave=${()=>this._holdEnd()}
        @contextmenu=${t=>t.preventDefault()}
      >
        <ha-icon icon=${a}></ha-icon>
        ${t.show_name?B`<span class="sw-name">${c}</span><span class="track"><span class="knob"></span></span>`:V}
      </button>
    `}_renderInlineSetpoint(){const t=this._entity.attributes,e=null==t.temperature&&null!=t.target_temp_low&&null!=t.target_temp_high;return B`<div class="inline-sp">
      ${e?B`${this._renderSetpoint("target_temp_low")}${this._renderSetpoint("target_temp_high")}`:this._renderSetpoint("temperature")}
    </div>`}_renderMain(){const t=this._entity.attributes,e=null==t.temperature&&null!=t.target_temp_low&&null!=t.target_temp_high;return B`
      <div class="main ${e?"range":""}">
        ${e?B`${this._renderSetpoint("target_temp_low","MIN")}${this._renderSetpoint("target_temp_high","MAX")}`:this._renderSetpoint("temperature")}
      </div>
    `}_renderSetpoint(t,e){const i=this._shown(t),n=t in this._pending,s=this._buttonsSize,o=e=>B`
      <button
        class="step-btn"
        aria-label=${e>0?"Increase temperature":"Decrease temperature"}
        ?disabled=${!this._canStep(t,e)}
        @click=${()=>this._queueTemp(t,e*this._step)}
      >
        <ha-icon icon=${e>0?"mdi:plus":"mdi:minus"}></ha-icon>
      </button>
    `;return B`
      <div class="sp sz-${s}">
        ${o(-1)}
        <div class="sp-center">
          ${e?B`<span class="sp-label">${e}</span>`:V}
          <span class="sp-val ${n?"pending":""}"
            >${ft(`${t}:${i}`,B`<span class="roll roll-${this._rollDir}">${this._fmt(i)}</span>`)}<span
              class="u"
              >${this._unit}</span
            ></span
          >
        </div>
        ${o(1)}
      </div>
    `}_renderAmbient(t,e){return e&&!1!==this._config.animations?"heat"===t?B`<div class="amb amb-heat" aria-hidden="true">
        ${[4,22,41,60,78,94].map((t,e)=>B`<span style="left:${t}%;animation-delay:${.9*e%3.6}s;--d:${3.4+e%3*.7}s"></span>`)}
      </div>`:"dry"===t?B`<div class="amb amb-dry" aria-hidden="true">
        ${[10,26,42,58,74,90].map((t,e)=>B`<span style="left:${t}%;animation-delay:${.45*e}s"></span>`)}
      </div>`:B`<svg class="amb amb-air" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-60 30 Q -30 20 0 30 T 60 30 T 120 30 T 180 30 T 240 30 T 300 30 T 360 30 T 420 30 T 480 30" />
      <path class="p2" d="M-60 55 Q -30 45 0 55 T 60 55 T 120 55 T 180 55 T 240 55 T 300 55 T 360 55 T 420 55 T 480 55" />
      <path class="p3" d="M-60 80 Q -30 70 0 80 T 60 80 T 120 80 T 180 80 T 240 80 T 300 80 T 360 80 T 420 80 T 480 80" />
    </svg>`:V}_renderSelects(){const t=this._selects();if(!t.length)return V;const e=this._openSel,i=t.length,n=i<=4?i:Math.ceil(i/Math.ceil(i/4));return B`
      <div class="sel-row" style="--cols:${n};--cols-narrow:${Math.min(n,2)}">
        ${t.map(t=>{const i=e===t.key,n=!1!==t.cfg.show_value;return B`
            <button
              class="sel ${i?"open":""} ${t.key in this._pendingSel?"pending":""}"
              data-dd=${t.key}
              aria-haspopup="listbox"
              aria-expanded=${i?"true":"false"}
              ?disabled=${!t.available}
              @click=${()=>{t.available&&t.options.length&&(this._openSel=i?null:t.key)}}
            >
              <ha-icon class="sel-ic" icon=${t.cfg.icons?.[t.value??""]??t.icon}></ha-icon>
              <span class="sel-txt">
                ${n?B`<span class="sel-name">${t.name}</span>`:V}
                <span class="sel-val">${n?this._label(t,t.value):t.name}</span>
              </span>
              <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
            </button>
          `})}
      </div>
    `}_renderModes(){if(!this._showModes())return V;const t=this._modes();if(!t.length)return V;const e=this._pendingSel["hvac_mode#row"]??this._mode;return B`
      <div class="modes" style="--n:${t.length}">
        ${t.map(t=>{const i=t.name===e;return B`<button
            class="mode ${i?"on":""} m-${t.name}"
            style="--mc:${this._color(t.name)}"
            aria-pressed=${i?"true":"false"}
            @click=${()=>this._setMode(t.name)}
          >
            <ha-icon icon=${t.icon}></ha-icon><span>${t.label}</span>
          </button>`})}
      </div>
    `}};At.styles=gt,t([pt({attribute:!1})],At.prototype,"hass",void 0),t([mt()],At.prototype,"_config",void 0),t([mt()],At.prototype,"_pending",void 0),t([mt()],At.prototype,"_pendingSel",void 0),t([mt()],At.prototype,"_openSel",void 0),t([mt()],At.prototype,"_rollDir",void 0),t([mt()],At.prototype,"_popped",void 0),t([mt()],At.prototype,"_compact",void 0),At=t([ct("thermostat-card")],At);const Mt=t=>t?t.charAt(0).toUpperCase()+t.slice(1).replace(/_/g," "):t,Et=t=>({type:"grid",name:"",schema:t}),Ct=t=>({name:t,selector:{text:{}}}),zt=t=>({name:t,selector:{icon:{}}}),Tt=t=>({name:t,selector:{boolean:{}}}),Pt=(t,e)=>({name:t,selector:{select:{mode:"dropdown",options:e}}}),Ot=t=>{const e={...t};for(const t of Object.keys(e))""!==e[t]&&void 0!==e[t]&&null!==e[t]||delete e[t];return e},Ht=[{value:"fan_mode",attr:"fan_mode",list:"fan_modes",label:"Fan mode"},{value:"preset_mode",attr:"preset_mode",list:"preset_modes",label:"Preset"},{value:"swing_mode",attr:"swing_mode",list:"swing_modes",label:"Swing (vertical)"},{value:"swing_horizontal_mode",attr:"swing_horizontal_mode",list:"swing_horizontal_modes",label:"Swing (horizontal)"},{value:"hvac_mode",attr:"",list:"hvac_modes",label:"HVAC mode"}],Nt=[{value:"current_temperature",label:"Current temperature"},{value:"humidity",label:"Humidity"},{value:"hvac_action",label:"Mode · action"},{value:"state",label:"Mode"},{value:"fan_mode",label:"Fan mode"},{value:"preset_mode",label:"Preset"},{value:"target_temperature",label:"Target temperature"}],Lt={entity:"Climate entity",name:"Name",icon:"Icon",preset:"Card type",power_on:"Power button turns the unit on in",mode_dropdown:"Mode dropdown next to the power button",info:"Line under the name",buttons_size:"Setpoint button size",menu_max_items:"Dropdown: options visible before scrolling",step:"Setpoint step (empty = from entity)",decimals:"Setpoint decimals (empty = automatic)",debounce:"Send setpoint after (ms)",animations:"Animations",modes:"Mode buttons row (empty = hidden)",kind:"Button",icon_off:"Icon when off",color:"Color when on (e.g. #5dcaa5)",show_name:"Show name and switch",source:"Selector",heat:"Heat",cool:"Cool",auto:"Auto",heat_cool:"Heat / cool",dry:"Dry",fan_only:"Fan only",switch_on:"Default color for switches that are on",temperature_entity:"Temperature sensor (optional, instead of the climate value)",humidity_entity:"Humidity sensor (optional)",height:"Card height in px (empty = automatic). Small heights switch to the compact layout."};let Ut=class extends at{constructor(){super(...arguments),this._label=t=>Lt[t.name]??Mt(t.name),this._mainChanged=t=>{t.stopPropagation();const e={...t.detail.value},i={...this._config,...e};if(void 0!==e.preset&&(i.preset="auto"===e.preset?void 0:e.preset),void 0!==e.power_on&&(i.power_on="last"===e.power_on?void 0:e.power_on),void 0!==e.mode_dropdown&&(i.mode_dropdown="show"===e.mode_dropdown||"hide"!==e.mode_dropdown&&void 0),void 0!==e.animations&&(i.animations=!!e.animations&&void 0),Array.isArray(e.info)){const t=this._config.info??[],n=2===e.info.length&&"current_temperature"===e.info[0]&&"humidity"===e.info[1];i.info=n?void 0:e.info.map(e=>t.find(t=>t.type===e)??{type:e})}for(const[t,e]of[["buttons_size","large"],["menu_max_items",8],["debounce",700]])i[t]===e&&delete i[t];this._emit(Ot(i))},this._themeChanged=t=>{t.stopPropagation();const e={...t.detail.value},i=e.switch_on;delete e.switch_on;const n=Ot(e),s=Ot({modes:Object.keys(n).length?n:void 0,switch_on:i||void 0});this._emit(Ot({...this._config,theme:Object.keys(s).length?s:void 0}))},this._addSelect=()=>{const t=new Set(this._selects.map(t=>t.type)),e=Ht.find(e=>!t.has(e.value)&&Array.isArray(this._attrs[e.list])&&this._attrs[e.list].length)?.value??"fan_mode";this._emit({...this._config,selects:[...this._selects,{type:e}]})}}setConfig(t){this._config=t}get _attrs(){return this.hass?.states?.[this._config?.entity]?.attributes??{}}get _onModes(){return(this._attrs.hvac_modes??[]).filter(t=>"off"!==t)}get _preset(){return this._config.preset?this._config.preset:this._attrs.fan_modes||this._attrs.swing_modes?"ac":"thermostat"}get _switches(){return this._config.switches?this._config.switches:(this._attrs.hvac_modes??[]).includes("off")?[{type:"power"}]:[]}get _selects(){if(this._config.selects)return this._config.selects;return("ac"===this._preset?["fan_mode","preset_mode","swing_mode","swing_horizontal_mode"]:["preset_mode"]).filter(t=>{const e=Ht.find(e=>e.value===t).list;return Array.isArray(this._attrs[e])&&this._attrs[e].length}).map(t=>({type:t}))}_optionsOf(t){if(t.entity)return this.hass?.states?.[t.entity]?.attributes?.options??[];const e=Ht.find(e=>e.value===(t.type??"fan_mode"));return(e?this._attrs[e.list]:void 0)??[]}_mainSchema(){const t=this._onModes;return[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},Et([Ct("name"),zt("icon")]),Et([{name:"temperature_entity",selector:{entity:{domain:"sensor"}}},{name:"humidity_entity",selector:{entity:{domain:"sensor"}}}]),{name:"height",selector:{number:{mode:"box",min:80,max:800,step:1,unit_of_measurement:"px"}}},Et([Pt("preset",[{value:"auto",label:"Automatic"},{value:"ac",label:"Air conditioner"},{value:"thermostat",label:"Thermostat"}]),Pt("power_on",[{value:"last",label:"Last used mode (like a remote)"},{value:"turn_on",label:"Mode chosen by the integration"},...t.map(t=>({value:t,label:`Always ${Mt(t)}`}))])]),Et([Pt("mode_dropdown",[{value:"auto",label:"Automatic (2+ modes)"},{value:"show",label:"Show"},{value:"hide",label:"Hide"}]),Tt("animations")]),{name:"info",selector:{select:{multiple:!0,mode:"list",options:Nt}}}]}_switchSchema(t){const e=Pt("kind",[{value:"power",label:"Power (on / off like a remote)"},{value:"toggle",label:"Toggle another entity"}]);return"power"===t.type?[e,Et([zt("icon"),Ct("color")]),Tt("show_name")]:[e,{name:"entity",selector:{entity:{domain:["switch","input_boolean","light","fan","script","automation"]}}},Et([Ct("name"),Ct("color")]),Et([zt("icon"),zt("icon_off")]),Tt("show_name")]}_selectSchema(t){const e=Pt("source",[...Ht.map(t=>({value:t.value,label:t.label})),{value:"entity",label:"Select / input_select entity"}]),i=this._optionsOf(t);return[e,...void 0!==t.entity?[{name:"entity",selector:{entity:{domain:["select","input_select"]}}}]:[],Et([Ct("name"),zt("icon")]),...i.length?[{name:"options",selector:{select:{multiple:!0,mode:"list",options:i.map(t=>({value:t,label:Mt(t)}))}}}]:[]]}render(){if(!this.hass||!this._config)return V;const t=this._config,e={...t,preset:t.preset??"auto",power_on:t.power_on??"last",mode_dropdown:!0===t.mode_dropdown?"show":!1===t.mode_dropdown?"hide":"auto",animations:!1!==t.animations,height:"number"==typeof t.height?t.height:t.height&&parseFloat(String(t.height))||void 0,info:(t.info??[{type:"current_temperature"},{type:"humidity"}]).map(t=>t.type)},i=this._switches,n=this._selects,s=this._attrs.hvac_modes??[],o=[...new Set([...s.filter(t=>"off"!==t),"heat","cool"])];return B`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${this._mainSchema()}
        .computeLabel=${this._label}
        @value-changed=${this._mainChanged}
      ></ha-form>

      <div class="section">Header buttons</div>
      <div class="hint">The power button is always drawn in the top-right corner.</div>
      ${i.map((t,e)=>this._panel("switches",e,i.length,"power"===t.type?"Power":t.name||this.hass.states[t.entity??""]?.attributes?.friendly_name||t.entity||`Button ${e+1}`,"power"===t.type?"mdi:power":t.icon??"mdi:toggle-switch-outline",B`<ha-form
            .hass=${this.hass}
            .data=${{...t,kind:"power"===t.type?"power":"toggle"}}
            .schema=${this._switchSchema(t)}
            .computeLabel=${this._label}
            @value-changed=${t=>this._switchChanged(e,t)}
          ></ha-form>`))}
      <div class="adds">
        <button class="add" @click=${()=>this._addSwitch("toggle")}>+ Add switch</button>
        ${i.some(t=>"power"===t.type)?V:B`<button class="add" @click=${()=>this._addSwitch("power")}>+ Add power button</button>`}
      </div>

      <div class="section">Selectors</div>
      <div class="hint">Shown on one line under the setpoint; each opens a dropdown.</div>
      ${n.map((t,e)=>{const i=Ht.find(e=>e.value===t.type),s=t.name||(t.entity?this.hass.states[t.entity]?.attributes?.friendly_name||t.entity:i?.label)||`Selector ${e+1}`;return this._panel("selects",e,n.length,s,t.icon??"mdi:form-dropdown",B`<ha-form
              .hass=${this.hass}
              .data=${{...t,source:void 0!==t.entity?"entity":t.type??"fan_mode"}}
              .schema=${this._selectSchema(t)}
              .computeLabel=${this._label}
              @value-changed=${t=>this._selectChanged(e,t)}
            ></ha-form>
            ${this._labelsEditor(t,e)}`)})}
      <button class="add wide" @click=${this._addSelect}>+ Add selector</button>

      <ha-expansion-panel outlined .header=${"Colors"} class="top">
        <ha-form
          .hass=${this.hass}
          .data=${{...t.theme?.modes??{},switch_on:t.theme?.switch_on}}
          .schema=${[Et(o.map(t=>Ct(t))),Ct("switch_on")]}
          .computeLabel=${t=>o.includes(t.name)?`${Lt[t.name]??Mt(t.name)} color (e.g. #6cb4ff)`:this._label(t)}
          @value-changed=${this._themeChanged}
        ></ha-form>
      </ha-expansion-panel>
    `}_panel(t,e,i,n,s,o){return B`<ha-expansion-panel outlined .header=${n} .leftChevron=${!1}>
      <ha-icon slot="leading-icon" .icon=${s}></ha-icon>
      ${o}
      <div class="row">
        <button ?disabled=${0===e} @click=${()=>this._move(t,e,-1)} title="Move up">↑</button>
        <button ?disabled=${e===i-1} @click=${()=>this._move(t,e,1)} title="Move down">↓</button>
        <button class="del" @click=${()=>this._remove(t,e)}>Remove</button>
      </div>
    </ha-expansion-panel>`}_labelsEditor(t,e){const i=t.options?.length?t.options:this._optionsOf(t);return i.length?B`<details class="labels">
      <summary>Option labels (${i.length})</summary>
      ${i.map(i=>B`<div class="lrow">
          <span class="raw">${i}</span>
          <ha-textfield
            .value=${t.labels?.[i]??""}
            .placeholder=${Mt(i)}
            @change=${t=>this._labelChanged(e,i,t.target.value)}
          ></ha-textfield>
        </div>`)}
    </details>`:V}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_switchChanged(t,e){e.stopPropagation();const i={...e.detail.value},n=[...this._switches],s=i.kind;delete i.kind;const o="power"===s?{...i,type:"power"}:{...i,type:void 0};"power"===s&&delete o.entity,o.show_name||delete o.show_name,n[t]=Ot(o),this._emit({...this._config,switches:n})}_selectChanged(t,e){e.stopPropagation();const i={...e.detail.value},n=[...this._selects],s=n[t],o=i.source;let r;delete i.source,"entity"===o?r={...i,type:void 0,entity:i.entity??""}:(r={...i,type:o},delete r.entity);("entity"===o?void 0===s.entity:s.type!==o||void 0!==s.entity)&&(delete r.options,delete r.labels,delete r.name),Array.isArray(r.options)&&!r.options.length&&delete r.options;const a=Ot(r);"entity"===o&&void 0===a.entity&&(a.entity=""),n[t]=a,this._emit({...this._config,selects:n})}_labelChanged(t,e,i){const n=[...this._selects],s={...n[t].labels??{}};i.trim()?s[e]=i.trim():delete s[e],n[t]=Ot({...n[t],labels:Object.keys(s).length?s:void 0}),this._emit({...this._config,selects:n})}_addSwitch(t){const e=[...this._switches];e.push("power"===t?{type:"power"}:{entity:""}),this._emit({...this._config,switches:e})}_remove(t,e){const i=[..."switches"===t?this._switches:this._selects];i.splice(e,1),this._emit({...this._config,[t]:i})}_move(t,e,i){const n=[..."switches"===t?this._switches:this._selects],s=e+i;s<0||s>=n.length||([n[e],n[s]]=[n[s],n[e]],this._emit({...this._config,[t]:n}))}};Ut.styles=r`
    .section {
      margin: 20px 0 2px;
      font-weight: 600;
      font-size: 15px;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }
    ha-expansion-panel {
      display: block;
      margin-bottom: 8px;
      --expansion-panel-content-padding: 8px 12px;
    }
    ha-expansion-panel.top {
      margin-top: 20px;
    }
    ha-expansion-panel ha-icon {
      color: var(--secondary-text-color);
      margin-right: 6px;
    }
    .row {
      display: flex;
      gap: 6px;
      justify-content: flex-end;
      margin-top: 8px;
    }
    .adds {
      display: flex;
      gap: 8px;
    }
    button {
      font: inherit;
      font-size: 13px;
      padding: 4px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.4;
      cursor: default;
    }
    button.del {
      color: var(--error-color, #db4437);
    }
    button.add {
      flex: 1;
      padding: 8px;
      border-style: dashed;
    }
    button.add.wide {
      width: 100%;
    }
    details.labels {
      margin-top: 10px;
    }
    details.labels summary {
      cursor: pointer;
      font-size: 13px;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
    }
    .lrow {
      display: grid;
      grid-template-columns: minmax(90px, 0.8fr) 1.2fr;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .raw {
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,t([pt({attribute:!1})],Ut.prototype,"hass",void 0),t([mt()],Ut.prototype,"_config",void 0),Ut=t([ct("thermostat-card-editor")],Ut);var Rt=Object.freeze({__proto__:null,get ThermostatCardEditor(){return Ut}});export{At as ThermostatCard};
