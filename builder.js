const fs = require("fs");
const https = require("https");

const main = fs.readFileSync('./index.js', 'utf8');

function build(url) {
    return new Promise((r, j) => {
        const req = https.request(new URL(url), (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => r(data));
        });
        req.on('error', (err) => j(err));
        req.end();
    });
}

const code = `?code=${encodeURIComponent(main)}`;
const catcher = (urls, callback, index = 0) => {
    build(urls[index] + '/api' + code)
        .then(e => callback(e), e => catcher(urls, callback, index + 1));
}
catcher(['https://minify.cybemachine.repl.co', 'https://web-minify.vercel.app', 'https://vercel-minify-web-cybemachine.vercel.app', 'https://vercel-minify-web-git-main-cybemachine.vercel.app'], (data) => {
    data = JSON.parse(data);
    let code = data.code.split('\n//# sourceMappingURL=data:application/json,')[0];
    fs.writeFileSync('./index.min.js', code + '\n//# sourceMappingURL=./index.min.js.map', 'utf8');
    fs.writeFileSync('./index.min.js.map', data.map, 'utf-8');
})