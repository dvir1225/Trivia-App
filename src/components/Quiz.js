import React from "react";
import './Quiz.css';
import Question from "./Question";

export default function Quiz(props){    
    const [gameFinished, setGameFinished] = React.useState(false);
    const [checkIfAnswered, setCheckIfAnswered] = React.useState([]);
    const [correctAnswers, setCorrectAnswers] = React.useState([]);
    const questionsArr = props.questions

    React.useEffect(() => {
        if(questionsArr.length===10){
            questionsArr.forEach((question, index) => {
                setCheckIfAnswered(prev => prev.concat(false))
                setCorrectAnswers(prev => prev.concat(false))
            })
        }
    }, [questionsArr])
    console.log(correctAnswers)
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
        setCheckIfAnswered(prev => {
            prev.forEach(answer => answer=false)
        })
        setCorrectAnswers(prev => {
            prev.forEach(answer => answer=false)
        })
        props.setGameStarted(false)
        props.setDifficulty('select-difficulty')
        props.setGameType('select-type')
        props.setQuestions(props.createEmptyQuestions())
    }

    return(
        <div className="quiz">
            {props.questions[0].type==="" && 
            <p className='quiz--loading'>
            Loading quiz...
            </p>}
            {props.questions[0].type!=='' && 
            <div className="quiz--questions">
                {questions}
            </div>}
            {!gameFinished && props.questions[0].type!=='' && <button 
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