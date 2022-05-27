const fs = require(`fs`);

function read(type) {
    return JSON.parse(fs.readFileSync(`./data/${type}s.json`, 'utf-8'));
}


module.exports = {
    read
}