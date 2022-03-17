const fs = require("fs");
const https = require("https");

fs.readdirSync("./dist")
    .filter(e => !e.endsWith('.map'))
    .filter(e => !e.endsWith(".min.js"))
    .forEach(e => {
        const main = fs.readFileSync(`./dist/${e}`, "utf8");
        const arr = `./dist/${e}`.split('.');
        arr.pop();

        const catcher = (urls, i = 0) => new Promise((r, j) => {
            if (i >= urls.length) return j();
            https.request(`https://${urls[i]}/api?code=${encodeURIComponent(main)}`, (s) => {
                let J = '';
                s.on('data', p => J += p).on('end', () => {
                    if (J.includes('<!DOCTYPE html>'))console.log(J)
                    r(JSON.parse(J));
                });
            }).on('error', e => catcher(urls, i + 1)).end();
        });

        catcher(['minify.cybemachine.repl.co', 'web-minify.vercel.app', 'vercel-minify-web-cybemachine.vercel.app', 'vercel-minify-web-git-main-cybemachine.vercel.app']).then(data => {
            const s = '\n//# sourceMappingURL=';
            const name = arr.join('.');
            fs.writeFileSync(`${name}.min.js`, `${data.code.split(s)[0] + s + name}.min.js.map`);
            fs.writeFileSync(`${name}.min.js.map`, data.map);
        }).catch(() => {
            console.error(`Try again later`);
        })
    })