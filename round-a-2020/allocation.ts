let budget = 300;
let houses = [999, 999, 999, 990];

function allocation(budget, houses) {
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

console.log(allocation(budget, houses));
