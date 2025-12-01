
"use client"

import { CourseUnitStructure, TopicStructure } from "./page"
import { geminiFetch } from "../api/geminiAPI/gemini"
import { useState } from "react"


interface Props {
    courseLessonData: Record<string, CourseUnitStructure>
}

interface UnitDetailProp {
    unitNumber: string;
    unitTitle: string;
    topics: TopicStructure[];
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
                                            className="border border-gray-300 rounded p-4 bg-white cursor-pointer hover:border-blue-400"
                                        >
                                            {lesson}
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