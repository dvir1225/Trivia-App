import React from "react"
import './Question.css'
import {decode} from 'html-entities';

export default function Question(props){
    const [selectedAnswer, setSelectedAnswer] = React.useState('')
    const correctAnswer = props.question.correctAnswer;
    const answers = props.question.incorrectAnswers;
    const randomNum = Math.floor(Math.random()*4)

    if(props.question.correctAnswer!== "" && answers.length<4){
        answers.splice(randomNum, 0, correctAnswer)
    }

    function handleClick(e){
        setSelectedAnswer(() => e.target.innerText)
        props.setCheckIfAnswered(prev => {
            prev[props.index] = true;
            return (
                [...prev]
            )
        })
    }
    
    function setAnswerClass(answer){
        if(!props.gameFinished){
            if(selectedAnswer===answer){
            return "question--answer selected-answer"
            } else {
                return "question--answer"
            }
        } else if (props.gameFinished){
            if(answer===correctAnswer){
                return "question--answer correct-answer"
            } if(selectedAnswer===answer && selectedAnswer!==correctAnswer){
                return "question--answer incorrect-answer"
            } else return "question--answer unselected-answer"
        }
    }
    
    const answerBtns = answers.map(answer => {
        return (
            <button 
            key={answer}
            className={setAnswerClass(answer)}
            onClick={handleClick}
            disabled={props.gameFinished}
            >{decode(answer)}</button>
        )}
    )

    React.useEffect(() => {
        if(props.gameFinished && selectedAnswer === correctAnswer){
            props.setCorrectAnswers(prev => {
                prev[props.index] = true;
                return (
                    [...prev]
                )
            })
        }
    }, [props.gameFinished])
    return (
        <div className="question">
            <h2 className="question--title">{decode(props.question.question)}</h2>
            <div className="question--answers">
                {answerBtns}
            </div>
        </div>
    )
}