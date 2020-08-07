var fs = require('fs');
// const input = fs.readFileSync('./perfect-array-test.txt', 'utf-8').trim().split('\n');
var input = fs.readFileSync(0, 'utf-8').trim().split('\n');
var line = 0;
function readline() {
    return input[line++];
}
var t = readline();
for (var i = 1; i <= t; i++) {
    var N = readline();
    var arr = readline().split(" ").map(function (x) { return +x; });
    console.log("Case #" + i + ": " + perfectArray(arr));
}
function perfectArray(arr) {
    var subArrays = contiguousSubArrays(arr);
    // console.log('subArrays before', subArrays);
    var ans = 0;
    subArrays.map(function (cur) {
        if (Math.sqrt(cur.reduce(function (a, b) { return a + b; }, 0)) % 1 == 0) {
            ans++;
        }
    });
    // console.log('ans', ans);
    return ans;
}
function contiguousSubArrays(arr) {
    var subArrays = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j <= arr.length; j++) {
            //maybe try doing the check here 
            subArrays.push(arr.slice(i, j));
        }
    }
    // console.log('[1].slice(0, 0)', [1].slice(0, 0));
    // console.log('[1].slice(0)', [1].slice(0));
    // console.log('[1].slice(0, 1)', [1].slice(0, 1));
    // console.log('subArrays', subArrays);
    return subArrays;
}
