const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
const LATIN_UNDERSCORE = '_' + LATIN;
// Without "Ё"
const RU = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ'.toLowerCase();
const RU_UNDERSCORE = '_' + RU;
// RU without "Й"/"Ъ"
const NUMER = '1234567890';
// NOTE: Padded with whitespace
const MARKS = ',.!?-: ';
const RU_ALPHANUMERIC_CHARS = RU + NUMER + MARKS; // 49

// visualize square as 2-dim array
function makePolybiusSquare(chars, arr = []) {
	if (chars.length <= 0) {
		return arr;
	}
	const firstSevenChars = chars.slice(0, 7);
	const otherChars = chars.slice(7, chars.length);
	return makePolybiusSquare(otherChars, arr.concat([firstSevenChars]));
}

function charToBit(str) {
	return str.charCodeAt(0).toString(2);
}

function bitToChar(bit) {
	return String.fromCharCode(parseInt(bit, 2));
}

function uniq(str) {
	return String.prototype.concat(...new Set(str))
}

module.exports = {
	RU_ALPHANUMERIC_CHARS,
	RU,
	RU_UNDERSCORE,
	LATIN,
	LATIN_UNDERSCORE,
	uniq,
	charToBit,
	bitToChar,
	makePolybiusSquare,
	makeKeysReadable: obj => {
		return Object.keys(obj)
			.map(a => `"${a}"`)
			.join(', ');
	}
};