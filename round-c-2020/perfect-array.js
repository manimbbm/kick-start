var fs = require('fs');
var input = fs.readFileSync('./perfect-array-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
var line = 0;
function readline() {
    return input[line++];
}
var t = readline();
// let squares_1e3 = allSquaresBellowN(1e3);
var squares_1e5 = allSquaresBellowN(1e5 * 100);
console.time("total");
for (var i = 1; i <= t; i++) {
    var N = readline();
    var a = readline().split(" ").map(function (x) { return +x; });
    // console.time(`perfectArray iteration ${i}`);
    // console.log(`Case #${i}: ${perfectArray(arr, N)}`);
    // console.timeEnd(`perfectArray iteration ${i}`);
    // runs in half the time...
    // why?
    // Math.sqrt not as expensive as a .includes
    // console.time(`perfectArraySqrtVersion( iteration ${i}`);
    // console.log(`Case #${i}: ${perfectArraySqrtVersion(a)}`);
    // console.timeEnd(`perfectArraySqrtVersion( iteration ${i}`);
    // console.time(`perfectArray_TestSet2( iteration ${i}`);
    console.log("Case #" + i + ": " + perfectArray_TestSet2(a, N));
    // console.timeEnd(`perfectArray_TestSet2( iteration ${i}`);
}
console.timeEnd("total");
function perfectArray(arr, N) {
    var perfectSquares = squares_1e5;
    var ans = 0;
    // console.log("N", N);
    // console.log("perfectSquares", perfectSquares);
    //contiguous sub arrays
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j <= arr.length; j++) {
            //optimizing by checking a list with all perfect squares possible? Edit: turned out to double the time. Why?
            if (perfectSquares.includes(arr.slice(i, j).reduce(function (a, b) { return a + b; }, 0))) {
                // console.log('arr.slice(i, j).reduce((a, b) => a + b, 0)', arr.slice(i, j).reduce((a, b) => a + b, 0));
                ans++;
            }
        }
    }
    return ans;
}
function perfectArraySqrtVersion(a) {
    var ans = 0;
    var sum = 0;
    //contiguous sub arrays
    for (var i = 0; i < a.length; i++) {
        sum = a[i];
        if (Math.sqrt(sum) % 1 == 0) {
            ans++;
        }
        for (var j = i + 1; j < a.length; j++) {
            sum += a[j];
            if (Math.sqrt(sum) % 1 == 0) {
                ans++;
            }
            // if (Math.sqrt(arr.slice(i, j).reduce((a, b) => a + b, 0)) % 1 == 0) {
            // 	// console.log('arr.slice(i, j).reduce((a, b) => a + b, 0)', arr.slice(i, j).reduce((a, b) => a + b, 0));
            // 	ans++;
            // }
        }
    }
    return ans;
}
function perfectArray_TestSet2(a, n) {
    var sum = 0;
    for (var i = 0; i < n; i++) {
        sum += Math.abs(a[i]);
    }
    var cnt = new Array(2 * sum + 1).fill(0);
    cnt[sum]++;
    var pref = 0;
    var ans = 0;
    for (var i = 0; i < n; i++) {
        pref += a[i];
        for (var j = 0; j * j <= sum + pref; j++) {
            ans += cnt[sum + pref - j * j];
        }
        cnt[sum + pref]++;
    }
    return ans;
}
function allSquaresBellowN(N) {
    var max = N, i = 1;
    var squares = [0];
    var result = 1;
    while (result < max) {
        squares.push(result);
        i++;
        result = i * i;
    }
    return squares;
}
