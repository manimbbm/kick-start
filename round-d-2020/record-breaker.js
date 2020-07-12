var fs = require('fs');
// const input = fs.readFileSync('./record-test.txt', 'utf-8').trim().split('\n');
var input = fs.readFileSync(0, 'utf-8').trim().split('\n');
var line = 0;
function readline() {
    return input[line++];
}
var t = readline();
for (var i = 1; i <= t; i++) {
    var N = readline();
    var V = readline().split(" ").map(function (x) { return +x; });
    console.log("Case #" + i + ": " + record_breaker(V));
}
function record_breaker(visitors) {
    var max = 0;
    var r_breaker = 0;
    for (var i = 0; i < visitors.length; i++) {
        if (visitors[i] > max) {
            max = visitors[i];
            if (visitors[i + 1] === 'undefined' || visitors[i] > visitors[i + 1]) {
                r_breaker++;
            }
        }
    }
    return r_breaker;
}
