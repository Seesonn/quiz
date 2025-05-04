const Question = ({ question }) => {
  return (
    <div className="bg-gradient-to-r from-sky-900 to-blue-800 p-6 rounded-xl mb-6 shadow-lg border border-sky-400 glow-blue">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center">{question}</h2>
    </div>
  )
}

export default Question
