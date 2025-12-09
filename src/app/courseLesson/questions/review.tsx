
"use client";

import { Question } from "@/app/api/geminiAPI/route";
import { UserAnswer } from "./page";
import { useState } from "react";
import Chat from "../geminiChatBot/page";

interface ReviewProp {
    questions: Question[];
    userAnswers: UserAnswer[]
    score: number;
}

export default function Review({ questions, userAnswers, score }: ReviewProp) {
    const [chat, setChat] = useState<boolean>(false);

    return (
        <div className="space-y-10">
            <h1 className="font-bold text-3xl text-center mt-5">Review</h1>
            <p className="text-lg font-bold underline text-center">Your Score: {score} / {questions.length}</p>

            {
                questions.map((question, idx) => {
                    const user = userAnswers[idx];
                    const isCorrect = user.selectedChoice === user.correctChoice;

                    return (
                        <div key={idx}
                            className="border rounded-lg p-6"
                        >
                            <h2 className="text-xl font-bold">{question.question}</h2>

                            <div className={`space-y-2 ${chat ? "mr-96" : ""}`}>
                                {question.options.map((option, idx) => (
                                    <div key={`${option}-${idx}`}
                                        className={`border rounded-sm p-3
                                                    ${option === question.correct_answer ? "border-green-600 bg-green-200" : ""}
                                                    ${option === user.selectedChoice && option !== question.correct_answer ? "border-red-600 bg-red-200" : ""}
                                        `}
                                    >
                                        <b>{String.fromCharCode(97 + idx)})</b> {option}
                                    </div>
                                ))}

                                <div className="border rounded-sm bg-gray-50 p-4 mt-5">   
                                    <h2 className="font-bold">Explanation: </h2>
                                    <p>{question.explanation}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            <button className="border rounded-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white 
                                font-bold px-4 py-2 fixed bottom-6 right-6"
                    onClick={() => setChat(true)}
            >
                Ask Chat For Help
            </button>

            {chat && 
                <div className="flex flex-col h-full w-96 fixed top-0 right-0 bg-white">
                    <button onClick={() => setChat(false)} className="cursor-pointer">
                        x
                    </button>
                    
                    <Chat/>
                </div>
            }
        </div>
    )
}