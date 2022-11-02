module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-const-assign':[
			'error',
		],
		'no-debugger':[
			'error'
		],
		'camelcase':[
			'error'
		],
		'no-empty':[
			'error'
		],
		'no-irregular-whitespace':[
			'error'
		],
		'no-multiple-empty-lines':[
			'error',
			{'max': 2}
		]
	}
};
