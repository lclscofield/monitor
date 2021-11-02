module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],

    parserOptions: {
        parser: 'babel-eslint',
    },

    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
    },

    extends: ['plugin:vue/essential', 'eslint:recommended'],
}
