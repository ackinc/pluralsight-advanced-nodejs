const crypto = require('crypto');
const fs = require('fs');
const zlib = require('zlib');

const progress_stream = require('./progress_stream');

const filename = process.argv[2] || 'raw.txt';

fs.createReadStream(filename)
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipher('aes192', 'secretterces'))
  .pipe(progress_stream)
  .pipe(fs.createWriteStream(filename + '.zz'))
  .on('finish', () => console.log("Done"));
