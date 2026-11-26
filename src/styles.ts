import { css } from 'lit';

/* Visual language shared with the ebusd-clasone and energy-flow cards:
   translucent surfaces, 18/13px radii, #ff8a5c / #4ecdc4 / #5dcaa5 accents,
   a soft status glow in the top-left corner and a pinging status dot. */
export const cardStyles = css`
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
`;
