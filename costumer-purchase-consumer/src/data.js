const data = [];

const load = function () {
    if (data.length > 0) {
        return;
    }
    data.push(
        {
            id: 0,
            client: {
                id: 1,
                name: "Colette T. Sanchez",
                email: "ut.pharetra.sed@Nunc.net",
                address: {
                    line1: "P.O. Box 769",
                    line2: "6270 Dui Av.",
                    zipcode: 2773,
                    city: "Sambreville",
                    country: "Poland"
                }
            },
            items: [
                {
                    "id": 1,
                    "label": "Chocolate bar",
                    "price": 10
                }
            ]
        },
        {
            id: 1,
            client: {
                id: 2,
                name: "Merrill Kane",
                email: "Cum.sociis.natoque@augueut.com",
                address: {
                    line1: "510-7858 Ipsum Av.",
                    line2: "",
                    zipcode: 8628,
                    city: "Hamme",
                    country: "Paraguay"
                }
            },
            items: [
                {
                    "id": 1,
                    "label": "Chocolate bar",
                    "price": 10
                }
            ]
        },
        {
            id: 2,
            client: {
                id: 3,
                name: "Uriah I. Patel",
                email: "Sed@ipsumdolor.org",
                address: {
                    line1: "493-6750 Vitae, Rd.",
                    line2: "",
                    zipcode: 202358,
                    city: "Constitución",
                    country: "Sint Maarten"
                }
            },
            items: [
                {
                    "id": 1,
                    "label": "Chocolate bar",
                    "price": 10
                }
            ]
        },
        {
            id: 3,
            client: {
                id: 4,
                name: "Heather S. Ramsey",
                email: "lectus@necleo.edu",
                address: {
                    line1: "653-9158 Enim Street",
                    line2: "",
                    zipcode: 457481,
                    city: "Afşin",
                    country: "Kuwait"
                }
            },
            items: [
                {
                    "id": 1,
                    "label": "Chocolate bar",
                    "price": 10
                }
            ]
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