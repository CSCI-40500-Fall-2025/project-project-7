
"use client"

import PageHeader from "../homepage/pageHeader"
import CourseSpecification from "./courseSpecification"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

import CourseMetaData from "@/topics/courseData.json"



type Subject = "All Subjects" | "Science" | "History" | "Math"


export default function CoursePage() {
  const [activeSubject, setActiveSubject] = useState<Subject>("All Subjects");
  const [clickedOnCourse, setClickedOnCourse] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<{[key: string]: string}>();
   
  const courses = 
    (activeSubject === "All Subjects") 
      ? CourseMetaData
      : CourseMetaData.filter((courseData) => courseData.subject === activeSubject);

    
  function handleActiveSubject(subject: Subject) {
    setActiveSubject(pActiveSubject => subject );
  }

  function handleClickedOnCourse() {
    setClickedOnCourse(!clickedOnCourse);
  }

  function handleCourseSelection(course: {[key: string]: string}) {
    setClickedOnCourse(!clickedOnCourse);
    setSelectedCourse(course);
  }


  return (
    <>
      <PageHeader/>

      {clickedOnCourse === false && 
        <div className="px-2 py-3 max-w-7xl mx-auto">
          <div className="mb-5">
            <select onChange={(e) => handleActiveSubject(e.target.value as Subject)}
                    className="border border-black rounded-lg px-5 py-3"
              >
              <option value="All Subjects" defaultValue="All Subjects">All Subjects</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Math">Math</option>
            </select>
          </div>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {courses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg duration-500 cursor-pointer"
                    onClick={() => handleCourseSelection(course)}
              >
                  <img src={course.image} alt="course image" className="w-full object-cover h-40"/>
                  <div className="p-4">
                    <h2 className="text-center font-bold text-sm mt-5">
                      {course.name}
                    </h2>
                  </div>
              </Card>
            ))}
          </div>
        </div>
      }

      {clickedOnCourse === true 
        && 
        <CourseSpecification 
          subject={selectedCourse!.subject} 
          description={selectedCourse!.description}
          courseName={selectedCourse!.name}
          handleClickedOnCourse={handleClickedOnCourse}
          />
        }
      
    </>
  );
}
