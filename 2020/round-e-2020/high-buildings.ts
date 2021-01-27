import assert = require("assert");

const fs = require('fs');

const input = fs.readFileSync('./high-buildings-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
function readline(){
    return input[line++];
}

let t = readline();

for (let i = 1; i <= t; i++) {
    let [n, a, b, c] = readline().split(" ").map(x => +x);
    // // console.time(`case ${i}`);
    assert(1 <= c && c <= n);
    assert(c <= a && a <= n);
    assert(c <= b && b <= n);
    console.log(`Case #${i}: ${highBuildings(n, a, b, c)}`)
    // // console.timeEnd(`case ${i}`);
}

function highBuildingsGreedy(n, a, b, c) {
    let ans = 'IMPOSSIBLE';
    // let p: number[][] = kPermute(n);
    // kPermute
    // let arr = [];
    let max = +(new Array<string>(n).fill(n).join(''));
    let start = +(new Array(n).fill(1).join(''));
    for (let i = start; i <= max; i++) {
        let v = i.toString();
        let skip = false;
        v.split('').forEach(v => {
            if (v > n || v === '0') {
                skip = true;
                return;
            }
        })
        if (!skip) {
            // arr.push(v.split('').map(x => +x ));
            // terrible solution, for each of the possible permutations I'd have to calc the visible left and visible right and check if their merge is the same
            let p = v.split('').map(x => +x );
            let p_a: number[] = visibleLeft(p); //array of the position where visible
            let p_b: number[] = visibleRight(p);
            // // console.log({p_a, p_b});
            let p_c = p_a.filter(value => p_b.includes(value));
            if (a === p_a.length && b === p_b.length && c === p_c.length) {
                // // console.log({p, a, b, c, p_a, p_b, p_c});

                ans = p.join(' ');
            }

        }
    }
    // // console.dir(p, {'maxArrayLength': Math.pow(n, n)});
    return ans;
}

function highBuildings(n, a, b, c) {
    if ((a + b - c) > n || (a + b - c === 1 && n >= 2)) {
        return 'IMPOSSIBLE';
    } else if (n === 1) {
        return '1';
    } else if (n === 2) {
        if (c === 2) {
            return '1 1';
        } else if (a === 2) {
            return '1 2';
        } else if (b === 2) {
            return '2 1';
        } else {
            assert(false);
        }
    } else {
        let pre_ans = [];
        for (let i = 0; i < a - c; i++) {
            pre_ans.push(2);
        }
        for (let i = 0; i < c; i++) {
            pre_ans.push(3);
        }
        for (let i = 0; i < b - c; i++) {
            pre_ans.push(2);
        }
        let pre_ans_2 = [];
        let extras = n - (a + b - c);
        if (extras > 0) {
            // console.log({
            //     total: pre_ans,
            //     initial_slice: pre_ans.slice(0,1),
            //     final_slice: pre_ans.slice(1,pre_ans.length),
            // });
            pre_ans_2.push(+pre_ans.slice(0,1));
            for (let i = 0; i < extras; i++) {
                pre_ans_2.push(1);
            }
            pre_ans.forEach((v, index) => {
                // console.log({v, index, pre_ans_2, pre_ans});
                if (index > 0) {
                    pre_ans_2.push(v);
                }
            });
    }
        return pre_ans_2.length > 0 ? pre_ans_2.join(' ') : pre_ans.join(' ');
    }
}

function visibleLeft(arr: number[]) {
    let pos_visible = [];
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (max <= arr[i]) {
            pos_visible.push(i);
            max = arr[i];
        }
    }
    return pos_visible;
}

function visibleRight(arr: number[]) {
    let pos_visible = [];
    let max = arr[arr.length - 1];
    for (let i = arr.length - 1; i >= 0; i--) {
        if (max <= arr[i]) {
            pos_visible.push(i);
            max = arr[i];
        }
    }
    return pos_visible;
}

function kPermute(n) {
    let arr = [];
    let max = +(new Array<string>(n).fill(n).join(''));
    let start = +(new Array(n).fill(1).join(''));
    for (let i = start; i <= max; i++) {
        let v = i.toString();
        let skip = false;
        v.split('').forEach(v => {
            if (v > n || v === '0') {
                skip = true;
                return;
            }
        })
        if (!skip) {
            arr.push(v.split('').map(x => +x ));
        }
    }
    return arr;
}

function kPermuteWithReps(n) {
    'use strict';

    // GENERIC FUNCTIONS

    // replicateM n act performs the action n times, gathering the results.
    // replicateM :: (Applicative m) => Int -> m a -> m [a]
    const replicateM = (n, f) => {
        const loop = (x) => x <= 0 ? [
            []
        ] : liftA2(cons, f, loop(x - 1));
        return loop(n);
    };

    // Lift a binary function to actions.
    // liftA2 :: Applicative f => (a -> b -> c) -> f a -> f b -> f c
    const liftA2 = (f, a, b) =>
        listApply(a.map(curry(f)), b);

    // <*>
    // listApply :: [(a -> b)] -> [a] -> [b]
    const listApply = (fs, xs) =>
        [].concat.apply([], fs.map(f =>
            [].concat.apply([], xs.map(x => [f(x)]))));

    // curry :: ((a, b) -> c) -> a -> b -> c
    const curry = f => a => b => f(a, b);

    // cons :: a -> [a] -> [a]
    const cons = (x, xs) => [x].concat(xs);

    // TEST
    let arr = []
    for (let i = 1; i <= n; i ++) {
        arr.push(i);
    }
    return replicateM(n, arr);
    // -> [[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]]
}

