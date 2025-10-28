

import validator from "validator";


function TestEmail(email: string) {

    return validator.isEmail(email);
}


function TestPassword(password: string) {
    /**
     * Password must contain:
     * -one lower case letter and one upper case letter
     * -one digit
     * -one special character
     * -length must be between [8-14]
     */
    const isValidFormat =  validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })

    return isValidFormat && password.length <= 14
}

export function TestInput(email: string, password: string) {
    const validInputs = {
        email: TestEmail(email),
        password: TestPassword(password)
    }

    return validInputs;
}