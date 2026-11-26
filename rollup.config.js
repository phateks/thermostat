import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/thermostat-card.ts',
  output: {
    file: 'thermostat-card.js',
    format: 'es',
    inlineDynamicImports: true,
    sourcemap: false,
  },
  plugins: [resolve(), typescript({ tsconfig: './tsconfig.json' }), !dev && terser({ format: { comments: false } })],
};
