import { useEffect, useState } from "react";
import styles from "./waterCycle.module.css";
import { useLocation } from "react-router-dom";
import PopUp from "./popUp";

const WaterCycle = () => {
  const [textBoxes, setTextBoxes] = useState([
    {
      name: "Transpiration",
      isVisible: false,
      content:
        "Plants releases water vapor into the atmosphere through their leaves.",
      position: { top: "40%", left: "15%" },
      images: "/img/waterCycle/evaporation.gif",
    },
    {
      name: "Evaporation",
      isVisible: false,
      content:
        "Water from oceans, rivers, and lakes turns into water vapor due to the sun's heat.",
      position: { top: "60%", left: "35%" },
      images: "/img/waterCycle/evaporation.gif",
    },
    {
      name: "Condensation",
      isVisible: false,
      content:
        " The water vapor cools as it rises, turning back into tiny water droplets that form clouds.",
      position: { top: "9%", left: "50%" },
      images: "/img/waterCycle/condensation.gif",
    },
    {
      name: "Precipitation",
      isVisible: false,
      content:
        "When the clouds get too heavy, the water falls back to Earth as rain, snow, sleet, or hail.",
      position: { top: "10%", left: "80%" },
      images: "/img/waterCycle/precipitation.gif",
    },
    {
      name: "WaterCycle",
      isVisible: false,
      content:
        "also known as hydrologic cycle, is the continuous movement of water through the Earth's atmosphere, land, and oceans.",
      position: { top: "80%", left: "60%" },
      images: "/img/waterCycle/waterCycle.gif"
    },
  ]);

  const location = useLocation(); // Detect route changes
  console.log(location);
  useEffect(() => {
    // Stop speech when route changes
    window.speechSynthesis.cancel();
  }, [location]);

  const toggleTextBox = (name: string, content: string) => {
    setTextBoxes((prevState) => {
      const updatedBoxes = prevState.map((box) => ({
        ...box,
        isVisible: box.name === name && box.isVisible == false ? true : false,
      }));

      // Find the updated box state to check if it's visible
      const currentBox = updatedBoxes.find((box) => box.name === name);

      if (currentBox?.isVisible) {
        window.speechSynthesis.cancel();
        speakFunction(name + ", " + content);
      } else {
        window.speechSynthesis.cancel();
      }

      return updatedBoxes;
    });
  };

  const handleClose = () => {
    window.speechSynthesis.cancel();
    setTextBoxes((prevState) =>
      prevState.map((box) => ({ ...box, isVisible: false }))
    );
  };
  const speakFunction = (text: string) => {
    const words = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(words);
  };

  return (
    <div>
      <div className={styles.title}>
        <h1> Water Cycle </h1>
        <p className="text-lg">
          This animation shows the entire process of the water cycle.
        </p>
        <p>
          Click on different parts of the text to explore what happens at each
          stage.
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img src="/img/waterCycle/waterCycle.gif" alt="Water Cycle" />
          {textBoxes.map((box) => (
            <div key={box.name}>
              <div
                className={styles.noting}
                style={{
                  top: box.position.top,
                  left: box.position.left,
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                }}
                onClick={() => toggleTextBox(box.name, box.content)}
              >
                <button>{box.name}</button>
              </div>
              {box.isVisible && (
                <PopUp
                 //hidden text
                  onClose={() => handleClose()}
                  imageSrc={box.images}
                  alt={box.name + " image"}
                >
                  <div className={styles.text}>
                    <p>
                      <b>{box.name}</b> <br />
                      {box.content}
                    </p>
                  </div>
                </PopUp>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterCycle;
