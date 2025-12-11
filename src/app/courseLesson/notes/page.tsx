
"use client";

import { useState, useEffect } from "react";
import Chat from "../geminiChatBot/page";


interface Defintions {
    term: string,
    definition: string
}

interface Examples {
    concept: string,
    description: string
}

interface NotesProp {
    unitName: string,
    topic: string,
    lesson: string,
    KeyConcepts: string[],
    definitions: Defintions[],
    examples: Examples[]
}

export default function Notes() {
    const [notes, setNotes] = useState<NotesProp | null>(null);
    const [chat, setChat] = useState<boolean>(false)

    useEffect(() => {
        const data = localStorage.getItem("notes");

        if(!data) return;

        const parsedData = JSON.parse(data) as NotesProp;
        console.log(parsedData);
        setNotes(parsedData);
    }, []);

    if (notes === null) {
        return <h1>Loading data. Please wait</h1>
    }

    return (
        <div className={`space-y-6 p-5 ${chat ? "mr-96" : ""}`}>
           <div className="border-b pb-4">
                <h1 className="font-bold text-2xl underline text-center">{notes.unitName}</h1>
                <h1 className="text-lg text-center">Topic: {notes.topic}</h1>
                <h1 className="text-lg text-center">Lesson: {notes.lesson}</h1>
           </div>

           <div className="border rounded-md shadow-lg p-5">
                <h2 className="font-bold text-xl underline mb-4">Key Concepts</h2>
                <ul className="list-disc list-inside space-y-1">
                    {
                        notes.KeyConcepts.map((keyConcept, idx) => (
                            <li key={idx}>{keyConcept}</li>
                        ))
                    }
                </ul>
           </div>
            
           <div className="border rounded-md shadow-lg p-5">
                <h2 className="font-bold text-xl underline mb-4">Definitions</h2>
                <ul className="space-y-5">
                    {
                        notes.definitions.map((defintion, idx) => (
                            <li key={idx}
                                className="border rounded-md p-3 shadow-md"
                            >
                                <p>
                                    <span className="font-bold">{defintion.term}: </span>
                                    <span>{defintion.definition}</span>
                                </p>
                            </li>
                        ))
                    }
                </ul>
           </div>

           <div className="border rounded-md shadow-lg p-5">
                <h2 className="font-bold text-xl underline mb-4">Examples</h2>
                <ul className="space-y-5">
                    {
                        notes.examples.map((example, idx) => (
                            <li key={idx}
                                className="border rounded-md p-3 shadow-md "
                            >
                                <p>
                                    <span className="font-bold">{example.concept}: </span>
                                    <span>{example.description}</span>
                                </p>
                            </li>
                        ))
                    }
                </ul>
           </div>

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
    );
}