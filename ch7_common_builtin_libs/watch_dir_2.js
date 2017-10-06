const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'log_files');

let currentfiles = fs.readdirSync(dirname);

fs.watch(dirname, (eventType, filename) => {
    if (eventType === 'rename') {
        let idx = currentfiles.indexOf(filename);

        if (idx === -1) {
            currentfiles.push(filename);
            LogMsgWithTime(`${filename} was created`);
        } else {
            currentfiles.splice(idx, 1);
            LogMsgWithTime(`${filename} was deleted`);
        }
    } else {
        LogMsgWithTime(`${filename} was modified`);
    }
});

function LogMsgWithTime (msg) {
    console.log(`${new Date()}: ${msg}`);
}
