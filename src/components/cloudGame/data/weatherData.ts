export interface WeatherPrediction {
    condition: string
    description: string
  }
  
  export const weatherPredictions: WeatherPrediction[] = [
    {
      condition: "Sunny",
      description: "Clear skies and bright sunshine.",
    },
    {
      condition: "Partly Cloudy",
      description: "A mix of sun and clouds.",
    },
    {
      condition: "Overcast",
      description: "Cloudy skies with no visible sun.",
    },
    {
      condition: "Light Rain",
      description: "Slight precipitation, possibly intermittent.",
    },
    {
      condition: "Heavy Rain",
      description: "Substantial rainfall, potentially continuous.",
    },
    {
      condition: "Thunderstorm",
      description: "Strong rain accompanied by thunder and lightning.",
    },
    {
      condition: "Snow",
      description: "Frozen precipitation in the form of snowflakes.",
    },
  ]
  
  