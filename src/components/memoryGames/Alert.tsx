import styles from "./memoryGame.module.css"
interface alertProps {
  children: string;
  onClose:()=>void, 
  imageSrc?: string;
}
const Alert = ({ children, onClose, imageSrc }:alertProps) => {
  return (
    <div className={styles.alertContainer}>
      <div className={styles.alertContent}>
        <img src={imageSrc} alt="Matched card" className={styles.alertImage} />
        <div className={styles.texts}>{children}</div>
        <button onClick={onClose} >
          Got it
        </button>
      </div>
    </div>
  );
};

export default Alert;

