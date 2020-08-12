function printNumbers(N: number) {
    let i = 1;
    let numbers: number[] = [+(Math.random()*100).toFixed()];
    while (i < N) {
        numbers.push(+(Math.random()*100).toFixed());
        i++;
    }
    console.dir(numbers, {'maxArrayLength': N});
}
