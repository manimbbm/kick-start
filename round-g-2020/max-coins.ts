const fs = require('fs');

const input = fs.readFileSync('./max-coins-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
    return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
    let N = readline().split('\n');
    let arr = [];
    for (let j = 0; j < N; j++) {
        arr.push(readline().split(' ').map(x => +x));
    }
    console.log(`Case #${i}: ${main(arr)}`)
}

function main(arr) {
    // console.log({arr})
    //greedy, sum of all diagonals
    let i = arr.length - 1, j = 0;
    let diagSums: number[] = [];
    while (j < arr.length) {
        let r = i, s = j;
        let diagSum = arr[r][s];
        while (r < arr.length - 1 && s < arr.length - 1) {
            r++;
            s++;
            diagSum += arr[r][s];
        }

        diagSums.push(diagSum);
        if (i > 0) {
            i--
        } else {
            j++
        }
    }
    // console.log({diagSums, max: Math.max(...diagSums)})

    return Math.max(...diagSums);
}

