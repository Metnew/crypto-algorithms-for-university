const ALPHA = require('../utils').LATIN_UNDERSCORE;
const ALPHA_LENGTH = ALPHA.length;

function getModuloByAlpha(num) {
	const indexAfterOffset = num % ALPHA_LENGTH;
	// If index < 0 after offset => +27 for correction
	return indexAfterOffset > -1 ? indexAfterOffset : indexAfterOffset + 27;
}

const getCharWithOffset = offset => char => {
	const indexInTable = ALPHA.indexOf(char);
	if (indexInTable === -1) {
		throw new Error(
			`Char "${char}" is not alphabetical! Check input string.`
		);
	}
	const indexWithOffset = getModuloByAlpha(indexInTable - offset);
	return ALPHA[indexWithOffset];
};

module.exports.encrypt = offset => {
	console.log(`ENCRYPT: Using "${offset}" offset for encryption`);
	return str => {
		// Replace spaces with underscores + lowercase str
		const underscored = str
			.trim()
			.split(' ')
			.join('_')
			.toLowerCase();
		return underscored
			.split('')
			.map(() => getCharWithOffset(offset))
			.join('');
	};
};

module.exports.decrypt = offset => str => {
	console.log(`DECRYPT: Using "${offset}" offset for decryption`);

	const underscoredOriginalStr = str
		.trim()
		.toLowerCase()
		.split('')
		.map(() => getCharWithOffset(offset))
		.join('');
	// Replace underscores with spaces
	return underscoredOriginalStr.split('_').join(' ');
};