import "./tag.css"
export const Tag = (props) =>{
    return(
        <div className={`tag-${props.color}`}>
            {props.label}
        </div>
    )
}