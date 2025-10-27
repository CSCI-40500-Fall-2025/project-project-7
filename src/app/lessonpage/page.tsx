
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

import mathTopics from "@/topics/math.json"
import scienceTopics from "@/topics/science.json"
import historyTopics from "@/topics/history.json"

type Subject = "science" | "history" | "math"

export default function LessonPage() {
  const [activeSubject, setActiveSubject] = useState<Subject>("science")
  const [currentCourses, setCurrentCourses] = useState(Object.keys(scienceTopics));

  const router = useRouter();


  const subjects = [
    { id: "science" as const, name: "Science", base: "bg-green-500 text-white", hover: "hover:bg-green-500", active: "active:bg-green-500" },
    { id: "history" as const, name: "History", base: "bg-blue-500 text-white", hover: "hover:bg-blue-500", active: "active:bg-blue-500" },
    { id: "math" as const, name: "Math", base: "bg-purple-500 text-white", hover: "hover:bg-purple-500",  active: "active:bg-purple-500" },
  ]

  function coursePage(course: string) {
  
    router.push(`/course?courseName=${course}&subject=${activeSubject}`)
  }


  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8">
        <Card className="border-border/50">
          <div className="flex items-center justify-center gap-4 p-6">
            {subjects.map((subject) => (
              <Button
                key={subject.id}
                variant={activeSubject === subject.id ? "default" : "outline"}
                onClick={() => {
                  setActiveSubject(subject.id)
                  if (subject.id === "science") setCurrentCourses(Object.keys(scienceTopics))
                  else if (subject.id === "history") setCurrentCourses(Object.keys(historyTopics))
                  else setCurrentCourses(Object.keys(mathTopics))
                }}
                className={"transition-all duration-300 " +(
                  activeSubject === subject.id ? subject.base + " " + subject.hover + " " + subject.active: "bg-background border border-input text-foreground hover:bg-accent")}
              >
                {subject.name}
              </Button>
            ))}
          </div>
        </Card>
      </header>

      {activeSubject && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center capitalize">{activeSubject} Lessons</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {
              currentCourses.map((course, index) => (
                <Card 
                  key={index}
                  className="aspect-square flex items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => coursePage(course)}
                >
                  {course}
                </Card>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}
