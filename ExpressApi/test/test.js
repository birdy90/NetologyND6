const fs = require('fs');
const supertest = require('supertest');
const expect = require('chai').expect;
const assert = require('mocha').assert;

function copyFile(source, target) {
  return new Promise(function(resolve, reject) {
    const rd = fs.createReadStream(source);
    rd.on('error', rejectCleanup);
    const wr = fs.createWriteStream(target);
    wr.on('error', rejectCleanup);
    function rejectCleanup(err) {
      rd.destroy();
      wr.end();
      reject(err);
    }
    wr.on('finish', resolve);
    rd.pipe(wr);
  });
}

describe('user management:', () => {
  let server;

  before((done) => {
    setTimeout(() => {
      require('../index');
      server = supertest.agent('http://localhost:3000');
      done();
    }, 1000);
  });

  /* для возвращения данных в исходное состояние */
  beforeEach(() => {
    return copyFile('./data.json', './data.json.backup');
  });

  /* для возвращения данных в исходное состояние */
  afterEach(() => {
    return copyFile('./data.json.backup', './data.json');
  });

  it('creation done', (done) => {
    server
      .post('/users')
      .expect(200)
      .end((err, response) => {
        if (err) throw err;
        expect(response.body.status).to.be.equal('ok');
        expect(response.body.data.users.length).greaterThan(0);
        done();
      });
  });

  it('deletion', (done) => {
    let oldLength;
    server
      .get('/users')
      .end((err, response) => {
        oldLength = response.body.length;
        server.delete('/users/38')
          .expect(200)
          .end((err, response) => {
            if (err) throw err;
            expect(response.body.status).to.be.equal('ok');
            expect(response.body.data.users.length).eql(oldLength - 1);
            done();
          });
      });
  });
});