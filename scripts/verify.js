#!/usr/bin/env node

/**
 * Test script to verify n8n node package structure
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
	'package.json',
	'tsconfig.json',
	'index.js',
	'gulpfile.js',
	'dist/nodes/SolannRank/SolannRank.node.js',
	'dist/credentials/SolannRankApi.credentials.js',
	'dist/nodes/SolannRank/solannrank.svg',
];

const REQUIRED_DIRS = ['dist', 'dist/nodes', 'dist/credentials', 'dist/nodes/SolannRank'];

console.log('🔍 Verifying n8n node package structure...\n');

let hasErrors = false;

// Check directories
console.log('📁 Checking directories...');
REQUIRED_DIRS.forEach((dir) => {
	const exists = fs.existsSync(dir);
	console.log(`  ${exists ? '✅' : '❌'} ${dir}`);
	if (!exists) hasErrors = true;
});

console.log('\n📄 Checking files...');
REQUIRED_FILES.forEach((file) => {
	const exists = fs.existsSync(file);
	console.log(`  ${exists ? '✅' : '❌'} ${file}`);
	if (!exists) hasErrors = true;
});

// Verify package.json structure
console.log('\n📦 Verifying package.json...');
try {
	const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

	const checks = [
		{ key: 'n8n', desc: 'n8n configuration exists' },
		{ key: 'n8n.credentials', desc: 'credentials defined' },
		{ key: 'n8n.nodes', desc: 'nodes defined' },
	];

	checks.forEach((check) => {
		const keys = check.key.split('.');
		let value = pkg;
		for (const k of keys) {
			value = value?.[k];
		}
		const exists = value !== undefined;
		console.log(`  ${exists ? '✅' : '❌'} ${check.desc}`);
		if (!exists) hasErrors = true;
	});
} catch (error) {
	console.log(`  ❌ Error reading package.json: ${error.message}`);
	hasErrors = true;
}

console.log('\n' + '='.repeat(50));

if (hasErrors) {
	console.log('❌ Verification failed! Please run: npm run build');
	process.exit(1);
} else {
	console.log('✅ All checks passed! Package is ready.');
	console.log('\n📚 Next steps:');
	console.log('  1. npm link');
	console.log('  2. (in n8n dir) npm link n8n-nodes-solannrank');
	console.log('  3. n8n start');
	process.exit(0);
}
