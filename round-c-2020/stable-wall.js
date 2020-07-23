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
        nonRoots: []
    };
    for (var i = 0; i < arr.length - 1; i++) {
        var top_row = arr[i].toString();
        var bottom_row = arr[i + 1].toString();
        for (var j = 0; j < top_row.length - 1; j++) {
            var top_letter = top_row.substring(j, j + 1);
            var bottom_letter = bottom_row.substring(j, j + 1);
            if (top_letter !== bottom_letter && edges.indexOf(top_letter + bottom_letter) == -1) {
                edges.push(top_letter + bottom_letter);
                // get the nodes √
                addToNodes(top_letter, nodes, false);
                addToNodes(bottom_letter, nodes);
            }
            // console.log('edges', edges);
        }
    }
    // check if root: the letter without parent, or the one that only comes up on the right of an edge √
    roots(nodes);
    // navigate from each node to the others starting from root node(s)
    // console.log('nodes', nodes);
    var ans = nodes.roots.length > 0 ? nodes.roots.toString() : "-1";
    nodes.roots.forEach(function (root) {
        // console.log('root', root);
        // console.log('ans', ans);
        // print their children and so on and so forth
        // right of an edge is at the bottom of a wall
        var current = root;
        var children = edges.filter(function (edge) { return edge.substring(1, 2) === current; });
        while (children.length > 0) {
            var _loop_1 = function (i) {
                var child = children[i];
                // console.log('child', child);
                if (ans.includes(child.substring(0, 1))) {
                    // console.log('contains cycle');
                    //contains cycle
                    ans = "-1";
                    return { value: void 0 };
                }
                ans += child.substring(0, 1);
                children.push.apply(children, edges.filter(function (edge) { return edge.substring(1, 2) === child.substring(0, 1); }));
                // console.log('edges.filter(edge => edge.substring(1, 2) === child)', edges.filter(edge => edge.substring(1, 2) === child.substring(0, 1)));
                children.splice(i, 1);
            };
            for (var i = 0; i < children.length; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
    //** appears to be taking more than 20 secs... try to optimize
    });
    return ans;
}
function addToNodes(node, nodes, isRoot) {
    if (nodes.ids.indexOf(node) == -1) {
        nodes.ids.push(node);
    }
    if (isRoot !== undefined && !isRoot && nodes.nonRoots.indexOf(node) == -1) {
        nodes.nonRoots.push(node);
    }
}
function roots(nodes) {
    nodes.roots = nodes.ids.slice();
    nodes.nonRoots.forEach(function (node) {
        nodes.roots.splice(nodes.roots.indexOf(node), 1);
    });
}
