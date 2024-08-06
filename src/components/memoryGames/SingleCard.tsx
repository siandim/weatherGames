import React from 'react';

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
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="cards" />
        <img 
          className="back" 
          src="/img/memoryGame/cover.png" 
          onClick={handleClick} 
          alt="cover" 
        />
      </div>
    </div>
  );
};

export default SingleCard;