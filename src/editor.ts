import { LitElement, html, css, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  ThermostatCardConfig,
  SwitchConfig,
  SelectConfig,
  ClimateSelectType,
  InfoRowType,
} from './types';

/* ── Helpers ──────────────────────────────────────────────── */

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ') : s);
const grid = (schema: unknown[]) => ({ type: 'grid', name: '', schema });
const text = (name: string) => ({ name, selector: { text: {} } });
const icon = (name: string) => ({ name, selector: { icon: {} } });
const bool = (name: string) => ({ name, selector: { boolean: {} } });
const choice = (name: string, options: Array<{ value: string; label: string }>) => ({
  name,
  selector: { select: { mode: 'dropdown', options } },
});

const clean = <T extends object>(o: T): T => {
  const c = { ...o } as Record<string, unknown>;
  for (const k of Object.keys(c)) if (c[k] === '' || c[k] === undefined || c[k] === null) delete c[k];
  return c as T;
};

const SELECT_TYPES: Array<{ value: ClimateSelectType; attr: string; list: string; label: string }> = [
  { value: 'fan_mode', attr: 'fan_mode', list: 'fan_modes', label: 'Fan mode' },
  { value: 'preset_mode', attr: 'preset_mode', list: 'preset_modes', label: 'Preset' },
  { value: 'swing_mode', attr: 'swing_mode', list: 'swing_modes', label: 'Swing (vertical)' },
  { value: 'swing_horizontal_mode', attr: 'swing_horizontal_mode', list: 'swing_horizontal_modes', label: 'Swing (horizontal)' },
  { value: 'hvac_mode', attr: '', list: 'hvac_modes', label: 'HVAC mode' },
];

const INFO_TYPES: Array<{ value: InfoRowType; label: string }> = [
  { value: 'current_temperature', label: 'Current temperature' },
  { value: 'humidity', label: 'Humidity' },
  { value: 'hvac_action', label: 'Mode · action' },
  { value: 'state', label: 'Mode' },
  { value: 'fan_mode', label: 'Fan mode' },
  { value: 'preset_mode', label: 'Preset' },
  { value: 'target_temperature', label: 'Target temperature' },
];

const LABELS: Record<string, string> = {
  entity: 'Climate entity',
  name: 'Name',
  icon: 'Icon',
  preset: 'Card type',
  power_on: 'Power button turns the unit on in',
  mode_dropdown: 'Mode dropdown next to the power button',
  info: 'Line under the name',
  buttons_size: 'Setpoint button size',
  menu_max_items: 'Dropdown: options visible before scrolling',
  step: 'Setpoint step (empty = from entity)',
  decimals: 'Setpoint decimals (empty = automatic)',
  debounce: 'Send setpoint after (ms)',
  animations: 'Animations',
  modes: 'Mode buttons row (empty = hidden)',
  kind: 'Button',
  icon_off: 'Icon when off',
  color: 'Color when on (e.g. #5dcaa5)',
  show_name: 'Show name and switch',
  source: 'Selector',
  heat: 'Heat',
  cool: 'Cool',
  auto: 'Auto',
  heat_cool: 'Heat / cool',
  dry: 'Dry',
  fan_only: 'Fan only',
  switch_on: 'Default color for switches that are on',
  temperature_entity: 'Temperature sensor (optional, instead of the climate value)',
  humidity_entity: 'Humidity sensor (optional)',
  height: 'Card height in px (empty = automatic; only the setpoint area grows or shrinks)',
};

/* ── Editor ───────────────────────────────────────────────── */

