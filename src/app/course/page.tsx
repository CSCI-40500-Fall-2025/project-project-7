
"use client"
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Fetch } from "@/geminiAPI/geminiFetch";

import mathTopics from "@/topics/math.json"
import scienceTopics from "@/topics/science.json"
import historyTopics from "@/topics/history.json"

interface topicDic {
  [key: string]: string[];
}

const sciencetopics = scienceTopics as topicDic
const historytopics = historyTopics as topicDic
const mathtopics = mathTopics as topicDic


export default function Course() {
    const searchParams = useSearchParams();
    const course = searchParams.get('courseName');
    const subject = searchParams.get('subject');

    let topicArr: string[];
    if (subject === "science") topicArr = sciencetopics[course!];
    else if (subject === "history") topicArr = historytopics[course!];
    else topicArr = mathtopics[course!];

    
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-fold mb-6 text-center capitalize">{course}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {
                    topicArr.map((topic, index) => (
                        <Card 
                            key={index}
                            className="aspect-square flex items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer"
                            onClick={() => Fetch(course!, topic)}
                        >
                            {topic}
                        </Card>
                    ))
                }
            </div>
        </div>

    );
}