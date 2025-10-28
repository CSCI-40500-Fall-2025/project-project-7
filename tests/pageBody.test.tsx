import {render, screen} from '@testing-library/react'
import Home from '@/app/homepage/pageBody'
import '@testing-library/jest-dom'


it('Testing', () =>{
    render(<Home />)

    const myElem = screen.getByText('StudyUp is an educational platofmr that is designed to help make learning engaging and accessible. Inspired by Duolingo, StudyUp allows users to learn different subjects with a variety of topics through lessons and interactive challenges. Regardless of the reason why you want to study a topic, StudyUp allows you to learn at your own pace through hands-on practice, feedback, and step-by-step explanations.')

    expect(myElem).toBeInTheDocument()
})