const fs = require('fs');

const input = fs.readFileSync('./comb-lock-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
    return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
    let [W, N] = readline().split(' ').map(x => +x);
    let arr = readline().split(' ').map(x => +x);
    console.time('WxlogW');
    console.log(`Case #${i}: ${main_WxlogW(arr, W, N)}`);
    console.timeEnd('WxlogW');
}

function main_WxN(arr, W, N) {
    //greedy, get all sums for each number O(WxN)
    let distsPerN: number[] = [];

    for (let i = 1; i <= N; i++) {
        let sum = 0;
        arr.forEach((curr, index) => {
            sum += dist(i, curr, N);
        })
        // console.log({i, sum});
        distsPerN.push(sum);
    }

    return Math.min(...distsPerN);
}

function main_WxW(arr, W, N) {
    //greedy, get all sums for each given wheel value O(WxW)
    let distsPerN: number[] = [];

    arr.forEach((curr, index) => {
        let sum = 0;
        arr.forEach((curr2, index) => {
            sum += dist(curr, curr2, N);
        });
        distsPerN.push(sum);
    })
    // console.log({i, sum});

    return Math.min(...distsPerN);
}

function main_WxlogW(arr, W, N) {
    //optimal, update curr sums for each given wheel value O(WxW)
    arr.sort((a, b) => a - b);
    let currSum: number = 0;
    let goToRight_WrongWay: {}[] = [], goToLeft: {}[] = [], goToRight: {}[] = [];
    let preSum: number[] = [0];

    let currPreSum = 0;
    arr.forEach((currWheel, index) => {
        if (index !== 0) {
            let dist;
            if (arr[0] - currWheel > 0) {
                if ( arr[0] - currWheel > N/2) {
                    dist = currWheel + (N - arr[0]);
                    goToRight_WrongWay.push({currWheel, index});
                } else {
                    dist = arr[0] - currWheel;
                    goToLeft.push({currWheel, index});
                }
            } else {
                if (currWheel - arr[0] > N/2) {
                    dist = (arr[0] + (N - currWheel));
                    goToRight_WrongWay.push({currWheel, index});
                } else {
                    dist = currWheel - arr[0];
                    goToLeft.push({currWheel, index});
                }
            }
            currSum += dist;
        }
        currPreSum += currWheel;
        preSum.push(currPreSum);
    });

    let optSum: number = currSum;

    for (let i = 0; i < arr.length; i++) {
        console.log({
            currBefore: currSum,
            goToLeft,
            goToRight,
            goToRight_WrongWay,
            preSum,
            arr
        });

        if (arr[i] < N/2) {
            // todo formula still wrong :(
            currSum = arr[i]*goToRight.length - getSum(0, goToRight.length, preSum) +
                - arr[i]*goToLeft.length + getSum(goToRight.length + 1, goToRight.length + goToLeft.length, preSum) +
                (arr[i] + N)*(goToRight_WrongWay.length) - getSum(W + 1 - goToRight_WrongWay.length, W, preSum);

            goToRight.push({ currWheel: arr[i], index: i });
            goToLeft.splice(0, 1);

            while (arr[i + 1] + N/2 <= goToRight_WrongWay[0]) {
                goToLeft.push(goToRight_WrongWay[0]);
                goToRight_WrongWay.splice(0, 1);
            }

            // console.log({
            //     "right: arr[i]*goToRight.length - getSum(0, goToRight.length, preSum)": arr[i]*goToRight.length - getSum(0, goToRight.length, preSum),
            //     "left: - arr[i]*goToLeft.length + getSum(goToRight.length + 1, goToRight.length + goToLeft.length, preSum)": - arr[i]*goToLeft.length + getSum(goToRight.length + 1, goToRight.length + goToLeft.length, preSum),
            //     "Wright: (arr[i] + N)*(goToRight_WrongWay.length) - getSum(goToRight.length + goToLeft.length + 1, W, preSum)": (arr[i] + N)*(goToRight_WrongWay.length) - getSum(W + 1 - goToRight_WrongWay.length, W, preSum),
            //     currValue: arr[i],
            //     currSum,
            //     optSum
            // })
        }
        //todo continue else case
        let shift = arr[i] - arr[i-1];
        if (currSum < optSum) optSum = currSum;
    }

    // console.log({i, sum});

    return optSum;
}


function dist(a: number, b: number, N: number) {
    if (Math.abs( a - b) > N/2) {
        //go wrong way
        let max = Math.max(a, b);
        let min = Math.min(a, b);
        return (min + (N - max));
    } else {
        return Math.abs( a - b);
    }
}

function getSum(i: number, j: number, preSum: number[]) {
    // console.log('getSum');
    // console.log([
    //     {
    //         iminus: i - 1,
    //         preI: preSum[i - 1]
    //     },
    //     {
    //         i,
    //         preI: preSum[i]
    //     },
    //     {
    //         j,
    //         preJ: preSum[j]
    //     }]);
    if (i === 0) {
        return preSum[j];
    } else if (i === preSum.length) {
        return 0;
    }

    return preSum[j] - preSum[i-1];
}

function nBetween(a: number, N: number, arr: number[]) {
    let left = 0, right = 0;
    let max, min;
    if (a <= Math.floor(N/2)) {
        max = a + Math.floor(N/2);
        min = a;
    } else {
        min = a - Math.floor(N/2);
        max = a;
    }
    arr.reduce((val) => ((val <= N && val >= max) || (val <= min)) ? left++ : 0);
    arr.reduce((val) => (val <= max && val >= min) ? right++ : 0);
    console.log({left, right})

    return left >= right ? 'left': 'right';
}
