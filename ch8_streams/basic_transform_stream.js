const { Transform } = require('stream');

const uppercase_transform_stream = new Transform({
    transform (chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

process.stdin.pipe(uppercase_transform_stream).pipe(process.stdout);
