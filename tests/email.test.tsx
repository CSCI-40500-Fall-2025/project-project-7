import '@testing-library/jest-dom'
import {TestInput} from "@/app/usercredentials/signup/inputValidation";

describe("Password Validation", () => {
    it('gmail', () =>{
        const result = TestInput("test@gmail.com", "dummyPassword!1");
        expect(result.email).toBe(true);
    })

    it('Other than gmail', () =>{
        const result = TestInput("test@Outlook.com", "dummyPassword!1");
        expect(result.email).toBe(true);
    })

    it('No email address', () =>{
        const result = TestInput("notAEmail", "dummyPassword!1");
        expect(result.email).toBe(false);
    })

    it('Multiple periods', () =>{
        const result = TestInput("should..notwork@gmail.com", "dummyPassword!1");
        expect(result.email).toBe(false);
    })

    it('no .com', () =>{
        const result = TestInput("dummyEmail@gmail", "dummyPassword!1");
        expect(result.email).toBe(false);
    })
})
