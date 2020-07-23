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
    }
    console.log(`Case #${i}: ${stable_wall(arr)}`)
}

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
                addToNodes(top_letter, nodes, false);
                addToNodes(bottom_letter, nodes);
            }
        }
    }
    // check if root: the letter without parent, or the one that only comes up on the right of an edge √
    roots(nodes);
    // navigate from each node to the others starting from root node(s)
    let ans: string = nodes.roots.length > 0 ? nodes.roots.toString() : "-1";
    nodes.roots.forEach((root) => {
        // print their children and so on and so forth
        // right of an edge is at the bottom of a wall
        let current = root;
        let children: string[] = edges.filter(edge => edge.substring(1, 2) === current);
        while (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if (ans.includes(child.substring(0, 1))) {
                    ans = "-1";
                    return;
                }
                ans += child.substring(0, 1);
                children.push(...edges.filter(edge => edge.substring(1, 2) === child.substring(0, 1)));
                children.splice(i, 1);
            }
        }
    });
    // CONTINUE appears to be taking more than 20 seconds
    return ans;
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

