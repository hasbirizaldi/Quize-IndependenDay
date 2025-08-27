import React, { useState } from "react";
import { questions } from "./data/data";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const NextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleAnswerOption = (index, isCorrect) => {
    setAnswered(true);
    setSelectedAnswer(index);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg bg-white p-5 rounded-lg shadow-lg">
        <h1 className="p-2 border-2 border-amber-400 text-center font-bold mb-2 text-xl rounded-lg bg-amber-200">Quiz Sejarah Kemerdekaan Indonesia</h1>

        {showScore ? (
          <div className="text-center text-xl font-semibold">
            Your Score
            <div className="mt-4 text-3xl mb-3  text-rose-900">{(score / questions.length) * 100}/100</div>
            <div className="uppercase">{score < 15 ? "Anda Bodoh Sekali" : "Mantap"}</div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-2">{questions[currentQuestion].questionText}</div>

            {questions[currentQuestion].answerOptions.map((option, index) => (
              <div key={index} className="flex justify-center">
                <button
                  onClick={() => handleAnswerOption(index, option.isCorrect)}
                  className={`${answered && selectedAnswer === index ? "bg-red-200" : ""} block w-[90%] py-1 mt-2 text-sm rounded border border-gray-300 bg-gray-50 cursor-pointer `}
                >
                  {option.answerText}
                </button>
              </div>
            ))}

            <p className="text-center mt-7 text-sm text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </p>

            <div className="grid">
              <button onClick={NextQuestion} disabled={!answered} className={`text-white py-2 text-sm rounded-lg mt-5 cursor-pointer ${answered ? "bg-rose-950" : "bg-gray-700"}`}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
