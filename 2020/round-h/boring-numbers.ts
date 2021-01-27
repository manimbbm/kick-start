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
	console.log(`Case #${i}: ${greedy_check_each_number(L, R)}`)
}


function greedy_check_each_number(L: number, R: number): number {
	// console.log({L, R});
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


function smart_check_with_splits_and_permutations(L, R) {
    // get total permutations for R digits and subtract L digits - 1 formula is 5^1 + 5^2 + ... + 5^n for n digits
    // subtract the ones greater than R (testEach one with new optimized approach)
    // subtract the ones lower than L (testEach one with new optimized approach)
}

function is_boring_number(n: number): boolean {
	let currStr = String(n);
	for (let i = 0; i < currStr.length; i++) {
		if(!((+currStr[i]%2 > 0 && (i+1)%2 > 0) || +currStr[i]%2 === (i+1)%2)) {
			return false;
		}
	}
	// console.log(`${currStr} is boring`);
	return true;

}