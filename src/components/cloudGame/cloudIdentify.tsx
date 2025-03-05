import { useState } from "react";
import { motion } from "framer-motion";

interface Question {
  image: string;
  correctAnswer: string;
  options: string[];
}

const questions: Question[] = [
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cloudposter.jpg-m51L6bwRDiEkL2UF09TQ0jOXq0a14r.jpeg",
    correctAnswer: "Cirrus",
    options: ["Cirrus", "Stratus", "Cumulus", "Altocumulus"],
  },
  // Add more questions here
];

function CloudIdentify() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    return (
      <motion.div
        className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Game Complete!</h2>
        <p className="text-xl mb-6">
          Your score: {score} out of {questions.length}
        </p>
        <motion.button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Identify the Cloud Type</h2>
      <p className="text-gray-600 mb-4">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <div className="mb-6">
        <img
          src={questions[currentQuestion].image || "/placeholder.svg"}
          alt="Cloud for identification"
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {questions[currentQuestion].options.map((option) => (
          <motion.button
            key={option}
            className={`p-3 rounded-md text-center transition-colors ${
              selectedAnswer === option
                ? option === questions[currentQuestion].correctAnswer
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default CloudIdentify;
