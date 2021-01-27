const fs = require('fs');

const input = fs.readFileSync('./alien-piano-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0
function readline(){
    return input[line++];
}

let t = readline();
for (let i = 1; i <= t; i++) {
    let K = readline();
    let A = readline().split(" ").map(x => +x);
    console.log(`Case #${i}: ${alien_piano(A)}`);
}

function alien_piano_testset1(pitches) {
    let alien_pitches = ['a', 'b', 'c', 'd'];
    let map_alien_piano = [];
    let rule_break = 0;
    pitches.forEach((pitch, index) => {
        if (pitches[index - 1] == pitches[index]) {
            map_alien_piano.push(map_alien_piano[index - 1]);
            return;
        }
        let optimal_4 = pitches.slice(index, index + 4)
            .map((pitch, i) => {
                return {pitch, i};
            })
            .sort((first_pitch, second_pitch) => first_pitch.pitch - second_pitch.pitch)
            .map((pitch, index) =>  {
                return {pitch: alien_pitches[index], i: pitch.i};
            })
            .sort((first_pitch, second_pitch) => first_pitch.i - second_pitch.i);

        if (optimal_4[0] !== undefined) {
            if (index === 0) {
                map_alien_piano.push(optimal_4[0].pitch);
                return;
            } else if (pitches[index - 1] < pitches[index]) {
                //     should be higher
                if (map_alien_piano[index - 1] < optimal_4[0].pitch) {
                    map_alien_piano.push(optimal_4[0].pitch);
                } else if (map_alien_piano[index - 1] < 'd'){
                    map_alien_piano.push(String.fromCharCode(map_alien_piano[index - 1].charCodeAt(0) + 1));
                } else {
                    //    rule break
                    map_alien_piano.push(optimal_4[0].pitch);
                    rule_break++;
                }
            } else {
                //     should be lower
                if (map_alien_piano[index - 1] > optimal_4[0].pitch) {
                    map_alien_piano.push(optimal_4[0].pitch);
                } else if (map_alien_piano[index - 1] > 'a'){
                    map_alien_piano.push(String.fromCharCode(map_alien_piano[index - 1].charCodeAt(0) - 1));
                } else {
                    //    rule break
                    map_alien_piano.push(optimal_4[0].pitch);
                    rule_break++;
                }
            }
        }

    });
    return rule_break;
}

function alien_piano(pitches) {
    let rule_break = 0;
    let down_counter = 0;
    let up_counter = 0;
    pitches.forEach((pitch, index) => {
        // console.log(pitches[index - 1], pitches[index]);
        if (pitches[index - 1] == pitches[index] || index === 0) {
            // console.log('same');
            return;
        } else if (pitches[index - 1] < pitches[index]) {
            //     should be higher
            // console.log('higher');
            down_counter = 0;
            if (up_counter == 3) {
                rule_break++;
                up_counter = 0;
                return;
            }
            up_counter++;
        } else {
            //     should be lower
            // console.log('lower');
            up_counter = 0;
            if (down_counter == 3) {
                rule_break++;
                down_counter = 0;
                return;
            }
            down_counter++;
        }

    });
    return rule_break;
}
