const fs = require('fs');

const render = (template, res, ctx, success) => {
    fs.readFile(template, {
        'encoding': 'utf8'
    }, (err, data) => {
        if (err) {
            res.write(`error: template '${template}' not found`);
            res.end();
        } else {
            data = handleContext(data, ctx);
            success(data);
        }
    });
};

const rawRead = (template, res, success) => {
    fs.readFile(template, {
        'encoding': 'utf8'
    }, (err, data) => {
        if (err) {
            res.write(`error: template '${template}' not found`);
            res.end();
        } else {
            success(data);
        }
    });
};

const handleContext = (template, ctx) => {
    for (let key in ctx) {
        if (ctx.hasOwnProperty(key)) {
            let re = new RegExp(`{{\s*${key}\s*}}`,'g');
            template = template.replace(re, ctx[key]);
        }
    }
    return template;
};

const getData = (req, callback) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => callback(decodeURIComponent(data)));
};

module.exports = {
    render,
    rawRead,
    getData
};