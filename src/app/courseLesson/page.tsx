

import { NavigationBar } from "../homepage/pageHeader";
import { loadCourseStructure, findingError } from "../api/winston/logger"
import CourseLessonClient from "../courseLesson/courseLesson"



export interface CourseUnitStructure {
    "Unit Title": string;
    Topics: string[];
}


/**
 * Retrieves the data on all the topics in the selected course
 * 
 * @param courseId - a string representing the id of the course
 * @returns a promise of a dictionary that represents the units and topics of the course
 */
async function getCourseTopicData(courseId: string): Promise<Record<string, CourseUnitStructure>> {
    const courseLessonData = await import(`@/topics/courseStructure/${courseId}.json`);
    return courseLessonData.default;
}


export default async function CourseLesson({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
    const search = await searchParams;
    const courseId = search.courseName as string;
    
    console.log(courseId);

    const courseLessonData = await getCourseTopicData(courseId);
    await loadCourseStructure(); // log an error trying to get course structure
    await findingError(); // log a bug (placeholder);
    // console.log(Object.keys(courseLessonData));

    return (
        <>
            <NavigationBar/>
                
            <CourseLessonClient courseLessonData={courseLessonData}/>
        </>
    )

}