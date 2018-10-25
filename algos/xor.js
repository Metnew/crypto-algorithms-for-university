const {
	charToBit,
	bitToChar
} = require('../utils');

function xor(xorBaseString) {
	const xorBase = xorBaseString.split('');
	const xorBaseLength = xorBase.length;
	return stringToXor => {
		const stringToXorArr = stringToXor.split('');
		// Console.log('XOR Base:    ', xorBaseString)
		// console.log('XORed string:', stringToXor)
		// console.log('XOR result:  ', x.join(''))
		return stringToXorArr
			.map((a, i) => Number(a) ^ Number(xorBase[i % xorBaseLength]))
			.join('');
	};
}

const baseFunc = method => keyString => {
	const bitKey = keyString.split('').map(charToBit);
	const bitKeyLength = bitKey.length;
	console.log('---KEY---');
	console.log(bitKey.join(''));
	console.log('---KEY---');

	const methods = {
		encrypt: str => {
			// Translate chars from string to array of bits
			const bitsOfStr = str
				.trim()
				.split('')
				.map(charToBit);
			return bitsOfStr
				.map((a, i) => xor(bitKey[i % bitKeyLength])(a))
				.join(' ');
		},
		decrypt: str => {
			// Translate chars from string to array
			const bitsOfStr = str.trim().split(' ');
			return bitsOfStr
				.map((a, i) => xor(bitKey[i % bitKeyLength])(a))
				.map(bitToChar)
				.join('');
		}
	};

	return methods[method];
};

module.exports.encrypt = baseFunc('encrypt');
module.exports.decrypt = baseFunc('decrypt');
