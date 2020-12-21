import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";
import sizes from "rollup-plugin-sizes";
import typescript from "rollup-plugin-typescript";

export default {
  input: "src/main.ts",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  external: ["DHT22", "SPI"],
  plugins: [
    eslint({ throwOnError: false }),
    typescript({ lib: [], target: "es5" }),
    babel({
      exclude: "node_modules/**",
      plugins: [["transform-async-to-promises", { inlineHelpers: true }]],
    }),
    terser({
      compress: false,
    }),
    sizes({ details: true }),
    filesize(),
  ],
};
