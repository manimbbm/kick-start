const fs = require('fs');

function printRandomNumbers(N: number, max:number) {
    let i = 1;
    if (N && max) {
        let numbers: number[] = [+(Math.random()*Math.pow(10, max.toString().length)).toFixed()];
        while (i < N) {
            numbers.push(+(Math.random()*Math.pow(10, max.toString().length)).toFixed());
            i++;
        }
        fs.writeFileSync('utils.txt', numbers.join(' '));
        console.dir(numbers, {'maxArrayLength': N});
    } else {
        console.log('Please pass on as parameters 1- the total random N you\'d like to generate and 2- the max value "node utils {N} {max}"\n' +
            'Example: "node utils 5 900"');
    }

}

printRandomNumbers(+process.argv[2], +process.argv[3]);
