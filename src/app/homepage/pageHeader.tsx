
"use client"

import Link from "next/link";

import LogIn from "../usercredentials/login/page";
import SignUp from "../usercredentials/signup/page";

export function NavigationBar() {
    return (
        <div className="flex flex-row items-center justify-between px-5 py-4 shadow-md sticky top-0 max-h-20 z-10 bg-white">
            <div>
                <Link href="/">
                    <img src="/images/Header/StudyUpLogo.png" className="h-24 w-auto cursor-pointer"/>
                </Link>
            </div>

            <div className="flex flex-col space-x-8 md:flex-row">
                <h2 className="font-bold hover:underline cursor-pointer">About</h2>
                <h2 className="font-bold hover:underline cursor-pointer">Courses</h2>
                <h2 className="font-bold hover:underline cursor-pointer">Resources</h2>
                <h2 className="font-bold hover:underline cursor-pointer">Questions</h2>
            </div>

            <div className="flex flex-row space-x-4">
                <button className="border rounded-md bg-blue-400 text-white hover:bg-blue-500 cursor-pointer 
                px-4 py-2 font-bold"
                >
                    <Link href="./usercredentials/login">Log in</Link>
                </button>
                <button className="border rounded-md bg-blue-400 text-white hover:bg-blue-500 cursor-pointer 
                px-4 py-2 font-bold">
                    <Link href="./usercredentials/signup">Sign Up</Link>
                </button>
            </div>
        </div>
    );
}

export function Banner() {
    return (
        <div className="w-full relative">
            <img src="./images/Header/banner.png" className="w-full h-auto"/>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h2 className="text-6xl font-bold">Study Up</h2>
                <p className="text-lg mt-3 font-bold">Learn whenever you want, where ever you want, with no limits</p>
                <button className="border-2 border-black bg-red-200 font-bold rounded-2xl px-4 py-2 mt-3 cursor-pointer hover:bg-red-400">
                    Explore Courses
                </button>
            </div>
        </div>
    )
}

export default function PageHeader() {
    return (
        <div>
            <NavigationBar/>
            <Banner/>
        </div>
    );
}