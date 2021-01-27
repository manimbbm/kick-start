const fs = require('fs');

const input = fs.readFileSync('./toys-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
    return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
    let N = readline();
    let arr = [];
    for (let j = 0; j < N; j++) {
        // arr[0][0] = E0 and arr[0][1] = R0
        arr.push(readline().split(" ").map(x => +x));
    }
    console.log(`Case #${i}: ${main(N, arr)}`)
}

function main(N, arr) {
    // arr.sort((a, b) => (b[0] + b[1]) - (a[0] + a[1]));

    let remToys: [][] = [],
        maxTime: string | number,
        toysCanReplay: [][] = [],
        sum = arr.length > 1 ? arr.reduce(function(a, b){ return [a[0] + b[0], 0] })[0] : arr[0][0],
        currTime: string | number = sum,
        nonRemovedToys = arr.slice(0);

    //round 2
    arr.forEach((toy, index) => {
        let e = toy[0];
        let r = toy[1];
        console.log({
            toy,
            sum
        })
        if (e + r <= sum) {
            toysCanReplay.push(toy);
            currTime += e;
        } else {
            // console.log({toy, index, arr});
            remToys.splice(remToys.length - 1, 0, ...nonRemovedToys.splice(index, 1));
            console.log({arr, remToys, length: arr.length});
            if (nonRemovedToys.length) {
                sum = nonRemovedToys.length > 1 ? nonRemovedToys.reduce(function(a, b){ return [a[0] + b[0], 0] })[0] : nonRemovedToys[0][0];
            } else {
                sum = 0;
            }
        }
    });
    console.log({canReplay: toysCanReplay.length})

    if (toysCanReplay.length > 1) {
        maxTime = "INDEFINITELY";
    } else {
        maxTime = currTime;
    }

    return `${remToys.length} ${maxTime}`;
}

