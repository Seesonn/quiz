import { useState, useEffect } from "react";

const Timer = ({ duration, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (timeLeft <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isActive]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, isActive]);

  const percentage = (timeLeft / duration) * 100;

  let colorClass = "from-green-500 to-green-400";
  if (timeLeft <= 10) {
    colorClass = "from-orange-500 to-orange-400";
  } else if (timeLeft <= 20) {
    colorClass = "from-sky-500 to-sky-400";
  }

  return (
    <div className="relative w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center shadow-lg">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${colorClass} rounded-full transition-all duration-300`}
        style={{
          clipPath: `polygon(50% 50%, 50% 0%, ${
            percentage <= 25 ? "50%" : "100%"
          } 0%, ${percentage <= 50 ? "50%" : "100%"} ${
            percentage <= 50 ? "0%" : "100%"
          }, ${percentage <= 75 ? "50%" : "100%"} 100%, ${
            percentage <= 100 ? (percentage <= 75 ? "0%" : "0%") : "100%"
          } ${percentage <= 75 ? "100%" : "50%"}, 0% ${
            percentage <= 25 ? "50%" : "0%"
          })`,
        }}
      ></div>
      <div className="absolute inset-1 bg-gray-800 rounded-full flex items-center justify-center">
        <span className="text-white font-bold">{timeLeft}</span>
      </div>
    </div>
  );
};

export default Timer;
