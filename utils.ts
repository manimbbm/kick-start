const fs = require('fs');

function printRandomNumbers(N: number, max:number) {
    let i = 1;
    if (N && max) {
        let numbers: number[] = [];
        while (i <= N) {
            let rnd_n = Math.random()*Math.pow(10, max.toString().length);
            if (rnd_n <= max) {
                numbers.push(+rnd_n.toFixed());
                i++;
            }
        }
        fs.writeFileSync('utils.txt', numbers.join(' '));
        console.dir(numbers, {'maxArrayLength': N});
    } else {
        console.log('Usage "node utils {N} {max}"\n' +
            '1- the total random N you\'d like to generate and \n' +
            '2- the max value \n' +
            'Example: "node utils 5 900"');
    }

}

printRandomNumbers(+process.argv[2], +process.argv[3]);
