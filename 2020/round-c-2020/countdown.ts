const fs = require('fs');

// const input = fs.readFileSync('./countdown-test.txt', 'utf-8').trim().split('\n');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

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

function countdown(K, arr) {
    let k_contdowns = 0;
    let decreasing_counter = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] == arr[i-1] - 1) {
            decreasing_counter++;
        } else {
            decreasing_counter = 0;
        }
        if (arr[i] == 1 && decreasing_counter >= K-1) {
            k_contdowns++;
        }
        // dont understand why the approach bellow is Wrong Answer. Should have the same O(N) as the one above...
        // if (arr[i] === K) {
        //     let checker = K;
        //     let j = i;
        //     for (j; j < i + K; j++) {
        //         if (arr[j] !== checker--) {
        //             break;
        //         }
        //     }
        //     if (j == i + K) {
        //         k_contdowns++;
        //     }
        //     if (typeof arr[j] !== 'undefined' && arr[j] !== '') {
        //         i = j;
        //     }
        // }
    }
    return k_contdowns;
}
