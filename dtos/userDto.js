module.exports = class UserDTO {

    constructor({ _id, name, email, cart }) {

        this._id = _id;
        this.name = name;
        this.email = email;
        this.cart = cart
    }

}
