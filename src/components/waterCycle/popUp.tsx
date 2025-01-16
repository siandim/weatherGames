import { ReactNode } from "react";
import styles from "./popUp.module.css"
interface PopUpProps {
  children: ReactNode;
  onClose:()=>void, 
  imageSrc?: string;
  alt?: string;
}
const PopUp = ({ children, onClose, imageSrc,alt }:PopUpProps) => {
  return (
    <div className={styles.alertContainer}>
      <div className={styles.alertContent}>
        <img src={imageSrc} alt={alt} className={styles.alertImage} />
        <div className={styles.texts}>{children}</div>
        <button onClick={onClose} >
          Got it
        </button>
      </div>
    </div>
  );
};

export default PopUp;
