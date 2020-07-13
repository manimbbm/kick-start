var fs = require('fs');
var input = fs.readFileSync('./alien-piano-test.txt', 'utf-8').trim().split('\n');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
var line = 0;
function readline() {
    return input[line++];
}
var t = readline();
for (var i = 1; i <= t; i++) {
    var K = readline();
    var A = readline().split(" ").map(function (x) { return +x; });
    console.log("Case #" + i + ": " + alien_piano(A));
}
function alien_piano(pitches) {
    var alien_pitches = ['a', 'b', 'c', 'd'];
    var map_alien_piano = [];
    var rule_break = 0;
    pitches.forEach(function (pitch, index) {
        if (pitches[index - 1] == pitches[index]) {
            map_alien_piano.push(map_alien_piano[index - 1]);
            return;
        }
        var optimal_4 = pitches.slice(index, index + 4)
            .map(function (pitch, i) {
            return { pitch: pitch, i: i };
        })
            .sort(function (first_pitch, second_pitch) { return first_pitch.pitch - second_pitch.pitch; })
            .map(function (pitch, index) {
            return { pitch: alien_pitches[index], i: pitch.i };
        })
            .sort(function (first_pitch, second_pitch) { return first_pitch.i - second_pitch.i; });
        if (optimal_4[0] !== undefined) {
            if (index === 0) {
                map_alien_piano.push(optimal_4[0].pitch);
                return;
            }
            else if (pitches[index - 1] < pitches[index]) {
                //     should be higher
                if (map_alien_piano[index - 1] < optimal_4[0].pitch) {
                    map_alien_piano.push(optimal_4[0].pitch);
                }
                else if (map_alien_piano[index - 1] < 'd') {
                    map_alien_piano.push(String.fromCharCode(map_alien_piano[index - 1].charCodeAt(0) + 1));
                }
                else {
                    //    rule break
                    map_alien_piano.push(optimal_4[0].pitch);
                    rule_break++;
                }
            }
            else {
                //     should be lower
                if (map_alien_piano[index - 1] > optimal_4[0].pitch) {
                    map_alien_piano.push(optimal_4[0].pitch);
                }
                else if (map_alien_piano[index - 1] > 'a') {
                    map_alien_piano.push(String.fromCharCode(map_alien_piano[index - 1].charCodeAt(0) - 1));
                }
                else {
                    //    rule break
                    map_alien_piano.push(optimal_4[0].pitch);
                    rule_break++;
                }
            }
        }
    });
    return rule_break;
}
function logLetter(letter, next) {
    if (next) {
        console.log("Next to " + letter + ": " + String.fromCharCode(letter.charCodeAt(0) + 1));
    }
    else {
        console.log("Previous to " + letter + ": " + String.fromCharCode(letter.charCodeAt(0) - 1));
    }
}
