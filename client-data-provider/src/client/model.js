export class Client {
    constructor({id, name, dob, contact: Contact, address: Address}) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.contact = contact;
        this.address = address;
    }
}