@customElement('thermostat-card-editor')
export class ThermostatCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: ThermostatCardConfig;

  public setConfig(config: ThermostatCardConfig): void {
    this._config = config;
  }

  private _label = (s: { name: string }) => LABELS[s.name] ?? cap(s.name);

  private get _attrs(): Record<string, any> {
    return this.hass?.states?.[this._config?.entity]?.attributes ?? {};
  }

  private get _onModes(): string[] {
    return ((this._attrs.hvac_modes as string[] | undefined) ?? []).filter((m) => m !== 'off');
  }

  private get _preset(): 'ac' | 'thermostat' {
    if (this._config.preset) return this._config.preset;
    return this._attrs.fan_modes || this._attrs.swing_modes ? 'ac' : 'thermostat';
  }

  /** Switches as the card will show them (defaults included). */
  private get _switches(): SwitchConfig[] {
    if (this._config.switches) return this._config.switches;
    return ((this._attrs.hvac_modes as string[] | undefined) ?? []).includes('off') ? [{ type: 'power' }] : [];
  }

  /** Selectors as the card will show them (defaults included). */
  private get _selects(): SelectConfig[] {
    if (this._config.selects) return this._config.selects;
    const auto: ClimateSelectType[] =
      this._preset === 'ac' ? ['fan_mode', 'preset_mode', 'swing_mode', 'swing_horizontal_mode'] : ['preset_mode'];
    return auto
      .filter((t) => {
        const list = SELECT_TYPES.find((x) => x.value === t)!.list;
        return Array.isArray(this._attrs[list]) && this._attrs[list].length;
      })
      .map((type) => ({ type }));
  }

  private _optionsOf(s: SelectConfig): string[] {
    if (s.entity) return (this.hass?.states?.[s.entity]?.attributes?.options as string[] | undefined) ?? [];
    const t = SELECT_TYPES.find((x) => x.value === (s.type ?? 'fan_mode'));
    return (t ? (this._attrs[t.list] as string[] | undefined) : undefined) ?? [];
  }

  /* ── Schemas ─────────────────────────────────────────── */

  private _mainSchema(): unknown[] {
    const modes = this._onModes;
    return [
      { name: 'entity', required: true, selector: { entity: { domain: 'climate' } } },
      grid([text('name'), icon('icon')]),
      grid([
        { name: 'temperature_entity', selector: { entity: { domain: 'sensor' } } },
        { name: 'humidity_entity', selector: { entity: { domain: 'sensor' } } },
      ]),
      grid([
        choice('preset', [
          { value: 'auto', label: 'Automatic' },
          { value: 'ac', label: 'Air conditioner' },
          { value: 'thermostat', label: 'Thermostat' },
        ]),
        choice('power_on', [
          { value: 'last', label: 'Last used mode (like a remote)' },
          { value: 'turn_on', label: 'Mode chosen by the integration' },
          ...modes.map((m) => ({ value: m, label: `Always ${cap(m)}` })),
        ]),
      ]),
      grid([
        choice('mode_dropdown', [
          { value: 'auto', label: 'Automatic (2+ modes)' },
          { value: 'show', label: 'Show' },
          { value: 'hide', label: 'Hide' },
        ]),
        bool('animations'),
      ]),
      {
        name: 'info',
        selector: { select: { multiple: true, mode: 'list', options: INFO_TYPES } },
      },
    ];
  }

  private _switchSchema(s: SwitchConfig): unknown[] {
    const kind = choice('kind', [
      { value: 'power', label: 'Power (on / off like a remote)' },
      { value: 'toggle', label: 'Toggle another entity' },
    ]);
    if (s.type === 'power') return [kind, grid([icon('icon'), text('color')]), bool('show_name')];
    return [
      kind,
      {
        name: 'entity',
        selector: { entity: { domain: ['switch', 'input_boolean', 'light', 'fan', 'script', 'automation'] } },
      },
      grid([text('name'), text('color')]),
      grid([icon('icon'), icon('icon_off')]),
      bool('show_name'),
    ];
  }

  private _selectSchema(s: SelectConfig): unknown[] {
    const source = choice('source', [
      ...SELECT_TYPES.map((t) => ({ value: t.value, label: t.label })),
      { value: 'entity', label: 'Select / input_select entity' },
    ]);
    const opts = this._optionsOf(s);
    return [
      source,
      ...(s.entity !== undefined
        ? [{ name: 'entity', selector: { entity: { domain: ['select', 'input_select'] } } }]
        : []),
      grid([text('name'), icon('icon')]),
      ...(opts.length
        ? [
            {
              name: 'options',
              selector: {
                select: { multiple: true, mode: 'list', options: opts.map((o) => ({ value: o, label: cap(o) })) },
              },
            },
          ]
        : []),
    ];
  }

  /* ── Render ──────────────────────────────────────────── */

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const c = this._config;
    const mainData = {
      ...c,
      preset: c.preset ?? 'auto',
      power_on: c.power_on ?? 'last',
      mode_dropdown: c.mode_dropdown === true ? 'show' : c.mode_dropdown === false ? 'hide' : 'auto',
      animations: c.animations !== false,
      info: (c.info ?? [{ type: 'current_temperature' }, { type: 'humidity' }]).map((i) => i.type),
    };
    const sws = this._switches;
    const sels = this._selects;
    const allModes = (this._attrs.hvac_modes as string[] | undefined) ?? [];
    const colorModes = [...new Set([...allModes.filter((m) => m !== 'off'), 'heat', 'cool'])];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${mainData}
        .schema=${this._mainSchema()}
        .computeLabel=${this._label}
        @value-changed=${this._mainChanged}
      ></ha-form>

      <div class="section">Header buttons</div>
      <div class="hint">The power button is always drawn in the top-right corner.</div>
      ${sws.map((s, i) =>
        this._panel(
          'switches',
          i,
          sws.length,
          s.type === 'power'
            ? 'Power'
            : s.name || this.hass.states[s.entity ?? '']?.attributes?.friendly_name || s.entity || `Button ${i + 1}`,
          s.type === 'power' ? 'mdi:power' : s.icon ?? 'mdi:toggle-switch-outline',
          html`<ha-form
            .hass=${this.hass}
            .data=${{ ...s, kind: s.type === 'power' ? 'power' : 'toggle' }}
            .schema=${this._switchSchema(s)}
            .computeLabel=${this._label}
            @value-changed=${(ev: CustomEvent) => this._switchChanged(i, ev)}
          ></ha-form>`
        )
      )}
      <div class="adds">
        <button class="add" @click=${() => this._addSwitch('toggle')}>+ Add switch</button>
        ${sws.some((s) => s.type === 'power')
          ? nothing
          : html`<button class="add" @click=${() => this._addSwitch('power')}>+ Add power button</button>`}
      </div>

      <div class="section">Selectors</div>
      <div class="hint">Shown on one line under the setpoint; each opens a dropdown.</div>
      ${sels.map((s, i) => {
        const t = SELECT_TYPES.find((x) => x.value === s.type);
        const title =
          s.name ||
          (s.entity ? this.hass.states[s.entity]?.attributes?.friendly_name || s.entity : t?.label) ||
          `Selector ${i + 1}`;
        return this._panel(
          'selects',
          i,
          sels.length,
          title,
          s.icon ?? 'mdi:form-dropdown',
          html`<ha-form
              .hass=${this.hass}
              .data=${{ ...s, source: s.entity !== undefined ? 'entity' : s.type ?? 'fan_mode' }}
              .schema=${this._selectSchema(s)}
              .computeLabel=${this._label}
              @value-changed=${(ev: CustomEvent) => this._selectChanged(i, ev)}
            ></ha-form>
            ${this._labelsEditor(s, i)}`
        );
      })}
      <button class="add wide" @click=${this._addSelect}>+ Add selector</button>

      <ha-expansion-panel outlined .header=${'Colors'} class="top">
        <ha-form
          .hass=${this.hass}
          .data=${{ ...(c.theme?.modes ?? {}), switch_on: c.theme?.switch_on }}
          .schema=${[grid(colorModes.map((m) => text(m))), text('switch_on')]}
          .computeLabel=${(s: { name: string }) =>
            colorModes.includes(s.name) ? `${LABELS[s.name] ?? cap(s.name)} color (e.g. #6cb4ff)` : this._label(s)}
          @value-changed=${this._themeChanged}
        ></ha-form>
      </ha-expansion-panel>
    `;
  }

  private _panel(
    key: 'switches' | 'selects',
    i: number,
    len: number,
    title: string,
    ic: string,
    body: TemplateResult
  ): TemplateResult {
    return html`<ha-expansion-panel outlined .header=${title} .leftChevron=${false}>
      <ha-icon slot="leading-icon" .icon=${ic}></ha-icon>
      ${body}
      <div class="row">
        <button ?disabled=${i === 0} @click=${() => this._move(key, i, -1)} title="Move up">↑</button>
        <button ?disabled=${i === len - 1} @click=${() => this._move(key, i, 1)} title="Move down">↓</button>
        <button class="del" @click=${() => this._remove(key, i)}>Remove</button>
      </div>
    </ha-expansion-panel>`;
  }

  /** One text field per option: the label shown in the card instead of the raw value. */
  private _labelsEditor(s: SelectConfig, i: number): TemplateResult | typeof nothing {
    const opts = s.options?.length ? s.options : this._optionsOf(s);
    if (!opts.length) return nothing;
    return html`<details class="labels">
      <summary>Option labels (${opts.length})</summary>
      ${opts.map(
        (o) => html`<div class="lrow">
          <span class="raw">${o}</span>
          <ha-textfield
            .value=${s.labels?.[o] ?? ''}
            .placeholder=${cap(o)}
            @change=${(ev: Event) => this._labelChanged(i, o, (ev.target as HTMLInputElement).value)}
          ></ha-textfield>
        </div>`
      )}
    </details>`;
  }

  /* ── Events ──────────────────────────────────────────── */

  private _emit(config: ThermostatCardConfig): void {
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }

  private _mainChanged = (ev: CustomEvent): void => {
    ev.stopPropagation();
    const v = { ...ev.detail.value } as Record<string, any>;
    const next: Record<string, any> = { ...this._config, ...v };
    // map editor-only values back to the card config
    if (v.preset !== undefined) next.preset = v.preset === 'auto' ? undefined : v.preset;
    if (v.power_on !== undefined) next.power_on = v.power_on === 'last' ? undefined : v.power_on;
    if (v.mode_dropdown !== undefined)
      next.mode_dropdown = v.mode_dropdown === 'show' ? true : v.mode_dropdown === 'hide' ? false : undefined;
    if (v.animations !== undefined) next.animations = v.animations ? undefined : false;
    if (Array.isArray(v.info)) {
      const prev = this._config.info ?? [];
      const isDefault =
        v.info.length === 2 && v.info[0] === 'current_temperature' && v.info[1] === 'humidity';
      next.info = isDefault ? undefined : v.info.map((t: InfoRowType) => prev.find((p) => p.type === t) ?? { type: t });
    }
    for (const [k, d] of [
      ['buttons_size', 'large'],
      ['menu_max_items', 8],
      ['debounce', 700],
    ] as const)
      if (next[k] === d) delete next[k];
    this._emit(clean(next) as ThermostatCardConfig);
  };

  private _switchChanged(i: number, ev: CustomEvent): void {
    ev.stopPropagation();
    const v = { ...ev.detail.value } as Record<string, any>;
    const list = [...this._switches];
    const kind = v.kind;
    delete v.kind;
    const item: SwitchConfig = kind === 'power' ? { ...v, type: 'power' } : { ...v, type: undefined };
    if (kind === 'power') delete (item as any).entity;
    if (!item.show_name) delete item.show_name;
    list[i] = clean(item);
    this._emit({ ...this._config, switches: list });
  }

  private _selectChanged(i: number, ev: CustomEvent): void {
    ev.stopPropagation();
    const v = { ...ev.detail.value } as Record<string, any>;
    const list = [...this._selects];
    const prev = list[i];
    const src = v.source as string;
    delete v.source;
    let item: SelectConfig;
    if (src === 'entity') item = { ...v, type: undefined, entity: v.entity ?? '' };
    else {
      item = { ...v, type: src as ClimateSelectType };
      delete item.entity;
    }
    // changing the source invalidates option filters and labels
    const changed = src === 'entity' ? prev.entity === undefined : prev.type !== src || prev.entity !== undefined;
    if (changed) {
      delete item.options;
      delete item.labels;
      delete item.name;
    }
    if (Array.isArray(item.options) && !item.options.length) delete item.options;
    const out = clean(item);
    if (src === 'entity' && out.entity === undefined) (out as SelectConfig).entity = '';
    list[i] = out;
    this._emit({ ...this._config, selects: list });
  }

  private _labelChanged(i: number, option: string, value: string): void {
    const list = [...this._selects];
    const labels = { ...(list[i].labels ?? {}) };
    if (value.trim()) labels[option] = value.trim();
    else delete labels[option];
    list[i] = clean({ ...list[i], labels: Object.keys(labels).length ? labels : undefined });
    this._emit({ ...this._config, selects: list });
  }

  private _themeChanged = (ev: CustomEvent): void => {
    ev.stopPropagation();
    const v = { ...ev.detail.value } as Record<string, any>;
    const switch_on = v.switch_on;
    delete v.switch_on;
    const colors = clean(v);
    const theme = clean({
      modes: Object.keys(colors).length ? colors : undefined,
      switch_on: switch_on || undefined,
    });
    this._emit(
      clean({
        ...this._config,
        theme: Object.keys(theme).length ? theme : undefined,
      }) as ThermostatCardConfig
    );
  };

  private _addSwitch(kind: 'power' | 'toggle'): void {
    const list = [...this._switches];
    // order does not matter for the power button: the card always draws it top-right
    list.push(kind === 'power' ? { type: 'power' } : { entity: '' });
    this._emit({ ...this._config, switches: list });
  }

  private _addSelect = (): void => {
    const used = new Set(this._selects.map((s) => s.type));
    const next =
      SELECT_TYPES.find((t) => !used.has(t.value) && Array.isArray(this._attrs[t.list]) && this._attrs[t.list].length)
        ?.value ?? 'fan_mode';
    this._emit({ ...this._config, selects: [...this._selects, { type: next }] });
  };

  private _remove(key: 'switches' | 'selects', i: number): void {
    const list = [...(key === 'switches' ? this._switches : this._selects)];
    list.splice(i, 1);
    this._emit({ ...this._config, [key]: list });
  }

  private _move(key: 'switches' | 'selects', i: number, d: number): void {
    const list = [...(key === 'switches' ? this._switches : this._selects)] as unknown[];
    const j = i + d;
    if (j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    this._emit({ ...this._config, [key]: list });
  }

  static styles = css`
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
  `;
}
