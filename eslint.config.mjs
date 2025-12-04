import antfu from '@antfu/eslint-config'

const extendedRules = {
  rules: {
    'node/prefer-global/process': 'off',
    'pnpm/json-enforce-catalog': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
  },
}

export default antfu({
  unocss: true,
  formatters: true,
  pnpm: true,
  vue: true,
  typescript: true,
})
  .append(extendedRules)
