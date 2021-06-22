class Client {
    constructor({id, name, dob, contact, address}) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.contact = contact;
        this.address = address;
    }
}

module.exports = Client;