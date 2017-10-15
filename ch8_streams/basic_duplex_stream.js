const { Duplex } = require('stream');

const inoutstream = new Duplex({
    read (size) {
        setTimeout(() => {
            if (inoutstream.currentCharCode > 90) inoutstream.push(null);
            else inoutstream.push(String.fromCharCode(inoutstream.currentCharCode++));
        }, 50);
    },

    write (chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
});

inoutstream.currentCharCode = 65;

process.stdin.pipe(inoutstream).pipe(process.stdout);

process.on('exit', () => {
    console.error(`\n\nCurrent char code is: ${inoutstream.currentCharCode}`);
});

process.stdout.on('error', process.exit);
