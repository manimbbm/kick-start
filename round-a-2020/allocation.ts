
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let budget = 300;
let houses = [];
let t, n;

const inputs = async () => {
	t = 2;
	rl.prompt();
	rl.on('line', (line) => {
		t = line;
		rl.close();
	});
	//https://nodejs.org/api/readline.html#readline_example_tiny_cli
	// reading https://blog.bitsrc.io/keep-your-promises-in-typescript-using-async-await-7bdc57041308
	for (t; t > 0; t--) {
		console.log('t iteration', t);
		rl.prompt();
		rl.on('line', (line) => {
			n = line.split(" ")[0];
			budget = line.split(" ")[1];
		});

		rl.prompt();
		rl.on('line', (line) => {
			houses = line.split(" ");
		});
		console.log({n, budget});
		console.log('houses', houses);
	}
};

inputs();
const wait = (ms) => new Promise(res => setTimeout(res, ms));

const startAsync = async callback => {
	await wait(1000);
	callback('Hello');
	await wait(1000);
	callback('And Welcome');
	await wait(1000);
	callback('To Async Await Using TypeScript');
};
startAsync(text => console.log(text));

const allocate = (budget, houses) => {
	houses.sort();
	let counter = 0;
	let max_houses = 0;
	while(budget > 0) {
		if (houses[counter] <= budget) {
			budget -= houses[counter];
			max_houses++;
			counter++;
		} else {
			break;
		}
	}
	return max_houses;
};

console.log(allocate(budget, houses));
