module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'airbnb/hooks'
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: [
		'react',
	],
	rules: {
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'indent': [2, 'tab', { "SwitchCase": 1 }],
		'semi': ['error','always'],
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'jsx-quotes': [2, 'prefer-single'],
	},
};
