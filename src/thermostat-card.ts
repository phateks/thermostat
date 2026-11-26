import { LitElement, html, nothing, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import {
  HomeAssistant,
  HassEntity,
  ThermostatCardConfig,
  ModeButton,
  InfoRow,
  ButtonsSize,
  SwitchConfig,
  SelectConfig,
  ClimateSelectType,
  CardPreset,
  CARD_VERSION,
} from './types';
import { cardStyles } from './styles';


/* eslint-disable no-console */
console.info(
  `%c THERMOSTAT-CARD %c v${CARD_VERSION} `,
  'color:#0b1a2a;background:#4ecdc4;font-weight:700;border-radius:4px 0 0 4px;padding:2px 4px',
  'color:#4ecdc4;background:#16243a;font-weight:700;border-radius:0 4px 4px 0;padding:2px 4px'
);

/* ── Defaults ─────────────────────────────────────────────── */

const MODE_ICONS: Record<string, string> = {
  heat: 'mdi:fire',
  cool: 'mdi:snowflake',
  auto: 'mdi:thermostat-auto',
  heat_cool: 'mdi:sun-snowflake-variant',
  off: 'mdi:power',
  fan_only: 'mdi:fan',
  dry: 'mdi:water-percent',
};

/** Same accents as the ebusd / energy-flow cards. */
const MODE_COLORS: Record<string, string> = {
  heat: 'var(--tc-heat)',
  cool: 'var(--tc-cool)',
  auto: 'var(--tc-green)',
  heat_cool: 'var(--tc-green)',
  fan_only: 'var(--tc-accent)',
  dry: 'var(--tc-dry)',
  off: 'var(--tc-sub)',
};

const ACTION_TO_MODE: Record<string, string> = {
  heating: 'heat',
  preheating: 'heat',
  defrosting: 'heat',
  cooling: 'cool',
  drying: 'dry',
  fan: 'fan_only',
};

const VALUE_ICONS: Record<string, string> = {
  ...MODE_ICONS,
  // fan
  auto: 'mdi:fan-auto',
  quiet: 'mdi:fan-minus',
  silent: 'mdi:fan-minus',
  low: 'mdi:fan-speed-1',
  medium: 'mdi:fan-speed-2',
  mid: 'mdi:fan-speed-2',
  middle: 'mdi:fan-speed-2',
  high: 'mdi:fan-speed-3',
  turbo: 'mdi:fan-plus',
  // presets
  none: 'mdi:circle-off-outline',
  eco: 'mdi:leaf',
  comfort: 'mdi:sofa-outline',
  boost: 'mdi:rocket-launch',
  sleep: 'mdi:power-sleep',
  away: 'mdi:home-export-outline',
  home: 'mdi:home-outline',
  activity: 'mdi:run',
  // swing
  on: 'mdi:arrow-oscillating',
  vertical: 'mdi:arrow-up-down',
  horizontal: 'mdi:arrow-left-right',
  both: 'mdi:arrow-all',
};

const SELECT_META: Record<
  ClimateSelectType,
  { attr: string; list: string; service: string; field: string; name: string; icon: string }
> = {
  hvac_mode: { attr: '', list: 'hvac_modes', service: 'set_hvac_mode', field: 'hvac_mode', name: 'Mode', icon: 'mdi:thermostat' },
  fan_mode: { attr: 'fan_mode', list: 'fan_modes', service: 'set_fan_mode', field: 'fan_mode', name: 'Fan', icon: 'mdi:fan' },
  preset_mode: { attr: 'preset_mode', list: 'preset_modes', service: 'set_preset_mode', field: 'preset_mode', name: 'Preset', icon: 'mdi:rocket-launch-outline' },
  swing_mode: { attr: 'swing_mode', list: 'swing_modes', service: 'set_swing_mode', field: 'swing_mode', name: 'Swing', icon: 'mdi:arrow-oscillating' },
  swing_horizontal_mode: {
    attr: 'swing_horizontal_mode',
    list: 'swing_horizontal_modes',
    service: 'set_swing_horizontal_mode',
    field: 'swing_horizontal_mode',
    name: 'Pos',
    icon: 'mdi:arrow-left-right',
  },
};

const FAN_SPEED: Record<string, number> = {
  quiet: 3.2, silent: 3.2, low: 2.6, medium: 1.7, mid: 1.7, middle: 1.7, auto: 1.9, high: 1.1, turbo: 0.8, strong: 0.8,
};

const INFO_ICONS: Partial<Record<string, string>> = {
  current_temperature: 'mdi:home-thermometer-outline',
  humidity: 'mdi:water-percent',
  fan_mode: 'mdi:fan',
  preset_mode: 'mdi:tune-variant',
  target_temperature: 'mdi:target',
};

const DEFAULT_DEBOUNCE = 700;
const PENDING_TIMEOUT_MS = 8000;
const HOLD_MS = 500;

interface Pending {
  value: number;
  sent: boolean;
  timer?: number;
}

interface ResolvedSelect {
  key: string;
  name: string;
  icon: string;
  value: string | undefined;
  options: string[];
  cfg: SelectConfig;
  available: boolean;
}

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'thermostat-card',
  name: 'Thermostat Card',
  description: 'Animated thermostat / AC card with switches, dropdowns and mode buttons',
  preview: true,
});

@customElement('thermostat-card')
export class ThermostatCard extends LitElement {
  static override styles = cardStyles;

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: ThermostatCardConfig;
  /** Optimistic temperatures keyed by attribute (temperature / target_temp_low / _high). */
  @state() private _pending: Record<string, Pending> = {};
  /** Optimistic select / toggle values keyed by select key or entity id. */
  @state() private _pendingSel: Record<string, string> = {};
  @state() private _openSel: string | null = null;
  /** Keeps the last opened select so the panel can animate closed with content. */
  @state() private _rollDir: 'up' | 'down' = 'up';
  @state() private _popped: string | null = null;
  /** Too little height for the middle row: setpoint moves into the header (Bubble-like). */
  @state() private _compact = false;
  private _fullMin = 0;

  private _holdTimer?: number;
  private _held = false;

  /* ── Lovelace API ─────────────────────────────────────── */

  public static async getConfigElement() {
    await import('./editor');
    return document.createElement('thermostat-card-editor');
  }

  public static getStubConfig(hass?: HomeAssistant): Partial<ThermostatCardConfig> {
    const climate = hass ? Object.keys(hass.states).find((e) => e.startsWith('climate.')) : undefined;
    return { entity: climate ?? 'climate.living' };
  }

