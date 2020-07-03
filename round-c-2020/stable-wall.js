var fs = require('fs');
var input = fs.readFileSync('./stable-wall-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
var line = 0;
function readline() {
    return input[line++];
}
var t = readline();
for (var i = 1; i <= t; i++) {
    var _a = readline().split(" ").map(function (x) { return +x; }), R = _a[0], C = _a[1];
    var arr = [];
    for (var j = 0; j < R; j++) {
        arr.push(readline().split('\n'));
        console.log(arr);
    }
    console.log("Case #" + i + ": " + stable_wall(arr));
}
// idea: check adjacent lines the dependency relationship
// ZOAAMM {0, 1} = ZZ, OO, AA, AO, MM -> AO
// ZOAOMM {1, 2} = ZZ, OO, AO,  MO, MM -> AO, MO
// ZOOOOM {2, 3} = ZZ, OZ, OO, MM -> OZ
// ZZZZOM
// then I have to build a tree (make sure there are no cycles)
function stable_wall(arr) {
    var edges = [];
    var nodes = {
        ids: [],
        roots: [],
        notRoots: []
    };
    for (var i = 0; i < arr.length - 1; i++) {
        var top_row = arr[i].toString();
        var bottom_row = arr[i + 1].toString();
        for (var j = 0; j < top_row.length - 1; j++) {
            var top_letter = top_row.substring(j, j + 1);
            var bottom_letter = bottom_row.substring(j, j + 1);
            if (top_letter !== bottom_letter && edges.indexOf(top_letter + bottom_letter) == -1) {
                edges.push(top_letter + bottom_letter);
                addToNodes(top_letter, nodes, false);
                addToNodes(bottom_letter, nodes);
            }
            console.log('edges', edges);
        }
        console.log('nodes', nodes);
        // get the nodes √
        // check if root: the letter without parent, or the one that only comes up on the right of an edge
        // navigate from each to the others starting from root node(s)
    }
    roots(nodes);
    return 1;
}
function addToNodes(node, nodes, isRoot) {
    if (nodes.ids.indexOf(node) == -1) {
        nodes.ids.push(node);
    }
    if (isRoot !== undefined && !isRoot && nodes.notRoots.indexOf(node) == -1) {
        nodes.notRoots.push(node);
    }
}
function roots(nodes) {
    nodes.roots.push(nodes.ids);
    nodes.notRoots.forEach(function (node) {
        delete nodes.roots[nodes.roots.indexOf(node)];
    });
}
