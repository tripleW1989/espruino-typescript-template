import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import sizes from 'rollup-plugin-sizes';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
export default {
    input: 'src/main.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
    external: ['DHT22', 'SPI', 'Wifi', 'http', 'ws'],
    plugins: [
        json(),
        commonjs(),
        typescript({ lib: [], target: 'es5' }),
        resolve(),
        builtins(),
        // eslint({ throwOnError: false }),

        babel({
            exclude: 'node_modules/**',
            plugins: [['transform-async-to-promises', { inlineHelpers: true }]]
        }),

        terser({
            compress: false
        }),
        sizes({ details: true }),
        filesize()
    ]
};
