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
function stable_wall(arr) {
    console.time('stable wall');
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
                addToNodes(top_letter, nodes, false);
                addToNodes(bottom_letter, nodes);
            }
        }
    }
    console.log('edges', edges);
    // check if root: the letter without parent, or the one that only comes up on the right of an edge √
    roots(nodes);
    // navigate from each node to the others starting from root node(s)
    var ans = nodes.roots.length > 0 ? nodes.roots.toString() : "-1";
    nodes.roots.forEach(function (root) {
        // print their children and so on and so forth
        // right of an edge is at the bottom of a wall
        var edges_to_visit = edges.filter(function (edge) { return edge.substring(1, 2) === root; });
        while (edges_to_visit.length > 0) {
            var _loop_1 = function (i) {
                var child = edges_to_visit[i].substring(0, 1);
                if (ans.includes(child)) {
                    console.log('child', child);
                    console.log('ans', ans);
                    //wrong check
                    //how to check if there is a cycle
                    ans = "-1";
                    return { value: void 0 };
                }
                ans += child;
                edges_to_visit.push.apply(edges_to_visit, edges.filter(function (edge) { return edge.substring(1, 2) === child; }));
                edges_to_visit.splice(i, 1);
            };
            for (var i = 0; i < edges_to_visit.length; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
    });
    console.timeEnd('stable wall');
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
