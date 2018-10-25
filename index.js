#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process');

const argv = process.argv.slice(2);
const algoName = argv[0];
const command = argv[1];

const algos = require('./algos');

const {
	makeKeysReadable,
	RU_ALPHANUMERIC_CHARS
} = require('./utils');

const options = {
	caezar: 17,
	viginere: 'String',
	pairs: '12345678приветкакой-тоключздес',
	polybius: RU_ALPHANUMERIC_CHARS.split(''),
	xor: 'какой то длинный ключ',
	transpose: 'ПриветМир'
};

const algorithm = algos[algoName];

// Make sure the command is valid
if (algorithm) {
	console.log(`Using "${algoName}" algorithm`);
} else {
	throw new Error(`Algorithm "${algoName}" is unknown. Only ${makeKeysReadable(algos)} algorithms supported. Check "README.md".`);
}

const selectedAlgoCommand = algorithm[command];
if (selectedAlgoCommand) {
	console.log(`Using "${command}" command`);
} else {
	throw new Error(`Command "${command}" is unknown. Only ${makeKeysReadable(algorithm)} commands supported. Check "README.md".`);
}

const originalFileName = argv[2];

if (!originalFileName) {
	throw new Error('Path to <file> is not defined.');
}

// Get original file path
const originalFilePath = path.join(process.cwd(), originalFileName);
// Make sure the original file exists
const fileExists = fs.existsSync(originalFilePath);

if (fileExists) {
	console.log(`Using "${originalFilePath}" file`);
} else {
	throw new Error(`No file found at "${originalFilePath}"!`);
}

// Get contents of target file
const targetFileContents = fs.readFileSync(originalFilePath, 'utf8');
// "encrypt" of "decrypt" function from "funcs"
const output = selectedAlgoCommand(options[algoName])(targetFileContents);
// Name of the output file
// Input "hello-world.txt" -> encrypt -> "hello-world.txt.enc"
// Input "hello-world.txt" -> decrypt -> "hello-world.txt.dec"
const outputFileName = `${originalFileName}.${algoName}.${command.slice(0, 3)}`;
// Output file path
const outputFilePath = path.join(process.cwd(), outputFileName);
// Write data to output file
fs.writeFileSync(outputFilePath, output, 'utf8');
// Whoa! that works!
console.log(`Result saved in "${outputFilePath}"`);