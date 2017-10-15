const { Readable } = require('stream');


// inefficient: adding all data to readable stream before piping it
// const instream = new Readable();
// instream.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
// instream.push(null);

const instream = new Readable({
    read (size) {
        setTimeout(() => {
            if (instream.currentCharCode > 90) instream.push(null);
            else instream.push(String.fromCharCode(instream.currentCharCode++));
        }, 100);
    }
});

instream.currentCharCode = 65;

instream.pipe(process.stdout);

process.on('exit', () => {
    console.error(`\n\nCurrent char code is: ${instream.currentCharCode}`);
});

process.stdout.on('error', process.exit);
