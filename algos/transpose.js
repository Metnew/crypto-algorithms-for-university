const {
	RU
} = require('../utils');

// 1 arg - method = encrypt/decrypt
// 2 arg - key
const baseFunc = method => keyString => {
	const normalizedKeyString = keyString.toLowerCase().trim();
	console.log('---KEY---');
	console.log(normalizedKeyString);

	const orderOfStringsOriginal = normalizedKeyString
		.split('')
		.map(a => RU.indexOf(a));
	console.log('---KEY CHARACTERS INDEXES---');
	console.log(orderOfStringsOriginal);

	// HACK: slice 0 to make a copy!!!!!
	const orderOfStringsSorted = orderOfStringsOriginal
		.slice(0)
		.sort((a, b) => Number(a) - Number(b));
	console.log('---KEY CHARACTERS INDEXES [SORTED]---');
	console.log(orderOfStringsSorted);

	// Maps indexes of elements in the first array
	// To the indexes of elementes in second array
	function mapArrayElementsToIndex(arr1, arr2) {
		return arr1.reduce((a, b, i) => {
			const indexInArrayMapTo = arr2.indexOf(b);
			a.set(i, indexInArrayMapTo);
			// Exclude this particular element from search
			// To prevent duplicate indexOf, when there are 2 same chars in string
			arr2[indexInArrayMapTo] = '$';
			return a;
		}, new Map([]));
	}

	// Returns filled array of arrays of chars of the string
	const fillStrToKey = key => {
		const keyLength = key.length;
		// Closure for key (fixed length)
		const fillStrToFixedKeyLength = (str, result = []) => {
			const originalStrLen = str.length;

			if (originalStrLen <= 0) {
				return result;
			}
			// If str is less than keyLength
			// fill str with "$" chars
			const keyOverflowsStr = keyLength - originalStrLen;
			const strToKeyLength =
				keyOverflowsStr > 0 ? str + '$'.repeat(keyOverflowsStr) : str;

			const strAfterSlice = strToKeyLength.slice(
				keyLength,
				strToKeyLength.length
			);
			const slicedStrPart = strToKeyLength.slice(0, keyLength);
			const slicedStrPartArray = slicedStrPart.split('');

			return fillStrToFixedKeyLength(
				strAfterSlice,
				result.concat([slicedStrPartArray])
			);
		};
		return fillStrToFixedKeyLength;
	};

	const originalToSortedMap =
		method === 'encrypt' ?
			mapArrayElementsToIndex(orderOfStringsOriginal, orderOfStringsSorted) :
			mapArrayElementsToIndex(orderOfStringsSorted, orderOfStringsOriginal);

	console.log('---INDEXES CHANGE [from 1st array to 2nd]---');
	console.log(originalToSortedMap);

	return str => {
		const normalizedStr = str.trim().toLowerCase();
		const filledStringToKeyLength = fillStrToKey(keyString)(normalizedStr);
		console.log('---STRING FILLED TO KEY---');
		console.log(filledStringToKeyLength);
		const encryptedArr = [];

		for (const row of filledStringToKeyLength) {
			// Change columns in row according to originalToSortedMap
			const encryptedStringsMap = row.reduce((a, b, i) => {
				a[originalToSortedMap.get(i)] = b;
				return a;
			}, ' '.repeat(row.length).split(''));
			encryptedArr.push(encryptedStringsMap.join(''));
		}
		const encryptedString = encryptedArr.join('');
		// If method decrypt =>
		// remove trimming chars that were added
		// when we was making a square with "$" chars
		// Line 47
		const stringSafeOfAlgoChars =
			method === 'decrypt' ?
				encryptedString.slice(0, encryptedString.indexOf('$')) :
				encryptedString;

		console.log('---ENCRYPTED STRING---');
		console.log(stringSafeOfAlgoChars);
		return stringSafeOfAlgoChars;
	};
};

module.exports.encrypt = baseFunc('encrypt');
module.exports.decrypt = baseFunc('decrypt');
