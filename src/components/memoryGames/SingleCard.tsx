import React from 'react';
import styles from "./memoryGame.module.css"
interface Card {
  src: string;
  name: string;
  function: string;
  matched: boolean;
  id?: number;
}

interface SingleCardProps {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
}

const SingleCard: React.FC<SingleCardProps> = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={styles.card}>
      <div className={flipped ? styles.flip : ""}>
        <img className={styles.front} src={card.src} alt="cards" />
        <img 
          className={styles.back}
          src="/img/memoryGame/cover.png" 
          onClick={handleClick} 
          alt="cover" 
        />
      </div>
    </div>
  );
};

export default SingleCard;