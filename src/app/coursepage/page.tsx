
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
  
  // filter the courses based on subjects
  const courses = 
    (activeSubject === "All Subjects") 
      ? CourseMetaData
      : CourseMetaData.filter((courseData) => courseData.subject === activeSubject);

  
  // handles stores the current filter selection
  function handleActiveSubject(subject: Subject) {
    setActiveSubject(pActiveSubject => subject );
  }

  // handles changing flag if a course was clicked on
  function handleClickedOnCourse() {
    setClickedOnCourse(!clickedOnCourse);
  }

  // handles storing the course that is clicked on and calls the flag handler
  function handleCourseSelection(course: {[key: string]: string}) {
    setSelectedCourse(course);
    setClickedOnCourse(!clickedOnCourse);

    console.log(course.subject);
    console.log(course.name);
  }


  return (
    <>
      <PageHeader/>

      {/* Displays all the courses the are available */}
      {clickedOnCourse === false && 
        <div className="px-2 py-3 max-w-7xl mx-auto">
          {/* drop down filer options */}
          <div className="mb-5">
            <select onChange={(e) => handleActiveSubject(e.target.value as Subject)}
                    className="border border-black rounded-lg px-5 py-3"
                    value={activeSubject}
              >
              <option value="All Subjects" defaultValue="All Subjects">All Subjects</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Math">Math</option>
            </select>
          </div>

          {/* Creates all the course card components */}
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {courses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg duration-500 cursor-pointer"
                    onClick={() => handleCourseSelection(course)}
              >
                  <img src={course.image} alt="course image" className="w-full object-cover h-50"/>
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

      {/* Displays a more detailed description of the selected course */}
      {clickedOnCourse === true 
        && 
        <CourseSpecification 
          subject={selectedCourse!.subject} 
          description={selectedCourse!.description}
          courseName={selectedCourse!.name}
          courseId={selectedCourse!["id"]}
          handleClickedOnCourse={handleClickedOnCourse}
        />
      }
    </>
  );
}
