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
    console.log(`Case #${i}: ${main(n, a, b, c)}`)
}

function main(n, a, b, c) {
    let ans = "IMPOSSIBLE";
    let p: number[][] = kPermute(n);
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
            // terrible solution, for each of the possible permutations I'd have to calc the visible left and visible right and check if their merge is the same
            let p = v.split('').map(x => +x );
            let p_a: number[] = visibleLeft(p); //array of the position where visible
            let p_b: number[] = visibleRight(p);
            // console.log({p_a, p_b});
            let p_c = p_a.filter(value => p_b.includes(value));
            if (a === p_a.length && b === p_b.length && c === p_c.length) {
                // console.log({p, a, b, c, p_a, p_b, p_c});

                ans = p.join(' ');
            }

        }
    }
    // console.dir(p, {'maxArrayLength': Math.pow(n, n)});
    return ans;
}

function visibleLeft(arr: number[]) {
    let pos_visible = [0];

    let max = arr[0];
    if (arr.length > 1) {
        for (let i = 1; i < arr.length; i++) {
            if (max <= arr[i]) {
                pos_visible.push(i);
                max = arr[i];
            }
        }
    }

    return pos_visible;
}

function visibleRight(arr: number[]) {
    let pos_visible = [arr.length - 1];

    let max = arr[arr.length - 1];
    if (arr.length > 1) {
        for (let i = arr.length - 2; i >= 0; i--) {
            if (max <= arr[i]) {
                pos_visible.push(i);
                max = arr[i];
            }
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

