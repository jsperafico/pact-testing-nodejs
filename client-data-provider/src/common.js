findClient = function(data, req) {
    return data.find(entry => entry.name.toLocaleLowerCase().includes(
        req.params.name.toLocaleLowerCase()
    ));
}

const version = require('../package.json').version;

module.exports = {findClient, version};