function t(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,u=globalThis,_=u.trustedTypes,f=_?_.emptyScript:"",g=u.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,g?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,S=t=>t,k=$.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,M="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+E,C=`<${z}>`,T=document,P=()=>T.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,R=/>/g,D=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),K=new WeakMap,W=T.createTreeWalker(T,129);function Y(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",a=H;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===H?"!--"===l[1]?a=N:void 0!==l[1]?a=R:void 0!==l[2]?(B.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=D):void 0!==l[3]&&(a=D):a===D?">"===l[0]?(a=n??H,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?D:'"'===l[3]?I:j):a===I||a===j?a=D:a===N||a===R?a=H:(a=D,n=void 0);const h=a===D&&t[e+1].startsWith("/>")?" ":"";o+=a===H?i+C:c>=0?(s.push(r),i.slice(0,c)+M+i.slice(c)+E+h):i+E+(-2===c?e:h)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const a=t.length-1,r=this.parts,[l,c]=X(t,e);if(this.el=Q.createElement(l,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(M)){const e=c[o++],i=s.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?et:"?"===a[1]?it:"@"===a[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(E)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),W.nextNode(),r.push({type:2,index:++n});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===z)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)r.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===q)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);W.currentNode=s;let n=W.nextNode(),o=0,a=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new G(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new nt(n,this,t)),this._$AV.push(e),r=i[++a]}o!==r?.index&&(n=W.nextNode(),o++)}return W.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),O(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Q(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new G(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=J(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const s=t;let a,r;for(t=n[0],a=0;a<n.length-1;a++)r=J(this,s[i+a],e,a),r===q&&(r=this._$AH[a]),o||=!O(r)||r!==this._$AH[a],r===F?t=F:t!==F&&(t+=(r??"")+n[a+1]),this._$AH[a]=r}o&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??F)===q)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=$.litHtmlPolyfillSupport;ot?.(Q,G),($.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;let rt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new G(e.insertBefore(P(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};rt._$litElement$=!0,rt.finalized=!0,at.litElementHydrateSupport?.({LitElement:rt});const lt=at.litElementPolyfillSupport;lt?.({LitElement:rt}),(at.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},ht=(t=dt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function mt(t){return pt({...t,state:!0,attribute:!1})}let ut=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const _t={},ft=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends ut{constructor(){super(...arguments),this.key=F}render(t,e){return this.key=t,e}update(t,[e,i]){return e!==this.key&&(((t,e=_t)=>{t._$AH=e})(t),this.key=e),i}}),gt=a`
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
    flex: 1 0 auto;
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
    font-size: 12.5px;
    color: var(--tc-sub);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sub-v { color: var(--tc-txt); opacity: 0.9; }
  .sub-ic { --mdc-icon-size: 14px; color: var(--tc-sub); margin-right: 2px; vertical-align: -2px; }
  .sep { margin: 0 6px; opacity: 0.6; }

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
  .main { display: flex; justify-content: center; gap: 18px; padding: 2px 0; }
  .sp {
    --b: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    flex: 1 1 0;
    max-width: 340px;
  }
  .sp.sz-small { --b: 36px; }
  .sp.sz-medium { --b: 42px; }
  .sp.sz-xlarge { --b: 58px; }
  .sp-center { display: flex; flex-direction: column; align-items: center; min-width: 0; }
  .sp-label { font-size: 10px; font-weight: 700; letter-spacing: 1px; color: var(--tc-sub); }
  .sp-val {
    font-size: calc(var(--b) * 0.9);
    font-weight: 700;
    line-height: 1.05;
    color: var(--st);
    white-space: nowrap;
    display: inline-flex;
    align-items: baseline;
    overflow: hidden;
    transition: color 0.5s, opacity 0.2s;
  }
  .range .sp-val { font-size: calc(var(--b) * 0.65); }
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
  :host([no-anim]) *,
  :host([no-anim]) ha-card::before { animation: none !important; }
  :host([no-anim]) .opt { opacity: 1; }
  @media (prefers-reduced-motion: reduce) {
    *, ha-card::before { animation: none !important; }
    .opt { opacity: 1; }
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
    .sp { --b: 42px; }
  }
`;console.info("%c THERMOSTAT-CARD %c v0.2.0 ","color:#0b1a2a;background:#4ecdc4;font-weight:700;border-radius:4px 0 0 4px;padding:2px 4px","color:#4ecdc4;background:#16243a;font-weight:700;border-radius:0 4px 4px 0;padding:2px 4px");const bt={heat:"mdi:fire",cool:"mdi:snowflake",auto:"mdi:thermostat-auto",heat_cool:"mdi:sun-snowflake-variant",off:"mdi:power",fan_only:"mdi:fan",dry:"mdi:water-percent"},vt={heat:"var(--tc-heat)",cool:"var(--tc-cool)",auto:"var(--tc-green)",heat_cool:"var(--tc-green)",fan_only:"var(--tc-accent)",dry:"var(--tc-dry)",off:"var(--tc-sub)"},yt={heating:"heat",preheating:"heat",defrosting:"heat",cooling:"cool",drying:"dry",fan:"fan_only"},wt={...bt,auto:"mdi:fan-auto",quiet:"mdi:fan-minus",silent:"mdi:fan-minus",low:"mdi:fan-speed-1",medium:"mdi:fan-speed-2",mid:"mdi:fan-speed-2",middle:"mdi:fan-speed-2",high:"mdi:fan-speed-3",turbo:"mdi:fan-plus",none:"mdi:circle-off-outline",eco:"mdi:leaf",comfort:"mdi:sofa-outline",boost:"mdi:rocket-launch",sleep:"mdi:power-sleep",away:"mdi:home-export-outline",home:"mdi:home-outline",activity:"mdi:run",on:"mdi:arrow-oscillating",vertical:"mdi:arrow-up-down",horizontal:"mdi:arrow-left-right",both:"mdi:arrow-all"},xt={hvac_mode:{attr:"",list:"hvac_modes",service:"set_hvac_mode",field:"hvac_mode",name:"Mode",icon:"mdi:thermostat"},fan_mode:{attr:"fan_mode",list:"fan_modes",service:"set_fan_mode",field:"fan_mode",name:"Fan",icon:"mdi:fan"},preset_mode:{attr:"preset_mode",list:"preset_modes",service:"set_preset_mode",field:"preset_mode",name:"Preset",icon:"mdi:rocket-launch-outline"},swing_mode:{attr:"swing_mode",list:"swing_modes",service:"set_swing_mode",field:"swing_mode",name:"Swing",icon:"mdi:arrow-oscillating"},swing_horizontal_mode:{attr:"swing_horizontal_mode",list:"swing_horizontal_modes",service:"set_swing_horizontal_mode",field:"swing_horizontal_mode",name:"Pos",icon:"mdi:arrow-left-right"}},$t={quiet:3.2,silent:3.2,low:2.6,medium:1.7,mid:1.7,middle:1.7,auto:1.9,high:1.1,turbo:.8,strong:.8},St={current_temperature:"mdi:home-thermometer-outline",humidity:"mdi:water-percent",fan_mode:"mdi:fan",preset_mode:"mdi:tune-variant",target_temperature:"mdi:target"},kt=8e3;window.customCards=window.customCards||[],window.customCards.push({type:"thermostat-card",name:"Thermostat Card",description:"Animated thermostat / AC card with switches, dropdowns and mode buttons",preview:!0});let At=class extends rt{constructor(){super(...arguments),this._pending={},this._pendingSel={},this._openSel=null,this._rollDir="up",this._popped=null,this._held=!1,this._onDocClick=t=>{if(!this._openSel)return;const e=t.composedPath();Array.from(this.renderRoot.querySelectorAll(".menu, [data-dd]")).some(t=>e.includes(t))||(this._openSel=null)},this._onDocKey=t=>{"Escape"===t.key&&this._openSel&&(this._openSel=null)},this._menuBound=!1,this._onViewport=()=>{this._openSel&&requestAnimationFrame(()=>this._positionMenu())}}static async getConfigElement(){return await Promise.resolve().then(function(){return Dt}),document.createElement("thermostat-card-editor")}static getStubConfig(t){const e=t?Object.keys(t.states).find(t=>t.startsWith("climate.")):void 0;return{entity:e??"climate.living"}}setConfig(t){if(!t?.entity)throw new Error('thermostat-card: missing "entity"');if(!t.entity.startsWith("climate."))throw new Error('thermostat-card: "entity" must be a climate.* entity');this._config={...t}}getCardSize(){return 3+(this._selects().length?1:0)+(this._showModes()?1:0)}getGridOptions(){return{columns:12,min_columns:6,min_rows:3}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick,!0),document.addEventListener("keydown",this._onDocKey)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick,!0),document.removeEventListener("keydown",this._onDocKey),this._unbindMenu();for(const t of Object.values(this._pending))t.timer&&clearTimeout(t.timer);this._pending={},this._openSel=null}shouldUpdate(t){if(!this._config)return!1;if(t.size>1||!t.has("hass"))return!0;const e=t.get("hass");return!e||!this.hass||(this._dark(e)!==this._dark(this.hass)||this._tracked().some(t=>e.states[t]!==this.hass.states[t]))}willUpdate(t){if(!t.has("hass")||!this.hass)return;if(this._entity&&this._setLastMode(this._entity.state),this._pendingSel["hvac#hdr"]&&this._pendingSel["hvac#hdr"]===this._entity?.state){const t={...this._pendingSel};delete t["hvac#hdr"],this._pendingSel=t}const e=this._entity?.attributes??{};let i,s;for(const[t,s]of Object.entries(this._pending))s.sent&&Number(e[t])===s.value&&(i=i??{...this._pending},delete i[t]);i&&(this._pending=i);for(const[t,e]of Object.entries(this._pendingSel))this._actualSelValue(t)===e&&(s=s??{...this._pendingSel},delete s[t]);s&&(this._pendingSel=s)}updated(t){t.has("hass")&&this.hass&&this.toggleAttribute("light",!1===this._dark(this.hass)),t.has("_config")&&this.toggleAttribute("no-anim",!1===this._config?.animations),t.has("_openSel")?this._syncMenu():this._openSel&&this._positionMenu()}_bindMenu(){this._menuBound||(this._menuBound=!0,window.addEventListener("scroll",this._onViewport,!0),window.addEventListener("resize",this._onViewport),window.visualViewport?.addEventListener("resize",this._onViewport))}_unbindMenu(){this._menuBound&&(this._menuBound=!1,window.removeEventListener("scroll",this._onViewport,!0),window.removeEventListener("resize",this._onViewport),window.visualViewport?.removeEventListener("resize",this._onViewport))}get _menuEl(){return this.renderRoot.querySelector(".menu")}_syncMenu(){const t=this._menuEl;if(t)if(this._openSel){if(t.showPopover)try{t.matches(":popover-open")||t.showPopover()}catch{}t.classList.add("open"),this._positionMenu();const e=t.querySelector(".mi.on");e&&(t.scrollTop=Math.max(0,e.offsetTop-t.clientHeight/2+e.offsetHeight/2)),t.classList.remove("anim"),t.offsetWidth,t.classList.add("anim"),this._bindMenu()}else{if(t.classList.remove("open","anim"),t.hidePopover)try{t.matches(":popover-open")&&t.hidePopover()}catch{}this._unbindMenu()}}_positionMenu(){const t=this._openSel,e=this._menuEl;if(!t||!e)return;const i=Array.from(this.renderRoot.querySelectorAll("[data-dd]")).find(e=>e.dataset.dd===t);if(!i)return;const s=i.getBoundingClientRect(),n=window.visualViewport,o=n?.width??window.innerWidth,a=n?.height??window.innerHeight,r=e.querySelectorAll(".mi, .menu-hint").length,l=this._config.menu_max_items??8,c=44*Math.min(r,l)+16,d=s.top+s.height/2>a/2,h=d?s.top-6-16:a-s.bottom-6-16,p=Math.max(44*Math.min(r,2)+16,Math.min(c,h)),m=Math.min(Math.max(s.width,220),300,o-32),u=Math.max(16,Math.min(s.left+s.width/2-m/2,o-m-16)),_=d?s.top-6-p:s.bottom+6;e.style.left=`${u}px`,e.style.top=`${_}px`,e.style.width=`${m}px`,e.style.maxHeight=`${p}px`,e.style.transformOrigin=`${s.left+s.width/2-u}px ${d?"100%":"0%"}`,e.classList.toggle("up",d),e.classList.toggle("scrolls",44*r+16>p+1)}_menuData(){const t=this._openSel;if(!t||!this._entity)return;if("hvac#hdr"===t)return{options:this._onModes(),value:this._shownMode,pick:t=>this._pickMode(t),label:t=>this._modeLabel(t),icon:t=>bt[t],color:t=>this._color(t),hint:"off"===this._mode?"Pornește în":void 0};const e=this._selects().find(e=>e.key===t);return e?{options:e.options,value:e.value,pick:t=>this._choose(e,t),label:t=>this._label(e,t),icon:t=>e.cfg.icons?.[t]??("hvac_mode"===e.cfg.type?bt[t]:wt[t.toLowerCase()]),color:t=>"hvac_mode"===e.cfg.type?this._color(t):"var(--st)"}:void 0}_renderMenu(){const t=this._menuData(),e=!!t&&t.options.length>0&&t.options.every(e=>!!t.icon(e));return V`
      <div class="menu" popover="manual" role="listbox">
        ${t?V`${t.hint?V`<div class="menu-hint">${t.hint}</div>`:F}
            ${t.options.map((i,s)=>{const n=i===t.value;return V`<button
                class="mi ${n?"on":""}"
                role="option"
                aria-selected=${n?"true":"false"}
                style="--i:${Math.min(s,12)};--oc:${t.color(i)}"
                @click=${()=>{t.pick(i)}}
              >
                ${e?V`<ha-icon icon=${t.icon(i)}></ha-icon>`:V`<span class="dot"></span>`}
                <span class="mi-l">${t.label(i)}</span>
              </button>`})}`:F}
      </div>
    `}_dark(t){return t.themes?.darkMode}get _entity(){return this.hass?.states[this._config?.entity]}_st(t){return t?this.hass?.states?.[t]:void 0}_available(t){const e=this._st(t)?.state;return!!e&&"unavailable"!==e&&"unknown"!==e}get _preset(){if(this._config?.preset)return this._config.preset;const t=this._entity?.attributes??{};return t.fan_modes||t.swing_modes?"ac":"thermostat"}_tracked(){const t=[this._config.entity];for(const e of this._config.switches??[])e.entity&&t.push(e.entity);for(const e of this._config.selects??[])e.entity&&t.push(e.entity);return t}get _name(){return this._config?.name??this._entity?.attributes?.friendly_name??this._config?.entity??""}get _unit(){return this._config?.unit??this.hass?.config?.unit_system?.temperature??"°C"}get _step(){return this._config?.step??this._entity?.attributes?.target_temp_step??.5}get _decimals(){return null!=this._config?.decimals?this._config.decimals:Number.isInteger(this._step)?0:1}get _buttonsSize(){return this._config?.buttons_size??"large"}get _mode(){return this._entity?.state??"off"}get _action(){return this._entity?.attributes?.hvac_action}get _activity(){const t=this._mode;if("off"===t||"unavailable"===t)return"off";const e=this._action;return null==e?t:"off"===e?"off":"idle"===e?"idle":yt[e]??t}_color(t){return this._config?.theme?.modes?.[t]??vt[t]??"var(--tc-accent)"}_cap(t){return t?t.charAt(0).toUpperCase()+t.slice(1).replace(/_/g," "):""}_fmt(t){return null==t||Number.isNaN(t)?"—":t.toFixed(this._decimals)}_fmtCur(t){const e=this._config?.decimals??1;return null==t||Number.isNaN(t)?"—":t.toFixed(e)}_fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_moreInfo(t){t&&this._fire("hass-more-info",{entityId:t})}_onKey(t){return e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),t())}}_attrNum(t){const e=this._entity?.attributes?.[t];return null==e||""===e?void 0:Number(e)}_shown(t){return this._pending[t]?.value??this._attrNum(t)}_queueTemp(t,e){const i=this._shown(t);if(null==i)return;const s=this._step,n=this._entity.attributes;let o=n.min_temp,a=n.max_temp;"target_temp_low"===t&&(a=Math.min(a??1/0,(this._shown("target_temp_high")??1/0)-s)),"target_temp_high"===t&&(o=Math.max(o??-1/0,(this._shown("target_temp_low")??-1/0)+s));const r=Math.round((i+e)/s)*s,l=parseFloat(Math.min(a??1/0,Math.max(o??-1/0,r)).toFixed(4));if(l===i)return;this._rollDir=e>0?"up":"down";const c=this._pending[t];c?.timer&&clearTimeout(c.timer);const d=()=>{const e=this._pending[t];if(!e||e.value!==l)return;const i={entity_id:this._config.entity};"temperature"===t?i.temperature=l:(i.target_temp_low=this._shown("target_temp_low"),i.target_temp_high=this._shown("target_temp_high")),this.hass.callService("climate","set_temperature",i),this._pending={...this._pending,[t]:{value:l,sent:!0}},window.setTimeout(()=>{const e=this._pending[t];if(e?.sent&&e.value===l){const e={...this._pending};delete e[t],this._pending=e}},kt)},h=this._config.debounce??700,p={value:l,sent:!1};h>0&&(p.timer=window.setTimeout(d,h)),this._pending={...this._pending,[t]:p},h<=0&&d()}_canStep(t,e){const i=this._shown(t);if(null==i)return!1;const s=this._entity?.attributes??{};return e<0?null==s.min_temp||i>s.min_temp:null==s.max_temp||i<s.max_temp}_switches(){return this._config.switches?this._config.switches.filter(t=>"power"===t.type||!!t.entity):(this._entity?.attributes?.hvac_modes??[]).includes("off")?[{type:"power"}]:[]}_switchKey(t,e){return"power"===t.type?"__power":t.entity??`__sw${e}`}_switchOn(t,e){if(e in this._pendingSel)return"on"===this._pendingSel[e];if("power"===t.type)return"off"!==this._mode;const i=this._st(t.entity)?.state;return"on"===i||"open"===i||"heat"===i||"cool"===i||"playing"===i}_toggleSwitch(t,e){if(this._held)return;const i=this._switchOn(t,e);this._pendingSel={...this._pendingSel,[e]:i?"off":"on"},this._popped=e,window.setTimeout(()=>{this._popped===e&&(this._popped=null)},450),window.setTimeout(()=>{if(e in this._pendingSel){const t={...this._pendingSel};delete t[e],this._pendingSel=t}},kt),"power"===t.type?i?this.hass.callService("climate","turn_off",{entity_id:this._config.entity}):this._powerOn():t.entity&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity})}get _lmKey(){return`thermostat-card:last-mode:${this._config.entity}`}_onModes(){return(this._entity?.attributes?.hvac_modes??[]).filter(t=>"off"!==t)}_getLastMode(){if(!this._lastMode)try{this._lastMode=window.localStorage.getItem(this._lmKey)??void 0}catch{}const t=this._onModes();return this._lastMode&&t.includes(this._lastMode)?this._lastMode:void 0}_setLastMode(t){if(t&&"off"!==t&&"unavailable"!==t&&"unknown"!==t&&t!==this._lastMode){this._lastMode=t;try{window.localStorage.setItem(this._lmKey,t)}catch{}}}_powerOn(){const t=this._config.power_on??"last",e="last"===t?this._getLastMode():"turn_on"===t?void 0:t;e?this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:e}):this.hass.callService("climate","turn_on",{entity_id:this._config.entity})}get _shownMode(){const t=this._pendingSel["hvac#hdr"];return t||("off"===this._mode?this._getLastMode():this._mode)}_pickMode(t){this._setLastMode(t),window.setTimeout(()=>this._openSel=null,160),"off"!==this._mode?(this._pendingSel={...this._pendingSel,"hvac#hdr":t},window.setTimeout(()=>{const t={...this._pendingSel};delete t["hvac#hdr"],this._pendingSel=t},3e3),this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})):this.requestUpdate()}_holdStart(t){this._held=!1,clearTimeout(this._holdTimer),this._holdTimer=window.setTimeout(()=>{this._held=!0,this._moreInfo(t)},500)}_holdEnd(){clearTimeout(this._holdTimer),window.setTimeout(()=>this._held=!1,0)}_selects(){if(!this._config||!this._entity)return[];const t=this._entity.attributes;let e=this._config.selects;if(!e){e=("ac"===this._preset?["fan_mode","preset_mode","swing_mode","swing_horizontal_mode"]:["preset_mode"]).filter(e=>Array.isArray(t[xt[e].list])&&t[xt[e].list].length).map(t=>({type:t}))}return e.filter(t=>""!==t.entity).map((e,i)=>{if(e.entity){const t=this._st(e.entity),i=t?.attributes?.options??[];return{key:e.entity,name:e.name??t?.attributes?.friendly_name??e.entity,icon:e.icon??t?.attributes?.icon??"mdi:format-list-bulleted",value:this._pendingSel[e.entity]??t?.state,options:e.options??i,cfg:e,available:this._available(e.entity)}}const s=e.type??"fan_mode",n=xt[s],o=`${s}#${i}`,a="hvac_mode"===s?this._mode:t[n.attr];return{key:o,name:e.name??n.name,icon:e.icon??("hvac_mode"===s?bt[a??""]??n.icon:n.icon),value:this._pendingSel[o]??a,options:e.options??t[n.list]??[],cfg:e,available:this._available(this._config.entity)}})}_actualSelValue(t){if("__power"===t)return"off"!==this._mode?"on":"off";if(t.includes("#")){const e=t.split("#")[0];return"hvac_mode"===e?this._mode:this._entity?.attributes?.[xt[e].attr]}const e=this._st(t)?.state;return e}_label(t,e){return null==e?"—":t.cfg.labels?.[e]??this._cap(e)}_choose(t,e){if(this._pendingSel={...this._pendingSel,[t.key]:e},window.setTimeout(()=>{if(this._pendingSel[t.key]===e){const e={...this._pendingSel};delete e[t.key],this._pendingSel=e}},kt),window.setTimeout(()=>this._openSel=null,160),t.cfg.entity){const i=t.cfg.entity.split(".")[0];return void this.hass.callService("input_select"===i?"input_select":"select","select_option",{entity_id:t.cfg.entity,option:e})}const i=xt[t.cfg.type??"fan_mode"];this.hass.callService("climate",i.service,{entity_id:this._config.entity,[i.field]:e})}_showModes(){return!!this._config&&(!this._config.hide_modes&&!!this._config.modes)}_modes(){const t=this._config?.modes,e=this._entity?.attributes?.hvac_modes??[];return(t??e).map(t=>{const e="string"==typeof t?t:t.name;return{name:e,icon:"string"!=typeof t&&t.icon?t.icon:bt[e]??"mdi:help-circle",label:"string"!=typeof t&&t.label?t.label:this._cap(e)}})}_setMode(t){this._pendingSel={...this._pendingSel,"hvac_mode#row":t},window.setTimeout(()=>{const t={...this._pendingSel};delete t["hvac_mode#row"],this._pendingSel=t},2500),this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}_infoValue(t){const e=this._entity,i=e.attributes;switch(t.type){case"current_temperature":return null!=i.current_temperature?`${this._fmtCur(Number(i.current_temperature))}${this._unit}`:"—";case"target_temperature":return null!=i.temperature?`${this._fmt(Number(i.temperature))}${this._unit}`:"—";case"state":return this._cap(e.state);case"hvac_action":{const t=i.hvac_action;return null==t||t===e.state||"off"===t&&"off"===e.state?this._cap(e.state):`${this._cap(e.state)} · ${this._cap(t)}`}case"humidity":{const t=i.current_humidity??i.humidity;return null!=t?`${t}%`:"—"}case"preset_mode":return this._cap(i.preset_mode??"—");case"fan_mode":return this._cap(i.fan_mode??"—");default:return"—"}}render(){if(!this.hass||!this._config)return F;const t=this._entity;if(!t)return V`<ha-card><div class="tc-error">Entity not found: ${this._config.entity}</div></ha-card>`;const e=this._activity,i=!["off","idle"].includes(e),s="idle"===e?this._color(this._mode):this._color(e),n=String(t.attributes.fan_mode??"").toLowerCase(),o=$t[n]??1.8;return V`
      <ha-card
        class="act-${e} ${i?"live":""} ${"off"===this._mode?"is-off":""}"
        style="--st:${s};--flow-speed:${o}s"
      >
        ${this._renderAmbient(e,i)}
        ${this._renderHeader(e,i)} ${this._renderMain()} ${this._renderSelects()} ${this._renderModes()}
        ${this._renderMenu()}
      </ha-card>
    `}_hasModeDropdown(){const t=this._config;return null!=t.mode_dropdown?t.mode_dropdown&&this._onModes().length>0:this._onModes().length>1}_renderHeader(t,e){const i=this._config,s=this._entity.attributes,n=i.icon??("ac"===this._preset?"mdi:air-conditioner":"mdi:thermostat"),o=e?{heat:"mdi:fire",cool:"mdi:snowflake",fan_only:"mdi:fan",dry:"mdi:water",auto:"mdi:fan",heat_cool:"mdi:fan"}[t]??n:n,a="off"===this._mode,r=this._shownMode,l=i.info??[{type:"current_temperature"},...null!=s.current_humidity?[{type:"humidity"}]:[]],c=()=>this._moreInfo(i.entity),d=this._switches().map((t,e)=>({s:t,i:e})),h=d.filter(t=>"power"!==t.s.type),p=d.filter(t=>"power"===t.s.type),m="hvac#hdr"===this._openSel;return V`
      <div class="header">
        <div class="title-wrap">
          <div
            class="title-icon ${e?"active":""} ic-${e?t:"still"}"
            role="button"
            tabindex="0"
            @click=${c}
            @keydown=${this._onKey(c)}
          >
            ${ft(o,V`<ha-icon icon=${o}></ha-icon>`)}
          </div>
          <div class="title-text">
            <div class="name-row">
              <span class="name">${this._name}</span>
              <span class="fn ${a?"off":""}" style="--fc:${this._color(a?"off":r??"off")}">
                ${a?V`<span class="status-dot"></span>OFF`:V`<span class="status-dot ${e?"live":""}"></span>${ft(r,V`<span class="fn-txt">${this._modeLabel(r)}</span>`)}`}
              </span>
              ${a&&r?V`<span class="fn-next" title="Pornește în ${this._modeLabel(r)}"
                    ><ha-icon icon=${bt[r]??"mdi:help"}></ha-icon>${this._modeLabel(r)}</span
                  >`:F}
            </div>
            <div class="sub">
              ${l.map((t,e)=>V`${e?V`<span class="sep">·</span>`:F}${!t.hide_label&&t.label?V`<span class="sub-l">${t.label}</span> `:St[t.type]?V`<ha-icon class="sub-ic" icon=${St[t.type]}></ha-icon>`:F}<span class="sub-v">${this._infoValue(t)}</span>`)}
            </div>
          </div>
        </div>
        <div class="header-controls">
          ${h.map(t=>this._renderSwitch(t.s,t.i))}
          ${this._hasModeDropdown()?V`<button
                class="mode-dd ${m?"open":""}"
                data-dd="hvac#hdr"
                style="--fc:${this._color(r??"off")}"
                title="Mod de funcționare"
                aria-expanded=${m?"true":"false"}
                @click=${()=>this._openSel=m?null:"hvac#hdr"}
              >
                ${ft(r,V`<ha-icon class="dd-ic" icon=${bt[r??""]??"mdi:tune-variant"}></ha-icon>`)}
                <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
              </button>`:F}
          ${p.map(t=>this._renderSwitch(t.s,t.i))}
        </div>
      </div>
    `}_modeLabel(t){if(!t)return"—";const e=this._config.modes?.find(e=>"string"!=typeof e&&e.name===t);return e?.label??this._cap(t)}_renderSwitch(t,e){const i=this._switchKey(t,e),s=this._switchOn(t,i),n="power"===t.type?this._config.entity:t.entity,o=this._available(n),a=i in this._pendingSel,r=s?t.icon??("power"===t.type?"mdi:power":"mdi:toggle-switch"):t.icon_off??t.icon??("power"===t.type?"mdi:power":"mdi:toggle-switch-off"),l=t.color??("power"===t.type?this._color(this._shownMode??"cool"):this._config.theme?.switch_on??"var(--tc-accent)"),c=t.name??("power"===t.type?"Power":this._st(t.entity)?.attributes?.friendly_name??t.entity??"");return V`
      <button
        class="sw ${"power"===t.type?"pwr":""} ${s?"on":""} ${t.show_name?"named":""} ${a?"pending":""} ${this._popped===i?"pop":""} ${o?"":"unavailable"}"
        style="--sw:${l}"
        title=${c}
        aria-label=${c}
        aria-pressed=${s?"true":"false"}
        ?disabled=${!o}
        @click=${()=>o&&this._toggleSwitch(t,i)}
        @pointerdown=${()=>this._holdStart(n)}
        @pointerup=${()=>this._holdEnd()}
        @pointerleave=${()=>this._holdEnd()}
        @contextmenu=${t=>t.preventDefault()}
      >
        <ha-icon icon=${r}></ha-icon>
        ${t.show_name?V`<span class="sw-name">${c}</span><span class="track"><span class="knob"></span></span>`:F}
      </button>
    `}_renderMain(){const t=this._entity.attributes,e=null==t.temperature&&null!=t.target_temp_low&&null!=t.target_temp_high;return V`
      <div class="main ${e?"range":""}">
        ${e?V`${this._renderSetpoint("target_temp_low","MIN")}${this._renderSetpoint("target_temp_high","MAX")}`:this._renderSetpoint("temperature")}
      </div>
    `}_renderSetpoint(t,e){const i=this._shown(t),s=t in this._pending,n=this._buttonsSize,o=e=>V`
      <button
        class="step-btn"
        aria-label=${e>0?"Increase temperature":"Decrease temperature"}
        ?disabled=${!this._canStep(t,e)}
        @click=${()=>this._queueTemp(t,e*this._step)}
      >
        <ha-icon icon=${e>0?"mdi:plus":"mdi:minus"}></ha-icon>
      </button>
    `;return V`
      <div class="sp sz-${n}">
        ${o(-1)}
        <div class="sp-center">
          <span class="sp-label">${e??"SETPOINT"}</span>
          <span class="sp-val ${s?"pending":""}"
            >${ft(`${t}:${i}`,V`<span class="roll roll-${this._rollDir}">${this._fmt(i)}</span>`)}<span
              class="u"
              >${this._unit}</span
            ></span
          >
        </div>
        ${o(1)}
      </div>
    `}_renderAmbient(t,e){return e&&!1!==this._config.animations?"heat"===t?V`<div class="amb amb-heat" aria-hidden="true">
        ${[4,22,41,60,78,94].map((t,e)=>V`<span style="left:${t}%;animation-delay:${.9*e%3.6}s;--d:${3.4+e%3*.7}s"></span>`)}
      </div>`:"dry"===t?V`<div class="amb amb-dry" aria-hidden="true">
        ${[10,26,42,58,74,90].map((t,e)=>V`<span style="left:${t}%;animation-delay:${.45*e}s"></span>`)}
      </div>`:V`<svg class="amb amb-air" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-60 30 Q -30 20 0 30 T 60 30 T 120 30 T 180 30 T 240 30 T 300 30 T 360 30 T 420 30 T 480 30" />
      <path class="p2" d="M-60 55 Q -30 45 0 55 T 60 55 T 120 55 T 180 55 T 240 55 T 300 55 T 360 55 T 420 55 T 480 55" />
      <path class="p3" d="M-60 80 Q -30 70 0 80 T 60 80 T 120 80 T 180 80 T 240 80 T 300 80 T 360 80 T 420 80 T 480 80" />
    </svg>`:F}_renderSelects(){const t=this._selects();if(!t.length)return F;const e=this._openSel,i=t.length,s=i<=4?i:Math.ceil(i/Math.ceil(i/4));return V`
      <div class="sel-row" style="--cols:${s};--cols-narrow:${Math.min(s,2)}">
        ${t.map(t=>{const i=e===t.key,s=!1!==t.cfg.show_value;return V`
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
                ${s?V`<span class="sel-name">${t.name}</span>`:F}
                <span class="sel-val">${s?this._label(t,t.value):t.name}</span>
              </span>
              <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
            </button>
          `})}
      </div>
    `}_renderModes(){if(!this._showModes())return F;const t=this._modes();if(!t.length)return F;const e=this._pendingSel["hvac_mode#row"]??this._mode;return V`
      <div class="modes" style="--n:${t.length}">
        ${t.map(t=>{const i=t.name===e;return V`<button
            class="mode ${i?"on":""} m-${t.name}"
            style="--mc:${this._color(t.name)}"
            aria-pressed=${i?"true":"false"}
            @click=${()=>this._setMode(t.name)}
          >
            <ha-icon icon=${t.icon}></ha-icon><span>${t.label}</span>
          </button>`})}
      </div>
    `}};At.styles=gt,t([pt({attribute:!1})],At.prototype,"hass",void 0),t([mt()],At.prototype,"_config",void 0),t([mt()],At.prototype,"_pending",void 0),t([mt()],At.prototype,"_pendingSel",void 0),t([mt()],At.prototype,"_openSel",void 0),t([mt()],At.prototype,"_rollDir",void 0),t([mt()],At.prototype,"_popped",void 0),At=t([ct("thermostat-card")],At);const Mt=t=>t?t.charAt(0).toUpperCase()+t.slice(1).replace(/_/g," "):t,Et=t=>({type:"grid",name:"",schema:t}),zt=t=>({name:t,selector:{text:{}}}),Ct=t=>({name:t,selector:{icon:{}}}),Tt=t=>({name:t,selector:{boolean:{}}}),Pt=(t,e,i,s=1)=>({name:t,selector:{number:{mode:"box",step:s,...null!=e?{min:e}:{},...null!=i?{max:i}:{}}}}),Ot=(t,e)=>({name:t,selector:{select:{mode:"dropdown",options:e}}}),Lt=t=>{const e={...t};for(const t of Object.keys(e))""!==e[t]&&void 0!==e[t]&&null!==e[t]||delete e[t];return e},Ut=[{value:"fan_mode",attr:"fan_mode",list:"fan_modes",label:"Fan mode"},{value:"preset_mode",attr:"preset_mode",list:"preset_modes",label:"Preset"},{value:"swing_mode",attr:"swing_mode",list:"swing_modes",label:"Swing (vertical)"},{value:"swing_horizontal_mode",attr:"swing_horizontal_mode",list:"swing_horizontal_modes",label:"Swing (horizontal)"},{value:"hvac_mode",attr:"",list:"hvac_modes",label:"HVAC mode"}],Ht=[{value:"current_temperature",label:"Current temperature"},{value:"humidity",label:"Humidity"},{value:"hvac_action",label:"Mode · action"},{value:"state",label:"Mode"},{value:"fan_mode",label:"Fan mode"},{value:"preset_mode",label:"Preset"},{value:"target_temperature",label:"Target temperature"}],Nt={entity:"Climate entity",name:"Name",icon:"Icon",preset:"Card type",power_on:"Power button turns the unit on in",mode_dropdown:"Mode dropdown next to the power button",info:"Line under the name",buttons_size:"Setpoint button size",menu_max_items:"Dropdown: options visible before scrolling",step:"Setpoint step (empty = from entity)",decimals:"Setpoint decimals (empty = automatic)",debounce:"Send setpoint after (ms)",animations:"Animations",modes:"Mode buttons row (empty = hidden)",kind:"Button",icon_off:"Icon when off",color:"Color when on (e.g. #5dcaa5)",show_name:"Show name and switch",source:"Selector",heat:"Heat",cool:"Cool",auto:"Auto",heat_cool:"Heat / cool",dry:"Dry",fan_only:"Fan only",switch_on:"Default color for switches that are on"};let Rt=class extends rt{constructor(){super(...arguments),this._label=t=>Nt[t.name]??Mt(t.name),this._mainChanged=t=>{t.stopPropagation();const e={...t.detail.value},i={...this._config,...e};if(void 0!==e.preset&&(i.preset="auto"===e.preset?void 0:e.preset),void 0!==e.power_on&&(i.power_on="last"===e.power_on?void 0:e.power_on),void 0!==e.mode_dropdown&&(i.mode_dropdown="show"===e.mode_dropdown||"hide"!==e.mode_dropdown&&void 0),void 0!==e.animations&&(i.animations=!!e.animations&&void 0),Array.isArray(e.info)){const t=this._config.info??[],s=2===e.info.length&&"current_temperature"===e.info[0]&&"humidity"===e.info[1];i.info=s?void 0:e.info.map(e=>t.find(t=>t.type===e)??{type:e})}for(const[t,e]of[["buttons_size","large"],["menu_max_items",8],["debounce",700]])i[t]===e&&delete i[t];this._emit(Lt(i))},this._themeChanged=t=>{t.stopPropagation();const e={...t.detail.value},i=e.modes??[];delete e.modes;const s=e.switch_on;delete e.switch_on;const n=Lt(e),o=Lt({modes:Object.keys(n).length?n:void 0,switch_on:s||void 0});this._emit(Lt({...this._config,modes:i.length?i:void 0,theme:Object.keys(o).length?o:void 0}))},this._addSelect=()=>{const t=new Set(this._selects.map(t=>t.type)),e=Ut.find(e=>!t.has(e.value)&&Array.isArray(this._attrs[e.list])&&this._attrs[e.list].length)?.value??"fan_mode";this._emit({...this._config,selects:[...this._selects,{type:e}]})}}setConfig(t){this._config=t}get _attrs(){return this.hass?.states?.[this._config?.entity]?.attributes??{}}get _onModes(){return(this._attrs.hvac_modes??[]).filter(t=>"off"!==t)}get _preset(){return this._config.preset?this._config.preset:this._attrs.fan_modes||this._attrs.swing_modes?"ac":"thermostat"}get _switches(){return this._config.switches?this._config.switches:(this._attrs.hvac_modes??[]).includes("off")?[{type:"power"}]:[]}get _selects(){if(this._config.selects)return this._config.selects;return("ac"===this._preset?["fan_mode","preset_mode","swing_mode","swing_horizontal_mode"]:["preset_mode"]).filter(t=>{const e=Ut.find(e=>e.value===t).list;return Array.isArray(this._attrs[e])&&this._attrs[e].length}).map(t=>({type:t}))}_optionsOf(t){if(t.entity)return this.hass?.states?.[t.entity]?.attributes?.options??[];const e=Ut.find(e=>e.value===(t.type??"fan_mode"));return(e?this._attrs[e.list]:void 0)??[]}_mainSchema(){const t=this._onModes;return[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},Et([zt("name"),Ct("icon")]),Et([Ot("preset",[{value:"auto",label:"Automatic"},{value:"ac",label:"Air conditioner"},{value:"thermostat",label:"Thermostat"}]),Ot("power_on",[{value:"last",label:"Last used mode (like a remote)"},{value:"turn_on",label:"Mode chosen by the integration"},...t.map(t=>({value:t,label:`Always ${Mt(t)}`}))])]),Et([Ot("mode_dropdown",[{value:"auto",label:"Automatic (2+ modes)"},{value:"show",label:"Show"},{value:"hide",label:"Hide"}]),Tt("animations")]),{name:"info",selector:{select:{multiple:!0,mode:"list",options:Ht}}}]}_setpointSchema(){return[Et([Ot("buttons_size",[{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"},{value:"xlarge",label:"Extra large"}]),Pt("menu_max_items",3,20)]),Et([Pt("step",.1,5,.1),Pt("decimals",0,2),Pt("debounce",0,5e3,100)])]}_switchSchema(t){const e=Ot("kind",[{value:"power",label:"Power (on / off like a remote)"},{value:"toggle",label:"Toggle another entity"}]);return"power"===t.type?[e,Et([Ct("icon"),zt("color")]),Tt("show_name")]:[e,{name:"entity",selector:{entity:{domain:["switch","input_boolean","light","fan","script","automation"]}}},Et([zt("name"),zt("color")]),Et([Ct("icon"),Ct("icon_off")]),Tt("show_name")]}_selectSchema(t){const e=Ot("source",[...Ut.map(t=>({value:t.value,label:t.label})),{value:"entity",label:"Select / input_select entity"}]),i=this._optionsOf(t);return[e,...void 0!==t.entity?[{name:"entity",selector:{entity:{domain:["select","input_select"]}}}]:[],Et([zt("name"),Ct("icon")]),...i.length?[{name:"options",selector:{select:{multiple:!0,mode:"list",options:i.map(t=>({value:t,label:Mt(t)}))}}}]:[]]}render(){if(!this.hass||!this._config)return F;const t=this._config,e={...t,preset:t.preset??"auto",power_on:t.power_on??"last",mode_dropdown:!0===t.mode_dropdown?"show":!1===t.mode_dropdown?"hide":"auto",animations:!1!==t.animations,info:(t.info??[{type:"current_temperature"},{type:"humidity"}]).map(t=>t.type)},i=this._switches,s=this._selects,n=this._attrs.hvac_modes??[],o=[...new Set([...n.filter(t=>"off"!==t),"heat","cool"])];return V`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${this._mainSchema()}
        .computeLabel=${this._label}
        @value-changed=${this._mainChanged}
      ></ha-form>

      <div class="section">Header buttons</div>
      <div class="hint">The power button is always drawn in the top-right corner.</div>
      ${i.map((t,e)=>this._panel("switches",e,i.length,"power"===t.type?"Power":t.name||this.hass.states[t.entity??""]?.attributes?.friendly_name||t.entity||`Button ${e+1}`,"power"===t.type?"mdi:power":t.icon??"mdi:toggle-switch-outline",V`<ha-form
            .hass=${this.hass}
            .data=${{...t,kind:"power"===t.type?"power":"toggle"}}
            .schema=${this._switchSchema(t)}
            .computeLabel=${this._label}
            @value-changed=${t=>this._switchChanged(e,t)}
          ></ha-form>`))}
      <div class="adds">
        <button class="add" @click=${()=>this._addSwitch("toggle")}>+ Add switch</button>
        ${i.some(t=>"power"===t.type)?F:V`<button class="add" @click=${()=>this._addSwitch("power")}>+ Add power button</button>`}
      </div>

      <div class="section">Selectors</div>
      <div class="hint">Shown on one line under the setpoint; each opens a dropdown.</div>
      ${s.map((t,e)=>{const i=Ut.find(e=>e.value===t.type),n=t.name||(t.entity?this.hass.states[t.entity]?.attributes?.friendly_name||t.entity:i?.label)||`Selector ${e+1}`;return this._panel("selects",e,s.length,n,t.icon??"mdi:form-dropdown",V`<ha-form
              .hass=${this.hass}
              .data=${{...t,source:void 0!==t.entity?"entity":t.type??"fan_mode"}}
              .schema=${this._selectSchema(t)}
              .computeLabel=${this._label}
              @value-changed=${t=>this._selectChanged(e,t)}
            ></ha-form>
            ${this._labelsEditor(t,e)}`)})}
      <button class="add wide" @click=${this._addSelect}>+ Add selector</button>

      <ha-expansion-panel outlined .header=${"Setpoint"} class="top">
        <ha-form
          .hass=${this.hass}
          .data=${{buttons_size:t.buttons_size??"large",menu_max_items:t.menu_max_items??8,debounce:t.debounce??700,step:t.step,decimals:t.decimals}}
          .schema=${this._setpointSchema()}
          .computeLabel=${this._label}
          @value-changed=${this._mainChanged}
        ></ha-form>
      </ha-expansion-panel>

      <ha-expansion-panel outlined .header=${"Mode buttons row & colors"}>
        <ha-form
          .hass=${this.hass}
          .data=${{modes:(t.modes??[]).map(t=>"string"==typeof t?t:t.name),...t.theme?.modes??{},switch_on:t.theme?.switch_on}}
          .schema=${[{name:"modes",selector:{select:{multiple:!0,mode:"list",options:n.map(t=>({value:t,label:Mt(t)}))}}},Et(o.map(t=>zt(t))),zt("switch_on")]}
          .computeLabel=${t=>o.includes(t.name)?`${Nt[t.name]??Mt(t.name)} color`:this._label(t)}
          @value-changed=${this._themeChanged}
        ></ha-form>
      </ha-expansion-panel>
    `}_panel(t,e,i,s,n,o){return V`<ha-expansion-panel outlined .header=${s} .leftChevron=${!1}>
      <ha-icon slot="leading-icon" .icon=${n}></ha-icon>
      ${o}
      <div class="row">
        <button ?disabled=${0===e} @click=${()=>this._move(t,e,-1)} title="Move up">↑</button>
        <button ?disabled=${e===i-1} @click=${()=>this._move(t,e,1)} title="Move down">↓</button>
        <button class="del" @click=${()=>this._remove(t,e)}>Remove</button>
      </div>
    </ha-expansion-panel>`}_labelsEditor(t,e){const i=t.options?.length?t.options:this._optionsOf(t);return i.length?V`<details class="labels">
      <summary>Option labels (${i.length})</summary>
      ${i.map(i=>V`<div class="lrow">
          <span class="raw">${i}</span>
          <ha-textfield
            .value=${t.labels?.[i]??""}
            .placeholder=${Mt(i)}
            @change=${t=>this._labelChanged(e,i,t.target.value)}
          ></ha-textfield>
        </div>`)}
    </details>`:F}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_switchChanged(t,e){e.stopPropagation();const i={...e.detail.value},s=[...this._switches],n=i.kind;delete i.kind;const o="power"===n?{...i,type:"power"}:{...i,type:void 0};"power"===n&&delete o.entity,o.show_name||delete o.show_name,s[t]=Lt(o),this._emit({...this._config,switches:s})}_selectChanged(t,e){e.stopPropagation();const i={...e.detail.value},s=[...this._selects],n=s[t],o=i.source;let a;delete i.source,"entity"===o?a={...i,type:void 0,entity:i.entity??""}:(a={...i,type:o},delete a.entity);("entity"===o?void 0===n.entity:n.type!==o||void 0!==n.entity)&&(delete a.options,delete a.labels,delete a.name),Array.isArray(a.options)&&!a.options.length&&delete a.options;const r=Lt(a);"entity"===o&&void 0===r.entity&&(r.entity=""),s[t]=r,this._emit({...this._config,selects:s})}_labelChanged(t,e,i){const s=[...this._selects],n={...s[t].labels??{}};i.trim()?n[e]=i.trim():delete n[e],s[t]=Lt({...s[t],labels:Object.keys(n).length?n:void 0}),this._emit({...this._config,selects:s})}_addSwitch(t){const e=[...this._switches];e.push("power"===t?{type:"power"}:{entity:""}),this._emit({...this._config,switches:e})}_remove(t,e){const i=[..."switches"===t?this._switches:this._selects];i.splice(e,1),this._emit({...this._config,[t]:i})}_move(t,e,i){const s=[..."switches"===t?this._switches:this._selects],n=e+i;n<0||n>=s.length||([s[e],s[n]]=[s[n],s[e]],this._emit({...this._config,[t]:s}))}};Rt.styles=a`
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
  `,t([pt({attribute:!1})],Rt.prototype,"hass",void 0),t([mt()],Rt.prototype,"_config",void 0),Rt=t([ct("thermostat-card-editor")],Rt);var Dt=Object.freeze({__proto__:null,get ThermostatCardEditor(){return Rt}});export{At as ThermostatCard};
