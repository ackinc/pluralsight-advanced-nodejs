const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'log_files');
const ms_per_day = 24 * 60 * 60 * 1000;
const expiry_time_in_ms = 7 * ms_per_day;
const now = new Date();

if (process.argv[2] === 'test') {
    // create dir if doesn't exist
    try {
        const stats = fs.statSync(dirname);
        if (!stats.isDirectory()) throw "./log_files exists but is not a directory"
    } catch (e) { // dir doesn't exist
        fs.mkdirSync(dirname);
    }

    // create log files
    for (let i = 0; i < 15; i++) {
        const filename = path.join(dirname, `${i}.log`);
        fs.writeFile(filename, "Log content", (err) => {
            if (err) throw err;

            const new_mtime = new Date(now - i * ms_per_day);
            fs.utimes(filename, new_mtime, new_mtime, (err) => {
                if (err) throw err;
            });
        });
    }
} else {
    const files = fs.readdirSync(dirname);

    files.forEach(file => {
        const filepath = path.join(dirname, file);

        fs.stat(filepath, (err, stats) => {
            if (err) {
                console.error(`Error getting info for file: ${file}`);
                console.error(err);
            } else {
                if (now - stats.mtime > expiry_time_in_ms) {
                    fs.unlink(filepath, (err) => {
                        if (err) {
                            console.error(`Error deleting file: ${file}`);
                            console.error(err);
                        } else {
                            console.log(`Deleted ${file}`);
                        }
                    });
                }
            }
        });
    });
}
