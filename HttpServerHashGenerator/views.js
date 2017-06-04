const base = require('./base');
const http = require('http');

const index = (req, res, ctx) => {
    ctx = ctx || {};
    let handler = (data) => {
        res.write(data);
        res.end();
    };
    base.render('./templates/index.html', res, ctx, handler);
};

const hashname = (req, res, ctx) => {
    ctx = ctx || {};
    base.getData(req, data => {
        let items = data.split('&');
        data = {};
        items.forEach(item => {
            let parts = item.split('=');
            data[parts[0]] = parts[1];
        });
        let firstname = data.firstname;
        let lastname = data.lastname;
        ctx.name = `${firstname} ${lastname}`;

        let newData = '';
        let requestDone = (newRes) => {
            newRes.on('data', chunk => newData += chunk);
            newRes.on('end', () => {
                decodeURIComponent
                newData = JSON.parse(newData);
                ctx.hash = newData.hash;
                let handler = (newData) => {
                    res.write(newData);
                    res.end();
                };
                base.render('./templates/hashname.html', res, ctx, handler);
            });
        };

        let newReq = http.request({
            host: 'netology.tomilomark.ru',
            path: '/api/v1/hash',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; encoding: utf-8',
            }
        })
            .on('error', (err) => console.log(err))
            .on('response', requestDone);
        newReq.write(JSON.stringify({lastname: lastname, firstname: firstname}));
        newReq.end();
    });
};

const error404 = (req, res, ctx) => {
    ctx = ctx || {};
    ctx.url = req.url;
    let handler = (data) => {
        res.statusCode = 404;
        res.write(data);
        res.end();
    };
    base.render('./templates/404.html', res, ctx, handler);
};

const statics = (req, res) => {
    let handler = (data) => {
        res.write(data);
        res.end();
    };
    base.rawRead(`.${req.url}`, res, handler);
};

module.exports = {
    index,
    hashname,
    error404,
    statics
};