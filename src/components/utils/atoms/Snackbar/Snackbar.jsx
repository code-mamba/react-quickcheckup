import { useState, useEffect } from "react";
import "./snackbar.css"

const Snackbar = ({message, onClose}) => {
    const[visible, setVisible] = useState(true);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setVisible(false);
            onClose();
        },3000)
        return()=> clearTimeout(timer)
    })
    console.log(message)
    console.log(message)
    console.log(message)
    const handleClose = () =>{
        setVisible(false)
        onClose();
    }
    return visible ? (
        <div className="snackbar">
            <p>{message}</p>
            <button onClick={handleClose}>Close</button>

        </div>
    ):null
}

export default Snackbar