const fs = require('fs');
// let input = fs.readFileSync('./test.txt', 'utf8').trim().split('\n');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let current_line = 0;
function readline() {
	return input[current_line++];
}

let t = readline();
for (let i = 1; i <= t; i++) {
	let [N, budget] = readline().split(' ').map(x => +x);
	let houses = readline().split(' ').map(x => +x);
	console.log(`Case #${i}: ${allocation(budget, houses)}`);
}

function allocation(budget, houses) {
	let sum = 0;
	let max_houses = 0;

	houses.sort((a,b)=> a-b);

	for (let k = 0; k < houses.length; k++) {
		sum += houses[k];
		if (sum <= budget) {
			max_houses++;
		} else{
			return max_houses;
		}
	}
	return max_houses;
}
