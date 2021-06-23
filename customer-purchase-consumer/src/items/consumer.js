const axios = require('axios').default;
const version = require('md5')('Luck Skywalker');

const HEADERS = {
    Authorization: 'Bearer Hiaushdiuash123786236'
}

class ItemConsumer {
    constructor(baseUrl) {
        axios.defaults.baseURL = baseUrl;
    }

    async getItemData(value, headers = HEADERS) {
        return axios.get(`/api/v${version}/items/${value}/data`, {
            headers: headers
        }).catch((error) => { return error.response; });
    }
}

module.exports = ItemConsumer;