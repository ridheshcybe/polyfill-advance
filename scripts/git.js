const { exec } = require('child_process');
const { argv } = require("process")

const cmds = {
    push: 'git push',
    pull: 'git pull',
    add: 'git add .',
    status: 'git status',
    commit: 'git commit -S -am'
};

function execSync(cmd) {
    return new Promise((r, j) => {
        exec(cmd, (err, d, e) => {
            if (err || e) return j(err || e);
            r(d);
        });
    });
}

const command = `${cmds[argv[2] || 'push']} "${argv[3] || ''}"`;
execSync(command).then(console.log).catch(console.error);