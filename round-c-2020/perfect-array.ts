const fs = require('fs');

const input = fs.readFileSync('./perfect-array-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
	return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
	let N = readline();
	let arr = readline().split(" ").map(x => +x);
	console.log(`Case #${i}: ${perfectArray(arr)}`)
}

function perfectArray (arr: []) {
	let ans: number = 0;

	//contiguous sub arrays
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j <= arr.length; j++) {
			if (Math.sqrt(arr.slice(i, j).reduce((a, b) => a + b, 0)) % 1 == 0) {
				ans++;
			}
		}
	}

	console.log('ans', ans);
	return ans;
}
