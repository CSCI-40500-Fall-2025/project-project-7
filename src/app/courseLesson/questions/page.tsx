"use client";

import { QuestionResponse } from "@/app/api/geminiAPI/route";
import { useState, useEffect } from "react";

export default function QuestionsPage() {
    const [practiceQuestions, setPracticeQuestions] = useState<QuestionResponse | null>(null);

    useEffect(() => {
        const data = localStorage.getItem("questions");

        if (!data) return;

        const parsedData = JSON.parse(data) as QuestionResponse;
        setPracticeQuestions(parsedData);
    }, []);

    if (practiceQuestions === null) {
        return <h1>Loading data. Please wait</h1>;
    }

    return (
        <div className="p-10 space-y-6">
            <h1 className="text-3xl font-bold">Practice Questions</h1>

        </div>
    );
}

