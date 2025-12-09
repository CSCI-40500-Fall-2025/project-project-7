

"use client";

import { setUser } from "@sentry/node";
import { useState } from "react";

type ChatMessage = {
    role: "user" | "bot";
    content: string;
}

export default function GeminiChat() {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [userMessage, setUserMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleSubmit() {
        if(!userMessage.trim()) return;

        const message: ChatMessage = { role: "user", content: userMessage };
        setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
        setUserMessage("");
        setIsLoading(true);

        try {
            const response = await fetch(`/api/geminiChat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: userMessage })
            });

            if(!response.ok) {
                throw new Error("Problem getting gemini chat response");
            }

            const data = await response.json();
            const botMessage: ChatMessage = {role: "bot", content: data.text}
            setChatHistory((prevChatHistory) => [...prevChatHistory, botMessage]);
        } catch (err) {
            console.error("Error fetching gemini response", err);
            setChatHistory((prevChatHistory) => [...prevChatHistory, 
                {content: "Something went wrong with getting response, please try again", role: "bot"}
            ])
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center border shadow-md rounded-xl w-full max-w-xl mx-auto">
            <h1 className="font-bold text-2xl mb-3">AI ChatBot</h1>

            <div className="w-full h-96 border rounded-md bg-gray-50 space-y-3 p-5 overflow-y-auto">
                {
                    chatHistory.map((message, idx) => (
                        <div key={idx}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`text-black px-4 py-2 rounded-lg text-sm shadow-sm max-w-[%75] ${message.role === "user" ? "bg-blue" : "bg-gray-200"}`}>
                                <p className="font-bold mb-1">
                                    {message.role === "user" ? "You" : "Bot"}:
                                </p>
                                <p>{message.content}</p>
                            </div>
                        </div>
 
                    ))
                }
                
                {isLoading && 
                    <div>
                        <i>Getting Response...</i>
                    </div>
                }
            </div>

            <div className="flex mt-4 w-full">
                    <input value={userMessage}
                        onChange={(e) => {
                            setUserMessage(e.target.value)
                        }}
                        placeholder="Enter a message"
                        className="flex-1 border rounded-md px-4 py-2 mr-2 overflow-hidden resize-none"
                    />

                    <button onClick={handleSubmit}
                            disabled={isLoading}
                            className="border border-black rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold">
                        Send
                    </button>
                </div>
        </div>
    );
}
