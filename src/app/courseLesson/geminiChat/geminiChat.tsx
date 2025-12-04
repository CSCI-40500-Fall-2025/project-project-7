

"use client";

import { useState } from "react";

type ChatMessage = {
    role: "user" | "bot";
    content: string;
}

export default function GeminiChat() {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [userMessage, setUserMessage] = useState<string>("");

    async function getBotResponse() {

        try {
            const response = await fetch("/api/geminiAPI", {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ body: userMessage })
            })

            const data = await response.json();

            return data.output;
        } catch(err) {
            console.error("Error getting chatbot response: ", err);
            return "unable to get a response";
        }
    }

    async function handleSubmit() {
        const newMessage = [
            ...chatHistory,
            { role: "user", content: userMessage }
        ];

        const reply = await getBotResponse();
        setUserMessage("");
        console.log(reply);

        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { role: "bot", content: reply }
        ]);
    }

    return (
        <div className="flex flex-col items-center border">
            <div>
                {
                    chatHistory.map((message, idx) => (
                        <p key={idx}>
                            <b>{message.role === "user" ? "You" : "Bot"}: </b>
                            {message.content}
                        </p>
                    ))
                }
            </div>
            <input value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Enter a message"
            />

            <button onClick={handleSubmit}
                    className="border border-black rounded-lg px-4 py-2 hover:bg-blue-600">
                Send
            </button>
        </div>
    );
}