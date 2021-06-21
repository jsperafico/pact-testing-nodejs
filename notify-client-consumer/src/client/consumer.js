const axios = require('axios').default;

const HEADERS = {
    Authorization: 'Bearer Hiaushdiuash123786236'
}

class ClientConsumer {
    constructor(baseUrl) {
        axios.defaults.baseURL = baseUrl;
    }

    async getClientData(value, headers = HEADERS) {
        return axios.get(`/client-data/${value}`, {
            headers: headers
        }).catch((error) => { return error.response; });
    }
}

module.exports = ClientConsumer;