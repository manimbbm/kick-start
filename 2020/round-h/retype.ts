import { DEFAULT_MIN_VERSION } from "tls";

const fs = require('fs');

const input = fs.readFileSync('./retype-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
	return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
	let [N, K, S] = readline().split(' ').map(x => +x);
	console.log(`Case #${i}: ${main(N, K, S)}`)
}

function main(N: number, K: number, S: number) {
	let bestOpt = [
		{pos: K, val: K - S}, 
		{pos: S, val: S - 1}].sort((a, b) => a.val - b.val)[0];
	console.log({
		N,
		K,
		S,
		bestOpt
	});
	
	if(bestOpt.pos === S) {
		return (K - 1) + bestOpt.val + (N - S + 1) + 1;
	} else {
		return (K - 1) + bestOpt.val + (N - S + 1);
	}
}

