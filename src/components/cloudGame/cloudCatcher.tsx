import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cloudData, type CloudData } from './cloudData'
import { weatherPredictions, type WeatherPrediction } from "./data/weatherData"

interface GameState {
  currentLevel: number
  score: number
  currentScenario: GameScenario | null
  userPrediction: string | null
  feedback: string | null
}

interface GameScenario {
  clouds: CloudData[]
  correctPrediction: WeatherPrediction
}

const generateScenario = (level: number): GameScenario => {
  // Logic to generate a scenario based on the current level
  // This is a simplified version; you'd want to make this more complex
  const cloudKeys = Object.keys(cloudData)
  const randomCloudKey = cloudKeys[Math.floor(Math.random() * cloudKeys.length)]
  const cloud = cloudData[randomCloudKey as keyof typeof cloudData]
  const prediction = weatherPredictions[Math.floor(Math.random() * weatherPredictions.length)]

  return {
    clouds: [cloud],
    correctPrediction: prediction,
  }
}

export function CloudCatcherGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    currentScenario: null,
    userPrediction: null,
    feedback: null,
  })

  useEffect(() => {
    startNewRound()
  }, [gameState.currentLevel])

  const startNewRound = () => {
    const newScenario = generateScenario(gameState.currentLevel)
    setGameState((prevState) => ({
      ...prevState,
      currentScenario: newScenario,
      userPrediction: null,
      feedback: null,
    }))
  }

  const handlePrediction = (prediction: string) => {
    if (!gameState.currentScenario) return

    const isCorrect = prediction === gameState.currentScenario.correctPrediction.condition
    const newScore = gameState.score + (isCorrect ? 10 : 0)
    const feedback = isCorrect
      ? "Correct! Great weather prediction!"
      : `Not quite. The correct prediction was ${gameState.currentScenario.correctPrediction.condition}.`

    setGameState((prevState) => ({
      ...prevState,
      score: newScore,
      userPrediction: prediction,
      feedback,
    }))

    setTimeout(() => {
      setGameState((prevState) => ({
        ...prevState,
        currentLevel: prevState.currentLevel + 1,
      }))
    }, 2000)
  }

  if (!gameState.currentScenario) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cloud Catcher: Weather Prediction Challenge</h2>
      <p className="text-gray-600 mb-4">
        Level: {gameState.currentLevel} | Score: {gameState.score}
      </p>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Current Cloud Formation:</h3>
        {gameState.currentScenario.clouds.map((cloud, index) => (
          <div key={index} className="mb-2">
            <p className="font-medium">{cloud.name}</p>
            <img src="/placeholder.svg" alt={cloud.name} className="w-full h-48 object-cover rounded-md" />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Predict the Weather:</h3>
        <div className="grid grid-cols-2 gap-4">
          {weatherPredictions.map((prediction) => (
            <motion.button
              key={prediction.condition}
              className={`p-3 rounded-md text-center transition-colors ${
                gameState.userPrediction === prediction.condition
                  ? gameState.userPrediction === gameState.currentScenario?.correctPrediction.condition
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handlePrediction(prediction.condition)}
              disabled={gameState.userPrediction !== null}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {prediction.condition}
            </motion.button>
          ))}
        </div>
      </div>

      {gameState.feedback && (
        <motion.div
          className="p-4 bg-blue-100 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-blue-800">{gameState.feedback}</p>
        </motion.div>
      )}
    </div>
  )
}

export default CloudCatcherGame

