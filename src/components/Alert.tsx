interface alertProps {
  children: string;
  onClose:()=>void, 
  imageSrc: string;
}

const Alert = ({ children, onClose, imageSrc }:alertProps) => {
  return (
    <div className="alert-container">
      <div className="alert-content">
        <img src={imageSrc} alt="Matched card" className="alert-image" />
        <div className="texts">{children}</div>
        <button onClick={onClose} >
          Got it
        </button>
      </div>
    </div>
  );
};

export default Alert;

// const Alert = ({children,onClose,imageSrc}) => {
//   return (
//     <div className='alert alert-primary alert-dismissible'>
//         <div>

//         </div>
//         {children};    
//         <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="alert" aria-label="Close"></button>
//     </div>
//   )
// }

// export default Alert