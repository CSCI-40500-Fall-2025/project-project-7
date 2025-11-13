

"use client"

import { NavigationBar } from "@/app/homepage/pageHeader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TestInput } from "./inputValidation";


function LogInOptions() {
    
    return (
        <div className="space-y-3 w-[80%]">
            <button className="flex justify-center items-center border-1 border-black rounded-md w-full py-2 px-4 cursor-pointer hover:border-blue-500">
                <img src="/images/credentials/googleLogo.png" className="h-7 mr-2"/>
                <p className="font-medium">Continue with Google</p>
            </button>

            <div className="flex flex-row justify-between">
                <button className="items-center border-1 border-black rounded-md py-2 px-4 cursor-pointer hover:border-blue-500">
                    <img src="/images/credentials/microsoftLogo.png" className="h-7"/>
                </button>
                <button className="items-center border-1 border-black rounded-md py-2 px-4 cursor-pointer hover:border-blue-500">
                    <img src="/images/credentials/appleLogo.png" className="h-7"/>
                </button>

                <button className="items-center border-1 border-black rounded-md py-2 px-4 cursor-pointer hover:border-blue-500">
                    <img src="/images/credentials/facebookLogo.png" className="h-7"/>
                </button>
            </div>
        </div>
    );
}

function Form() {
    const router = useRouter();
    const [isInfoFilled, setIsInfoFilled] = useState(false);

    const [validData, setValidData] = useState({
        email: false,
        password: false
    })

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {

        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const validInput = TestInput(data.email, data.password);
    
        if (validInput.email && validInput.password) {
            router.push("/");
        } else {
            setValidData(pValidData => ({
                email: validInput.email,
                password: validInput.password
            }));
        }
    }

    useEffect(() => {
        if (data.email.length > 0 && data.password.length > 0) {
            setIsInfoFilled(true);
        } else {
            setIsInfoFilled(false);
        }
    }, [data])

    return (
        <form className="flex flex-col space-y-5 w-full" onClick={handleSubmit}>
            <div>
                <label className="block font-medium mb-3">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email@example.com" 
                    value={data.email}
                    required 
                    className="w-full border-1 border-black rounded-sm px-3 py-2"
                    onChange={handleInputChange}
                    
                />

                {
                    validData.email === false ? 
                        <p className="text-red-500 text-sm">Please enter a valid email (100 characters max)</p> : ""
                }
            </div>

            <div>
                <label className="block font-medium mb-2">Password</label>
                <p className="max-w-md text-sm text-gray-500 mb-3">
                    Passwords should be at least 8 characters (max 14) long and should contain a mixture of letters
                    (at least one uppercase), numbers, and one special character
                </p>
                <input 
                    type="password" 
                    name="password"
                    value={data.password} 
                    required 
                    className="w-full border-1 border-black rounded-sm px-3 py-2"
                    onChange={handleInputChange}
                    
                />
                {validData.password === false ? 
                    <p className="text-red-500 text-sm">Please enter a valid password</p>
                        : 
                    ""
                }
            </div>

            <button 
                type="submit" 
                className={`border-1 rounded-md  text-white font-bold py-2 w-full ${
                    isInfoFilled ? "cursor-pointer bg-blue-500" : "bg-gray-400 cursor-not-allowed"
                    }`}
                disabled={!isInfoFilled}
                >
                Sign up
            </button>
        </form>
    )
}

function LogInForm() {
    return (
        <div className="bg-gray-100 flex flex-col justify-center items-center min-h-screen">
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-8 min-w-md">
                <h2 className="text-2xl text-center font-bold mb-5">Log in now!</h2>

                <LogInOptions/>

                <div className="flex flex-row justify-center items-center my-5 w-full">
                    <div className="w-[30%] border-t border-gray-300"/>
                    <p className="w-[40%] mx-2 text-sm text-center">Or login in with email</p>
                    <div className="w-[30%] border-t border-gray-300"/>
                </div> 

                <Form/>
            </div>
        </div>
    );
}

export default function SignUp() {
    return (
        <div>
            <NavigationBar/>
            <LogInForm/>
        </div>
    );
}