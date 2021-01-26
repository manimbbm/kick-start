import { DEFAULT_MIN_VERSION } from "tls";

const fs = require('fs');

const input = fs.readFileSync('./boring-numbers-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
	return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
	let [L, R] = readline().split(' ').map(x => +x);
	console.log(`Case #${i}: ${main(L, R)}`)
}

function main(L: number, R: number) {
	return greedy_check_each_number(L, R);
	// idea: find first boring after L and then get all permutations from L
	
}

function greedy_check_each_number(L: number, R: number): number {
	let curr = L;
	let count: number = 0;
	while (curr <= R) {
		if (is_boring_number(curr)) {
			count++;
		}
		curr+= 1;
	}
	return count;
}

function is_boring_number(n: number): boolean {
	let currStr = String(n);
	for (let i = 0; i < currStr.length; i++) {
		if(!((+currStr[i]%2 > 0 && i%2 > 0) || +currStr[i]%2 === i%2)) {
			return false;
		}
	}
	return true;

}