const axios = require('axios').default;
const version = require('md5')('minion');

const HEADERS = {
    Authorization: 'Bearer Hiaushdiuash123786236'
}

class ClientConsumer {
    constructor(baseUrl) {
        axios.defaults.baseURL = baseUrl;
    }

    async getClientData(value, headers = HEADERS) {
        return axios.get(`/api/v${version}/clients/${value}/data`, {
            headers: headers
        }).catch((error) => { return error.response; });
    }
}

module.exports = ClientConsumer;