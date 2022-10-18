import React from "react";
import './Quiz.css';
import Question from "./Question";

export default function Quiz(props){    
    const [gameFinished, setGameFinished] = React.useState(false);
    const [checkIfAnswered, setCheckIfAnswered] = React.useState(createFalseArr);
    const [correctAnswers, setCorrectAnswers] = React.useState(createFalseArr);

    const questionsArr = props.questions

    function createFalseArr(){
        let falseArr = []
        for(let i=0; i<props.questions.length; i++){
            falseArr.push(false)
        } return falseArr
    }
    
    const questions = props.questions.map((question, index) => {
        return(
          < Question 
          question={props.questions[index]}
          key={index} 
          index={index}
          setCheckIfAnswered={setCheckIfAnswered}
          setCorrectAnswers={setCorrectAnswers}
          gameFinished={gameFinished}
          />
        )
      })
    
    function finishGame() {
        if(checkIfAnswered.every(answer => answer===true)){
            setGameFinished(true)
        }
    }

    function countCorrectAnswers(){
        let result = 0
        correctAnswers.forEach(answer => {
            if(answer===true){
                result += 1
            }
        })
        return `${result}/${questionsArr.length}`
    }

    function restartGame(){
        setGameFinished(false);
        setCheckIfAnswered(createFalseArr)
        setCorrectAnswers(createFalseArr)
        props.setGameStarted(false)
        props.setDifficulty('select-difficulty')
        props.setQuestions(props.createEmptyQuestions())
    }

    return(
        <div className="quiz">
            {props.questions.length!==10 && 
            <p className='quiz--loading'>
            Loading quiz...
            </p>}
            {props.questions[0].difficulty!=="select-difficulty" && 
            <div className="quiz--questions">
                {questions}
            </div>}
            {!gameFinished && props.questions[0].difficulty!=="select-difficulty" && <button 
            className='quiz--submit'
            onClick={finishGame}>
                Check Answers</button>}
            {gameFinished && <span>You scored {countCorrectAnswers()} correct answers!</span>}
            {gameFinished && <button
            className="quiz--submit"
            onClick={restartGame}>
                Play Again</button>}
        </div>
    )
}