/** Bumped by the release workflow — do not edit by hand. */
export const CARD_VERSION = "0.2.0";

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ): Promise<void>;
  language: string;
  config: {
    unit_system: {
      temperature: string;
    };
  };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

/* ── Info (secondary line) ─────────────────────────────── */

export type InfoRowType =
  | 'current_temperature'
  | 'state'
  | 'hvac_action'
  | 'humidity'
  | 'preset_mode'
  | 'fan_mode'
  | 'target_temperature';

export interface InfoRow {
  type: InfoRowType;
  label?: string;
  hide_label?: boolean;
}

/* ── Mode buttons row ──────────────────────────────────── */

export interface ModeButton {
  name: string;
  icon?: string;
  label?: string;
}

/* ── Toggle buttons (round icons in the header) ────────── */

export interface SwitchConfig {
  /** 'power' toggles the climate entity on/off; default toggles `entity`. */
  type?: 'power' | 'toggle';
  entity?: string;
  icon?: string;
  icon_off?: string;
  name?: string;
  color?: string;
  /** Show the name under/next to the icon (default false) */
  show_name?: boolean;
}

/* ── Dropdowns (pill selectors under the header) ───────── */

export type ClimateSelectType =
  | 'hvac_mode'
  | 'fan_mode'
  | 'preset_mode'
  | 'swing_mode'
  | 'swing_horizontal_mode';

export interface SelectConfig {
  /** climate attribute to drive — or omit and set `entity` (select./input_select.) */
  type?: ClimateSelectType;
  entity?: string;
  name?: string;
  icon?: string;
  /** Show the currently selected value inside the pill (default true) */
  show_value?: boolean;
  /** Restrict / reorder options */
  options?: string[];
  /** Pretty labels per raw value: { "auto": "Auto", "1": "Silent" } */
  labels?: Record<string, string>;
  /** Icons per raw value, shown in the menu */
  icons?: Record<string, string>;
}

export type ButtonsSize = 'small' | 'medium' | 'large' | 'xlarge';
export type CardPreset = 'thermostat' | 'ac';

export interface ThermostatCardTheme {
  /** Colours per hvac mode / action */
  modes?: Record<string, string>;
  /** Accent for active toggles (default: current mode colour) */
  switch_on?: string;
}

export interface ThermostatCardConfig {
  type: string;
  entity: string;
  /** Picks sensible defaults for switches/selects/modes */
  preset?: CardPreset;
  name?: string;
  icon?: string;
  unit?: string;
  step?: number;
  decimals?: number;
  buttons_size?: ButtonsSize;
  /** ms to wait after the last +/- tap before calling the service (default 700) */
  debounce?: number;
  info?: InfoRow[];
  modes?: Array<string | ModeButton>;
  hide_modes?: boolean;
  switches?: SwitchConfig[];
  selects?: SelectConfig[];
  /**
   * What the power button does when the unit is off:
   *  - 'last' (default): resume the last mode the card saw (like a remote)
   *  - 'turn_on': call climate.turn_on and let the integration decide
   *  - any hvac mode (e.g. 'cool'): always start in that mode
   */
  power_on?: string;
  /** Show the mode dropdown next to the power button (default true for ac) */
  mode_dropdown?: boolean;
  /** Max rows visible in a dropdown before it scrolls (default 8; also limited by the screen) */
  menu_max_items?: number;
  /** Ambient animations (airflow / heat shimmer / icon motion). Default true. */
  animations?: boolean;
  theme?: ThermostatCardTheme;
}
