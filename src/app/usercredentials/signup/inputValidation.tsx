


function TestEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/

    return emailRegex.test(email);
}

function TestPassword(password: string) {
    /**
     * Password must contain:
     * -one lower case letter and one upper case letter
     * -one digit
     * -one special character
     * -length must be between [8-14]
     */
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,14}$/;

    return passwordRegex.test(password);
}

export function TestInput(email: string, password: string) {
    const validInputs = {
        email: TestEmail(email),
        password: TestPassword(password)
    }

    return validInputs;
}