
"use client";

import HistoryCourses from "@/topics/history.json"
import ScienceCourses from "@/topics/science.json"
import MathCourses from "@/topics/math.json"

type SelectedCourseInformation = {
    subject: string,
    description: string,
    courseName: string,
    handleClickedOnCourse: () => void
}

type CourseObject = {[key: string]: string[]}

export default function CourseSpecification({subject, description, courseName, handleClickedOnCourse}: SelectedCourseInformation) {
    let courseDatas: CourseObject;
    if (subject === "History") courseDatas = HistoryCourses;
    else if (subject === "Science") courseDatas = ScienceCourses;
    else courseDatas = HistoryCourses;
    

    return (
        <div className="px-5 py-3">
            <div className="mb-5">
                <button onClick={handleClickedOnCourse}
                        className="text-md border-2 py-2 px-5 rounded-full bg-gray-200 cursor-pointer"
                >
                    Back
                </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between">
                {/* bg-white p-6 rounded shadow w-full md:w-1/3 max-w-md mx-auto */}
                <div className="flex flex-col max-w-md ">
                    <h2 className="font-bold text-2xl mb-5 underline">Course Description</h2>
                    <p>{description}</p>
                </div>

                <div>
                    <h2 className="font-bold text-2xl mb-5 underline text-center">Course Curriculum</h2>
                    <div className="space-y-5">
                        {
                            courseDatas[courseName].map((topic, index) => (
                                <div key={index} 
                                    className="flex flex-row gap-4 p-4 border-2 border-black rounded-md"
                                >
                                    <button className="border-2 px-2 py-2 rounded-2xl font-bold">{index+1}</button>
                                    <h2 className="flex flex-row items-center text-lg font-medium">{topic}</h2>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <div>
                    <button className="border-2 border-black px-5 py-3 rounded-md cursor-pointer">
                        Start Course
                    </button>
                </div>
            </div>
        </div>
    );
}