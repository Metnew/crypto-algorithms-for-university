// We need alphabet to be even for this cypher
// 49 % 2 = 1 :(
// So, let's add dollar sign to make it 50 length 
const ALPHA = require('../utils').RU_ALPHANUMERIC_CHARS + '$';
const uniq = require('../utils').uniq

const baseFunc = method => key => {
	const ALPHA_LENGTH = ALPHA.length;
	const alphaLengthHalf = ALPHA_LENGTH / 2

	console.log(`ALPHA length is ${ALPHA_LENGTH}`)

	// Remove whitespaces
	const keyFormatted = uniq(key.toLowerCase().trim().split(' ').join(''))

	// Key formatted length
	const keyFormattedLength = keyFormatted.length

	// BUG: needs validation that key includes at least 1/2 of alphabet chars

	if (keyFormattedLength < alphaLengthHalf) {
		console.log(`Key must be at least ${alphaLengthHalf} chars length to work with current alphabet! Got ${keyFormattedLength}`)
		throw new Error()
	} else if (keyFormattedLength > alphaLengthHalf) {
		console.log(`WARNING: Only first ${alphaLengthHalf} chars will be used as key for this alphabet!  Got ${keyFormattedLength}`)
	}

	const keyToAlphaLengthArr = keyFormatted.slice(0, alphaLengthHalf).split('')

	console.log(`${method.toUpperCase()}: Using "${keyToAlphaLengthArr.join('')}" as key`);

	const charsToMakePairs = ALPHA.split('').filter(a => keyToAlphaLengthArr.indexOf(a) === -1)

	const keyPairs = keyToAlphaLengthArr.reduce((a, b, i) => {
		a.set(b, charsToMakePairs[i])
		// Set reverse rules to make iteration easy
		a.set(charsToMakePairs[i], b)
		return a
		// space is always space
	}, new Map([]))

	console.log('---KEY PAIRS---')
	console.log(keyPairs)
	console.log('---KEY PAIRS---')

	return str => {
		return str
			.trim()
			.toLowerCase()
			.split('')
			.map(a => {
				const indexInTable = ALPHA.indexOf(a);
				if (indexInTable === -1) {
					throw new Error(
						`${method.toUpperCase()}: Char ${a} is not presented in current alphabet! Check input.`
					);
				}
				return keyPairs.get(a)
			})
			.join('');
	};
};

module.exports.encrypt = baseFunc('encrypt');
module.exports.decrypt = baseFunc('decrypt');