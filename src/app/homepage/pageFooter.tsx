
"use client"

export default function PageFooter() {
    return (
        <div className="bg-green-100 mt-5 py-8 px-6">
            <div className="flex flex-col py-8 items-center justify-between space-y-5 md:flex-row md:space-y-0">
                <div className="max-h-24">
                    <img src="./images/Header/StudyUpLogo.png" className="h-24 w-auto"/>
                </div>

                <div className="flex flex-col items-center font-bold text-lg md:flex-row md:space-x-5">
                    <p className="cursor-pointer hover:text-red-500">News</p>
                    <p className="cursor-pointer hover:text-red-500">Our Team</p>
                    <p className="cursor-pointer hover:text-red-500"> FAQs</p>
                    <p className="cursor-pointer hover:text-red-500">Contact Us</p>
                </div>
            </div>

            <p className="text-center text-sm">
                &copy; {new Date().getFullYear()} StudyUp. All rights reserved
            </p>
        </div>
    );
}