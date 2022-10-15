import React from "react";
import "./Welcome.css"

export default function Welcome(props) {
    if(!props.gameStarted){
    return(
        <div className="welcome">
            <h1 className="welcome--title">Quizzical</h1>
            <span className="welcome--subtitle">Choose your game preferences</span>
            <form className="welcome--form">
                <div className="welcome--selections">
                    <select 
                    value={props.difficulty}
                    onChange={(e) => props.setDifficulty(e.target.value)}
                    >
                        <option value="select-difficulty">Select Difficulty</option>
                        <option value="Any Difficulty">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <select
                    value={props.gameType}
                    onChange={(e) => props.setGameType(e.target.value)}>
                        <option value="select-type">Select Quiz Type</option>
                        <option value="Any Type">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select>
                </div>
                <button 
                    className="welcome--submit"
                    onClick={(e) => props.startQuiz(e)}
                >Start Quiz</button>
            </form>
        </div>
    )}
}