const fs = require('fs');

const input = fs.readFileSync('./record-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0
function readline(){
    return input[line++];
}

let t = readline();
for (let i = 1; i <= t; i++) {
    let N = readline();
    let V = readline().split(" ").map(x => +x);
    console.log(`Case #${i}: ${record_breaker(V)}`)
}

function record_breaker(visitors) {
    let max = 0;
    let r_breaker = 0;
    for (let i = 0; i < visitors.length; i++) {
        if (visitors[i] > max) {
            max = visitors[i];
            if (visitors[i] > visitors[i+1] || visitors[i+1] === undefined) {
                r_breaker++;
            }
        }
    }
    return r_breaker;
}
