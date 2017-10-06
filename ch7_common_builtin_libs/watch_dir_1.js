const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'log_files');
const polling_interval_ms = 0.2 * 1000;

let dirstate;
GetCurrentDirState(state => {
    dirstate = state;
    setTimeout(WatchDir, polling_interval_ms);
});



/* function defs */

function GetCurrentDirState (cb) {
    const files = fs.readdirSync(dirname);
    let new_dirstate = {}, files_covered = 0;

    files.forEach(file => {
        const filename = path.join(dirname, file);
        fs.stat(filename, (err, stats) => {
            if (err) throw err;

            new_dirstate[file] = stats.mtime;
            if (++files_covered === files.length) cb(new_dirstate);
        });
    });
}

function WatchDir () {
    GetCurrentDirState(new_state => {
        CompareDirStates(new_state, dirstate);

        dirstate = new_state;

        setTimeout(WatchDir, polling_interval_ms);
    });
}

function CompareDirStates (new_state, old_state) {
    for (let file in new_state) {
        if (old_state[file] === undefined) console.log(`${file} was created`);
        else if (new_state[file].toString() !== old_state[file].toString()) console.log(`${file} was modified`);
    }

    for (let file in old_state) {
        if (new_state[file] === undefined) console.log(`${file} was deleted`);
    }
}
