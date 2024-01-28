import './popup.css'
export const Popup = (props) =>{
    if(props.isOpen){
        return(
            <div className="popup-overlay" onClick={props.onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <span className="popup-close" onClick={props.onClose}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
        )
    }
} 