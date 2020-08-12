var fs = require('fs');
var input = fs.readFileSync('./perfect-array-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
var line = 0;
function readline() {
    return input[line++];
}
var t = readline();
var squares_1000 = allSquaresBellowN(1000);
var squares_105 = allSquaresBellowN(Math.pow(10, 5));
for (var i = 1; i <= t; i++) {
    var N = readline();
    var arr = readline().split(" ").map(function (x) { return +x; });
    console.log("Case #" + i + ": " + perfectArray(arr, N));
}
function perfectArray(arr, N) {
    var perfectSquares;
    if (N > 1000) {
        perfectSquares = squares_105;
    }
    else {
        perfectSquares = squares_1000;
    }
    var ans = 0;
    // console.log("N", N);
    // console.log("perfectSquares", perfectSquares);
    //contiguous sub arrays
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j <= arr.length; j++) {
            //optimizing by checking a list with all perfect squares possible
            if (perfectSquares.includes(arr.slice(i, j).reduce(function (a, b) { return a + b; }, 0))) {
                // console.log('arr.slice(i, j).reduce((a, b) => a + b, 0)', arr.slice(i, j).reduce((a, b) => a + b, 0));
                ans++;
            }
        }
    }
    return ans;
}
function allSquaresBellowN(N) {
    var max = 100 * N, i = 1;
    var squares = [0];
    var result = 1;
    while (result < max) {
        squares.push(result);
        i++;
        result = i * i;
    }
    return squares;
}
function printNumbers(N) {
    var i = 1;
    var numbers = [+(Math.random() * 100).toFixed()];
    while (i < N) {
        numbers.push(+(Math.random() * 100).toFixed());
        i++;
    }
    console.dir(numbers, { 'maxArrayLength': N });
}
printNumbers(1000);
