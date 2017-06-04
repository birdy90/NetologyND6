const views = require('./views');
const fs = require('fs');

let urls = {
    '/': views.index,
    '/hashname': views.hashname,

    '404': views.error404,
    'static': views.statics
};

const handler = (req, res) => {
    if (urls[req.url]) {
        urls[req.url](req, res);
    } else {
        let staticRegExp = new RegExp('^\/static\/.*', 'gi');
        if (staticRegExp.test(req.url)) {
            fs.exists(`.${req.url}`, (exists) => {
                if (!exists) {
                    urls['404'](req, res, {info: 'поиск в статике'});
                } else {
                    urls['static'](req, res);
                }
            });
        } else {
            urls['404'](req, res, {info: 'поиск обработчика URL'});
        }
    }
};

module.exports = handler;