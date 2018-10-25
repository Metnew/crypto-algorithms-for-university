const ALPHA = require('../utils').LATIN_UNDERSCORE;

const ALPHA_LENGTH = ALPHA.length;

function getModuloByAlpha(num) {
	return num % ALPHA_LENGTH > -1 ?
		num % ALPHA_LENGTH :
		(num % ALPHA_LENGTH) + 27;
}

module.exports.encrypt = keyWord => {
	console.log(`ENCRYPT: Using "${keyWord}" as key word`);
	// BUG: no check if the keyword is invalid
	const keyWordLen = keyWord.length;
	// Transform key string to array of char indecies according to ALPHA
	const keyWordIndexiesAccordingToTable = keyWord
		.split('')
		.map(a => ALPHA.indexOf(a));

	return function (str) {
		// Replace spaces with underscores + lowercase str
		const underscored = str
			.trim()
			.split(' ')
			.join('_')
			.toLowerCase();

		return underscored
			.split('')
			.map((a, i) => {
				const indexInAlpha = ALPHA.indexOf(a);

				if (indexInAlpha === -1) {
					throw new Error(
						`ENCRYPT: Char ${a} is not alphabetical! Check input.`
					);
				}

				const charIndexFromKeyWord =
          keyWordIndexiesAccordingToTable[i % keyWordLen];
				const indexWithOffset = getModuloByAlpha(
					indexInAlpha + charIndexFromKeyWord
				);

				return ALPHA[indexWithOffset];
			})
			.join('');
	};
};

module.exports.decrypt = keyWord => {
	console.log(`DECRYPT: Using "${keyWord}" as key word`);
	// BUG: no check if the keyword is invalid
	const keyWordLen = keyWord.length;
	// Transform key string to array of char indecies according to ALPHA
	const keyWordIndexiesAccordingToTable = keyWord
		.split('')
		.map(a => ALPHA.indexOf(a));

	return function (str) {
		const underscoredOriginalStr = str
			.toLowerCase()
			.split('')
			.map((a, i) => {
				const indexInAlpha = ALPHA.indexOf(a);

				if (indexInAlpha === -1) {
					console.log(a);
					throw new Error(
						`DECRYPT: Char ${a} is not alphabetical! Check input.`
					);
				}

				const charIndexFromKeyWord =
          keyWordIndexiesAccordingToTable[i % keyWordLen];
				const indexWithOffset = getModuloByAlpha(
					indexInAlpha - charIndexFromKeyWord
				);

				return ALPHA[indexWithOffset];
			})
			.join('');
		// Replace underscores with spaces
		return underscoredOriginalStr.split('_').join(' ');
	};
};
