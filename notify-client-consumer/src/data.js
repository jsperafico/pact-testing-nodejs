const data = [];

const load = function () {
    if (data.length > 0) {
        return;
    }
    data.push(
        {
            client: {
                name: "Colette T. Sanchez",
                email: "ut.pharetra.sed@Nunc.net",
                phone: "(915) 502-7826"
            },
            message: "This is a message to be sent."
        },
        {
            client: {
                name: "Merrill Kane",
                email: "Cum.sociis.natoque@augueut.com",
                phone: "1-263-119-9651"
            },
            message: "This is a message to be sent."
        },
        {
            client: {
                name: "Uriah I. Patel",
                email: "Sed@ipsumdolor.org",
                phone: "150-9138"
            },
            message: "This is a message to be sent."
        },
        {
            client: {
                name: "Heather S. Ramsey",
                email: "lectus@necleo.edu",
                phone: "228-8386"
            },
            message: "This is a message to be sent."
        },
    );
};
load();

const clear = function () {
    while (data.length > 0) {
        data.pop()
    }
}

module.exports = { data, load, clear };