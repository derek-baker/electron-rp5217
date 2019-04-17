module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true,
    },
    'extends': 'google',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
        'ecmaVersion': 2018,
    },
    'plugins': [
        'vue',
    ],
    'rules': {
        'object-curly-spacing': ['error', 'always'],
        'no-trailing-spaces': ['off', { "ignoreComments": true }],
        "indent": ["error", 4],
        'brace-style': ['error', 'stroustrup'],
        'linebreak-style': ["off", "windows"]
    },
};
