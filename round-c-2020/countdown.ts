const fs = require('fs');

const input = fs.readFileSync('./test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0
function readline(){
    return input[line++];
}

let t = readline();
for (let i = 1; i <= t; i++) {
    let [N, K] = readline().split(" ").map(x => +x);
    let arr = readline().split(" ").map(x => +x);
    console.log(`Case #${i}: ${countdown(K, arr)}`)
}

function countdown(K, arr: []) {
    let k_arr = build_arr(K);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === K) {
            if (k_arr == arr.slice(i, i + K)) {

            }
        }
    }
}

function build_arr(K) {
    let arr: [number];
    for (let i = K; i > 0; i--) {
        arr.push(i);
    }
    return arr;
}
