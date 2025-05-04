
import { useEffect, useState } from "react"

const Options = ({ options, onOptionSelect, selectedOption, correctAnswer, showResult }) => {
  const [delayedShowResult, setDelayedShowResult] = useState(false)

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        setDelayedShowResult(true)
      }, 2000)

      return () => clearTimeout(timer)
    } else {
      setDelayedShowResult(false)
    }
  }, [showResult])

  const getOptionClass = (option) => {
    const baseClass =
      "relative flex items-center p-4 md:p-5 rounded-xl mb-4 cursor-pointer transition-all duration-300 border-2 text-xl md:text-2xl font-medium transform hover:scale-102"

    if (!delayedShowResult) {
      return `${baseClass} bg-gradient-to-r from-gray-800 to-gray-700 border-sky-600 text-white hover:border-sky-400 hover:shadow-sky-400/20 hover:shadow-lg`
    }

    if (option === correctAnswer) {
      return `${baseClass} bg-gradient-to-r from-green-700 to-green-600 border-green-400 text-white animate-pulse-green`
    }

    if (option === selectedOption && option !== correctAnswer) {
      return `${baseClass} bg-gradient-to-r from-orange-700 to-orange-600 border-orange-400 text-white`
    }

    return `${baseClass} bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600 text-gray-400`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option, index) => (
        <div
          key={index}
          className={getOptionClass(option)}
          onClick={() => onOptionSelect(option)}
          style={{ transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gradient-to-r from-sky-600 to-blue-600 rounded-full mr-3 md:mr-4 text-white font-bold text-lg">
            {["A", "B", "C", "D"][index]}
          </div>
          <span>{option}</span>

          {delayedShowResult && option === correctAnswer && (
            <div className="absolute inset-0 border-2 border-green-400 rounded-xl pointer-events-none"></div>
          )}

          {delayedShowResult && option === selectedOption && option !== correctAnswer && (
            <div className="absolute inset-0 border-2 border-orange-400 rounded-xl pointer-events-none"></div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Options
