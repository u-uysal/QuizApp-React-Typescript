import React, { useState } from 'react';
import QuestionCard from "./components/QuestionCard"
import { fetchQuizQuestions } from "./API"
import { Difficulty, QuestionState } from "./API"

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {
  const [loading, setLoading] = useState(false)
  const [gameOver, setGameOver] = useState(true)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])



  const TOTAL_QUESTIONS = 10;
  console.log(questions)




  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    if (!gameOver) {
      //users answer
      const UserAnswer = e.currentTarget.value
      // check if it is true
      const Iscorrect = questions[number].correct_answer === UserAnswer;

      if (Iscorrect) {
        setScore(prev => prev + 1)
      }

      // save answer in the array for user answers

      const AnswerObject = {
        question: questions[number].question,
        answer: UserAnswer,
        correct: Iscorrect,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, AnswerObject])
    }

  }

  const nextQuestion = () => {
    //If we are not the last question

    const nextQuestionNumber = number + 1;
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestionNumber)
    }
  }

  console.log(userAnswers)
  return (
    <div className="App">
      <h1>React Quiz App</h1>

      {/* hide start button in case of these situations */}
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? <button className="start" onClick={startTrivia}>Start</button> : null
      }

      {/* hide score if game is over */}

      {!gameOver ? <p className="score">Score {score}</p> : null}

      {/* hide if we dont wait anything */}

      {loading ? <p>Loading questions...</p> : null}


      {!loading && !gameOver ? <QuestionCard
        questionsNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}


      /> : null}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1
        ? <button className='next' onClick={nextQuestion}>Next Question</button> : null}
    </div>
  );
}

export default App;
