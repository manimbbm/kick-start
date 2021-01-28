import { count } from "console";
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
	console.log(`Case #${i}: ${smart_check_with_splits_and_permutations(L, R)}`)
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


function smart_check_with_splits_and_permutations(L: number, R: number) {
	// get total permutations for R digits and subtract L digits - 1 formula is 5^1 + 5^2 + ... + 5^n for n digits
	let count = 0;
	if (L == R && is_boring_number(L)) {
		count++;
		return count;
	}

	//find out each side closest "dezimal" number
	let closestDecL = closestDec(L);
	let closestDecR = closestDec(R);
	boring_permutations_up_to_n(closestDecL);
	console.log({
		L,
		closestDecL,
		R,
		closestDecR,
	});
	

	// decide if add or subtract the ones in between by the sign of the diff and subtract later

    // subtract the ones greater than R (testEach one with new optimized approach)
	// subtract the ones lower than L (testEach one with new optimized approach)
	return count;
}

function closestDec(n: number): number {
	return Math.round(n/ Math.pow(10, String(n).length - 1)) * Math.pow(10, String(n).length - 1);
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

function boring_permutations_up_to_n(n: number) {
	console.log("boring permutations");

	let stringN = String(n);
	let firstDigit = +stringN[0];

	let i = stringN.length % 2 != 0 ? 1 : 0;
	let firstDigitPossibilities = 0;
	for(i; i < firstDigit; i += 2) {
		firstDigitPossibilities++; 
	}

	let result = 0;

	//continue
	stringN.split("").forEach(c => {
		console.log({
			stringN,
			c
		})
	});
}