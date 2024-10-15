
import tsParser from "@typescript-eslint/parser"; // Import the TypeScript parser
import tsPlugin from "@typescript-eslint/eslint-plugin"; // Import the TypeScript plugin
import prettierPlugin from "eslint-plugin-prettier"; // Import the Prettier plugin
import importPlugin from 'eslint-plugin-import';

export default {
  languageOptions: {
    globals: {
      NodeJS: true,
    },
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
  files: ["**/*.ts"],
  rules: {
    "@typescript-eslint/ban-ts-ignore": ["off"],
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/interface-name-prefix": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-unused-expressions": ["off"],
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/no-use-before-define": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/no-namespace": ["off"],
    "@typescript-eslint/ban-ts-comment": "off",
    "camelcase": "off",
    "no-unused-expressions": "off",
    "comma-dangle": ["error", "always-multiline"],
    "require-await": "warn",
    "no-async-promise-executor": ["off"],
    "no-empty-pattern": ["off"],
    "no-undef": ["error"],
    "no-var": ["error"],
    "object-curly-spacing": ["error", "always"],
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "semi": ["error", "always"],
    "spaced-comment": ["off"],
    "no-prototype-builtins": ["off"],
    "sort-keys": ["off"],
    "space-before-function-paren": ["off"],
    "indent": ["off"],
    "promise/param-names": "off",
    "no-console": ["error", { allow: ["warn"] }],
    "no-useless-constructor": "off",
    "no-use-before-define": "off",
    "curly": "off",
    "prefer-promise-reject-errors": "off",
    "import/no-extraneous-dependencies": ["error"], 
  },
  ignores: ["dist", "node_modules/*"],
  plugins: {
    "@typescript-eslint": tsPlugin,
    prettier: prettierPlugin,
    import: importPlugin,
  },
};
