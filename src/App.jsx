import { useState, useEffect, useRef } from "react";
import QuizCard from "./components/QuizCard";
import PrizeTracker from "./components/PrizeTracker";
import { questions } from "./data";
import "./index.css";
function App() {
  const [gameQuestions, setGameQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const speechSynthesisRef = useRef(null);
  const introPlayedRef = useRef(false);

  const prizeMoney = [
    1000, 2000, 3000, 5000, 10000, 20000, 40000, 80000, 160000, 320000, 640000,
    10000000,
  ];

  useEffect(() => {
    if (introPlayedRef.current) return;

    const timer = setTimeout(() => {
      const introUtterance = new SpeechSynthesisUtterance(
        "This web is developed by Sisan Bhattarai for fun. Enjoy it!"
      );
      introUtterance.rate = 0.9;
      window.speechSynthesis.speak(introUtterance);
      introPlayedRef.current = true;
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, 12);
    const numberedQuestions = selectedQuestions.map((q, index) => ({
      ...q,
      id: index + 1,
    }));

    setGameQuestions(numberedQuestions);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted || !gameQuestions.length || gameOver) return;

    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
    }

    if (gameQuestions[currentQuestionIndex]) {
      const currentQuestion = gameQuestions[currentQuestionIndex];

      const questionUtterance = new SpeechSynthesisUtterance(
        currentQuestion.question
      );
      questionUtterance.rate = 0.9;
      questionUtterance.pitch = 1;

      questionUtterance.onend = () => {
        setTimeout(() => {
          const optionsUtterance = new SpeechSynthesisUtterance(
            `Options : ${currentQuestion.options.join(", ")}`
          );
          optionsUtterance.rate = 0.9;
          window.speechSynthesis.speak(optionsUtterance);
        }, 200);
      };

      speechSynthesisRef.current = questionUtterance;
      window.speechSynthesis.speak(questionUtterance);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentQuestionIndex, gameQuestions, gameStarted, gameOver]);

  const handleOptionSelect = (option) => {
    if (showResult) return;

    setSelectedOption(option);
    setShowResult(true);

    const isCorrect =
      option === gameQuestions[currentQuestionIndex].correctAnswer;
    const correctAnswer = gameQuestions[currentQuestionIndex].correctAnswer;

    window.speechSynthesis.cancel();

    const speechSequence = [{ text: ` ${option}`, rate: 0.9 }];

    if (isCorrect) {
      speechSequence.push({ text: "Correct!", rate: 1.0 });
    } else {
      speechSequence.push(
        { text: `Incorrect.  correct answer  ${correctAnswer}.`, rate: 1.0 },
        {
          text: "Don’t be sad! Even Google can’t help you now — better dial Sisan Bhattarai as soon as posible.",
          rate: 0.9,
        }
      );
    }

    const playSpeechSequence = (index = 0) => {
      if (index >= speechSequence.length) {
        if (isCorrect) {
          const newScore = prizeMoney[currentQuestionIndex];
          setScore(newScore);

          if (currentQuestionIndex === prizeMoney.length - 1) {
            setGameWon(true);
            setGameOver(true);

            const winUtterance = new SpeechSynthesisUtterance(
              "Congratulations! You've won 1 crore rupees!"
            );
            window.speechSynthesis.speak(winUtterance);
          } else {
            setTimeout(() => {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              setSelectedOption(null);
              setShowResult(false);
            }, 1000);
          }
        } else {
          setGameOver(true);
        }
        return;
      }

      const { text, rate } = speechSequence[index];
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.onend = () => {
        setTimeout(() => playSpeechSequence(index + 1), 200);
      };
      window.speechSynthesis.speak(utterance);
    };

    playSpeechSequence();
  };

  const resetGame = () => {
    window.speechSynthesis.cancel();
    setGameStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setSelectedOption(null);
    setShowResult(false);
    setGameQuestions([]);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black flex flex-col items-center justify-center p-4">
        <div className="card-gradient rounded-2xl shadow-2xl overflow-hidden border border-sky-500 animate-pulse-blue p-8 max-w-2xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white glow-text">
            Quiz Millionaire
          </h1>
          <p className="text-xl text-center mb-8 text-gray-200">
            Answer 12 questions correctly to win 1 crore (10 million) rupees!
          </p>
          <div className="flex justify-center">
            <button
              onClick={startGame}
              className="px-8 py-4 btn-green text-white font-bold rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Quiz
            </button>
          </div>
          <div className="mt-8 text-center text-gray-300">
            <p>100+ questions from different categories</p>

            <p>Each game features 12 random questions</p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sky-400 font-medium">
              Developed by Sisan Bhattarai
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-3/4">
          {gameQuestions.length > 0 && (
            <QuizCard
              question={gameQuestions[currentQuestionIndex]}
              onOptionSelect={handleOptionSelect}
              selectedOption={selectedOption}
              showResult={showResult}
              gameOver={gameOver}
              gameWon={gameWon}
              resetGame={resetGame}
              currentPrize={prizeMoney[currentQuestionIndex]}
              score={score}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={prizeMoney.length}
            />
          )}
        </div>

        <div className="w-full md:w-1/4">
          <PrizeTracker
            prizeMoney={prizeMoney}
            currentQuestionIndex={currentQuestionIndex}
          />
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sky-400 text-sm">Developed by Sisan Bhattarai</p>
      </div>
    </div>
  );
}

export default App;
