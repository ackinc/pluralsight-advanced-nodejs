const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'files_with_duplicated_content');
const files = fs.readdirSync(dirname);

files.forEach(file => {
    let filepath = path.join(dirname, file);

    fs.stat(filepath, (err, stats) => {
        if (err) {
            console.error(`Error getting info for file: ${file}`);
            console.error(err);
        } else {
            fs.truncate(filepath, stats.size / 2, (err) => {
                if (err) {
                    console.error(`Error truncating ${file}`);
                    console.error(err);
                }
            });
        }
    });
});
