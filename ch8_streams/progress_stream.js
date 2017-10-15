const { Transform } = require('stream');

const progress_stream = new Transform({
    transform (chunk, encoding, callback) {
        process.stdout.write('.');
        callback(null, chunk);
    }
})

module.exports = progress_stream;
