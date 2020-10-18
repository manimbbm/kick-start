const fs = require('fs');

const input = fs.readFileSync('./comb-lock-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
    return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
    let [W, N] = readline().split(' ').map(x => +x);
    let arr = readline().split(' ').map(x => +x);
    console.log(`Case #${i}: ${main(arr, W, N)}`)
}

function main(arr, W, N) {
    //console.log({arr, W, N})
    //greedy, get all sums for each number
    arr.sort((a, b) => a - b);
    let distsPerN: number[] = [];

    let left = 0, right = 0;
    let max = 0, min = 0;
    if (arr[0] <= Math.floor(N/2)) {
        max = arr[0] + Math.floor(N/2);
        min = arr[0];
        arr.reduce((val) => ((val <= N && val >= max) || (val <= min)) ? left++ : 0);
        arr.reduce((val) => (val <= max && val >= min) ? right++ : 0);
        if (left >= right) {
            for (let i = max; i <= N; i++) {
                let sum = 0;
                arr.forEach((curr, index) => {
                    sum += dist(i, curr, N);
                })
                // console.log({i, sum});
                distsPerN.push(sum);
            }
            for (let i = 1; i <= min; i++) {
                let sum = 0;
                arr.forEach((curr, index) => {
                    sum += dist(i, curr, N);
                })
                // console.log({i, sum});
                distsPerN.push(sum);
            }
            // console.log({distsPerN});
        } else {
            for (let i = min; i <= max; i++) {
                let sum = 0;
                arr.forEach((curr, index) => {
                    sum += dist(i, curr, N);
                })
                // console.log({i, sum});
                distsPerN.push(sum);
            }
        }
    } else {
        min = arr[0] - Math.floor(N/2);
        max = arr[0];
        arr.reduce((val) => ((val <= N && val >= max) || (val <= min)) ? right++ : 0);
        arr.reduce((val) => (val <= max && val >= min) ? left++ : 0);
        if (left >= right) {
            for (let i = min; i <= max; i++) {
                let sum = 0;
                arr.forEach((curr, index) => {
                    sum += dist(i, curr, N);
                })
                // console.log({i, sum});
                distsPerN.push(sum);
            }
        } else {
            for (let i = max; i <= N; i++) {
                // console.log({distsPerN});
                let sum = 0;
                arr.forEach((curr, index) => {
                    sum += dist(i, curr, N);
                })
                // console.log({i, sum});
                distsPerN.push(sum);
            }
            for (let i = 1; i <= min; i++) {
                let sum = 0;
                arr.forEach((curr, index) => {
                    sum += dist(i, curr, N);
                })
                // console.log({i, sum});
                distsPerN.push(sum);
            }
            // console.log({distsPerN});
        }

    }


    return Math.min(...distsPerN);
}


function dist(a: number, b: number, N: number) {
    if (Math.abs( a - b) > N/2) {
        //go wrong way
        let max = Math.max(a, b);
        let min = Math.min(a, b);
        return (min + (N - max));
    } else {
        return Math.abs( a - b);
    }
}

function nBetween(a: number, N: number, arr: number[]) {
    let left = 0, right = 0;
    let max, min;
    if (a <= Math.floor(N/2)) {
        max = a + Math.floor(N/2);
        min = a;
    } else {
        min = a - Math.floor(N/2);
        max = a;
    }
    arr.reduce((val) => ((val <= N && val >= max) || (val <= min)) ? left++ : 0);
    arr.reduce((val) => (val <= max && val >= min) ? right++ : 0);
    console.log({left, right})

    return left >= right ? 'left': 'right';
}
