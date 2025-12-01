
import { GoogleGenerativeAI } from '@google/generative-ai';
import { googleGenAIIntegration } from '@sentry/node';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';


export interface QuestionResponse {
    Questions: Question[];
}

interface Question {
    id: string;
    question: string;
    options: string[];
    explanation: string;
    support_image: string | null;
}

export function getPrompt(unitName: string, topic: string, lesson: string): string {
    const prompt = 
    `
        Generate 5 multiple choice questions for the lesson ${lesson} on the topic ${topic} for
        ${unitName}.

        Return a valid JSON structure in the following:
        {
            "questions": [
                {
                    "id": string,
                    "question": string,
                    "options": string[],
                    "correct_answer": string,
                    "explanation": string,
                    "supporting_image": string | null,
                }
            ]
        }

        Only include a image if it is necessary for the lesson and topic.
    `
    
    return prompt;
}


export async function POST(req: Request, res: Response) {

    try {
        const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash" });

        const data = await req.json();
        const prompt = data.body;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = await response.text();

   
        return NextResponse.json({ output: output })

    } catch(err) {
        console.log(`error: ${err}`);
    }
}


