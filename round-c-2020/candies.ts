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
    console.log(`input N ${N}`)
    console.log(`input Q ${Q}`)
    let A: number[] = new Array<number>(N);
    A = readline().split(" ").map(x => +x);
    console.log(`input A ${A}`)
    let ops: any[][] = [];
    for (let j = 0; j < Q; j++) {
        //adjust input to have array of arrays
        ops.push(readline().split(" "));
        console.log(`input ops ${ops}`)
    }
    console.log(`Case #${i}: ${main(A, ops)}`)
}

function main(A: number[], ops: any[]) {
    let ans = 0;
    for (let i = 0; i < ops.length; i++) {
        if (ops[i][0].toString() === "U") {
            console.log(`update ${ops[i][0]}`);
        } else if (ops[i][0].toString() === "Q"){
            console.log(`query ${ops[i][0]}`);
        }
        console.log(`op opsi0 ${ops[i][0]}`);
        console.log(`op opsi ${ops[i]}`);
        console.log(`op ops ${ops}\n`);
    }
    return ans;
}

function update(X: number, V: number) {

}

function query(L: number, R: number) {

}
