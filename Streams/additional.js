let stream = require('stream');
let random = require('./utils').random;

class Reader extends stream.Readable {
    _read(size) {
        let data = random(0, 100);
        this.push(data.toString());
    }
}

class Writer extends stream.Writable {
    _write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
    _writev(chunks, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
}

class Transformer extends stream.Transform {
    constructor(hash) {
        super();
    }

    _transform(chunk, encoding, callback) {
        setTimeout(() => {
            let number = parseInt(chunk.toString());
            let square = number * number;
            this.push(`new number: \t${number}\tsquare: \t${square}`);
            callback();
        }, 1000);
    }
}

let reader = new Reader();
let transformer = new Transformer();
let writer = new Writer();

reader.pipe(transformer).pipe(writer);