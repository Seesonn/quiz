
import Question from "./Question"
import Options from "./Options"
import Timer from "./Timer"

const QuizCard = ({
  question,
  onOptionSelect,
  selectedOption,
  showResult,
  gameOver,
  gameWon,
  resetGame,
  currentPrize,
  score,
  questionNumber,
  totalQuestions,
}) => {
  if (gameOver) {
    return (
      <div className="card-gradient rounded-2xl shadow-2xl overflow-hidden border border-sky-500 animate-pulse-blue">
        <div className="p-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white glow-text">
            {gameWon ? "Congratulations!" : "Game Over!"}
          </h2>
          <div className="mb-8">
            <p className="text-2xl text-orange-400 font-bold mb-2">
              {gameWon ? "You won the grand prize!" : "Better luck next time!"}
            </p>
            <p className="text-3xl text-green-400 font-bold">You won: NRs. {score.toLocaleString()}</p>
          </div>
          <button
            onClick={resetGame}
            className="px-8 py-3 btn-green text-white font-bold rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card-gradient rounded-2xl shadow-2xl overflow-hidden border border-sky-500">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="btn-blue px-4 py-2 rounded-full">
            <span className="text-white font-bold">
              Question {questionNumber}/{totalQuestions}
            </span>
          </div>
          <div className="btn-orange px-4 py-2 rounded-full">
            <span className="text-gray-900 font-bold">NRs. {currentPrize.toLocaleString()}</span>
          </div>
          <Timer duration={30} isActive={!showResult} />
        </div>

        <div className="mb-2 text-sm text-gray-300 text-center">
          <span className="bg-gray-800 px-2 py-1 rounded">Category: {question.category}</span>
        </div>

        <Question question={question.question} />

        <Options
          options={question.options}
          onOptionSelect={onOptionSelect}
          selectedOption={selectedOption}
          correctAnswer={question.correctAnswer}
          showResult={showResult}
        />
      </div>
    </div>
  )
}

export default QuizCard
