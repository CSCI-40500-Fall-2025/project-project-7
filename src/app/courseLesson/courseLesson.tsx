
"use client"

import { CourseUnitStructure, TopicStructure } from "./page"
import { getQuestionsPrompt, getNotesPrompt, QuestionResponse } from "../api/geminiAPI/route"
import { useState } from "react"



interface Props {
    courseLessonData: Record<string, CourseUnitStructure>
}

interface UnitDetailProp {
    unitNumber: string;
    unitTitle: string;
    topics: TopicStructure[];
}

async function getNotes(unit: string, topic: string, lesson: string) {
     
    try {
        const prompt = getNotesPrompt(unit, topic, lesson );

        const res = await fetch("/api/geminiAPI", {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ body: prompt })
        })

        const data = await res.json();

        // if data was sucessfully retrieved, print the output
        if (res.ok) {
            console.log(data.output);
            return data.output
        }
    } catch (error) {
        console.log(`error: ${error}`);
    }

    return null
}


async function getQuestions(unit: string, topic: string, lesson: string): Promise<QuestionResponse | null>{

    try {
        const prompt = getQuestionsPrompt(unit, topic, lesson );

        const res = await fetch("/api/geminiAPI", {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ body: prompt })
        })

        const data = await res.json();

        // if data was sucessfully retrieved, print the output
        if (res.ok) {
            console.log(data.output);
            return data.output
        }
    } catch (error) {
        console.log(`error: ${error}`);
    }

    return null;
}


/**
 * Display detailed information about the unit
 * 
 * @param selectedCourse - A UnitDetailProp that contains information about the course structure
 * @returns a div container displaying detailed information on the topic - topic name
 * and lessons part of the topic
 */
function UnitDetail(selectedUnit: UnitDetailProp): React.JSX.Element {
    const unit: string = selectedUnit.unitNumber;
    const unitTitle: string = selectedUnit.unitTitle;
    const topics: TopicStructure[] = selectedUnit.topics;

    async function handleGetNotes(unit: string, topic: string, lesson: string) {
        const data = await getNotes(unit, topic, lesson);

        if (data != null) {
            console.log(data);
            console.log(Object.keys(data));
            console.log(Object.keys(data.questions));
            localStorage.setItem("notes", JSON.stringify(data));
            // window.location.href = "/courseLesson/questions";
        }
    }

    async function handleGetQuestions(unit: string, topic: string, lesson: string) {
        const data = await getQuestions(unit, topic, lesson);

        if (data != null) {
            console.log(data);
            console.log(Object.keys(data));
            console.log(Object.keys(data.questions));
            localStorage.setItem("questions", JSON.stringify(data));
            // window.location.href = "/courseLesson/questions";
        }
    }

    return (
        <div className="w-full bg-white p-5 shadow">
            <h1 className="text-4xl font-bold mb-5">{unit}: {unitTitle}</h1>

            <div className="space-y-5 mt-10">
                {
                    topics.map((topic, idx) => (
                        <div key={idx} className="border-2 rounded-sm p-4 bg-gray-50">
                            <h2 className="text-2xl font-bold mb-3">{topic["Topic Title"]}</h2>
                            
                            <ul className="space-y-2">
                                {
                                    topic.Lessons.map((lesson, idx) => (
                                        <li key={`${topic["Topic Title"]}-${idx}`} 
                                            className="border border-gray-300 rounded p-4 bg-white hover:border-blue-400"
                                        >
                                            <div className="flex flex-row items-center justify-between">
                                                <p className="font-medium">{lesson}</p>

                                                <div className="">
                                                    <button className="bg-blue-600 text-white rounded-md px-3 py-2 hover:bg-blue-700 cursor-pointer mr-5"
                                                            onClick={() => handleGetNotes(unitTitle, topic["Topic Title"], lesson)}
                                                    >
                                                        Review
                                                    </button>
                                                    <button className="bg-green-600 text-white rounded-md px-3 py-2 hover:bg-green-700 cursor-pointer"
                                                            // onClick={() => getQuestions(unitTitle, topic["Topic Title"], lesson)}
                                                            onClick={() => handleGetQuestions(unitTitle, topic["Topic Title"], lesson)}
                                                    >
                                                        Practice
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                                
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


/**
 * Displays information on the selected course
 * 
 * @param data - a dictionary contain information about the course
 * @returns a div container displaying the structure of the course
 */
export default function CourseLessonClient(data: Props): React.JSX.Element {
    const [selectedUnit, setSelectedUnit] = useState<string>("Unit 1");

    const courseLessonData = data.courseLessonData;

    return (
        <div className="flex flex-row">
            {/* Left Column */}
            <div className="w-80 bg-gray-100 border-r p-5">
                {/* Header */}
                <div className="mb-5">
                    <h2 className="text-xl font-bold">Course Name</h2>
                    <h3 className="text-sm">{Object.keys(courseLessonData).length} UNITS</h3>
                </div>

                {/* Unit List */}
                <div className="overflow-y-auto space-y-3">
                    {
                        Object.entries(courseLessonData).map(([unitNumber, unitData]) => {
                            const isActive = (unitNumber === selectedUnit);

                            return (
                                <div key={unitNumber} 
                                    onClick={() => setSelectedUnit(unitNumber)}
                                    className={
                                        `border-2 rounded-md p-3 cursor-pointer
                                        ${isActive ? "bg-blue-200 border-l-4 border-l-blue-600" : ""}`
                                    }
                                >
                                    <h2>{unitNumber}</h2>
                                    <h1 className={`${isActive ? "font-bold" : ""}`}>{unitData["Unit Title"]}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="flex-1 p-10 bg-gray-50 min-h-screen">
                <UnitDetail 
                    unitNumber={selectedUnit} 
                    topics={courseLessonData[selectedUnit].Topics}
                    unitTitle={courseLessonData[selectedUnit]["Unit Title"]}
                />
            </div>
        </div>
    )
}