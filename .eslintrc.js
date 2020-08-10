module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true,
    },
    'extends': 'standard',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        // "sourceType": "module",
        // "allowImportExportEverywhere": true
    },
    'plugins': [],
    'rules': {
        'max-len': ['error', { 'code': 120 }],
        'object-curly-spacing': ['error', 'always'],
        'no-trailing-spaces': ['off', { 'ignoreComments': true }],
        'indent': ['error', 4],
        'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
        'linebreak-style': ['off', 'windows'],
        'block-spacing': ['error', 'always'],
        'comma-dangle': ["error", "never"]
    },
};
