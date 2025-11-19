
"use client";

import HistoryCourses from "@/topics/history.json"
import ScienceCourses from "@/topics/science.json"
import MathCourses from "@/topics/math.json"
import Link from "next/link";

type SelectedCourseInformation = {
    subject: string,
    description: string,
    courseName: string,
    courseId: string,
    handleClickedOnCourse: () => void
}

type CourseObject = {[key: string]: string[]}

/**
 * Displays a detailed information on the course that was selected
 * 
 * @param subject - a string that represents the subject of the selected course
 * @param description - a string that represents what the course will be about
 * @param courseName - a string that represents the name of the course
 * @returns JSX element containing a detailed information on the selected course
 */
export default function CourseSpecification({subject, description, courseName, courseId, handleClickedOnCourse}: SelectedCourseInformation) {
    let courseDatas: CourseObject; // stores all the courses from the selected subject
    if (subject === "History") courseDatas = HistoryCourses;
    else if (subject === "Science") courseDatas = ScienceCourses;
    else courseDatas = MathCourses;

    console.log("specification: ", {courseId})
    

    return (
        <div className="px-5 py-3 md:px-10 md:py-8">

            {/* back button */}
            <div className="mb-5">
                <button onClick={handleClickedOnCourse}
                        className="text-md border-2 py-2 px-5 rounded-full bg-gray-200 cursor-pointer shadow-md"
                >
                    Back
                </button>
            </div>

            
            <div className="flex flex-col md:flex-row justify-between">
                {/* Left column - displays the course description */}
                <div className="flex flex-col max-w-md">
                    <h2 className="font-bold text-2xl mb-5 underline">Course Description</h2>
                    <p>{description}</p>
                </div>

                {/* Middle column - displays the course curriculum */}
                <div>
                    <h2 className="font-bold text-2xl mb-5 underline text-center">Course Curriculum</h2>
                    <div className="space-y-5">
                        {
                            courseDatas[courseName].map((topic, index) => (
                                <div key={index} 
                                    className="flex flex-row items-center gap-4 p-4 border-2 border-black rounded-md"
                                >
                                    <button className="border-2 border-gray-400 px-4 py-2 rounded-2xl font-bold">{index+1}</button>
                                    <h2 className="flex flex-row items-center text-lg font-medium">{topic}</h2>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                {/* right column - displays the start button */}
                <div>
                    <Link href={`/courseLesson?courseName=${encodeURIComponent(courseId)}`}>
                        <button className="border-2 border-black px-5 py-3 rounded-md cursor-pointer">
                            Start Course
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}