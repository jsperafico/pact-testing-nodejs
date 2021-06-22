findClient = function(data, req) {
    return data.find(entry => entry.name.toLocaleLowerCase().includes(
        req.params.name.toLocaleLowerCase()
    ));
}

module.exports = findClient;