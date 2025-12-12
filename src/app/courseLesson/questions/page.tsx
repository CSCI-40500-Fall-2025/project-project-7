"use client";

import { QuestionResponse } from "@/app/api/geminiAPI/route";
import Quiz from "./quiz";
import Review from "./review";
import { useState, useEffect } from "react";


export interface UserAnswer {
    selectedChoice: string,
    correctChoice: string,
}

interface QuestionPayload {
    unit: string,
    topic: string;
    lesson: string,
    questions: QuestionResponse;
}

export default function QuestionsPage() {
    const [unit, setUnit] = useState<string>("");
    const [topic, setTopic] = useState<string>("");
    const [lesson, setLesson] = useState<string>("");
    const [practiceQuestions, setPracticeQuestions] = useState<QuestionResponse | null>(null);
    const [review, setReview] = useState<boolean>(false);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [score, setScore] = useState<number>(0);

    // const [showExplaination, setShowExplaination] = useState<boolean>(false);
    // const [selectedOption, setSelectedOption] = useState<string | null>(null);
    // const [currentIdx, setCurrentIdx] = useState<number>(0);

    useEffect(() => {
        const data = localStorage.getItem("payload");

        if (!data) return;

        const parsedData = JSON.parse(data) as QuestionPayload;
        console.log(parsedData);
        setUnit(parsedData.unit);
        setTopic(parsedData.topic);
        setLesson(parsedData.lesson);
        setPracticeQuestions(parsedData.questions);
    }, []);

    if (practiceQuestions === null) {
        return <h1>Loading data. Please wait</h1>
    }

    return (
        <div>
            {
                review !== true ? <Quiz questions={practiceQuestions.questions} 
                                        onComplete={(answers, score) => {
                                            setUserAnswers(answers);
                                            setScore(score);
                                            setReview(true);
                                        }}
                                    />
                                : <Review unit={unit}
                                        topic={topic}
                                        lesson={lesson}
                                        questions={practiceQuestions.questions}
                                        userAnswers={userAnswers}
                                        score={score}
                                    />
            }
        </div>
    );
}

