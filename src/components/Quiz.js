import React from "react";
import Question from "./Question";
export default function Quiz(props){    
    const questions = props.questions.map((question, index) => {

        return(
          < Question 
          question={props.questions[index]}
          key={index} 
          />
        )
      })

    return(
        <div className="quiz">
            {props.questions[0].type==="" && <p className='loading'>
            Loading quiz...
            </p>}
            {props.questions[0].type!=='' && <div className="questions">{questions}</div>}
            {props.questions[0].type!=='' && <button className='questions--submit'></button>}
        </div>
    )
}