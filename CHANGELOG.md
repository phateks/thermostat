# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.2.0] - 2026-11-26

### Added

- Air conditioner support alongside thermostats, with layout and defaults picked from the entity's modes and attributes.
- Remote-style power button in the top-right corner that resumes the last mode (`power_on`).
- Mode dropdown next to the power button; the active mode is shown next to the name.
- Extra header toggles for `switch`, `input_boolean`, `light` and `fan` entities (`switches`).
- Selectors for fan mode, preset, swing and horizontal swing, or `select` / `input_select` entities (`selects`).
- Bubble-style floating dropdowns that open up or down depending on screen position, show up to 8 options (`menu_max_items`) and scroll without a visible scrollbar.
- Debounced, optimistic setpoint (`debounce`) and MIN / MAX setpoints for `heat_cool`.
- Animations for each mode and fan-speed-driven airflow in the background (`animations`).
- Light theme, reduced-motion support and responsive layout for phone, tablet and desktop.
- Visual editor: entity, room sensors, power behaviour, header switches, selectors with per-option labels and colours.
- Optional temperature and humidity sensors from other entities for the line under the name (`temperature_entity`, `humidity_entity`).
- Card height (`height` option or the Sections grid): only the setpoint area grows or shrinks.
- Release workflow, HACS metadata and documentation.

### Changed

- New look, matching the EBusD Clas One and Energy Flow cards, without inner boxes.
- The mode buttons row is now opt-in (`modes`).
- Repository layout matches the other cards: the minified bundle `thermostat-card.js` lives in the repository root.

## [0.1.0]

### Added

- First version: target temperature with − / +, info rows and mode buttons.
