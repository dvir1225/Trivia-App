import React from 'react';
import './App.css';
import Welcome from './components/Welcome'

export default function App() {
  const [gameStarted, setGameStarted] = React.useState(false)
  const [difficulty, setDifficulty] = React.useState('select-difficulty')
  const [gameType, setGameType] = React.useState('select-type')
  const [questions, setQuestions] = React.useState([])

  function startQuiz(e){
    e.preventDefault();
    setGameStarted(true)
    if(difficulty === 'select-difficulty' || gameType === 'select-type'){
      console.log('Please choose quiz settings')
      setGameStarted(false)
    } else if (difficulty === "Any Difficulty" && gameType === "Any Type") {
      fetch('https://opentdb.com/api.php?amount=10')
        .then(res => res.json())
        .then(data => {
          setQuestions(() => data.results)})
    } else if (difficulty !== "Any Difficulty" && gameType === "Any Type"){
      fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`)
        .then(res => res.json())
        .then(data => {
          setQuestions(() => data.results)})
    } else if (difficulty === "Any Difficulty" && gameType !== "Any Type"){
      fetch(`https://opentdb.com/api.php?amount=10&type=${gameType}`)
        .then(res => res.json())
        .then(data => {
          setQuestions(() => data.results)})
    } else {
      fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=${gameType}`)
        .then(res => res.json())
        .then(data => {
          setQuestions(() => data.results)})
    }
  }

  return (
    <div className="App">
      {!gameStarted && < Welcome 
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      gameType={gameType}
      setGameType={setGameType}
      startQuiz={startQuiz}
      />}
    </div>
  );
}