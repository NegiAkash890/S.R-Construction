import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const airbnbConfig = compat.extends("airbnb", "airbnb-typescript");

// Filter out duplicate plugins causing conflicts (specifically jsx-a11y and @typescript-eslint provided by next)
const patchedAirbnbConfig = airbnbConfig.map(config => {
  let newConfig = { ...config };
  let configChanged = false;

  // Filter out duplicate plugins causing conflicts
  if (newConfig.plugins) {
    const plugins = { ...newConfig.plugins };
    let pluginsChanged = false;
    if (plugins["jsx-a11y"]) {
      delete plugins["jsx-a11y"];
      pluginsChanged = true;
    }
    if (plugins["@typescript-eslint"]) {
      delete plugins["@typescript-eslint"];
      pluginsChanged = true;
    }
    if (pluginsChanged) {
      newConfig.plugins = plugins;
      configChanged = true;
    }
  }

  // Patch rules that are incompatible with typescript-eslint v8
  const incompatibleRules = [
    "@typescript-eslint/brace-style",
    "@typescript-eslint/comma-dangle",
    "@typescript-eslint/comma-spacing",
    "@typescript-eslint/func-call-spacing",
    "@typescript-eslint/indent",
    "@typescript-eslint/keyword-spacing",
    "@typescript-eslint/lines-between-class-members",
    "@typescript-eslint/no-array-constructor",
    "@typescript-eslint/no-dupe-class-members",
    "@typescript-eslint/no-empty-function",
    "@typescript-eslint/no-extra-parens",
    "@typescript-eslint/no-extra-semi",
    "@typescript-eslint/no-implied-eval",
    "@typescript-eslint/no-loss-of-precision",
    "@typescript-eslint/no-magic-numbers",
    "@typescript-eslint/no-redeclare",
    "@typescript-eslint/no-shadow",
    "@typescript-eslint/no-throw-literal",
    "@typescript-eslint/no-unused-expressions",
    "@typescript-eslint/no-unused-vars",
    "@typescript-eslint/no-use-before-define",
    "@typescript-eslint/no-useless-constructor",
    "@typescript-eslint/object-curly-spacing",
    "@typescript-eslint/padding-line-between-statements",
    "@typescript-eslint/quotes",
    "@typescript-eslint/require-await",
    "@typescript-eslint/return-await",
    "@typescript-eslint/semi",
    "@typescript-eslint/space-before-blocks",
    "@typescript-eslint/space-before-function-paren",
    "@typescript-eslint/space-infix-ops"
  ];

  if (newConfig.rules) {
    const rules = { ...newConfig.rules };
    let rulesChanged = false;
    incompatibleRules.forEach(rule => {
      if (rules[rule]) {
        delete rules[rule];
        rulesChanged = true;
      }
    });
    if (rulesChanged) {
      newConfig.rules = rules;
      configChanged = true;
    }
  }

  return configChanged ? newConfig : config;
});

const eslintConfig = defineConfig([
  ...patchedAirbnbConfig,
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "eslint.config.mjs",
  ]),
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Add any specific overrides here if needed
      // "react/react-in-jsx-scope": "off", // Next.js doesn't need this
    },
  },
]);

export default eslintConfig;
