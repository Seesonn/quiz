const PrizeTracker = ({ prizeMoney, currentQuestionIndex }) => {
  return (
    <div className="card-gradient rounded-2xl shadow-2xl overflow-hidden border border-sky-500">
      <div className="p-4">
        <h3 className="text-xl font-bold text-center text-white mb-4 glow-text">Prize Ladder</h3>
        <div className="flex flex-col-reverse">
          {prizeMoney.map((prize, index) => {
            const isCurrentQuestion = index === currentQuestionIndex
            const isPassed = index < currentQuestionIndex

            let bgClass = "py-2 px-4 mb-2 rounded-lg transition-all duration-300"

            if (isCurrentQuestion) {
              bgClass += " bg-gradient-to-r from-orange-500 to-orange-400 text-gray-900 font-bold animate-pulse-orange"
            } else if (isPassed) {
              bgClass += " bg-gradient-to-r from-green-700 to-green-600 text-white"
            } else {
              bgClass += " bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300"
            }

            // Milestone levels (guaranteed money)
            if (index === 4 || index === 9 || index === 14) {
              bgClass += " border-l-4 border-r-4 border-sky-400"
            }

            return (
              <div key={index} className={bgClass}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{prizeMoney.length - index}</span>
                  <span className={`font-bold ${isCurrentQuestion ? "text-gray-900" : ""}`}>
                    NRs. {prize.toLocaleString()}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PrizeTracker
