const data = [];

const load = function () {
    if (data.length > 0) {
        return;
    }
    data.push(
        {
            id: 1,
            label: "Chocolate bar",
            description: "This is a chocolate bar",
            price: 10,
            image: {
                small: "url to small file",
                medium: "url to medium file",
                large: "url to large file",
                huge: "url to huge file"
            }
        },
        {
            id: 2,
            label: "Bread",
            description: "Tasty",
            price: 1,
            image: {
                small: "url to small file",
                medium: "url to medium file",
                large: "url to large file",
                huge: "url to huge file"
            }
        },
        {
            id: 3,
            label: "Clock",
            description: "On the wall, please",
            price: 10,
            image: {
                small: "url to small file",
                medium: "url to medium file",
                large: "url to large file",
                huge: "url to huge file"
            }
        },
        {
            id: 4,
            label: "Cheese",
            description: "Don't smell good...",
            price: 10,
            image: {
                small: "url to small file",
                medium: "url to medium file",
                large: "url to large file",
                huge: "url to huge file"
            }
        }
    );
};
load();

const clear = function () {
    while (data.length > 0) {
        data.pop()
    }
}

module.exports = { data, load, clear };