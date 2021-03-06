const fs = require('fs');

const input = fs.readFileSync('./comb-lock-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

// debugging notes. test case: 1 2 3 12 28 29 78 195 273 340 348 373 463 501 550 659 777
// 1. if 550 is removed from the test case above then the final results match, but some intermediate sums are wrong
// 2. val 78 index 6 is the first with wrong result.
// 3. Reduced test case to 1 78 550 777 and sum at 78 stage is wrong
// - Had wrong conditions to update left/right arrays. One for each half



let line = 0;
function readline(){
    return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
    let [W, N] = readline().split(' ').map(x => +x);
    let arr = readline().split(' ').map(x => +x);
    console.time('main_WxW');
    console.log(`Case #${i}: ${main_WxW(arr, W, N)}`);
    console.timeEnd('main_WxW');

    console.time('main_WxlogW');
    console.log(`Case #${i}: ${main_WxlogW(arr, W, N)}`);
    console.timeEnd('main_WxlogW');
    console.log(`\n`);
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
    let distsPerW: number[] = [];

    arr.forEach((curr, index) => {
        let sum = 0;
        arr.forEach((curr2, index) => {
            sum += dist(curr, curr2, N);
        });
        // console.log({
        //     currSum: sum,
        //     minSum: Math.min(...distsPerN),
        //     currValue: curr,
        //     index
        // });
        distsPerW.push(sum);
    })
    // console.log({i, sum});
    console.dir(distsPerW, {'maxArrayLength': W});
    return Math.min(...distsPerW);
}

interface Wheel {
    val: number, index: number
}

function main_WxlogW(arr, W, N) {
    //optimal, update curr sums for each given wheel value using a presum O(WxlogW)
    arr.sort((a, b) => a - b);
    let currSum: number = 0;
    let goToRight_WrongWay: Wheel[] = [], goToLeft_WrongWay: Wheel[] = [], goToLeft: Wheel[] = [], goToRight: Wheel[] = [];
    let preSum: number[] = [];

    let currPreSum = 0;
    arr.forEach((currWheel, index) => {
        if (index !== 0) {
            let dist;
            if (arr[0] - currWheel > 0) {
                if ( arr[0] - currWheel > N/2) {
                    dist = currWheel + (N - arr[0]);
                    goToRight_WrongWay.push({val: currWheel, index});
                } else {
                    dist = arr[0] - currWheel;
                    goToLeft.push({val: currWheel, index});
                }
            } else {
                if (currWheel - arr[0] > N/2) {
                    dist = (arr[0] + (N - currWheel));
                    goToRight_WrongWay.push({val: currWheel, index});
                } else {
                    dist = currWheel - arr[0];
                    goToLeft.push({val: currWheel, index});
                }
            }
            currSum += dist;
        }
        currPreSum += currWheel;
        preSum.push(currPreSum);
    });

    let optSum: number = currSum;
    let allSums = [];
    for (let i = 0; i < arr.length; i++) {
        // console.log({
        //     sumBefore: currSum,
        //     currValue: arr[i],
        //     goToLeft,
        //     goToRight,
        //     goToRight_WrongWay,
        //     goToLeft_WrongWay,
        //     preSum,
        //     arr,
        //     rightGetSum: getSum(0, i - 1, preSum),
        //     leftGetSum: getSum(i + 1, goToRight.length + goToLeft.length, preSum),
        //     wrightGetSum: getSum(goToRight.length + goToLeft.length + 1, arr.length - 1, preSum)
        // });
        if (arr[i] <= Math.round(N/2)) {
            let right = arr[i]*goToRight.length - getSum(0, i - 1, preSum);
            let left = - arr[i]*goToLeft.length + getSum(i + 1, goToRight.length + goToLeft.length, preSum);
            let Wright = (arr[i] + N)*(goToRight_WrongWay.length) - getSum(goToRight.length + goToLeft.length + 1, arr.length - 1, preSum);
            currSum = right + left + Wright;

            if (arr[i + 1] <= Math.round(N/2)) {
                goToRight.push({val: arr[i], index: i});
                goToLeft.splice(0, 1);

                while (goToRight_WrongWay[0] && arr[i + 1] + N/2 >= goToRight_WrongWay[0].val) {
                    goToLeft.push(goToRight_WrongWay[0]);
                    goToRight_WrongWay.splice(0, 1);
                }
            } else {
                if (goToRight_WrongWay[0] && arr[i + 1] === goToRight_WrongWay[0].val) {
                    goToRight_WrongWay.splice(0, 1);
                }
                goToLeft = goToRight_WrongWay;
                goToRight_WrongWay = [];

                while (goToRight[0] && arr[i + 1] - N/2 > goToRight[0].val) {
                    goToLeft_WrongWay.push(goToRight[0]);
                    goToRight.splice(0, 1);
                }

                if(arr[i + 1] && arr[i + 1] - N/2 > arr[i]) {
                    goToLeft_WrongWay.push({ val: arr[i], index: i });
                } else {
                    goToRight.push({ val: arr[i], index: i });
                }
            }
            // console.log({
            //     right,
            //     left,
            //     Wright,
            //     currSum,
            //     optSum
            // })
        } else {
            let left = - arr[i]*goToLeft.length + getSum(i + 1,arr.length - 1, preSum);
            let right = arr[i]*goToRight.length - getSum(goToLeft_WrongWay.length, i - 1, preSum);
            let Wleft = (N - arr[i])*(goToLeft_WrongWay.length) + getSum(0, goToLeft_WrongWay.length - 1, preSum);
            currSum = right + left + Wleft;

            goToLeft.splice(0, 1);

            while (goToRight[0] && arr[i + 1] - N/2 > goToRight[0].val) {
                goToLeft_WrongWay.push(goToRight[0]);
                goToRight.splice(0, 1);
            }

            goToRight.push({ val: arr[i], index: i });

            // console.log({
            //     right,
            //     left,
            //     Wleft,
            //     currSum,
            //     optSum,
            // })
        }
        // console.log({
        //     currSum: currSum,
        //     currValue: arr[i],
        //     i
        // });
        allSums.push(currSum);
        if (currSum < optSum) optSum = currSum;
    }
    //todo intermediate values dont match on multiple test cases :( investigate
    console.dir(allSums, {'maxArrayLength': W});
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
    if (i > j || j < 0) {
        return 0;
    } else if (i === 0) {
        return preSum[j];
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
    // console.log({left, right})

    return left >= right ? 'left': 'right';
}
