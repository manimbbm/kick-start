const fs = require('fs');

const input = fs.readFileSync('./perfect-array-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
	return input[line++];
}

let t = readline();

let squares_1000 = allSquaresBellowN(1000);
let squares_105 = allSquaresBellowN(Math.pow(10, 5));

for (let i = 1; i <= t; i++) {
	let N = readline();
	let arr = readline().split(" ").map(x => +x);
	console.log(`Case #${i}: ${perfectArray(arr, N)}`);
}


function perfectArray (arr: [], N: number) {
	let perfectSquares: number[];
	if (N > 1000) {
		perfectSquares = squares_105;
	} else {
		perfectSquares = squares_1000;
	}
	let ans: number = 0;
	// console.log("N", N);
	// console.log("perfectSquares", perfectSquares);

	//contiguous sub arrays
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j <= arr.length; j++) {
			//optimizing by checking a list with all perfect squares possible
			if (perfectSquares.includes(arr.slice(i, j).reduce((a, b) => a + b, 0))) {
				// console.log('arr.slice(i, j).reduce((a, b) => a + b, 0)', arr.slice(i, j).reduce((a, b) => a + b, 0));
				ans++;
			}
		}
	}
	return ans;
}

function allSquaresBellowN(N: number): number[] {
	let max = 100 * N, i = 1;
	let squares: number[] = [0];
	let result = 1;
	while (result < max) {
		squares.push(result);
		i++;
		result = i * i;
	}
	return squares;
}
