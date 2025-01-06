const NotFoundError = require("../../exceptions/NotFountError");
const ValidationError = require("../../exceptions/ValidationError");
const { phoneNumberValidation, getOperator } = require("../../helpers/utility");

module.exports = {
    ObjExists: (keys, obj, flag = "") => {
        // console.log(keys, obj)
        let message = [];
        for (let i = 0; i < keys.length; i++) {
            if (!obj.hasOwnProperty(keys[i]))
                message.push(
                    `${keys[i]} field is required${flag && flag}`
                );
        }

        if (message.length > 0) {
            throw new NotFoundError(message);
        } else {
            return true;
        }
    },
    phoneValidation: (phone) => {
        if (phone.length !== 11) throw new ValidationError("Invalid Phone Number. The phone number should be exactly 11 digits long.");

        // => validation 2: required to valid number 
        if (phoneNumberValidation(phone)) throw new ValidationError("Please provide a valid number without any characters.")

        // => validation 4: check phone operator
        let operator = getOperator(phone);
        if (!operator) throw new ValidationError("Please provide a valid Bangladesh phone number operator")

        return true

    },

    isEmpty: (body, flag = "") => {
        // data= Object.values(object1) parameter values
        let data = Object.values(body);
        let keys = Object.keys(body);
        let message = [];
        for (let i = 0; i < data.length; i++) {
            if (!data[i]) message.push(`${flag ? flag + " " : ""}${keys[i]} required`);
            else if (data[i].length === 0)
                message.push(
                    `${keys[i]} field is required${flag && flag}`
                );
        }

        if (message.length > 0) {
            throw new NotFoundError(message);
        } else {
            return true;
        }
    },
}
