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
    let nodes = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let top_row
            = arr[i].toString();
        let bottom_row = arr[i + 1].toString();
        for (let j = 0; j < top_row.length - 1; j++) {
            let top_letter = top_row.substring(j, j + 1);
            let bottom_letter = bottom_row.substring(j, j + 1);
            if (top_letter !== bottom_letter && edges.indexOf(top_letter + bottom_letter) == -1) {
                edges.push(top_letter + bottom_letter);
                addToNodes(bottom_letter, nodes);
                addToNodes(top_letter, nodes);
            }
            console.log('edges', edges);
        }
        console.log('nodes', nodes);
        // get the nodes √
        // navigate from each to the others
        // start from root node(s) (there could be more than one). The root is the letter without parent, or the one that only comes up on the right of an edge
    }
    return 1;
}

function addToNodes(node, nodes) {
    if (nodes.indexOf(node) == -1) {
        nodes.push(node);
    }
}

