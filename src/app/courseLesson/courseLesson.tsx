
"use client"

import { CourseUnitStructure } from "./page"

import { useState } from "react"


interface Props {
    courseLessonData: Record<string, CourseUnitStructure>
}

interface UnitDetailProp {
    selectedUnit: string
    unitTitle: string
    topics: string[];
}

function UnitDetail(selectedCourse: UnitDetailProp) {
    const selectedUnit = selectedCourse.selectedUnit;
    const UnitTitle = selectedCourse.unitTitle;
    const topics = selectedCourse.topics;

    return (
        <div className="w-full bg-white p-5 shadow">
            <h1 className="text-3xl font-bold mb-5">{selectedUnit}: {UnitTitle}</h1>

            <div className="space-y-5 mt-10">
                {topics.map((topic, idx) => (
                    <div key={idx} className="border-2 rounded-sm p-4 bg-gray-50">
                        <h2 className="text-lg font-bold">{topic}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default function CourseLessonClient(data: Props) {
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
                        Object.entries(courseLessonData).map(([unit, unitData]) => {
                            const isActive = (unit === selectedUnit);
                            return (
                                <div key={unit} 
                                    onClick={() => setSelectedUnit(unit)}
                                    className={`border-2 rounded-md p-3 cursor-pointer
                                        ${isActive ? "bg-blue-200 border-l-4 border-l-blue-600" : ""}
                                    `}
                                
                                >
                                    <h2>{unit}</h2>
                                    <h1 className={`${isActive ? "font-bold" : ""}`}>{unitData["Unit Title"]}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="flex-1 p-10 bg-gray-50 min-h-screen">
                <UnitDetail 
                    selectedUnit={selectedUnit} 
                    topics={courseLessonData[selectedUnit].Topics}
                    unitTitle={courseLessonData[selectedUnit]["Unit Title"]}
                />
            </div>
        </div>
    )
}