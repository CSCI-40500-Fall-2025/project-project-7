
"use client";

import { QuestionResponse } from "@/app/api/geminiAPI/route";

import { useState, useEffect } from "react";

export default function QuestionsPage() {
    const [practiceQuestions, setPracticeQuestions] = useState<QuestionResponse | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState();

    useEffect(() => {
        const data = localStorage.getItem("questions");

        if (!data) return;
        
        const parseData = JSON.parse(data);
        setPracticeQuestions(parseData as QuestionResponse);
    }, []);

    if (practiceQuestions === null) {
        return <h1>Loading data. Please wait</h1>
    }

    console.log(practiceQuestions);
    // console.log(Object.keys(practiceQuestions))



    return (
        <div className="p-10 space-y-6">
            <h1 className="text-3xl font-bold">Practice Questions</h1>

            {
                
            }

            {/* {questions.Questions.map(q => (
                <div key={q.id} className="bg-white p-5 rounded shadow">
                    <p className="font-semibold">{q.question}</p>

                    <ul className="mt-2 space-y-1">
                        {q.options.map((opt, idx) => (
                            <li key={idx} className="p-2 border rounded">
                                {opt}
                            </li>
                        ))}
                    </ul>

                    {q.explanation && (
                        <p className="mt-3 text-gray-600 text-sm">
                            Explanation: {q.explanation}
                        </p>
                    )}
                </div>
            ))} */}
        </div>
    )
}

