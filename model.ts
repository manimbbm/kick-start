const fs = require('fs');

const input = fs.readFileSync('./test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
	return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
	let [A, B] = readline().split(" ").map(x => +x);
	let arr = [];
	for (let j = 0; j <= A; j++) {
		arr.push(readline().split("\n"));
	}
	console.log(`Case #${i}: ${main(arr)}`)
}

function main(arr) {
	return 1;
}

