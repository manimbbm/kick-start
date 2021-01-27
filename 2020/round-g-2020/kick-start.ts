const fs = require('fs');

const input = fs.readFileSync('./test-kick-start.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
    return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
    let S = readline().split('\n')[0];
    console.log(`Case #${i}: ${main(S)}`)
}

function main(S: string) {
    console.log({S, s: S.indexOf('KICK'), find: S.includes('START')});
    let pos = S.indexOf('KICK');
    let kickIndexes = findAll(S, 'KICK');
    let startIndexes = findAll(S, 'START');
    let res = 0;
    kickIndexes.forEach((k) => {
        res += startIndexes.filter(s => s > k).length
    })
    return res;
}

function findAll(S: string, subString: string): number[] {
    let pos = S.indexOf(subString);
    let indexes: number[] = [];
    while (pos !== -1) {
        indexes.push(pos);
        pos = S.indexOf(subString, pos + 1);
    }
    return indexes;
}

