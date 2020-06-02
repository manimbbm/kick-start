const fs = require('fs');

const input = fs.readFileSync('./stable-wall-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0
function readline(){
    return input[line++];
}

let t = readline();
for (let i = 1; i <= t; i++) {
    let [R, C] = readline().split(" ").map(x => +x);

    let arr = [];
    for (let j = 0; j < R; j++) {
        arr.push(readline().split('\n'));
        console.log(arr);
    }
    console.log(`Case #${i}: ${stable_wall(arr)}`)
}

// idea: check adjacent lines the dependency relationship
// ZOAAMM {0, 1} = ZZ, OO, AA, AO, MM -> AO
// ZOAOMM {1, 2} = ZZ, OO, AO,  MO, MM -> AO, MO
// ZOOOOM {2, 3} = ZZ, OZ, OO, MM -> OZ
// ZZZZOM
// then I have to build a tree (make sure there are no cycles)

function stable_wall(arr) {
    let edges = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let bottom_row = arr[i].toString();
        let top_row = arr[i + 1].toString();
        for (let j = 0; j < bottom_row.length - 1; j++) {
            if (bottom_row.substring(j, j + 1) !== top_row.substring(j, j + 1) && edges.indexOf(bottom_row.substring(j, j + 1) + top_row.substring(j, j + 1)) == -1) {
                edges.push(bottom_row.substring(j, j + 1) + top_row.substring(j, j + 1));
            }
            console.log(edges);
        }

    }
    return 1;
}
