import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import Alert from "./Alert";
import styles from "./memoryGame.module.css"

interface Card {
  src: string;
  name: string;
  function: string;
  matched: boolean;
  id?: number;
}

const cardImages: Card[] = [
  {
    src: "/img/memoryGame/anemometer.jpg",
    name: "Anemometer",
    function: "Measures the speed at which the wind is blowing.",
    matched: false,
  },
  {
    src: "/img/memoryGame/barometer.jpg",
    name: "Barometer",
    function: "An instrument that measures atmospheric pressure.",
    matched: false,
  },
  {
    src: "/img/memoryGame/hygrometer digital.jpg",
    name: "Hygrometer",
    function: "An instrument used to measure humidity.",
    matched: false,
  },
  {
    src: "/img/memoryGame/thermometer.jpg",
    name: "Thermometer",
    function: "An instrument that measures temperature.",
    matched: false,
  },
  {
    src: "/img/memoryGame/windvane.png",
    name: "Wind Vane",
    function: "Indicates the direction from which the wind is blowing.",
    matched: false,
  },
  {
    src: "/img/memoryGame/lightning detector.webp",
    name: "Lightning Detector",
    function:
      "Detects and measures the frequency and location of lightning strikes.",
    matched: false,
  },
];

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [pop, setPop] = useState<boolean>(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setPop(false);
    setDescription("");
    setImageSrc("");
  };

  // Handle a choice
  const handleChoice = (card: Card) => {
    // If the game is disabled or the card is already matched, do nothing
    if (disabled || card.matched) return;

    // If the first card is already selected, set the second card
    if (choiceOne) {
      // Avoid selecting the same card twice
      if (card === choiceOne) return;
      setChoiceTwo(card);
    } else {
      // Set the first card
      setChoiceOne(card);
    }
  }; //   choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  // };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setDescription(choiceOne.name + ": " + choiceOne.function);
        setPop(true);
        setImageSrc(choiceOne.src);
        speakFunction(choiceOne.name + choiceOne.function);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const speakFunction = (text: string) => {
    const words = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(words);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
     <div className={styles.container}>
      <div className={styles.appContainer}>
        <div className={styles.headerContainer}>
          <button onClick={shuffleCards}>New Game</button>
          <div className={styles.texts}>
            <p>Turns: {turns}</p>
          </div>
        </div>
        {pop && (
          <Alert onClose={() => setPop(false)} imageSrc={imageSrc}>
            {description}
          </Alert>
        )}
        <div className={styles.cardGrid}>
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
