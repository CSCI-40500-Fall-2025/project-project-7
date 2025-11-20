

import validator from "validator";
import { emailAttempt, passwordAttempt, logSignUpError, checkingPassword} from "@/app/api/winston/logger";
import { log } from "console";

function logEmail(emailTest: boolean) {
    console.log("warn: email attempt log");
    emailAttempt();
}

function logPassword(passwordTest: boolean) {
    console.log("warn: password attempt log");
    passwordAttempt();
}

function TestEmail(email: string) {
    const emailTest = validator.isEmail(email);
    if (emailTest === false) logEmail(emailTest); // log incorrect email attempt

    return emailTest;
}


function TestPassword(password: string) {
    console.log("verbose: checking password");
    checkingPassword();
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

    const passwordTest = (isValidFormat && password.length <= 14);
    if(passwordTest === false) logPassword(passwordTest); // log incorrect password attempt

    return passwordTest;
}

export function TestInput(email: string, password: string) {
    const validInputs = {
        email: TestEmail(email),
        password: TestPassword(password)
    }

    if (validInputs.email === false && validInputs.password === false) {
        console.log("warn: logSignUpError");
        logSignUpError(); // log there is an error for account creation
    }

    return validInputs;
}