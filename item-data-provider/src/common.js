const { version } = require('../package.json');
const skywalker = require('md5')('Luck Skywalker');

console.log(`Skywalker: '${skywalker}'`);

module.exports = { version, skywalker };