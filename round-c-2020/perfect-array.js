var fs = require('fs');
var input = fs.readFileSync('./perfect-array-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
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
    var ans = 0;
    //contiguous sub arrays
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j <= arr.length; j++) {
            if (Math.sqrt(arr.slice(i, j).reduce(function (a, b) { return a + b; }, 0)) % 1 == 0) {
                ans++;
            }
        }
    }
    console.log('ans', ans);
    return ans;
}
