
"use client";

import { Question, QuestionResponse } from "@/app/api/geminiAPI/route";
import { UserAnswer } from "./page";
import { useState } from "react";
import Chat from "../geminiChatBot/page";

interface ReviewProp {
    unit: string,
    topic: string,
    lesson: string,
    questions: Question[];
    userAnswers: UserAnswer[]
    score: number;
}

async function getQuestions(unit: string, topic: string, lesson: string, prompt: string): Promise<QuestionResponse | null>{
    try {
        const response = await fetch("/api/geminiAPI", {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ prompt: prompt })
        })

        if(!response.ok) {
                throw new Error("Problem getting gemini chat response");
        }

        const data = await response.json();

        if (response.ok) {
            console.log(data);
        }
        return data;
    } catch (error) {
        console.log(`error: ${error}`);
    }

    return null;
}


async function handlePracticeAgain(questions: Question[], UserAnswers: UserAnswer[], unit: string, topic: string, lesson: string) {
    const wrong = questions.map((question, idx) => {
        const userAnswer = UserAnswers[idx];

        if (userAnswer.selectedChoice !== question.correct_answer) {
            return question.question
        }
        return null;
    })

    const prompt = `
        Generate 5 practice questions for the lesson ${lesson} on the topic ${topic} for ${unit}
        based on the user's incorrect answers which will be provided. The new questions should be similar or slighly harder than the ones they got wrong. 
        If no user incorrect answers was provided, just generate 5 new practice questions. Here is the user's incorrect questions:
        ${JSON.stringify(wrong)}. 

        Return a valid JSON structure in the following:
        {
            "questions": [
                {
                    "id": "",
                    "question": "",
                    "options": [],
                    "correct_answer": "",
                    "explanation": "",
                    "supporting_image": null,
                }
            ]
        }
    `;
    
    const data = await getQuestions(unit, topic, lesson, prompt);

    if(data != null) {
        console.log("new questions generated: ", data);

        const payload = {unit, topic, lesson, questions: data};
        localStorage.setItem("payload", JSON.stringify(payload));
        window.location.href = "/courseLesson/questions";
    }
}

export default function Review({ unit, topic, lesson, questions, userAnswers, score }: ReviewProp) {
    const [chat, setChat] = useState<boolean>(false);

    return (
        <div className="space-y-10">
            <h1 className="font-bold text-3xl text-center mt-5">Review</h1>
            <p className="text-lg font-bold underline text-center">Your Score: {score} / {questions.length}</p>

            <div className="flex justify-center">
                <button onClick={() => handlePracticeAgain(questions, userAnswers, unit, topic, lesson)}
                    className="border px-5 py-3 rounded-lg shadow-md font-bold bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                >
                    Practice again
                </button>
            </div>

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