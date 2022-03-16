const fs = require("fs");
const https = require("https");

function request(ogfile) {
    const main = fs.readFileSync(ogfile, "utf8");
    const arr = ogfile.split('.');
    arr.pop();

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
        let code = data.code.split('\n//#')[0];
        fs.writeFileSync(`${arr.join('.')}.min.js`, `${code}\n//# sourceMappingURL=${arr.join('.')}.min.js.map`, 'utf8');
        fs.writeFileSync(`${arr.join('.')}.min.js.map`, data.map, 'utf-8');
    })
}

fs.readdirSync("./dist").filter(e=>!e.endsWith('.map')).filter(e=>!e.endsWith(".min.js")).forEach(e => {
    request(`./dist/${e}`);
})