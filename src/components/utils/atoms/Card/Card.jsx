import "./card.css"
export const Card = ({data, onClick}) =>{
    if(!data){
        return null
    }
    return(
        <div className="card" onClick={onClick}>
            <div className="cardContent">
            <div className="cardlist">
            {Object.entries(data).map(([key, value]) => (
                <>
                <div className="column">
                <div className="rowheader">
                    <div className="cell" ><strong>{key}</strong></div>
                </div>
                <div className="rowdata">
                    <div className="cell">{value}</div>
                </div>
                </div>
                </>
          ))}
            </div>
            </div>
        </div>
    )
}