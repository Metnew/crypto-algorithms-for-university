const {
	makePolybiusSquare
} = require('../utils');

function getSquareSize(matrixLen) {
	return matrixLen ** 0.5;
}

module.exports.encrypt = matrix => {
	console.log(
		`ENCRYPT: Using matrix with "${matrix.length}" items for encryption`
	);
	console.log('-----MATRIX-----');
	console.log(makePolybiusSquare(matrix));
	console.log('-----MATRIX-----');

	return function (str) {
		const matrixSideLength = getSquareSize(matrix.length);
		return str
			.trim()
			.toLowerCase()
			.split('')
			.map(a => {
				// +1, because arr starts from 0
				const indexInMatrix = matrix.indexOf(a) + 1;
				const row = Math.ceil(indexInMatrix / matrixSideLength);
				const column = indexInMatrix % matrixSideLength === 0 ?
					matrixSideLength :
					indexInMatrix % matrixSideLength;

				return row.toString() + column.toString();
			})
			.join(' ');
	};
};

module.exports.decrypt = matrix => {
	console.log(
		`DECRYPT: Using matrix with "${matrix.length}" items for encryption`
	);
	console.log('-----MATRIX-----');
	console.log(makePolybiusSquare(matrix));
	console.log('-----MATRIX-----');
	return function (str) {
		const arr = str.split(' ');
		console.log('-----MATRIX-----');
		console.log(makePolybiusSquare(arr));
		console.log('-----MATRIX-----');
		const matrixSideLength = getSquareSize(matrix.length);
		return arr.map(a => {
			const aNum = Number(a);
			const row = Math.floor((aNum - 10) / 10) * matrixSideLength;
			const column = aNum % 10;
			return matrix[row + column - 1];
		});
	};
};
