


type CardObject = {
    image: string,
    title: string,
    text: string
}

function Card({image, title, text}: CardObject) {
    return (
        <div className="flex flex-col max-w-sm border-2 rounded-md shadow-md">
            <img src={image} className="w-full h-48 object-cover"/>

            <div className="flex flex-col p-6 text-center items-center">
                <h2 className="text-xl font-bold mb-5">{title}</h2>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default function PageBody() {
    const descriptions = [
        {image: "./images/Body/feedbackImg.png", title: "Instant Feedback", text: "When a learner gets the answer wrong or would like to learn how to solve a problem, StudUp will immediately provide a detailed explaination on how to reach the solution"},
        {image: "./images/Body/accessability.png", title: "Accessability", text: "StudyUp is completely free and its provides all the necessary resources the the learners need to be sucessful"},
        {image: "./images/Body/personalizedLearningImg.png", title: "Personalized Learning", text: "Learners could learn at their own pace, figuring out what they need to practice more on before continuing with the rest of the topics"}
    ];

    return (
        <div className="flex flex-col items-center px-5 space-y-14 mt-5 md:px-60">

            <div className="flex flex-col text-center">
                <h2 className="text-3xl font-bold mb-4 text-blue-600">
                    About
                </h2>
                <p className="text-lg">
                    StudyUp is an educational platofmr that is designed to help make learning engaging and accessible. Inspired
                    by Duolingo, StudyUp allows users to learn different subjects with a variety of topics through lessons
                    and interactive challenges. Regardless of the reason why you want to study a topic, StudyUp allows you to learn
                    at your own pace through hands-on practice, feedback, and step-by-step explanations.
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center max-w-5xl md:space-x-12">
                <div className="flex flex-col text-center md:text-left mt-8">
                    <h2 className="text-3xl font-bold mb-4 text-blue-600">
                        Our Mission
                    </h2>
                    <p className="text-lg">
                        Our goal is to make education free and accessible for everyone around the world. We hope that
                        through our learning platform, users could take control of their own growth and success
                    </p>
                </div>
                <img src="./images/Body/BodyImage.png" className="flex-1 max-h-80 object-contain rounded-lg shadow-md"/>
            </div>

            <div className="flex flex-col">
                <h2 className="text-3xl font-bold mb-4 text-blue-600 text-center mt-5">
                    Why Study Up Works?
                </h2>
                <div className="flex flex-col space-x-4 space-y-3 md:flex-row">
                    {
                        descriptions.map((item, idx) => (
                            <Card key={idx} image={item.image} title={item.title} text={item.text}/>
                        ))
                    }
                </div>

            </div>
        </div>
    );
}