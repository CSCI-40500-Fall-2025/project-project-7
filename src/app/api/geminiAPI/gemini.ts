
import { geminiAI } from '@/lib/gemini';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';


function getPrompt(unitName: string, topic: string, lesson: string): string {
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


export async function geminiFetch(req: NextRequest) {
    const { unitName, topic, lesson } = await req.json();
    const prompt = getPrompt(unitName, topic, lesson);

    try {
        const response = await geminiAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        const data = JSON.parse(response.text!);
        return NextResponse.json(data);

    } catch(err) {
        console.log(`error: ${err}`);
    }
}
