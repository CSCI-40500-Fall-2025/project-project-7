# Study Up

## Product Vision
Study Up is an educational platform that is designed to help users learn different subjects such as math, science, and history. Inspired by Duolingo, Study Up allows users to either learn a subject based on a specific grade level or pick individual topics to learn.
Similar to Duolingo, users will have to complete nodes to learn and master a subject. Each node will provide different types of questions, such as sort response or multiple choice, that must completed. Each time the user gets a question wrong, they will be shown the solution as well as the steps to reach that solution. At the end each topic, there will be an option that allows the users to take a test to check their understanding. Upon completion, the user is able to continue and access more advanced learning.

So far, there are only three subjects that the user can choose - Math, Science, and History. Once the user has clicked on the subject of their choice, they will be presented with a few courses that they can learn from the choosen subject. Once they picked a course, they will then see a topics that they can learn from that course.
Prototype features very basic subject selection.
https://test-nine-lovat-83.vercel.app/


## Layered Software Architecture
1. The most important qualitites for our software is product lifetime, number of users, and software compatiblity. Our goal with Study Up is to ensure that users are able to learn the topics they want whenever they want and for how ever long they want. We will have to constantly update and improve the features of the product, and because of these reasons, we have to ensure Study Up can last for a long time. Because Study Up is supposed to be a free learning platform for everyone, there can potentially be a lot of users which can cause problems to the system. We have to ensure that our code is efficient as possible and that it can handle many concurrent users at the same time. It also needs to be able to store lots of data from the user. Since Study Up is supposed to be available for everyone, we need to ensure that the the product is avilable and good to use in different systems. 

2. Study Up will most likely have 4 layers - user interface, authentication and server, application functionality, and database management

3. The user interface will be a web browser. Authentication and server will handle user login in information when they first load into the website. The server will manage the website to ensure that it can handle multiple users being on at the same time. The application functionality will ensure that Study Up is working the way it is supposed to. There should be quizzes when the user wants to test themselves. Courses should appear, and the webpage should be as responsive as possible. The database will use a relation SQL database to store user information such as emails, passwords, usernames, and progress.
