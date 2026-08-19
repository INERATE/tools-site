import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // public/ holds pdfjs' prebuilt minified worker — vendored, not ours to lint.
  globalIgnores([".next/**", ".open-next/**", "out/**", "build/**", "next-env.d.ts", "public/**"]),
]);

export default eslintConfig;
