const fs = require('fs');

const input = fs.readFileSync('./test-candies.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
    return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
    let [N, Q] = readline().split(" ").map(x => +x);
    let A: number[] = new Array<number>(N);
    A = readline().split(" ").map(x => +x);
    let ops: any[][] = [];
    for (let j = 0; j < Q; j++) {
        ops.push(readline().split(" "));
        // console.log(ops);
    }
    console.log(`Case #${i}: ${main(A, ops)}`)
}

function main(A: number[], ops: any[]) {
    let ans = 0;
    for (let i = 0; i < ops.length; i++) {
        if (ops[i][0].toString() === "U") {
            // console.log(`update ${ops[i][0]}`);
            let pos = ops[i][1] - 1;
            // console.log(`A before ${A}`);
            A[pos] = +ops[i][2];
            // console.log(`A[pos] ${A[pos]}`);
            // console.log(`A after ${A}`);
        } else if (ops[i][0].toString() === "Q"){
            // console.log(`query ${ops[i][0]}`);
            ans += query(ops[i][1], ops[i][2], A);
        }
    }
    return ans;
}

function query(L: number, R: number, A: number[]): number {
    let res = 0;
    let j = 0;
    // console.log(A);
    for (let i = L - 1; i < R; i++, j++) {
        res += (Math.pow(-1, j)) * (i - (L - 2)) * A[i];
        // console.log(`j ${j}`);
        // console.log(`(i - (L - 2)) ${(i - (L - 2))}`);
        // console.log(`Math.pow(-1, j) ${Math.pow(-1, j)}`);
        // console.log(`res ${res}`);
    }
    return res;
}
