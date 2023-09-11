import React, { useEffect, useState } from "react";
import { data } from "./data";

function App() {
  const [showScore, setShowScore] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [userAnswers, setUserAnswers] = useState(Array(data.length).fill(""));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (questionNumber === data.length - 1) {
        clearInterval(interval);
        setShowScore(true); 
      } else {
        setQuestionNumber(questionNumber + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [questionNumber]);

  useEffect(() => {
    console.log("Selected Option: " + selectedOption);
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[questionNumber] = selectedOption;
    setUserAnswers(updatedUserAnswers);
  }, [selectedOption, questionNumber]);

  useEffect(() => {

    if (showScore) {
      let score = 0;
      for (let i = 0; i < data.length; i++) {
        if (userAnswers[i] === "") {
   
          continue;
        }
        if (Number(userAnswers[i]) === data[i].answer) {
          score++;
        }
      }
      setScore(score);
      console.log("User selected options:", userAnswers);
      console.log("Score:", score);
    }
  }, [showScore, userAnswers]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
       {showScore ? (
        <div id="score">
          <h3>
            You scored {score} out of {data.length}
          </h3>
        </div>
      ) : null}
      <div id="quiz">
        <h3>Question {questionNumber + 1}:</h3>
        <h4>{data[questionNumber].question}</h4>
        <div className="options">
          {data[questionNumber].options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name="opt"
                value={option}
                checked={option === selectedOption}
                onChange={() => handleOptionSelect(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
     
    </div>
  );
}

export default App;
