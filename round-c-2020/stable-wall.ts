import {createBinary, forEachChild} from "typescript";

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
    let nodes = {
        ids: [],
        roots: [],
        nonRoots: [],
    };
    for (let i = 0; i < arr.length - 1; i++) {
        let top_row = arr[i].toString();
        let bottom_row = arr[i + 1].toString();
        for (let j = 0; j < top_row.length - 1; j++) {
            let top_letter = top_row.substring(j, j + 1);
            let bottom_letter = bottom_row.substring(j, j + 1);
            if (top_letter !== bottom_letter && edges.indexOf(top_letter + bottom_letter) == -1) {
                edges.push(top_letter + bottom_letter);
                // get the nodes √
                addToNodes(top_letter, nodes, false);
                addToNodes(bottom_letter, nodes);
            }
            console.log('edges', edges);
        }
    }
    // check if root: the letter without parent, or the one that only comes up on the right of an edge √
    roots(nodes);
    // navigate from each node to the others starting from root node(s)
    console.log('nodes', nodes);

    nodes.roots.forEach(function(root) {
        console.log('root', root);
        let visited: any[] = [];
        let current = root;
        let longest_branch: string = root;
        console.log('longest', longest_branch);
        while (visited.length <= nodes.nonRoots.length) {

            //improve with binary search
            let elm = edges.find(e => e.substring(1,2) == current);
            while ( visited.includes(elm.substring(0,1)) && )
            for (let i = 0; i < edges.length; i++) {
                if (edges[i].substring(1,2) == current) {
                    // continue (maybe try some drawing for this)
                    current = edges[i].substring(0,1);
                    longest_branch = longest_branch.concat(current);
                    console.log('longest', longest_branch);
                }
            }

            visited.push(current);
            nodes.nonRoots.forEach(function (nonRoot) {
                current = visited.includes(nonRoot) ? current : nonRoot;
            });
            console.log('visited', visited);
            console.log('current', current);
        }
    });
    return;
}

function addToNodes(node, nodes, isRoot?: boolean) {
    if (nodes.ids.indexOf(node) == -1) {
        nodes.ids.push(node);
    }
    if (isRoot !== undefined && !isRoot && nodes.nonRoots.indexOf(node) == -1) {
        nodes.nonRoots.push(node);
    }
}

function roots(nodes) {
    nodes.roots = nodes.ids.slice();
    nodes.nonRoots.forEach((node) => {
        nodes.roots.splice(nodes.roots.indexOf(node), 1);
    })
}

