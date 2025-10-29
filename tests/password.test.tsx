import '@testing-library/jest-dom'
import {TestInput} from "@/app/usercredentials/signup/inputValidation";


describe("Password Validation", () => {
    it('Only 8 Letter', () =>{
        const result = TestInput("dummyEmail@gmail.com", "thispass");
        expect(result.password).toBe(false);
    })

    it('9 Letter + Special', () =>{
        const result = TestInput("dummyEmail@gmail.com", "thispass!");
        expect(result.password).toBe(false);
    })

    it('10 Letter + Special + digit', () =>{
        const result = TestInput("dummyEmail@gmail.com", "thispass!1");
        expect(result.password).toBe(false);
    })

    it('10 Letter + Special + digit + upper/lower', () =>{
        const result = TestInput("dummyEmail@gmail.com", "thisPass!1");
        expect(result.password).toBe(true);
    })

    it('Higher than 14', () =>{
        const result = TestInput("dummyEmail@gmail.com", "thisPass!1invalid");
        expect(result.password).toBe(false);
    })
})

/**
 * Password must contain:
 * -one lower case letter and one upper case letter
 * -one digit
 * -one special character
 * -length must be between [8-14]
 */