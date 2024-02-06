import './popup.css'
export const Popup = (props) =>{
    if(props.isOpen){
        return(
            <div className="popup-overlay" onClick={props.onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-close" onClick={props.onClose}>
          &times;
        </div>
        {props.children}
      </div>
    </div>
        )
    }
} 