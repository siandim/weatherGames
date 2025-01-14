// import { useState } from "react";
// import styles from "./waterCycle.module.css";

// const WaterCycle = () => {
//   const [textBoxes, setTextBoxes] = useState([
//     {
//       name: "Evaporation",
//       isVisible: false,
//       content: "Evaporation stuff",
//       position: { top: "30%", left: "10%" },
//       images: "/img/waterCycle/evaporation.gif",
//     },
//     {
//       name: "Condensation",
//       isVisible: false,
//       content: "Condensation stuff",
//       position: { top: "5%", left: "40%" },
//       images: "/img/waterCycle/condensation.gif",
//     },
//     {
//       name: "Precipitation",
//       isVisible: false,
//       content: "Rain stuff",
//       position: { top: "7%", left: "80%" },
//       images: "/img/waterCycle/precipitation.gif",
//     },
//     {
//       name: "WaterCycle",
//       isVisible: false,
//       content: "WaterCycle stuff",
//       position: { top: "50%", left: "50%" },
//     },
//   ]);

//   const toggleTextBox = (name: string) => {
//     setTextBoxes((prevState) =>
//       prevState.map((box) => ({
//         ...box,
//         isVisible: box.name == name ? !box.isVisible : false,
//       }))
//     );
//   };
//   const handleClose = (content: string) => {
//     setTextBoxes((prevState) =>
//       prevState.map((box) =>
//         box.content == content ? { ...box, isVisible: false } : box
//       )
//     );
//   };

//   return (
//     <div>
//       <div className={styles.container}>
//         <div className={styles.imgContainer}>
//           <img src="/img/waterCycle/waterCycle.gif" />
//           {textBoxes.map((box) => (
//             <div key={box.name}>
//               <div
//                 className={styles.noting}
//                 style={{ top: box.position.top, left: box.position.left }}
//                 onClick={() => toggleTextBox(box.name)}
//               >
//                 {box.name}
//               </div>
//               {box.isVisible && (
//                 <div
//                   className={styles.animation}
//                   onClick={() => handleClose(box.content)}
//                 >
//                   <img src={box.images} alt="" />
//                   More information: {box.content}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default WaterCycle;
import { useState } from "react";
import styles from "./waterCycle.module.css";

const WaterCycle = () => {
  const [textBoxes, setTextBoxes] = useState([
    {
      name: "Evaporation",
      isVisible: false,
      content: "Evaporation stuff",
      position: { top: "30%", left: "10%" },
      images: "/img/waterCycle/evaporation.gif",
    },
    {
      name: "Condensation",
      isVisible: false,
      content: "Condensation stuff",
      position: { top: "5%", left: "40%" },
      images: "/img/waterCycle/condensation.gif",
    },
    {
      name: "Precipitation",
      isVisible: false,
      content: "Rain stuff",
      position: { top: "7%", left: "80%" },
      images: "/img/waterCycle/precipitation.gif",
    },
    {
      name: "WaterCycle",
      isVisible: false,
      content: "WaterCycle stuff",
      position: { top: "50%", left: "50%" },
    },
  ]);

  const toggleTextBox = (name: string) => {
    setTextBoxes((prevState) =>
      prevState.map((box) => ({
        ...box,
        isVisible: box.name === name ? !box.isVisible : false,
      }))
    );
  };

  const handleClose = (content: string) => {
    setTextBoxes((prevState) =>
      prevState.map((box) =>
        box.content === content ? { ...box, isVisible: false } : box
      )
    );
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img src="/img/waterCycle/waterCycle.gif" alt="Water Cycle" />
          {textBoxes.map((box) => (
            <div key={box.name}>
              <div
                className={styles.noting}
                style={{
                  position: "absolute",
                  top: box.position.top,
                  left: box.position.left,
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                }}
                onClick={() => toggleTextBox(box.name)}
              >
                {box.name}
              </div>
              {box.isVisible && (
                <div
                  style={{
                    zIndex: "2",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 1,
                    transition: "all 1s ease-in-out",
                    backgroundColor: "#fff",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={() => handleClose(box.content)}
                >
                  {box.images && (
                    <img
                      src={box.images}
                      alt={box.name}
                      style={{
                        display: "block",
                        maxWidth: "100%",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <p>{box.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterCycle;
