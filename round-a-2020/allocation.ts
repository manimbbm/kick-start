const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let budget = 300;

const inputBudget = () => {
	rl.question("What is your budget?", (answer) => {
		budget = answer;
		rl.close();
	});
};

inputBudget();

let houses = [999, 999, 999, 990];

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
}

console.log(allocate(budget, houses));
