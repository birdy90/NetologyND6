let fs = require('fs');
let stream = require('stream');
let crypto = require('crypto');

class HashingReader extends stream.Transform {
    constructor(hash) {
        super();
    }

    _transform(chunk, encoding, callback) {
        let hash = crypto.createHash('md5');
        hash.update(chunk.toString());
        this.push(`${hash.digest('hex')}\r\n`);
        callback();
    }
}

let readOptions = {
    highWaterMark: 2048
};

const reader = fs.createReadStream('input.txt', readOptions);
const hasher = new HashingReader();
const writer = fs.createWriteStream('output.txt');

var hashed = reader.pipe(hasher);
hashed.pipe(process.stdout);
hashed.pipe(writer);