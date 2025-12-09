

"use client";

import { Question } from "@/app/api/geminiAPI/route";
import { UserAnswer } from "./page";

import { useState } from "react";

interface QuizProp {
    questions: Question[];
    onComplete: (
        userAnswers: UserAnswer[],
        score: number,
    ) => void;
}


export default function Quiz({ questions, onComplete}: QuizProp) {
    const [showExplaination, setShowExplaination] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[currentIdx];

    function handleSelectedOption(option: string) {
        if (showExplaination) return;

        setSelectedOption(option);
        setShowExplaination(true);

        setUserAnswers(prevUserAnswers => [...prevUserAnswers, { selectedChoice: option, correctChoice: currentQuestion.correct_answer }]);

        if (option === currentQuestion.correct_answer) {
            setScore(prevScore => prevScore + 1);
        }
    }

    function handleNextQuestion() {
        if (currentIdx + 1 >= questions.length) {
            onComplete(userAnswers, score);
        } else {
            setSelectedOption(null);
            setShowExplaination(false);
            setCurrentIdx(prevIdx => prevIdx + 1);
        }
    }

    return (
        <div className="p-10 space-y-6">
            <h1 className="text-3xl font-bold">Practice Questions</h1>

            <div className="bordr rounded-lg shadow p-5 space-y-4">
                <h2 className="font-bold text-xl">
                    {currentQuestion.question}
                </h2>

                <div className="space-y-2">
                    {
                        currentQuestion.options.map((option, idx) => {
                            const isCorrectOption = (option === currentQuestion.correct_answer);
                            const isSelectedOption = (option === selectedOption);

                            return (
                                <button key={idx}
                                        onClick={() => handleSelectedOption(option)}
                                        disabled={showExplaination}
                                        className={`w-full text-left p-3 block border rounded-sm cursor-pointer
                                            ${showExplaination !== true ? "hover:bg-gray-100" : ""}
                                            ${showExplaination && isCorrectOption ? "border-green-600 bg-green-200" : ""}
                                            ${showExplaination && isSelectedOption && !isCorrectOption ? "border-red-600 bg-red-200" : ""}
                                        `}
                                >
                                    <b>{String.fromCharCode(97 + idx)})</b> {option}
                                </button>
                            );
                        })
                    }
                </div>

                {showExplaination && (
                    <div className="border rounded-sm bg-gray-50 p-4">   
                        <h2 className="font-bold">Explanation: </h2>
                        <p>{currentQuestion.explanation}</p>

                        <button className="border rounded-md px-4 py-2 mt-4 bg-blue-600 text-white font-bold cursor-pointer"
                                onClick={handleNextQuestion}
                        >
                            Next Question
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}