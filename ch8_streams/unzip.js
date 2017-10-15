const crypto = require('crypto');
const fs = require('fs');
const zlib = require('zlib');

const progress_stream = require('./progress_stream');

const filename = process.argv[2] || 'raw.txt.zz';

fs.createReadStream(filename)
  .pipe(crypto.createDecipher('aes192', 'secretterces'))
  .pipe(zlib.createGunzip())
  .pipe(progress_stream)
  .pipe(fs.createWriteStream(filename.slice(0, -3)))
  .on('finish', () => console.log("Done"));
