"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Subject = "biology" | "chemistry" | "math"

export default function HomePage() {
  const [activeSubject, setActiveSubject] = useState<Subject>("biology")

  const subjects = [
    { id: "biology" as const, name: "bruh", base: "bg-green-500 text-white", hover: "hover:bg-green-500", active: "active:bg-green-500" },
    { id: "chemistry" as const, name: "Chemistry", base: "bg-blue-500 text-white", hover: "hover:bg-blue-500", active: "active:bg-blue-500" },
    { id: "math" as const, name: "Math", base: "bg-purple-500 text-white", hover: "hover:bg-purple-500",  active: "active:bg-purple-500" },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8">
        <Card className="border-border/50">
          <div className="flex items-center justify-center gap-4 p-6">
            {subjects.map((subject) => (
              <Button
                key={subject.id}
                variant={activeSubject === subject.id ? "default" : "outline"}
                onClick={() => setActiveSubject(subject.id)}
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
            {Array(8).fill(null).map((_, index) => (
              <Card
                key={index}
                className="aspect-square flex items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer"
              >
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
