import React from 'react';
import './App.css';
import Welcome from './components/Welcome'
import greenBlob from './green-blob.svg'
import yellowBlob from './yellow-blob.svg'

export default function App() {
  const [gameStarted, setGameStarted] = React.useState(false)
  const [difficulty, setDifficulty] = React.useState('select-difficulty')
  const [gameType, setGameType] = React.useState('select-type')
  const [questions, setQuestions] = React.useState([])

  function getQuestions(url){
    fetch(url)
        .then(res => res.json())
        .then(data => {
          setQuestions(() => data.results)})
  }

  function startQuiz(e){
    e.preventDefault();
    setGameStarted(true)
    if(difficulty === 'select-difficulty' || gameType === 'select-type'){
      console.log('Please choose quiz settings')
      setGameStarted(false)
    } else if (difficulty === "Any Difficulty" && gameType === "Any Type") {
      getQuestions('https://opentdb.com/api.php?amount=10')
    } else if (difficulty !== "Any Difficulty" && gameType === "Any Type"){
      getQuestions(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`)
    } else if (difficulty === "Any Difficulty" && gameType !== "Any Type"){
      getQuestions(`https://opentdb.com/api.php?amount=10&type=${gameType}`)
    } else {
      getQuestions(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=${gameType}`)
    }
  }
  
  return (
    <div className="App">
      <img className="yellowBlob" src={yellowBlob} alt="" />
      {!gameStarted && < Welcome 
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      gameType={gameType}
      setGameType={setGameType}
      startQuiz={startQuiz}
      />}
      <img className="greenBlob" src={greenBlob} alt="" />
    </div>
  );
}