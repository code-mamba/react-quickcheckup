import { formatTime } from "src/utils/time"
import "./time-range.css"

export const TimeRange = (props) =>{
    return(
        <div className="timerange">
             <strong>Available Time </strong>
              <p>
                Start Time {formatTime(props.startTime)} - End Time{" "}
                {formatTime(props.endTime)}
              </p>
        </div>
    )
}