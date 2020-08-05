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
    console.time('stable wall');
    let edges = [];
    let nodes = {
        ids: [],
        roots: [],
        nonRoots: [],
    };
    for (let i = 0; i < arr.length - 1; i++) {
        let top_row = arr[i].toString();
        let bottom_row = arr[i + 1].toString();
        for (let j = 0; j < top_row.length; j++) {
            let top_letter = top_row.substring(j, j + 1);
            let bottom_letter = bottom_row.substring(j, j + 1);
            // console.log('top_letter', top_letter);
            // console.log('bottom_letter', bottom_letter);
            if (top_letter !== bottom_letter && edges.indexOf(top_letter + bottom_letter) == -1) {
                edges.push(top_letter + bottom_letter);
                addToNodes(top_letter, nodes, false);
                addToNodes(bottom_letter, nodes);
            }
        }
    }
    console.log('edges', edges);
    // check if root: the letter without parent, or the one that only comes up on the right of an edge √
    roots(nodes);
    // navigate from each node to the others starting from root node(s)
    let ans: string = nodes.roots.length > 0 ? nodes.roots.toString() : "-1";
    nodes.roots.forEach((root) => {
        // print their children and so on and so forth
        // right of an edge is at the bottom of a wall
        let edges_to_visit: string[] = edges.filter(edge => edge.substring(1, 2) === root);
        while (edges_to_visit.length > 0) {
            for (let i = 0; i < edges_to_visit.length; i++) {
                // a letter can only be added if all its parents were added already
                // OR Inverted logic: if they dont have any children left to add
                let child = edges_to_visit[i].substring(0, 1);
                if (ans.includes(child)) {
                    console.log('child', child);
                    console.log('ans', ans);
                    // how to check if there is a cycle?
                    // missing topological order
                    ans = "-1";
                    return;
                }
                ans += child;
                edges_to_visit.push(...edges.filter(edge => edge.substring(1, 2) === child));
                edges_to_visit.splice(i, 1);
            }
        }
    });
    console.timeEnd('stable wall');
    return ans;
}

let addToAns = (node: string, ans: string, nodes): void => {
    // start adding from the bottom up on the tree (
    if (isRoot(node, nodes)) {
        ans += node;
        return;
    }


}

let isRoot = (node: string, nodes: { roots: string[] }): boolean => {
    return nodes.roots.indexOf(node) !== -1;
}

let addToNodes = (node, nodes, isRoot?: boolean): void => {
    if (nodes.ids.indexOf(node) == -1) {
        nodes.ids.push(node);
    }
    if (isRoot !== undefined && !isRoot && nodes.nonRoots.indexOf(node) == -1) {
        nodes.nonRoots.push(node);
    }
}

let roots = (nodes): void => {
    nodes.roots = nodes.ids.slice();
    nodes.nonRoots.forEach((node) => {
        nodes.roots.splice(nodes.roots.indexOf(node), 1);
    })
}

