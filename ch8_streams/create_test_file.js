const fs = require('fs');

function createFile (n) {
    const outstream = fs.createWriteStream('raw.txt');
    const line = "Hi! My name is Anirudh Nimmagaddda. I am 26 years old.\n";

    let i = 0;
    function writeline () {
        while (i++ < n) {
            if (outstream.write(line)) {
                if (i % 1e4 === 0) console.log(`i: ${i}`);
            } else {
                outstream.once('drain', writeline);
                return;
            }
        }
        console.log("Done");
    }

    writeline();
}

createFile(1e7);
