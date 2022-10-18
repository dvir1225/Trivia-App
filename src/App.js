import React from 'react';
import './App.css';
import Welcome from './components/Welcome'
import greenBlob from './green-blob.svg'
import yellowBlob from './yellow-blob.svg'
import Quiz from './components/Quiz'

export default function App() {
  const [gameStarted, setGameStarted] = React.useState(false)
  const [difficulty, setDifficulty] = React.useState('select-difficulty')
  const [questions, setQuestions] = React.useState(createEmptyQuestions())

    function createEmptyQuestions(){
    let emptyQuestions = []
    for (let i = 0; i<10; i++){
      emptyQuestions.push({
        category: '',
        correctAnswer: '',
        difficulty: '',
        incorrectAnswers: ['', '', ''],
        question: '',
      })
      return emptyQuestions;
    }
  }
  
  function getQuestions(url){
    fetch(url)
        .then(res => res.json())
        .then(data => {
          setQuestions(data)
          setGameStarted(true)
        })
  }

  function startQuiz(e){
    e.preventDefault();
    if(difficulty === 'select-difficulty'){
      alert('Please select quiz difficulty')
    } else {
      getQuestions(`https://the-trivia-api.com/api/questions?limit=10&region=IL&difficulty=${difficulty}`)
    }
  }

  return (
    <div className="App">
      {/* <img className="yellowBlob" src={yellowBlob} alt="" /> */}
      {!gameStarted && < Welcome 
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      startQuiz={startQuiz}
      />}
      {gameStarted &&
      <Quiz 
      questions={questions}
      gameStarted={gameStarted}
      setGameStarted={setGameStarted}
      setDifficulty={setDifficulty}
      setQuestions={setQuestions}
      createEmptyQuestions={createEmptyQuestions} />}
      {/* <img className="greenBlob" src={greenBlob} alt="" /> */}
    </div>
  );
}