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
	console.log(`Case greedy #${i}: ${greedy_check_each_number(L, R)}`)
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
	let permutationsToL = boring_permutations_up_to_n(L, false);
	let permutationsToR = boring_permutations_up_to_n(R, true);

	console.log({
		L,
		closestDecL,
		R,
		closestDecR,
	});
	

	// decide if add or subtract the ones in between by the sign of the diff and subtract later

    // subtract the ones greater than R (testEach one with new optimized approach)
	// subtract the ones lower than L (testEach one with new optimized approach)
	return permutationsToR - permutationsToL;
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

function boring_permutations_up_to_n(n: number, inclusive: boolean) {
	// issue, cant count any "dezen" number if the previous is not boring example 650, cant count up to 50 cause the initial 6 makes the following not boring already 
	console.log("boring permutations");

	let stringN = String(n);
	
	let result = 0, 
	firstDigitPossibilities = 0, 
	i = 1, 
	j, 
	firstDigit, 
	lastDigitIndex = stringN.length - 1;

	for (let index = 0; index < stringN.length; index ++ ) {
		let currStr = stringN.substring(index, stringN.length);
		firstDigit = +stringN[index];
		firstDigitPossibilities = 0;
		j = i;

		for(j; j < firstDigit; j += 2) {
			firstDigitPossibilities++; 
		}
	
		if (inclusive && index === lastDigitIndex) {
			for(j; j <= firstDigit; j += 2) {
				firstDigitPossibilities++; 
			}
		} 	
		
				
		
		if (index != lastDigitIndex && firstDigitPossibilities != 0) {
			console.log("result Math.pow(5, (currStr.length - 1)) * firstDigitPossibilities")
			result += Math.pow(5, (currStr.length - 1)) * firstDigitPossibilities			
		} else if (index === lastDigitIndex) {
			console.log("result firstDigitPossibilities")
			result += firstDigitPossibilities;
		} else if (firstDigitPossibilities == 0) {
			console.log("result Math.pow(5, (currStr.length - 1))")
			result += Math.pow(5, (currStr.length - 1));
		}

		i = Math.abs(i - 1);
		
		let currStrL = currStr.length;
		
		//todo check those missing numbers up to EACH "dezen"
		if (index != lastDigitIndex) {
			for (currStrL; currStrL > 0; currStrL--) {
				result += Math.pow(5, (currStr.length - 1));
			}
		} 

		if (j != firstDigit) {
			// then the first digit is not included and should return result already
			break;
		}
		
		console.log({
			currStr,
			i,
			j,
			result
		});
	};

	
	console.log({
		stringN,
		result
	})
	return result;
}