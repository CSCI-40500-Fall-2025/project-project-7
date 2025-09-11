
import React from 'react'
import { GoogleGenAI } from "@google/genai";

/*
    To use the Gemini API, you will have to create a .env.local file
    in your root directory where it will contain your gemini api key in the following format:
    GEMINI_API_KEY=[API_KEY]
*/
const ai = new GoogleGenAI({
    // apiKey: process.env.GEMINI_API_KEY,
    apiKey: "AIzaSyAB6DlVUAhzG2plJoW9tNQoalqqiDVjujE"
});

export async function Fetch(subject: string) {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate 4 question on ${subject}. It should be in multiple choice format.`
    });

    console.log(response.text)
}

/*
    API response is very slow. 
    It generates the questions but in incorrect format
*/