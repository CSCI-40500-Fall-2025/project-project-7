
import { GoogleGenerativeAI } from '@google/generative-ai';
import { googleGenAIIntegration } from '@sentry/node';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';


export interface QuestionResponse {
    questions: Question[];
}

interface Question {
    id: string;
    question: string;
    options: string[];
    explanation: string;
    support_image: string | null;
}

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json({ message: "A prompt is required"}, { status: 400})
        }

        const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanedText = text
            .replace(/^```json/, "")
            .replace(/```$/, "")
            .replace(/^```/, "")
            .trim();

        const json = JSON.parse(cleanedText);
        return NextResponse.json(json, {status: 200});
    } catch(err) {
        console.log(`error: ${err}`);
        return NextResponse.json({message: "internal Server"}, {status: 500})
    }
}


