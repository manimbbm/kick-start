const fs = require('fs');

const input = fs.readFileSync('./longest-arithmetic-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
    return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
    let N = readline().split("\n").map(x => +x);
    let arr = readline().split(" ").map(x => +x);
    console.log(`Case #${i}: ${main(arr)}`)
}

function main(arr) {
    let ans= 2, max = 2;
    for (let i = 2; i < arr.length; i++) {
        if (arr[i - 1] - arr[i - 2] === arr[i] - arr[i - 1]) {
            ans += 1;
        } else {
            ans = 2;
        }
        if (ans > max) {
            max = ans;
        }
        // console.log(`max ${max}`);
        // console.log(`ans ${ans}`);
    }
    return max;
}

