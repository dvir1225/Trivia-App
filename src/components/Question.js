import React from "react"
import './Question.css'
export default function Question(props){
    const correctAnswer = props.question.correct_answer;
    const incorrectAnswers = props.question.incorrect_answers;
    const answers = incorrectAnswers.concat(correctAnswer);

    (function shuffleAnswers(){
        for (let i = 0; i<answers.length; i++){
            let randomNum = Math.floor(Math.random() * answers.length);
            let tempAnswer = "";
            let currentAnswer = answers[i];
            let randomAnswer = answers[randomNum];
            tempAnswer = currentAnswer;
            answers[i] = randomAnswer;
            answers[randomNum] = tempAnswer;
        }
    })()
    
    const answerBtns = answers.map(answer => {
        return (
            <button 
            key={answer}
            className="question--answer"
            >{answer}</button>
        )}
    )
    return (
        <div className="question">
            <h2 className="question--title">{props.question.question}</h2>
            <div className="question--answers">
                {answerBtns}
            </div>
        </div>
    )
}