  public setConfig(config: ThermostatCardConfig): void {
    if (!config?.entity) throw new Error('thermostat-card: missing "entity"');
    if (!config.entity.startsWith('climate.'))
      throw new Error('thermostat-card: "entity" must be a climate.* entity');
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 3 + (this._selects().length ? 1 : 0) + (this._showModes() ? 1 : 0);
  }

  public getGridOptions() {
    // rows left to the dashboard: when the Sections grid gives the card a height,
    // the setpoint area shrinks or grows to fit it
    return { columns: 12, min_columns: 6, min_rows: 2 };
  }

  /* ── Lifecycle ────────────────────────────────────────── */

  private _onDocClick = (e: Event) => {
    if (!this._openSel) return;
    const path = e.composedPath();
    const keep = Array.from(this.renderRoot.querySelectorAll('.menu, [data-dd]'));
    if (!keep.some((z) => path.includes(z))) this._openSel = null;
  };
  private _onDocKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this._openSel) this._openSel = null;
  };

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._onDocClick, true);
    document.addEventListener('keydown', this._onDocKey);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocClick, true);
    document.removeEventListener('keydown', this._onDocKey);
    this._unbindMenu();
    this._ro?.disconnect();
    this._ro = undefined;
    for (const p of Object.values(this._pending)) if (p.timer) clearTimeout(p.timer);
    this._pending = {};
    this._openSel = null;
  }

  protected override shouldUpdate(changed: PropertyValues): boolean {
    if (!this._config) return false;
    if (changed.size > 1 || !changed.has('hass')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass) return true;
    if (this._dark(old) !== this._dark(this.hass)) return true;
    return this._tracked().some((id) => old.states[id] !== this.hass.states[id]);
  }

  protected override willUpdate(changed: PropertyValues): void {
    if (!changed.has('hass') || !this.hass) return;
    if (this._entity) this._setLastMode(this._entity.state);
    if (this._pendingSel['hvac#hdr'] && this._pendingSel['hvac#hdr'] === this._entity?.state) {
      const rest = { ...this._pendingSel };
      delete rest['hvac#hdr'];
      this._pendingSel = rest;
    }
    const a = this._entity?.attributes ?? {};
    // Drop optimistic temperatures once the device reports them back.
    let next: Record<string, Pending> | undefined;
    for (const [k, p] of Object.entries(this._pending)) {
      if (p.sent && Number(a[k]) === p.value) {
        next = next ?? { ...this._pending };
        delete next[k];
      }
    }
    if (next) this._pending = next;
    // …same for selects / toggles.
    let nextSel: Record<string, string> | undefined;
    for (const [k, v] of Object.entries(this._pendingSel)) {
      if (this._actualSelValue(k) === v) {
        nextSel = nextSel ?? { ...this._pendingSel };
        delete nextSel[k];
      }
    }
    if (nextSel) this._pendingSel = nextSel;
  }

  protected override updated(changed: PropertyValues): void {
    if (changed.has('hass') && this.hass) this.toggleAttribute('light', this._dark(this.hass) === false);
    if (changed.has('_config')) this.toggleAttribute('no-anim', this._config?.animations === false);
    this._observeMain();
    // the style binding on ha-card resets the inline min-height on every render
    this._fit();
    if (changed.has('_openSel')) this._syncMenu();
    else if (this._openSel) this._positionMenu();
  }

  /* ── Height fitting: only the setpoint area scales ───── */

  private _ro?: ResizeObserver;
  private _fitRaf = 0;

  /**
   * The header and the selector row keep their size; the setpoint area (flex: 1)
   * gets whatever height is left. Its size is derived from that height, so with no
   * height from outside the card keeps its natural size (the formula is a fixed point),
   * and with a smaller / larger height from the dashboard or the `height` option the
   * number and buttons shrink / grow (up to 1.3 × the chosen button size).
   */
  private _fit = () => {
    cancelAnimationFrame(this._fitRaf);
    this._fitRaf = requestAnimationFrame(() => {
      const card = this.renderRoot.querySelector('ha-card') as HTMLElement | null;
      if (!card) return;
      const main = this.renderRoot.querySelector('.main') as HTMLElement | null;
      const hostH = this._availableHeight();

      if (this._compact) {
        // back to the full layout as soon as the dashboard gives enough height
        if (this._fullMin && hostH >= this._fullMin) this._compact = false;
        if (card.style.minHeight) card.style.minHeight = '';
        return;
      }
      if (!main) return;

      // smallest full layout: header + selectors + gaps + padding + a 30 px setpoint
      const cs = getComputedStyle(card);
      const kids = Array.from(card.children).filter(
        (el) => el !== main && !el.classList.contains('amb') && !el.classList.contains('menu')
      ) as HTMLElement[];
      const gap = parseFloat(cs.rowGap) || 0;
      const min = Math.ceil(
        kids.reduce((t, el) => t + el.offsetHeight, 0) +
          gap * kids.length +
          30 +
          parseFloat(cs.paddingTop) +
          parseFloat(cs.paddingBottom) +
          parseFloat(cs.borderTopWidth) +
          parseFloat(cs.borderBottomWidth)
      );
      this._fullMin = min;
      // the dashboard (Sections grid) gives less than that → compact layout, never overflow
      if (hostH > 0 && hostH + 1 < min) {
        this._compact = true;
        card.style.minHeight = '';
        return;
      }
      const mh = `${min}px`;
      if (card.style.minHeight !== mh) card.style.minHeight = mh;

      const h = main.clientHeight;
      if (!h) return;
      // only MIN / MAX (heat_cool) carry a label above the number
      // MIN / MAX (heat_cool) sit above a smaller number and fit inside the button height
      const range = main.classList.contains('range');
      const tight = !range;
      const b = Math.round(Math.max(30, h));
      const cur = parseFloat(main.style.getPropertyValue('--fit')) || 0;
      if (Math.abs(b - cur) >= 1) main.style.setProperty('--fit', `${b}px`);
      if ((main.dataset.tight === '1') !== tight) main.dataset.tight = tight ? '1' : '';
    });
  };

  private _parentOf(el: Node): HTMLElement | null {
    const p = (el as HTMLElement).parentElement ?? ((el.getRootNode() as ShadowRoot).host as HTMLElement | undefined);
    return p && p !== document.body && p !== document.documentElement ? p : null;
  }

  /**
   * The Sections-grid cell holding this card: the nearest ancestor (or this element)
   * whose parent is a CSS grid. HA wraps cards (hui-card) inside the cell, so the cell
   * is usually one level up. Masonry / stack layouts have no grid parent → null.
   */
  private _gridCell(): HTMLElement | null {
    let el: HTMLElement | null = this;
    for (let i = 0; el && i < 4; i++) {
      const p = this._parentOf(el);
      if (!p) return null;
      if (getComputedStyle(p).display.includes('grid')) return el;
      el = p;
    }
    return null;
  }

  /** `height` option in px, when it is a plain number (or "123" / "123px"). */
  private _configHeightPx(): number | undefined {
    const h = this._config?.height;
    if (h === undefined || h === null || h === '') return undefined;
    const m = /^(\d+(?:\.\d+)?)(px)?$/.exec(String(h).trim());
    return m ? parseFloat(m[1]) : undefined;
  }

  /**
   * Height the dashboard gives the card (height option, grid cell), or its own height.
   *
   * Never writes a pixel height derived from the layout: in grids whose rows follow
   * their content (Fit content, layout-card, grid card) that feeds back into the row
   * size and the card grows forever. Instead the wrappers between this element and the
   * grid cell get `height: 100%`, which CSS resolves in one pass (auto rows stay auto).
   */
  private _availableHeight(): number {
    const fixed = this._configHeightPx();
    if (fixed) return fixed;
    const cell = this._gridCell();
    if (cell && cell !== this) {
      let el = this._parentOf(this);
      while (el && el !== cell) {
        if (el.style.height !== '100%') el.style.height = '100%';
        el = this._parentOf(el);
      }
      const h = cell.clientHeight;
      return h > 0 ? Math.min(h, this.clientHeight || h) : this.clientHeight;
    }
    return this.clientHeight;
  }

  protected override firstUpdated(): void {
    this._ro = new ResizeObserver(this._fit);
    this._ro.observe(this);
    const cell = this._gridCell();
    if (cell && cell !== this) this._ro.observe(cell);
    const card = this.renderRoot.querySelector('ha-card');
    if (card) this._ro.observe(card);
    this._observeMain();
  }

  private _observeMain() {
    const main = this.renderRoot.querySelector('.main');
    if (main && this._ro && (main as any).__tcObserved !== true) {
      (main as any).__tcObserved = true;
      this._ro.observe(main);
    }
  }

  /* ── Floating dropdown (Bubble-style) ─────────────────── */

  private _menuBound = false;
  private _onViewport = () => {
    if (this._openSel) requestAnimationFrame(() => this._positionMenu());
  };

  private _bindMenu() {
    if (this._menuBound) return;
    this._menuBound = true;
    window.addEventListener('scroll', this._onViewport, true);
    window.addEventListener('resize', this._onViewport);
    window.visualViewport?.addEventListener('resize', this._onViewport);
  }

  private _unbindMenu() {
    if (!this._menuBound) return;
    this._menuBound = false;
    window.removeEventListener('scroll', this._onViewport, true);
    window.removeEventListener('resize', this._onViewport);
    window.visualViewport?.removeEventListener('resize', this._onViewport);
  }

  private get _menuEl(): HTMLElement | null {
    return this.renderRoot.querySelector('.menu');
  }

  private _syncMenu() {
    const menu = this._menuEl as (HTMLElement & { showPopover?: () => void; hidePopover?: () => void }) | null;
    if (!menu) return;
    if (this._openSel) {
      // top layer: escapes the card's overflow / transforms and overlays the cards below
      if (menu.showPopover) {
        try {
          if (!menu.matches(':popover-open')) menu.showPopover();
        } catch {
          /* not supported */
        }
      }
      menu.classList.add('open');
      this._positionMenu();
      // bring the current value into view without scrolling the page
      const on = menu.querySelector('.mi.on') as HTMLElement | null;
      if (on) menu.scrollTop = Math.max(0, on.offsetTop - menu.clientHeight / 2 + on.offsetHeight / 2);
      menu.classList.remove('anim');
      void menu.offsetWidth;
      menu.classList.add('anim');
      this._bindMenu();
    } else {
      menu.classList.remove('open', 'anim');
      if (menu.hidePopover) {
        try {
          if (menu.matches(':popover-open')) menu.hidePopover();
        } catch {
          /* not supported */
        }
      }
      this._unbindMenu();
    }
  }

  /**
   * Like Bubble Card: trigger in the lower half of the screen → open upwards,
   * upper half → downwards; the list grows towards that edge (16 px margin)
   * but never past `menu_max_items` rows; the rest scrolls inside.
   */
  private _positionMenu() {
    const key = this._openSel;
    const menu = this._menuEl;
    if (!key || !menu) return;
    const trig = Array.from(this.renderRoot.querySelectorAll('[data-dd]')).find(
      (el) => (el as HTMLElement).dataset.dd === key
    ) as HTMLElement | undefined;
    if (!trig) return;
    const r = trig.getBoundingClientRect();
    const vv = window.visualViewport;
    const vw = vv?.width ?? window.innerWidth;
    const vh = vv?.height ?? window.innerHeight;
    const M = 16;
    const GAP = 6;
    const ROW = 44;
    const PAD = 8;
    const rows = menu.querySelectorAll('.mi, .menu-hint').length;
    const maxRows = this._config.menu_max_items ?? 8;
    const want = Math.min(rows, maxRows) * ROW + PAD * 2;
    const up = r.top + r.height / 2 > vh / 2;
    const space = up ? r.top - GAP - M : vh - r.bottom - GAP - M;
    const h = Math.max(Math.min(rows, 2) * ROW + PAD * 2, Math.min(want, space));
    const w = Math.min(Math.max(r.width, 220), 300, vw - 2 * M);
    const left = Math.max(M, Math.min(r.left + r.width / 2 - w / 2, vw - w - M));
    const top = up ? r.top - GAP - h : r.bottom + GAP;
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    menu.style.width = `${w}px`;
    menu.style.maxHeight = `${h}px`;
    menu.style.transformOrigin = `${r.left + r.width / 2 - left}px ${up ? '100%' : '0%'}`;
    menu.classList.toggle('up', up);
    menu.classList.toggle('scrolls', rows * ROW + PAD * 2 > h + 1);
  }

  private _menuData():
    | {
        options: string[];
        value?: string;
        pick: (o: string) => void;
        label: (o: string) => string;
        icon: (o: string) => string | undefined;
        color: (o: string) => string;
        hint?: string;
      }
    | undefined {
    const key = this._openSel;
    if (!key || !this._entity) return undefined;
    if (key === 'hvac#hdr') {
      return {
        options: this._onModes(),
        value: this._shownMode,
        pick: (m) => this._pickMode(m),
        label: (m) => this._modeLabel(m),
        icon: (m) => MODE_ICONS[m],
        color: (m) => this._color(m),
        hint: this._mode === 'off' ? 'Pornește în' : undefined,
      };
    }
    const sel = this._selects().find((x) => x.key === key);
    if (!sel) return undefined;
    return {
      options: sel.options,
      value: sel.value,
      pick: (o) => this._choose(sel, o),
      label: (o) => this._label(sel, o),
      icon: (o) =>
        sel.cfg.icons?.[o] ?? (sel.cfg.type === 'hvac_mode' ? MODE_ICONS[o] : VALUE_ICONS[o.toLowerCase()]),
      color: (o) => (sel.cfg.type === 'hvac_mode' ? this._color(o) : 'var(--st)'),
    };
  }

  private _renderMenu(): TemplateResult {
    const d = this._menuData();
    // icons only when every option has one (otherwise Bubble-style dots)
    const icons = !!d && d.options.length > 0 && d.options.every((o) => !!d.icon(o));
    return html`
      <div class="menu" popover="manual" role="listbox">
        ${d
          ? html`${d.hint ? html`<div class="menu-hint">${d.hint}</div>` : nothing}
            ${d.options.map((o, i) => {
              const on = o === d.value;
              return html`<button
                class="mi ${on ? 'on' : ''}"
                role="option"
                aria-selected=${on ? 'true' : 'false'}
                style="--i:${Math.min(i, 12)};--oc:${d.color(o)}"
                @click=${() => {
                  d.pick(o);
                }}
              >
                ${icons ? html`<ha-icon icon=${d.icon(o)!}></ha-icon>` : html`<span class="dot"></span>`}
                <span class="mi-l">${d.label(o)}</span>
              </button>`;
            })}`
          : nothing}
      </div>
    `;
  }

  /* ── Derived state ────────────────────────────────────── */

  private _dark(h: HomeAssistant): boolean | undefined {
    return ((h as any).themes as { darkMode?: boolean } | undefined)?.darkMode;
  }

  private get _entity(): HassEntity | undefined {
    return this.hass?.states[this._config?.entity];
  }

  private _st(id?: string): HassEntity | undefined {
    return id ? this.hass?.states?.[id] : undefined;
  }

  private _available(id?: string): boolean {
    const s = this._st(id)?.state;
    return !!s && s !== 'unavailable' && s !== 'unknown';
  }

  private get _preset(): CardPreset {
    if (this._config?.preset) return this._config.preset;
    const a = this._entity?.attributes ?? {};
    return a.fan_modes || a.swing_modes ? 'ac' : 'thermostat';
  }

  private _tracked(): string[] {
    const ids = [this._config.entity];
    for (const s of this._config.switches ?? []) if (s.entity) ids.push(s.entity);
    for (const s of this._config.selects ?? []) if (s.entity) ids.push(s.entity);
    if (this._config.temperature_entity) ids.push(this._config.temperature_entity);
    if (this._config.humidity_entity) ids.push(this._config.humidity_entity);
    return ids;
  }

  private get _name(): string {
    return this._config?.name ?? this._entity?.attributes?.friendly_name ?? this._config?.entity ?? '';
  }

  private get _unit(): string {
    return this._config?.unit ?? this.hass?.config?.unit_system?.temperature ?? '°C';
  }

  private get _step(): number {
    return this._config?.step ?? (this._entity?.attributes?.target_temp_step as number | undefined) ?? 0.5;
  }

  private get _decimals(): number {
    if (this._config?.decimals != null) return this._config.decimals;
    return Number.isInteger(this._step) ? 0 : 1;
  }

  private get _buttonsSize(): ButtonsSize {
    return this._config?.buttons_size ?? 'large';
  }

  private get _mode(): string {
    return this._entity?.state ?? 'off';
  }

  private get _action(): string | undefined {
    return this._entity?.attributes?.hvac_action as string | undefined;
  }

  /** What the unit is actually doing right now (drives colours + animation). */
  private get _activity(): string {
    const mode = this._mode;
    if (mode === 'off' || mode === 'unavailable') return 'off';
    const action = this._action;
    if (action == null) return mode; // device doesn't report an action
    if (action === 'off') return 'off';
    if (action === 'idle') return 'idle';
    return ACTION_TO_MODE[action] ?? mode;
  }

  private _color(key: string): string {
    return this._config?.theme?.modes?.[key] ?? MODE_COLORS[key] ?? 'var(--tc-accent)';
  }

  private _cap(str?: string): string {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ') : '';
  }

  /** Numeric state + unit of an external sensor, or undefined when missing / not a number. */
  private _sensorNum(id?: string): { value: number; unit: string } | undefined {
    const st = this._st(id);
    if (!st) return undefined;
    const v = parseFloat(st.state);
    if (Number.isNaN(v)) return undefined;
    return { value: v, unit: (st.attributes.unit_of_measurement as string | undefined) ?? '' };
  }

  private _fmt(t: number | undefined): string {
    return t != null && !Number.isNaN(t) ? t.toFixed(this._decimals) : '—';
  }

  /** Measured values keep one decimal even when the setpoint step is 1°. */
  private _fmtCur(t: number | undefined): string {
    const d = this._config?.decimals ?? 1;
    return t != null && !Number.isNaN(t) ? t.toFixed(d) : '—';
  }

  private _fire(type: string, detail: Record<string, unknown>) {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
  }

  private _moreInfo(id?: string) {
    if (id) this._fire('hass-more-info', { entityId: id });
  }

  private _onKey(action: () => void) {
    return (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        action();
      }
    };
  }

  /* ── Temperature (debounced, optimistic) ──────────────── */

  private _attrNum(key: string): number | undefined {
    const v = this._entity?.attributes?.[key];
    return v == null || v === '' ? undefined : Number(v);
  }

  private _shown(key: string): number | undefined {
    return this._pending[key]?.value ?? this._attrNum(key);
  }

  private _queueTemp(key: string, delta: number) {
    const cur = this._shown(key);
    if (cur == null) return;
    const step = this._step;
    const a = this._entity!.attributes;
    let min = a.min_temp as number | undefined;
    let max = a.max_temp as number | undefined;
    // keep low ≤ high in range mode
    if (key === 'target_temp_low') max = Math.min(max ?? Infinity, (this._shown('target_temp_high') ?? Infinity) - step);
    if (key === 'target_temp_high') min = Math.max(min ?? -Infinity, (this._shown('target_temp_low') ?? -Infinity) + step);
    const snapped = Math.round((cur + delta) / step) * step;
    const value = parseFloat(Math.min(max ?? Infinity, Math.max(min ?? -Infinity, snapped)).toFixed(4));
    if (value === cur) return;

    this._rollDir = delta > 0 ? 'up' : 'down';
    const prev = this._pending[key];
    if (prev?.timer) clearTimeout(prev.timer);

    const send = () => {
      const p = this._pending[key];
      if (!p || p.value !== value) return;
      const data: Record<string, unknown> = { entity_id: this._config.entity };
      if (key === 'temperature') data.temperature = value;
      else {
        data.target_temp_low = this._shown('target_temp_low');
        data.target_temp_high = this._shown('target_temp_high');
      }
      this.hass.callService('climate', 'set_temperature', data);
      this._pending = { ...this._pending, [key]: { value, sent: true } };
      window.setTimeout(() => {
        const q = this._pending[key];
        if (q?.sent && q.value === value) {
          const rest = { ...this._pending };
          delete rest[key];
          this._pending = rest;
        }
      }, PENDING_TIMEOUT_MS);
    };

    const delay = this._config.debounce ?? DEFAULT_DEBOUNCE;
    const entry: Pending = { value, sent: false };
    if (delay > 0) entry.timer = window.setTimeout(send, delay);
    this._pending = { ...this._pending, [key]: entry };
    if (delay <= 0) send();
  }

  private _canStep(key: string, dir: 1 | -1): boolean {
    const v = this._shown(key);
    if (v == null) return false;
    const a = this._entity?.attributes ?? {};
    if (dir < 0) return a.min_temp == null || v > a.min_temp;
    return a.max_temp == null || v < a.max_temp;
  }

  /* ── Switches ─────────────────────────────────────────── */

  private _switches(): SwitchConfig[] {
    // a toggle added in the editor without an entity yet is skipped
    if (this._config.switches) return this._config.switches.filter((s) => s.type === 'power' || !!s.entity);
    // remote-style power button for both AC and thermostat (when the entity can be switched off)
    return ((this._entity?.attributes?.hvac_modes as string[] | undefined) ?? []).includes('off') ? [{ type: 'power' }] : [];
  }

  private _switchKey(s: SwitchConfig, i: number) {
    return s.type === 'power' ? '__power' : s.entity ?? `__sw${i}`;
  }

  private _switchOn(s: SwitchConfig, key: string): boolean {
    if (key in this._pendingSel) return this._pendingSel[key] === 'on';
    if (s.type === 'power') return this._mode !== 'off';
    const st = this._st(s.entity)?.state;
    return st === 'on' || st === 'open' || st === 'heat' || st === 'cool' || st === 'playing';
  }

  private _toggleSwitch(s: SwitchConfig, key: string) {
    if (this._held) return;
    const on = this._switchOn(s, key);
    this._pendingSel = { ...this._pendingSel, [key]: on ? 'off' : 'on' };
    this._popped = key;
    window.setTimeout(() => {
      if (this._popped === key) this._popped = null;
    }, 450);
    window.setTimeout(() => {
      if (key in this._pendingSel) {
        const rest = { ...this._pendingSel };
        delete rest[key];
        this._pendingSel = rest;
      }
    }, PENDING_TIMEOUT_MS);
    if (s.type === 'power') {
      if (on) this.hass.callService('climate', 'turn_off', { entity_id: this._config.entity });
      else this._powerOn();
    } else if (s.entity) {
      this.hass.callService('homeassistant', 'toggle', { entity_id: s.entity });
    }
  }

  /* ── Remote-style power: resume the last mode ─────────── */

  private _lastMode?: string;

  private get _lmKey(): string {
    return `thermostat-card:last-mode:${this._config.entity}`;
  }

  private _onModes(): string[] {
    return ((this._entity?.attributes?.hvac_modes as string[] | undefined) ?? []).filter((m) => m !== 'off');
  }

  /** Last non-off mode: seen live by this card, or persisted from an earlier session. */
  private _getLastMode(): string | undefined {
    if (!this._lastMode) {
      try {
        this._lastMode = window.localStorage.getItem(this._lmKey) ?? undefined;
      } catch {
        /* storage unavailable */
      }
    }
    const modes = this._onModes();
    return this._lastMode && modes.includes(this._lastMode) ? this._lastMode : undefined;
  }

  private _setLastMode(m: string) {
    if (!m || m === 'off' || m === 'unavailable' || m === 'unknown' || m === this._lastMode) return;
    this._lastMode = m;
    try {
      window.localStorage.setItem(this._lmKey, m);
    } catch {
      /* storage unavailable */
    }
  }

  private _powerOn() {
    const pref = this._config.power_on ?? 'last';
    const target = pref === 'last' ? this._getLastMode() : pref === 'turn_on' ? undefined : pref;
    if (target) {
      this.hass.callService('climate', 'set_hvac_mode', { entity_id: this._config.entity, hvac_mode: target });
    } else {
      this.hass.callService('climate', 'turn_on', { entity_id: this._config.entity });
    }
  }

  /** Mode shown next to the name / in the header dropdown (last mode while off). */
  private get _shownMode(): string | undefined {
    const p = this._pendingSel['hvac#hdr'];
    if (p) return p;
    return this._mode === 'off' ? this._getLastMode() : this._mode;
  }

  private _pickMode(m: string) {
    this._setLastMode(m);
    window.setTimeout(() => (this._openSel = null), 160);
    if (this._mode === 'off') {
      // like a remote: choosing a function while off only arms it for the power button
      this.requestUpdate();
      return;
    }
    this._pendingSel = { ...this._pendingSel, ['hvac#hdr']: m };
    window.setTimeout(() => {
      const rest = { ...this._pendingSel };
      delete rest['hvac#hdr'];
      this._pendingSel = rest;
    }, 3000);
    this.hass.callService('climate', 'set_hvac_mode', { entity_id: this._config.entity, hvac_mode: m });
  }

  private _holdStart(id?: string) {
    this._held = false;
    clearTimeout(this._holdTimer);
    this._holdTimer = window.setTimeout(() => {
      this._held = true;
      this._moreInfo(id);
    }, HOLD_MS);
  }
  private _holdEnd() {
    clearTimeout(this._holdTimer);
    // let the click handler see _held, then reset
    window.setTimeout(() => (this._held = false), 0);
  }

  /* ── Selects ──────────────────────────────────────────── */

  private _selects(): ResolvedSelect[] {
    if (!this._config || !this._entity) return [];
    const a = this._entity.attributes;
    let cfgs = this._config.selects;
    if (!cfgs) {
      const auto: ClimateSelectType[] =
        this._preset === 'ac'
          ? ['fan_mode', 'preset_mode', 'swing_mode', 'swing_horizontal_mode']
          : ['preset_mode'];
      cfgs = auto.filter((t) => Array.isArray(a[SELECT_META[t].list]) && a[SELECT_META[t].list].length).map((type) => ({ type }));
    }
    // an entity selector added in the editor but not picked yet is skipped
    return cfgs.filter((cfg) => cfg.entity !== '').map((cfg, i) => {
      if (cfg.entity) {
        const e = this._st(cfg.entity);
        const opts = (e?.attributes?.options as string[] | undefined) ?? [];
        return {
          key: cfg.entity,
          name: cfg.name ?? e?.attributes?.friendly_name ?? cfg.entity,
          icon: cfg.icon ?? (e?.attributes?.icon as string | undefined) ?? 'mdi:format-list-bulleted',
          value: this._pendingSel[cfg.entity] ?? e?.state,
          options: cfg.options ?? opts,
          cfg,
          available: this._available(cfg.entity),
        };
      }
      const type = cfg.type ?? 'fan_mode';
      const m = SELECT_META[type];
      const key = `${type}#${i}`;
      const current = type === 'hvac_mode' ? this._mode : (a[m.attr] as string | undefined);
      return {
        key,
        name: cfg.name ?? m.name,
        icon: cfg.icon ?? (type === 'hvac_mode' ? MODE_ICONS[current ?? ''] ?? m.icon : m.icon),
        value: this._pendingSel[key] ?? current,
        options: cfg.options ?? (a[m.list] as string[] | undefined) ?? [],
        cfg,
        available: this._available(this._config.entity),
      };
    });
  }

  private _actualSelValue(key: string): string | undefined {
    if (key === '__power') return this._mode !== 'off' ? 'on' : 'off';
    if (key.includes('#')) {
      const type = key.split('#')[0] as ClimateSelectType;
      return type === 'hvac_mode' ? this._mode : this._entity?.attributes?.[SELECT_META[type].attr];
    }
    const st = this._st(key)?.state;
    // switches report on/off; selects report the option
    return st;
  }

  private _label(sel: ResolvedSelect, v?: string): string {
    if (v == null) return '—';
    return sel.cfg.labels?.[v] ?? this._cap(v);
  }

  private _choose(sel: ResolvedSelect, option: string) {
    this._pendingSel = { ...this._pendingSel, [sel.key]: option };
    window.setTimeout(() => {
      if (this._pendingSel[sel.key] === option) {
        const rest = { ...this._pendingSel };
        delete rest[sel.key];
        this._pendingSel = rest;
      }
    }, PENDING_TIMEOUT_MS);
    // brief delay so the user sees the chip light up before the panel folds
    window.setTimeout(() => (this._openSel = null), 160);

    if (sel.cfg.entity) {
      const domain = sel.cfg.entity.split('.')[0];
      this.hass.callService(domain === 'input_select' ? 'input_select' : 'select', 'select_option', {
        entity_id: sel.cfg.entity,
        option,
      });
      return;
    }
    const m = SELECT_META[sel.cfg.type ?? 'fan_mode'];
    this.hass.callService('climate', m.service, { entity_id: this._config.entity, [m.field]: option });
  }

  /* ── Modes row ────────────────────────────────────────── */

  private _showModes(): boolean {
    if (!this._config) return false;
    if (this._config.hide_modes) return false;
    // the classic mode-buttons row is opt-in now (power + dropdown cover it)
    return !!this._config.modes;
  }

  private _modes(): ModeButton[] {
    const raw = this._config?.modes;
    const fromEntity = (this._entity?.attributes?.hvac_modes as string[] | undefined) ?? [];
    return (raw ?? fromEntity).map((m) => {
      const name = typeof m === 'string' ? m : m.name;
      const icon = typeof m !== 'string' && m.icon ? m.icon : MODE_ICONS[name] ?? 'mdi:help-circle';
      const label = typeof m !== 'string' && m.label ? m.label : this._cap(name);
      return { name, icon, label };
    });
  }

  private _setMode(mode: string) {
    this._pendingSel = { ...this._pendingSel, ['hvac_mode#row']: mode };
    window.setTimeout(() => {
      const rest = { ...this._pendingSel };
      delete rest['hvac_mode#row'];
      this._pendingSel = rest;
    }, 2500);
    this.hass.callService('climate', 'set_hvac_mode', { entity_id: this._config.entity, hvac_mode: mode });
  }

  /* ── Info line ────────────────────────────────────────── */

  private _infoValue(row: InfoRow): string {
    const e = this._entity!;
    const a = e.attributes;
    switch (row.type) {
      case 'current_temperature': {
        const ext = this._sensorNum(this._config.temperature_entity);
        if (ext) return `${this._fmtCur(ext.value)}${ext.unit || this._unit}`;
        return a.current_temperature != null ? `${this._fmtCur(Number(a.current_temperature))}${this._unit}` : '—';
      }
      case 'target_temperature':
        return a.temperature != null ? `${this._fmt(Number(a.temperature))}${this._unit}` : '—';
      case 'state':
        return this._cap(e.state);
      case 'hvac_action': {
        const act = a.hvac_action as string | undefined;
        if (act == null || act === e.state || (act === 'off' && e.state === 'off')) return this._cap(e.state);
        return `${this._cap(e.state)} · ${this._cap(act)}`;
      }
      case 'humidity': {
        const ext = this._sensorNum(this._config.humidity_entity);
        if (ext) return `${Math.round(ext.value)}${ext.unit || '%'}`;
        const h = a.current_humidity ?? a.humidity;
        return h != null ? `${h}%` : '—';
      }
      case 'preset_mode':
        return this._cap(a.preset_mode ?? '—');
      case 'fan_mode':
        return this._cap(a.fan_mode ?? '—');
      default:
        return '—';
    }
  }

  /* ── Render ───────────────────────────────────────────── */

  override render() {
    if (!this.hass || !this._config) return nothing;
    const entity = this._entity;
    if (!entity) {
      return html`<ha-card><div class="tc-error">Entity not found: ${this._config.entity}</div></ha-card>`;
    }

    const act = this._activity;
    const live = !['off', 'idle'].includes(act);
    const st = act === 'idle' ? this._color(this._mode) : this._color(act);
    const fan = String(entity.attributes.fan_mode ?? '').toLowerCase();
    const speed = FAN_SPEED[fan] ?? 1.8;

    return html`
      <ha-card
        class="act-${act} ${live ? 'live' : ''} ${this._mode === 'off' ? 'is-off' : ''} ${this._compact ? 'compact' : ''}"
        style="--st:${st};--flow-speed:${speed}s;${this._heightCss()}"
      >
        ${this._renderAmbient(act, live)}
        ${this._renderHeader(act, live)} ${this._compact ? nothing : this._renderMain()} ${this._renderSelects()}
        ${this._renderModes()}
        ${this._renderMenu()}
      </ha-card>
    `;
  }

  private _heightCss(): string {
    const h = this._config.height;
    if (h === undefined || h === null || h === '') return '';
    const v = typeof h === 'number' || /^\d+(\.\d+)?$/.test(String(h)) ? `${h}px` : String(h);
    // min-height (from the content) still wins, so a too-small value cannot squash the card
    return `height:${v};flex:none;`;
  }

  private _hasModeDropdown(): boolean {
    const c = this._config;
    if (c.mode_dropdown != null) return c.mode_dropdown && this._onModes().length > 0;
    // only worth showing when there is more than one "on" function (heat + auto, cool + heat + dry…)
    return this._onModes().length > 1;
  }

  private _renderHeader(act: string, live: boolean): TemplateResult {
    const c = this._config;
    const a = this._entity!.attributes;
    const animIcon: Record<string, string> = {
      heat: 'mdi:fire',
      cool: 'mdi:snowflake',
      fan_only: 'mdi:fan',
      dry: 'mdi:water',
      auto: 'mdi:fan',
      heat_cool: 'mdi:fan',
    };
    const baseIcon = c.icon ?? (this._preset === 'ac' ? 'mdi:air-conditioner' : 'mdi:thermostat');
    const icon = live ? animIcon[act] ?? baseIcon : baseIcon;
    const off = this._mode === 'off';
    const shown = this._shownMode;
    const info: InfoRow[] = [
      ...(c.info ?? [
        { type: 'current_temperature' as const },
        ...(a.current_humidity != null ? [{ type: 'humidity' as const }] : []),
      ]),
    ];
    // a sensor picked in the editor is always shown, even with a custom `info` list
    if (c.temperature_entity && !info.some((r) => r.type === 'current_temperature'))
      info.unshift({ type: 'current_temperature' });
    if (c.humidity_entity && !info.some((r) => r.type === 'humidity')) {
      const t = info.findIndex((r) => r.type === 'current_temperature');
      info.splice(t + 1, 0, { type: 'humidity' });
    }
    const open = () => this._moreInfo(c.entity);
    // power always sits in the top-right corner
    const sw = this._switches().map((s, i) => ({ s, i }));
    const extras = sw.filter((x) => x.s.type !== 'power');
    const power = sw.filter((x) => x.s.type === 'power');
    const ddOpen = this._openSel === 'hvac#hdr';

    return html`
      <div class="header">
        <div class="title-wrap">
          <div
            class="title-icon ${live ? 'active' : ''} ic-${live ? act : 'still'}"
            role="button"
            tabindex="0"
            @click=${open}
            @keydown=${this._onKey(open)}
          >
            ${keyed(icon, html`<ha-icon icon=${icon}></ha-icon>`)}
          </div>
          <div class="title-text">
            <div class="name-row">
              <span class="name">${this._name}</span>
              <span class="fn ${off ? 'off' : ''}" style="--fc:${this._color(off ? 'off' : shown ?? 'off')}">
                ${off
                  ? html`<span class="status-dot"></span>OFF`
                  : html`<span class="status-dot ${live ? 'live' : ''}"></span>${keyed(
                      shown,
                      html`<span class="fn-txt">${this._modeLabel(shown)}</span>`
                    )}`}
              </span>
              ${off && shown ? html`<span class="fn-next" title="Pornește în ${this._modeLabel(shown)}"
                    ><ha-icon icon=${MODE_ICONS[shown] ?? 'mdi:help'}></ha-icon>${this._modeLabel(shown)}</span
                  >` : nothing}
            </div>
            <div class="sub">
              ${info.map(
                (row, i) => html`${i ? html`<span class="sep">·</span>` : nothing}<span class="si"
                    >${!row.hide_label && row.label
                      ? html`<span class="sub-l">${row.label}</span>`
                      : INFO_ICONS[row.type]
                      ? html`<ha-icon class="sub-ic" icon=${INFO_ICONS[row.type]}></ha-icon>`
                      : nothing}<span class="sub-v">${this._infoValue(row)}</span></span
                  >`
              )}
            </div>
          </div>
        </div>
        <div class="header-controls">
          ${this._compact ? this._renderInlineSetpoint() : nothing}
          ${extras.map((x) => this._renderSwitch(x.s, x.i))}
          ${this._hasModeDropdown()
            ? html`<button
                class="mode-dd ${ddOpen ? 'open' : ''}"
                data-dd="hvac#hdr"
                style="--fc:${this._color(shown ?? 'off')}"
                title="Mod de funcționare"
                aria-expanded=${ddOpen ? 'true' : 'false'}
                @click=${() => (this._openSel = ddOpen ? null : 'hvac#hdr')}
              >
                ${keyed(shown, html`<ha-icon class="dd-ic" icon=${MODE_ICONS[shown ?? ''] ?? 'mdi:tune-variant'}></ha-icon>`)}
                <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
              </button>`
            : nothing}
          ${power.map((x) => this._renderSwitch(x.s, x.i))}
        </div>
      </div>
    `;
  }

  private _modeLabel(m?: string): string {
    if (!m) return '—';
    const custom = this._config.modes?.find((x) => typeof x !== 'string' && x.name === m) as ModeButton | undefined;
    return custom?.label ?? this._cap(m);
  }

  private _renderSwitch(s: SwitchConfig, i: number): TemplateResult {
    const key = this._switchKey(s, i);
    const on = this._switchOn(s, key);
    const id = s.type === 'power' ? this._config.entity : s.entity;
    const avail = this._available(id);
    const pending = key in this._pendingSel;
    const icon = on
      ? s.icon ?? (s.type === 'power' ? 'mdi:power' : 'mdi:toggle-switch')
      : s.icon_off ?? s.icon ?? (s.type === 'power' ? 'mdi:power' : 'mdi:toggle-switch-off');
    const color =
      s.color ??
      (s.type === 'power'
        ? this._color(this._shownMode ?? 'cool')
        : this._config.theme?.switch_on ?? 'var(--tc-accent)');
    const name = s.name ?? (s.type === 'power' ? 'Power' : this._st(s.entity)?.attributes?.friendly_name ?? s.entity ?? '');
    const act = () => avail && this._toggleSwitch(s, key);
    return html`
      <button
        class="sw ${s.type === 'power' ? 'pwr' : ''} ${on ? 'on' : ''} ${s.show_name ? 'named' : ''} ${pending
          ? 'pending'
          : ''} ${this._popped === key ? 'pop' : ''} ${avail ? '' : 'unavailable'}"
        style="--sw:${color}"
        title=${name}
        aria-label=${name}
        aria-pressed=${on ? 'true' : 'false'}
        ?disabled=${!avail}
        @click=${act}
        @pointerdown=${() => this._holdStart(id)}
        @pointerup=${() => this._holdEnd()}
        @pointerleave=${() => this._holdEnd()}
        @contextmenu=${(e: Event) => e.preventDefault()}
      >
        <ha-icon icon=${icon}></ha-icon>
        ${s.show_name
          ? html`<span class="sw-name">${name}</span><span class="track"><span class="knob"></span></span>`
          : nothing}
      </button>
    `;
  }

  private _renderInlineSetpoint(): TemplateResult {
    const a = this._entity!.attributes;
    const range = a.temperature == null && a.target_temp_low != null && a.target_temp_high != null;
    return html`<div class="inline-sp">
      ${range
        ? html`${this._renderSetpoint('target_temp_low')}${this._renderSetpoint('target_temp_high')}`
        : this._renderSetpoint('temperature')}
    </div>`;
  }

  private _renderMain(): TemplateResult {
    const a = this._entity!.attributes;
    const range = a.temperature == null && a.target_temp_low != null && a.target_temp_high != null;
    return html`
      <div class="main ${range ? 'range' : ''}">
        ${range
          ? html`${this._renderSetpoint('target_temp_low', 'MIN')}${this._renderSetpoint('target_temp_high', 'MAX')}`
          : this._renderSetpoint('temperature')}
      </div>
    `;
  }

  private _renderSetpoint(key: string, tag?: string): TemplateResult {
    const v = this._shown(key);
    const pending = key in this._pending;
    const size = this._buttonsSize;
    const btn = (dir: 1 | -1) => html`
      <button
        class="step-btn"
        aria-label=${dir > 0 ? 'Increase temperature' : 'Decrease temperature'}
        ?disabled=${!this._canStep(key, dir)}
        @click=${() => this._queueTemp(key, dir * this._step)}
      >
        <ha-icon icon=${dir > 0 ? 'mdi:plus' : 'mdi:minus'}></ha-icon>
      </button>
    `;
    return html`
      <div class="sp sz-${size}">
        ${btn(-1)}
        <div class="sp-center">
          ${tag ? html`<span class="sp-label">${tag}</span>` : nothing}
          <span class="sp-val ${pending ? 'pending' : ''}"
            >${keyed(`${key}:${v}`, html`<span class="roll roll-${this._rollDir}">${this._fmt(v)}</span>`)}<span
              class="u"
              >${this._unit}</span
            ></span
          >
        </div>
        ${btn(1)}
      </div>
    `;
  }

  /** Whole-card background: airflow (cool / fan / auto), heat shimmer (heat), droplets (dry). */
  private _renderAmbient(act: string, live: boolean): TemplateResult | typeof nothing {
    if (!live || this._config.animations === false) return nothing;
    if (act === 'heat') {
      return html`<div class="amb amb-heat" aria-hidden="true">
        ${[4, 22, 41, 60, 78, 94].map(
          (x, i) => html`<span style="left:${x}%;animation-delay:${(i * 0.9) % 3.6}s;--d:${3.4 + (i % 3) * 0.7}s"></span>`
        )}
      </div>`;
    }
    if (act === 'dry') {
      return html`<div class="amb amb-dry" aria-hidden="true">
        ${[10, 26, 42, 58, 74, 90].map((x, i) => html`<span style="left:${x}%;animation-delay:${i * 0.45}s"></span>`)}
      </div>`;
    }
    return html`<svg class="amb amb-air" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-60 30 Q -30 20 0 30 T 60 30 T 120 30 T 180 30 T 240 30 T 300 30 T 360 30 T 420 30 T 480 30" />
      <path class="p2" d="M-60 55 Q -30 45 0 55 T 60 55 T 120 55 T 180 55 T 240 55 T 300 55 T 360 55 T 420 55 T 480 55" />
      <path class="p3" d="M-60 80 Q -30 70 0 80 T 60 80 T 120 80 T 180 80 T 240 80 T 300 80 T 360 80 T 420 80 T 480 80" />
    </svg>`;
  }

  private _renderSelects(): TemplateResult | typeof nothing {
    const sels = this._selects();
    if (!sels.length) return nothing;
    const openKey = this._openSel;
    const n = sels.length;
    const cols = n <= 4 ? n : Math.ceil(n / Math.ceil(n / 4));
    return html`
      <div class="sel-row" style="--cols:${cols};--cols-narrow:${Math.min(cols, 2)}">
        ${sels.map((s) => {
          const isOpen = openKey === s.key;
          const toggle = () => {
            if (!s.available || !s.options.length) return;
            this._openSel = isOpen ? null : s.key;
          };
          const showVal = s.cfg.show_value !== false;
          return html`
            <button
              class="sel ${isOpen ? 'open' : ''} ${s.key in this._pendingSel ? 'pending' : ''}"
              data-dd=${s.key}
              aria-haspopup="listbox"
              aria-expanded=${isOpen ? 'true' : 'false'}
              ?disabled=${!s.available}
              @click=${toggle}
            >
              <ha-icon class="sel-ic" icon=${s.cfg.icons?.[s.value ?? ''] ?? s.icon}></ha-icon>
              <span class="sel-txt">
                ${showVal ? html`<span class="sel-name">${s.name}</span>` : nothing}
                <span class="sel-val">${showVal ? this._label(s, s.value) : s.name}</span>
              </span>
              <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderModes(): TemplateResult | typeof nothing {
    if (!this._showModes()) return nothing;
    const modes = this._modes();
    if (!modes.length) return nothing;
    const current = this._pendingSel['hvac_mode#row'] ?? this._mode;
    return html`
      <div class="modes" style="--n:${modes.length}">
        ${modes.map((m) => {
          const on = m.name === current;
          return html`<button
            class="mode ${on ? 'on' : ''} m-${m.name}"
            style="--mc:${this._color(m.name)}"
            aria-pressed=${on ? 'true' : 'false'}
            @click=${() => this._setMode(m.name)}
          >
            <ha-icon icon=${m.icon}></ha-icon><span>${m.label}</span>
          </button>`;
        })}
      </div>
    `;
  }
}
