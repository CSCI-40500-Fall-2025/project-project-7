import '@testing-library/jest-dom'
import {TestInput} from "@/app/usercredentials/signup/inputValidation";


describe("Input Validation", () => {
    it('Invalid Email and Password', () =>{
        const result = TestInput("notAEmail", "~!@123123-+)_+((_+#$NotAPassWord");
        expect(result.email).toBe(false);
        expect(result.password).toBe(false);
    })

    it('Valid Email and Invalid Password', () =>{
        const result = TestInput("myEmail@gmail.com", "~!@#$NotAPassWord");
        expect(result.email).toBe(true);
        expect(result.password).toBe(false);
    })

    it('Valid Email and Valid Password', () =>{
        const result = TestInput("mYEMAILisTHis@gmail.com", "thisIsMyPass!1");
        expect(result.email).toBe(true);
        expect(result.password).toBe(true);
    })
})

/**
 * Password must contain:
 * -one lower case letter and one upper case letter
 * -one digit
 * -one special character
 * -length must be between [8-14]
 */