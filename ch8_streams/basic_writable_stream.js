const { Writable } = require('stream');

const outstream = new Writable({
    write (chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
})

process.stdin.pipe(outstream);
